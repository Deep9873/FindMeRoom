from fastapi import FastAPI, APIRouter, HTTPException, Depends
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

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

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

# Authentication routes
@api_router.post("/auth/register", response_model=TokenResponse)
async def register(user_data: UserCreate):
    # Check if user already exists by email
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Check if phone number already exists
    existing_phone = await db.users.find_one({"phone": user_data.phone})
    if existing_phone:
        raise HTTPException(status_code=400, detail="Phone number already registered")
    
    # Validate phone number format (only digits, 10+ digits)
    phone_digits = ''.join(filter(str.isdigit, user_data.phone))
    if len(phone_digits) < 10 or len(phone_digits) > 15:
        raise HTTPException(status_code=400, detail="Phone number must be between 10-15 digits")
    
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
        query["city"] = {"$regex": city, "$options": "i"}
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
    property_dict = property_data.dict()
    property_dict["user_id"] = current_user["id"]
    
    property_obj = Property(**property_dict)
    await db.properties.insert_one(property_obj.dict())
    
    return property_obj

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

# Basic test route
@api_router.get("/")
async def root():
    return {"message": "FindMeRoom API is running"}

# Include the router in the main app
app.include_router(api_router) 
    
app.add_middleware(  
    CORSMiddleware,
    allow_credentials=True, 
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()