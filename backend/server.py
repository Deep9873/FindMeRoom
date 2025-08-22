from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os 
import logging
from pathlib import Path 
from pydantic import BaseModel, Field 
from typing import List, Optional
import uuid
from datetime import datetime, timedelta
import hashlib
import jwt
from passlib.context import CryptContext
from fastapi.responses import Response
from fastapi.responses import FileResponse


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix with increased request size limits
app = FastAPI(
    title="GetRentals API",
    description="Property rental platform API with support for large image uploads",
    version="1.0.0"
)

# App version for cache-busting (generate unique version for each restart)
import time
APP_VERSION = os.environ.get('APP_VERSION', f"{datetime.utcnow().strftime('%Y%m%d%H%M%S')}-{int(time.time())}")

# Add cache control headers middleware to prevent caching issues
@app.middleware("http")
async def add_cache_control_headers(request: Request, call_next):
    response = await call_next(request)
    
    # Add cache control headers to prevent aggressive caching for ALL routes
    # This ensures consistent no-cache behavior across the entire application
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache" 
    response.headers["Expires"] = "0"
    
    # Add versioning header to help with cache busting
    response.headers["X-App-Version"] = APP_VERSION
    
    # Add additional headers to prevent aggressive caching
    response.headers["Last-Modified"] = datetime.utcnow().strftime('%a, %d %b %Y %H:%M:%S GMT')
    response.headers["ETag"] = f'"{APP_VERSION}"'
    
    return response

# Add middleware to handle large request bodies 
@app.middleware("http")
async def limit_upload_size(request: Request, call_next):
    # Allow up to 100MB for property image uploads
    max_size = 100 * 1024 * 1024  # 100MB in bytes
    
    # Check content-length header if present
    if request.method == "POST" and "content-length" in request.headers:
        content_length = int(request.headers["content-length"])
        logger.info(f"POST request to {request.url.path} with content-length: {content_length} bytes ({content_length/1024/1024:.2f} MB)")
        
        if content_length > max_size:
            logger.warning(f"Request rejected - content too large: {content_length} bytes ({content_length/1024/1024:.2f} MB) from {request.client.host if request.client else 'unknown'}")
            return Response(
                content=f"Request entity too large. Received {content_length/1024/1024:.2f}MB, maximum allowed is 100MB. Please compress your images.",
                status_code=413,
                media_type="text/plain"
            )
    
    response = await call_next(request)
    return response

# Additional middleware for CORS and large body handling
@app.middleware("http")
async def cors_and_body_handler(request: Request, call_next):
    response = await call_next(request)
    # Set additional headers for large file support
    response.headers["Access-Control-Max-Age"] = "86400"
    return response

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
JWT_SECRET = "your-secret-key-here"
JWT_ALGORITHM = "HS256"

# Models
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    name: str
    phone: str
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserCreate(BaseModel):
    email: str
    name: str
    phone: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class Property(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    title: str
    description: str
    property_type: str  # room, house, pg
    rent: int  # per month in rupees
    deposit: int
    location: str
    city: str
    images: List[str] = []  # base64 encoded images
    amenities: List[str] = []
    available: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class PropertyCreate(BaseModel):
    title: str
    description: str
    property_type: str
    rent: int
    deposit: int
    location: str
    city: str
    images: List[str] = []
    amenities: List[str] = []

class PropertyUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    property_type: Optional[str] = None
    rent: Optional[int] = None
    deposit: Optional[int] = None
    location: Optional[str] = None
    city: Optional[str] = None
    images: Optional[List[str]] = None
    amenities: Optional[List[str]] = None
    available: Optional[bool] = None

class Chat(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    property_id: str
    sender_id: str
    receiver_id: str
    message: str
    is_read: bool = False
    read_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ChatCreate(BaseModel):
    property_id: str
    receiver_id: str
    message: str

class ChatMarkRead(BaseModel):
    message_ids: List[str]

class ConversationSummary(BaseModel):
    property_id: str
    property_title: str
    property_image: Optional[str] = None
    other_user_id: str
    other_user_name: str
    last_message: str
    last_message_time: datetime
    unread_count: int
    is_sender: bool  # True if current user sent the last message

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict

# Admin Models
class Admin(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class AdminLogin(BaseModel):
    email: str
    password: str

class AdminChangePassword(BaseModel):
    current_password: str
    new_password: str

class SupportMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    screenshots: List[str] = []  # base64 encoded images
    status: str = "open"  # open, in_progress, resolved
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    admin_response: Optional[str] = None
    responded_at: Optional[datetime] = None

class SupportMessageCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str
    screenshots: List[str] = []

class SupportMessageUpdate(BaseModel):
    status: Optional[str] = None
    admin_response: Optional[str] = None

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    password: Optional[str] = None

class UserCreateAdmin(BaseModel):
    name: str
    email: str
    phone: str
    password: str

# Utility functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(hours=24)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt
  
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:   
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        user = await db.users.find_one({"id": user_id})
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:   
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        admin_id: str = payload.get("sub")
        admin_type: str = payload.get("type")
        
        if admin_id is None or admin_type != "admin":
            raise HTTPException(status_code=401, detail="Invalid admin credentials")
            
        admin = await db.admins.find_one({"id": admin_id})
        if admin is None:
            raise HTTPException(status_code=401, detail="Admin not found")
        return admin
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid admin credentials")

# Initialize default admin if not exists
async def init_admin():
    try:
        existing_admin = await db.admins.find_one({"email": "admin@getrentals.online"})
        if not existing_admin:
            admin_obj = Admin(
                email="admin@getrentals.online",
                password_hash=get_password_hash("admin123")
            )
            await db.admins.insert_one(admin_obj.dict())
            print("Default admin created: admin@getrentals.online / admin123")
    except Exception as e:
        print(f"Error creating default admin: {e}")

# Authentication routes
@api_router.post("/auth/register", response_model=TokenResponse)
async def register(user_data: UserCreate):
    # Validate phone number format (only digits, 10+ digits)
    phone_digits = ''.join(filter(str.isdigit, user_data.phone))
    if len(phone_digits) < 10 or len(phone_digits) > 15:
        raise HTTPException(status_code=400, detail="Phone number must be between 10-15 digits")
    
    # Check if user already exists by email
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Check if phone number already exists (check against cleaned digits)
    existing_phone = await db.users.find_one({"phone": phone_digits})
    if existing_phone:
        raise HTTPException(status_code=400, detail="Phone number already registered")
    
    # Create new user
    user_dict = user_data.dict()
    user_dict["password_hash"] = get_password_hash(user_data.password)
    user_dict["phone"] = phone_digits  # Store only digits
    del user_dict["password"]
    
    user_obj = User(**user_dict)
    await db.users.insert_one(user_obj.dict())
    
    # Create access token
    access_token = create_access_token(data={"sub": user_obj.id})
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user={"id": user_obj.id, "email": user_obj.email, "name": user_obj.name}
    )

@api_router.post("/auth/login", response_model=TokenResponse)
async def login(user_credentials: UserLogin):
    user = await db.users.find_one({"email": user_credentials.email})
    if not user or not verify_password(user_credentials.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = create_access_token(data={"sub": user["id"]})
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user={"id": user["id"], "email": user["email"], "name": user["name"]}
    )

@api_router.get("/auth/me")
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    return {"id": current_user["id"], "email": current_user["email"], "name": current_user["name"]}

# Admin Authentication Routes
@api_router.post("/adminpanel/auth/login", response_model=TokenResponse)
async def admin_login(admin_credentials: AdminLogin):
    admin = await db.admins.find_one({"email": admin_credentials.email})
    if not admin or not verify_password(admin_credentials.password, admin["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = create_access_token(data={"sub": admin["id"], "type": "admin"})
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user={"id": admin["id"], "email": admin["email"], "type": "admin"}
    )

@api_router.get("/adminpanel/auth/me")
async def get_current_admin_info(current_admin: dict = Depends(get_current_admin)):
    return {"id": current_admin["id"], "email": current_admin["email"], "type": "admin"}

@api_router.post("/adminpanel/auth/change-password")
async def admin_change_password(password_data: AdminChangePassword, current_admin: dict = Depends(get_current_admin)):
    # Verify current password
    if not verify_password(password_data.current_password, current_admin["password_hash"]):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    
    # Update password
    new_password_hash = get_password_hash(password_data.new_password)
    await db.admins.update_one(
        {"id": current_admin["id"]},
        {"$set": {
            "password_hash": new_password_hash,
            "updated_at": datetime.utcnow()
        }}
    )
    
    return {"message": "Password changed successfully"}

# Admin User Management Routes
@api_router.get("/adminpanel/users")
async def get_all_users(
    skip: int = 0,
    limit: int = 50,
    search: Optional[str] = None,
    current_admin: dict = Depends(get_current_admin)
):
    query = {}
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"email": {"$regex": search, "$options": "i"}},
            {"phone": {"$regex": search, "$options": "i"}}
        ]
    
    users = await db.users.find(query).skip(skip).limit(limit).to_list(length=limit)
    total_count = await db.users.count_documents(query)
    
    # Remove password hash from response
    for user in users:
        user.pop("password_hash", None)
    
    return {
        "users": users,
        "total": total_count,
        "skip": skip,
        "limit": limit
    }

@api_router.get("/adminpanel/users/{user_id}")
async def get_user_by_id(user_id: str, current_admin: dict = Depends(get_current_admin)):
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Remove password hash
    user.pop("password_hash", None)
    return user

@api_router.post("/adminpanel/users", response_model=User)
async def create_user_by_admin(user_data: UserCreateAdmin, current_admin: dict = Depends(get_current_admin)):
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Check phone number
    phone_digits = ''.join(filter(str.isdigit, user_data.phone))
    if len(phone_digits) < 10 or len(phone_digits) > 15:
        raise HTTPException(status_code=400, detail="Phone number must be between 10-15 digits")
    
    existing_phone = await db.users.find_one({"phone": phone_digits})
    if existing_phone:
        raise HTTPException(status_code=400, detail="Phone number already registered")
    
    # Create user
    user_dict = user_data.dict()
    user_dict["password_hash"] = get_password_hash(user_data.password)
    user_dict["phone"] = phone_digits
    del user_dict["password"]
    
    user_obj = User(**user_dict)
    await db.users.insert_one(user_obj.dict())
    
    return user_obj

@api_router.put("/admin/users/{user_id}")
async def update_user_by_admin(user_id: str, user_data: UserUpdate, current_admin: dict = Depends(get_current_admin)):
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    update_data = {}
    for field, value in user_data.dict().items():
        if value is not None:
            if field == "password":
                update_data["password_hash"] = get_password_hash(value)
            elif field == "phone":
                phone_digits = ''.join(filter(str.isdigit, value))
                if len(phone_digits) < 10 or len(phone_digits) > 15:
                    raise HTTPException(status_code=400, detail="Phone number must be between 10-15 digits")
                update_data["phone"] = phone_digits
            elif field == "email":
                # Check if email already exists (excluding current user)
                existing_user = await db.users.find_one({"email": value, "id": {"$ne": user_id}})
                if existing_user:
                    raise HTTPException(status_code=400, detail="Email already registered")
                update_data["email"] = value
            else:
                update_data[field] = value
    
    if update_data:
        await db.users.update_one({"id": user_id}, {"$set": update_data})
    
    updated_user = await db.users.find_one({"id": user_id})
    updated_user.pop("password_hash", None)
    return updated_user

@api_router.delete("/admin/users/{user_id}")
async def delete_user_by_admin(user_id: str, current_admin: dict = Depends(get_current_admin)):
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Delete user's properties and chats
    await db.properties.delete_many({"user_id": user_id})
    await db.chats.delete_many({"$or": [{"sender_id": user_id}, {"receiver_id": user_id}]})
    
    # Delete user
    await db.users.delete_one({"id": user_id})
    
    return {"message": "User and all associated data deleted successfully"}

# Admin Property Management Routes
@api_router.get("/admin/properties")
async def get_all_properties(
    skip: int = 0,
    limit: int = 50,
    search: Optional[str] = None,
    city: Optional[str] = None,
    property_type: Optional[str] = None,
    available: Optional[bool] = None,
    current_admin: dict = Depends(get_current_admin)
):
    query = {}
    
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
            {"location": {"$regex": search, "$options": "i"}}
        ]
    
    if city:
        query["city"] = {"$regex": city, "$options": "i"}
    
    if property_type:
        query["property_type"] = property_type
        
    if available is not None:
        query["available"] = available
    
    properties = await db.properties.find(query).skip(skip).limit(limit).to_list(length=limit)
    total_count = await db.properties.count_documents(query)
    
    # Get user info for each property
    for prop in properties:
        user = await db.users.find_one({"id": prop["user_id"]})
        if user:
            prop["owner_name"] = user["name"]
            prop["owner_email"] = user["email"]
    
    return {
        "properties": properties,
        "total": total_count,
        "skip": skip,
        "limit": limit
    }

@api_router.put("/admin/properties/{property_id}")
async def update_property_by_admin(property_id: str, property_data: PropertyUpdate, current_admin: dict = Depends(get_current_admin)):
    property_doc = await db.properties.find_one({"id": property_id})
    if not property_doc:
        raise HTTPException(status_code=404, detail="Property not found")
    
    update_data = {k: v for k, v in property_data.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db.properties.update_one({"id": property_id}, {"$set": update_data})
    
    updated_property = await db.properties.find_one({"id": property_id})
    return Property(**updated_property)

@api_router.delete("/admin/properties/{property_id}")
async def delete_property_by_admin(property_id: str, current_admin: dict = Depends(get_current_admin)):
    property_doc = await db.properties.find_one({"id": property_id})
    if not property_doc:
        raise HTTPException(status_code=404, detail="Property not found")
    
    # Delete associated chats
    await db.chats.delete_many({"property_id": property_id})
    
    # Delete property
    await db.properties.delete_one({"id": property_id})
    return {"message": "Property deleted successfully"}

# Property routes
@api_router.get("/properties", response_model=List[Property])
async def get_properties(
    city: Optional[str] = None,
    property_type: Optional[str] = None,
    min_rent: Optional[int] = None,
    max_rent: Optional[int] = None,
    skip: int = 0,
    limit: int = 20
):
    query = {"available": True}
    
    if city:
        # Enhanced city search: Support multiple formats and partial matches
        # Handle variations like "Delhi", "New Delhi", "delhi", "DELHI" etc.
        city_variations = [
            city.strip(),  # Exact search
            f".*{city.strip()}.*",  # Contains search
        ]
        
        # Create OR query to match any variation
        city_queries = []
        for variation in city_variations:
            city_queries.append({"city": {"$regex": variation, "$options": "i"}})
        
        query["$or"] = city_queries
    if property_type:
        query["property_type"] = property_type
    if min_rent is not None:
        query["rent"] = {"$gte": min_rent}
    if max_rent is not None:
        if "rent" in query:
            query["rent"]["$lte"] = max_rent
        else:
            query["rent"] = {"$lte": max_rent}
    
    properties = await db.properties.find(query).skip(skip).limit(limit).to_list(length=limit)
    return [Property(**prop) for prop in properties]

@api_router.get("/properties/{property_id}", response_model=Property)
async def get_property(property_id: str):
    property_doc = await db.properties.find_one({"id": property_id})
    if not property_doc:
        raise HTTPException(status_code=404, detail="Property not found")
    return Property(**property_doc)

@api_router.post("/properties", response_model=Property)
async def create_property(property_data: PropertyCreate, current_user: dict = Depends(get_current_user)):
    try:
        property_dict = property_data.dict()
        property_dict["user_id"] = current_user["id"]
        
        # Validate image sizes to prevent overly large requests
        if property_dict.get("images"):
            total_size = 0
            for i, image in enumerate(property_dict["images"]):
                # Estimate base64 image size (base64 adds ~33% overhead)
                image_size = len(image) * 0.75  # Approximate original size
                total_size += image_size
                
                # Limit single image to 10MB
                if image_size > 10 * 1024 * 1024:
                    raise HTTPException(
                        status_code=413, 
                        detail=f"Image {i+1} is too large. Maximum size per image is 10MB."
                    )
            
            # Limit total images size to 50MB
            if total_size > 50 * 1024 * 1024:
                raise HTTPException(
                    status_code=413, 
                    detail="Total images size too large. Maximum total size is 50MB."
                )
        
        property_obj = Property(**property_dict)
        await db.properties.insert_one(property_obj.dict())
        
        return property_obj
        
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        else:
            raise HTTPException(status_code=500, detail=f"Error creating property: {str(e)}")

@api_router.put("/properties/{property_id}", response_model=Property)
async def update_property(property_id: str, property_data: PropertyUpdate, current_user: dict = Depends(get_current_user)):
    property_doc = await db.properties.find_one({"id": property_id})
    if not property_doc:
        raise HTTPException(status_code=404, detail="Property not found")
    
    if property_doc["user_id"] != current_user["id"]:
        raise HTTPException(status_code=403, detail="Not authorized to update this property")
    
    update_data = {k: v for k, v in property_data.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db.properties.update_one({"id": property_id}, {"$set": update_data})
    
    updated_property = await db.properties.find_one({"id": property_id})
    return Property(**updated_property)

@api_router.delete("/properties/{property_id}")
async def delete_property(property_id: str, current_user: dict = Depends(get_current_user)):
    property_doc = await db.properties.find_one({"id": property_id})
    if not property_doc:
        raise HTTPException(status_code=404, detail="Property not found")
    
    if property_doc["user_id"] != current_user["id"]:
        raise HTTPException(status_code=403, detail="Not authorized to delete this property")
    
    await db.properties.delete_one({"id": property_id})
    return {"message": "Property deleted successfully"}

@api_router.get("/my-properties", response_model=List[Property])
async def get_my_properties(current_user: dict = Depends(get_current_user)):
    properties = await db.properties.find({"user_id": current_user["id"]}).to_list(length=100)
    return [Property(**prop) for prop in properties]

# Chat routes
@api_router.post("/chat", response_model=Chat)
async def send_message(chat_data: ChatCreate, current_user: dict = Depends(get_current_user)):
    # Verify property exists
    property_doc = await db.properties.find_one({"id": chat_data.property_id})
    if not property_doc:
        raise HTTPException(status_code=404, detail="Property not found")
    
    # Check if user is trying to contact themselves (prevent self-contact)
    if current_user["id"] == chat_data.receiver_id:
        raise HTTPException(status_code=400, detail="Cannot send message to yourself")
    
    # Check if user is the property owner trying to contact themselves
    if property_doc["user_id"] == current_user["id"] and current_user["id"] == chat_data.receiver_id:
        raise HTTPException(status_code=400, detail="Cannot contact yourself on your own property")
    
    chat_dict = chat_data.dict()
    chat_dict["sender_id"] = current_user["id"]
    
    chat_obj = Chat(**chat_dict)
    await db.chats.insert_one(chat_obj.dict())
    
    return chat_obj

@api_router.get("/chat/conversations", response_model=List[ConversationSummary])
async def get_user_conversations(current_user: dict = Depends(get_current_user)):
    # Get all unique (property_id, other_user_id) pairs where user has conversations
    pipeline = [
        {
            "$match": {
                "$or": [
                    {"sender_id": current_user["id"]},
                    {"receiver_id": current_user["id"]}
                ]
            }
        },
        {
            "$addFields": {
                "other_user_id": {
                    "$cond": {
                        "if": {"$eq": ["$sender_id", current_user["id"]]},
                        "then": "$receiver_id",
                        "else": "$sender_id"
                    }
                }
            }
        },
        {
            "$sort": {"created_at": -1}
        },
        {
            "$group": {
                "_id": {
                    "property_id": "$property_id",
                    "other_user_id": "$other_user_id"
                },
                "last_message": {"$first": "$message"},
                "last_message_time": {"$first": "$created_at"},
                "sender_id": {"$first": "$sender_id"},
                "receiver_id": {"$first": "$receiver_id"},
                "messages": {"$push": "$$ROOT"}
            }
        }
    ]
    
    conversations = await db.chats.aggregate(pipeline).to_list(length=100)
    
    result = []
    for conv in conversations:
        property_id = conv["_id"]["property_id"]
        other_user_id = conv["_id"]["other_user_id"]
        
        # Get property details
        property_doc = await db.properties.find_one({"id": property_id})
        if not property_doc:
            continue
            
        # Get other user details
        other_user = await db.users.find_one({"id": other_user_id})
        if not other_user:
            continue
            
        # Count unread messages for this specific conversation
        unread_count = await db.chats.count_documents({
            "property_id": property_id,
            "receiver_id": current_user["id"],
            "sender_id": other_user_id,
            "is_read": False
        })
        
        result.append(ConversationSummary(
            property_id=property_id,
            property_title=property_doc["title"],
            property_image=property_doc["images"][0] if property_doc.get("images") else None,
            other_user_id=other_user_id,
            other_user_name=other_user["name"],
            last_message=conv["last_message"],
            last_message_time=conv["last_message_time"],
            unread_count=unread_count,
            is_sender=conv["sender_id"] == current_user["id"]
        ))
    
    return result

@api_router.get("/chat/unread-count")
async def get_unread_count(current_user: dict = Depends(get_current_user)):
    count = await db.chats.count_documents({
        "receiver_id": current_user["id"],
        "is_read": False
    })
    return {"unread_count": count}

@api_router.post("/chat/mark-read")
async def mark_messages_read(chat_data: ChatMarkRead, current_user: dict = Depends(get_current_user)):
    # Mark messages as read for the current user
    await db.chats.update_many(
        {
            "id": {"$in": chat_data.message_ids},
            "receiver_id": current_user["id"]
        },
        {
            "$set": {
                "is_read": True,
                "read_at": datetime.utcnow()
            }
        }
    )
    return {"message": "Messages marked as read"}

@api_router.get("/chat/{property_id}")
async def get_chat_messages(property_id: str, other_user_id: str, current_user: dict = Depends(get_current_user)):
    # Get messages for this property between current user and the other user only
    messages = await db.chats.find({
        "property_id": property_id,
        "$or": [
            {"sender_id": current_user["id"], "receiver_id": other_user_id},
            {"sender_id": other_user_id, "receiver_id": current_user["id"]}
        ]
    }).sort("created_at", 1).to_list(length=100)
    
    return [Chat(**msg) for msg in messages]

# Customer Support System
@api_router.post("/support/submit")
async def submit_support_message(support_data: SupportMessageCreate):
    # Validate email format
    if "@" not in support_data.email or "." not in support_data.email:
        raise HTTPException(status_code=400, detail="Invalid email format")
    
    # Validate screenshot sizes (max 5MB per file)
    if support_data.screenshots:
        for i, screenshot in enumerate(support_data.screenshots):
            # Estimate size (base64 adds ~33% overhead)
            image_size = len(screenshot) * 0.75
            if image_size > 5 * 1024 * 1024:  # 5MB
                raise HTTPException(
                    status_code=413,
                    detail=f"Screenshot {i+1} is too large. Maximum size per image is 5MB."
                )
    
    support_obj = SupportMessage(**support_data.dict())
    await db.support_messages.insert_one(support_obj.dict())
    
    return {"message": "Support message submitted successfully", "ticket_id": support_obj.id}

@api_router.get("/admin/support")
async def get_support_messages(
    skip: int = 0,
    limit: int = 50,
    status: Optional[str] = None,
    search: Optional[str] = None,
    current_admin: dict = Depends(get_current_admin)
):
    query = {}
    
    if status:
        query["status"] = status
    
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"email": {"$regex": search, "$options": "i"}},
            {"subject": {"$regex": search, "$options": "i"}},
            {"message": {"$regex": search, "$options": "i"}}
        ]
    
    messages = await db.support_messages.find(query).sort("created_at", -1).skip(skip).limit(limit).to_list(length=limit)
    total_count = await db.support_messages.count_documents(query)
    
    return {
        "messages": messages,
        "total": total_count,
        "skip": skip,
        "limit": limit
    }

@api_router.get("/admin/support/{message_id}")
async def get_support_message(message_id: str, current_admin: dict = Depends(get_current_admin)):
    message = await db.support_messages.find_one({"id": message_id})
    if not message:
        raise HTTPException(status_code=404, detail="Support message not found")
    return message

@api_router.put("/admin/support/{message_id}")
async def update_support_message(message_id: str, update_data: SupportMessageUpdate, current_admin: dict = Depends(get_current_admin)):
    message = await db.support_messages.find_one({"id": message_id})
    if not message:
        raise HTTPException(status_code=404, detail="Support message not found")
    
    update_fields = {}
    for field, value in update_data.dict().items():
        if value is not None:
            update_fields[field] = value
    
    if update_fields:
        update_fields["updated_at"] = datetime.utcnow()
        if "admin_response" in update_fields:
            update_fields["responded_at"] = datetime.utcnow()
        
        await db.support_messages.update_one({"id": message_id}, {"$set": update_fields})
    
    updated_message = await db.support_messages.find_one({"id": message_id})
    return updated_message

# Admin Dashboard Routes
@api_router.get("/admin/dashboard/stats")
async def get_dashboard_stats(current_admin: dict = Depends(get_current_admin)):
    # Get basic counts
    total_users = await db.users.count_documents({})
    total_properties = await db.properties.count_documents({})
    available_properties = await db.properties.count_documents({"available": True})
    total_chats = await db.chats.count_documents({})
    total_support_messages = await db.support_messages.count_documents({})
    open_support_messages = await db.support_messages.count_documents({"status": "open"})
    
    # Get recent activity (last 7 days)
    last_7_days = datetime.utcnow() - timedelta(days=7)
    
    new_users_last_7_days = await db.users.count_documents({"created_at": {"$gte": last_7_days}})
    new_properties_last_7_days = await db.properties.count_documents({"created_at": {"$gte": last_7_days}})
    new_messages_last_7_days = await db.chats.count_documents({"created_at": {"$gte": last_7_days}})
    new_support_messages_last_7_days = await db.support_messages.count_documents({"created_at": {"$gte": last_7_days}})
    
    # Get property type distribution
    property_types = await db.properties.aggregate([
        {"$group": {"_id": "$property_type", "count": {"$sum": 1}}}
    ]).to_list(length=10)
    
    # Get top cities
    top_cities = await db.properties.aggregate([
        {"$group": {"_id": "$city", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 10}
    ]).to_list(length=10)
    
    return {
        "total_users": total_users,
        "total_properties": total_properties,
        "available_properties": available_properties,
        "total_chats": total_chats,
        "total_support_messages": total_support_messages,
        "open_support_messages": open_support_messages,
        "recent_activity": {
            "new_users_last_7_days": new_users_last_7_days,
            "new_properties_last_7_days": new_properties_last_7_days,
            "new_messages_last_7_days": new_messages_last_7_days,
            "new_support_messages_last_7_days": new_support_messages_last_7_days
        },
        "property_types": property_types,
        "top_cities": top_cities
    }

@api_router.get("/admin/dashboard/recent-activity")
async def get_recent_activity(
    limit: int = 20,
    current_admin: dict = Depends(get_current_admin)
):
    # Get recent users
    recent_users = await db.users.find({}).sort("created_at", -1).limit(limit).to_list(length=limit)
    
    # Get recent properties
    recent_properties = await db.properties.find({}).sort("created_at", -1).limit(limit).to_list(length=limit)
    
    # Get recent support messages
    recent_support = await db.support_messages.find({}).sort("created_at", -1).limit(limit).to_list(length=limit)
    
    # Remove sensitive data
    for user in recent_users:
        user.pop("password_hash", None)
    
    return {
        "recent_users": recent_users,
        "recent_properties": recent_properties,
        "recent_support": recent_support
    }

# Basic test route
@api_router.get("/")
async def root():
    return {"message": "GetRentals API is running", "version": APP_VERSION}

# Include the router in the main app
app.include_router(api_router) 
@app.middleware("http")
async def log_cors_headers(request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = request.headers.get("origin", "*")
    return response

    
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://13.60.170.46:3000",
        "https://findmeroom-backend.onrender.com/api/auth/register",
        "https://findmeroom-backend.onrender.com",
        "https://findmeroom-backend.onrender.com/api",
        "http://localhost:3000",
        "http://getrentals.online",
        "https://getrentals.online",
        "https://api.getrentals.online",
        "https://findmeroom.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# seo 
@app.get("/sitemap.xml", response_class=FileResponse)
async def sitemap():
    filepath = os.path.join("public", "sitemap.xml")
    return FileResponse(filepath, media_type='application/xml')

@app.get("/robots.txt", response_class=Response)
async def robots():
    return Response(content="User-agent: *\nAllow: /\n", media_type="text/plain")



# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    await init_admin()

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
