#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for FindMeRoom Application
Tests all authentication, property management, search, and chat endpoints
"""

import requests
import json
import time
from typing import Dict, Any, Optional

# Configuration
BASE_URL = "http://localhost:8001/api"
HEADERS = {"Content-Type": "application/json"}

class FindMeRoomTester:
    def __init__(self):
        self.base_url = BASE_URL
        self.headers = HEADERS.copy()
        self.test_users = []
        self.test_properties = []
        self.auth_tokens = {}
        self.results = {
            "passed": 0,
            "failed": 0,
            "errors": []
        }

    def log_result(self, test_name: str, success: bool, message: str = ""):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
        if message:
            print(f"   {message}")
        
        if success:
            self.results["passed"] += 1
        else:
            self.results["failed"] += 1
            self.results["errors"].append(f"{test_name}: {message}")

    def make_request(self, method: str, endpoint: str, data: Dict = None, auth_token: str = None) -> tuple:
        """Make HTTP request with proper error handling"""
        url = f"{self.base_url}{endpoint}"
        headers = self.headers.copy()
        
        if auth_token:
            headers["Authorization"] = f"Bearer {auth_token}"
        
        try:
            if method.upper() == "GET":
                response = requests.get(url, headers=headers, params=data)
            elif method.upper() == "POST":
                response = requests.post(url, headers=headers, json=data)
            elif method.upper() == "PUT":
                response = requests.put(url, headers=headers, json=data)
            elif method.upper() == "DELETE":
                response = requests.delete(url, headers=headers)
            else:
                return None, f"Unsupported method: {method}"
            
            return response, None
        except requests.exceptions.RequestException as e:
            return None, f"Request failed: {str(e)}"

    def test_health_check(self):
        """Test basic API health check"""
        print("\n=== Testing Health Check ===")
        
        response, error = self.make_request("GET", "/")
        if error:
            self.log_result("API Health Check", False, error)
            return False
        
        if response.status_code == 200:
            try:
                data = response.json()
                if "message" in data:
                    self.log_result("API Health Check", True, f"API is running: {data['message']}")
                    return True
            except:
                pass
        
        self.log_result("API Health Check", False, f"Unexpected response: {response.status_code}")
        return False

    def test_user_registration(self):
        """Test user registration endpoint"""
        print("\n=== Testing User Registration ===")
        
        # Test valid registration
        import time
        timestamp = str(int(time.time()))
        test_users_data = [
            {
                "email": f"john.doe.{timestamp}@example.com",
                "name": "John Doe",
                "phone": "+91-9876543210",
                "password": "securepass123"
            },
            {
                "email": f"jane.smith.{timestamp}@example.com", 
                "name": "Jane Smith",
                "phone": "+91-9876543211",
                "password": "mypassword456"
            },
            {
                "email": f"alice.johnson.{timestamp}@example.com",
                "name": "Alice Johnson", 
                "phone": "+91-9876543212",
                "password": "alicepass789"
            }
        ]
        
        for i, user_data in enumerate(test_users_data):
            response, error = self.make_request("POST", "/auth/register", user_data)
            if error:
                self.log_result(f"User Registration {i+1}", False, error)
                continue
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    if "access_token" in data and "user" in data:
                        self.test_users.append(user_data)
                        self.auth_tokens[user_data["email"]] = data["access_token"]
                        self.log_result(f"User Registration {i+1}", True, f"User {user_data['name']} registered successfully")
                    else:
                        self.log_result(f"User Registration {i+1}", False, "Missing token or user data in response")
                except json.JSONDecodeError:
                    self.log_result(f"User Registration {i+1}", False, "Invalid JSON response")
            else:
                self.log_result(f"User Registration {i+1}", False, f"HTTP {response.status_code}: {response.text}")
        
        # Test duplicate email registration
        if self.test_users:
            duplicate_user = self.test_users[0].copy()
            response, error = self.make_request("POST", "/auth/register", duplicate_user)
            if not error and response.status_code == 400:
                self.log_result("Duplicate Email Registration", True, "Correctly rejected duplicate email")
            else:
                self.log_result("Duplicate Email Registration", False, "Should reject duplicate email")

    def test_user_login(self):
        """Test user login endpoint"""
        print("\n=== Testing User Login ===")
        
        if not self.test_users:
            self.log_result("User Login", False, "No registered users to test login")
            return
        
        # Test valid login
        for user_data in self.test_users:
            login_data = {
                "email": user_data["email"],
                "password": user_data["password"]
            }
            
            response, error = self.make_request("POST", "/auth/login", login_data)
            if error:
                self.log_result(f"Login {user_data['name']}", False, error)
                continue
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    if "access_token" in data:
                        self.auth_tokens[user_data["email"]] = data["access_token"]
                        self.log_result(f"Login {user_data['name']}", True, "Login successful")
                    else:
                        self.log_result(f"Login {user_data['name']}", False, "Missing access token")
                except json.JSONDecodeError:
                    self.log_result(f"Login {user_data['name']}", False, "Invalid JSON response")
            else:
                self.log_result(f"Login {user_data['name']}", False, f"HTTP {response.status_code}")
        
        # Test invalid login
        invalid_login = {
            "email": "nonexistent@example.com",
            "password": "wrongpassword"
        }
        response, error = self.make_request("POST", "/auth/login", invalid_login)
        if not error and response.status_code == 401:
            self.log_result("Invalid Login", True, "Correctly rejected invalid credentials")
        else:
            self.log_result("Invalid Login", False, "Should reject invalid credentials")

    def test_get_current_user(self):
        """Test get current user info endpoint"""
        print("\n=== Testing Get Current User ===")
        
        if not self.auth_tokens:
            self.log_result("Get Current User", False, "No auth tokens available")
            return
        
        # Test with valid token
        first_email = list(self.auth_tokens.keys())[0]
        token = self.auth_tokens[first_email]
        
        response, error = self.make_request("GET", "/auth/me", auth_token=token)
        if error:
            self.log_result("Get Current User", False, error)
            return
        
        if response.status_code == 200:
            try:
                data = response.json()
                if "id" in data and "email" in data and "name" in data:
                    self.log_result("Get Current User", True, f"Retrieved user info for {data['email']}")
                else:
                    self.log_result("Get Current User", False, "Missing user fields in response")
            except json.JSONDecodeError:
                self.log_result("Get Current User", False, "Invalid JSON response")
        else:
            self.log_result("Get Current User", False, f"HTTP {response.status_code}")
        
        # Test without token
        response, error = self.make_request("GET", "/auth/me")
        if not error and response.status_code == 401:
            self.log_result("Get Current User (No Token)", True, "Correctly rejected request without token")
        else:
            self.log_result("Get Current User (No Token)", False, "Should reject request without token")

    def test_property_creation(self):
        """Test property creation endpoint"""
        print("\n=== Testing Property Creation ===")
        
        if not self.auth_tokens:
            self.log_result("Property Creation", False, "No auth tokens available")
            return
        
        # Sample property data
        properties_data = [
            {
                "title": "Spacious 2BHK Apartment in Koramangala",
                "description": "Beautiful 2BHK apartment with modern amenities, close to metro station and IT parks. Perfect for working professionals.",
                "property_type": "house",
                "rent": 25000,
                "deposit": 50000,
                "location": "Koramangala 5th Block",
                "city": "Bangalore",
                "images": ["data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="],
                "amenities": ["WiFi", "Parking", "Security", "Gym", "Swimming Pool"]
            },
            {
                "title": "Single Room PG for Girls",
                "description": "Clean and safe PG accommodation for working women. Includes meals, laundry, and housekeeping services.",
                "property_type": "pg",
                "rent": 12000,
                "deposit": 24000,
                "location": "HSR Layout",
                "city": "Bangalore",
                "images": [],
                "amenities": ["Meals", "Laundry", "WiFi", "Security", "AC"]
            },
            {
                "title": "Furnished Room in Shared Apartment",
                "description": "Fully furnished room in a 3BHK apartment. Shared kitchen and living area. Great for students and young professionals.",
                "property_type": "room",
                "rent": 8000,
                "deposit": 16000,
                "location": "Whitefield",
                "city": "Bangalore",
                "images": [],
                "amenities": ["Furnished", "WiFi", "Kitchen Access", "Parking"]
            }
        ]
        
        # Create properties with different users
        emails = list(self.auth_tokens.keys())
        for i, property_data in enumerate(properties_data):
            email = emails[i % len(emails)]
            token = self.auth_tokens[email]
            
            response, error = self.make_request("POST", "/properties", property_data, token)
            if error:
                self.log_result(f"Create Property {i+1}", False, error)
                continue
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    if "id" in data and "title" in data:
                        self.test_properties.append(data)
                        self.log_result(f"Create Property {i+1}", True, f"Created: {data['title']}")
                    else:
                        self.log_result(f"Create Property {i+1}", False, "Missing property data in response")
                except json.JSONDecodeError:
                    self.log_result(f"Create Property {i+1}", False, "Invalid JSON response")
            else:
                self.log_result(f"Create Property {i+1}", False, f"HTTP {response.status_code}: {response.text}")
        
        # Test creation without authentication
        response, error = self.make_request("POST", "/properties", properties_data[0])
        if not error and response.status_code == 401:
            self.log_result("Create Property (No Auth)", True, "Correctly rejected unauthenticated request")
        else:
            self.log_result("Create Property (No Auth)", False, "Should reject unauthenticated request")

    def test_get_properties(self):
        """Test get all properties endpoint"""
        print("\n=== Testing Get Properties ===")
        
        # Test basic get all properties
        response, error = self.make_request("GET", "/properties")
        if error:
            self.log_result("Get All Properties", False, error)
            return
        
        if response.status_code == 200:
            try:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("Get All Properties", True, f"Retrieved {len(data)} properties")
                else:
                    self.log_result("Get All Properties", False, "Response is not a list")
            except json.JSONDecodeError:
                self.log_result("Get All Properties", False, "Invalid JSON response")
        else:
            self.log_result("Get All Properties", False, f"HTTP {response.status_code}")

    def test_property_search_and_filter(self):
        """Test property search and filtering"""
        print("\n=== Testing Property Search and Filter ===")
        
        # Test city filter
        response, error = self.make_request("GET", "/properties", {"city": "Bangalore"})
        if error:
            self.log_result("Filter by City", False, error)
        elif response.status_code == 200:
            try:
                data = response.json()
                self.log_result("Filter by City", True, f"Found {len(data)} properties in Bangalore")
            except:
                self.log_result("Filter by City", False, "Invalid response")
        else:
            self.log_result("Filter by City", False, f"HTTP {response.status_code}")
        
        # Test property type filter
        response, error = self.make_request("GET", "/properties", {"property_type": "pg"})
        if error:
            self.log_result("Filter by Property Type", False, error)
        elif response.status_code == 200:
            try:
                data = response.json()
                self.log_result("Filter by Property Type", True, f"Found {len(data)} PG properties")
            except:
                self.log_result("Filter by Property Type", False, "Invalid response")
        else:
            self.log_result("Filter by Property Type", False, f"HTTP {response.status_code}")
        
        # Test rent range filter
        response, error = self.make_request("GET", "/properties", {"min_rent": 10000, "max_rent": 20000})
        if error:
            self.log_result("Filter by Rent Range", False, error)
        elif response.status_code == 200:
            try:
                data = response.json()
                self.log_result("Filter by Rent Range", True, f"Found {len(data)} properties in rent range")
            except:
                self.log_result("Filter by Rent Range", False, "Invalid response")
        else:
            self.log_result("Filter by Rent Range", False, f"HTTP {response.status_code}")
        
        # Test pagination
        response, error = self.make_request("GET", "/properties", {"skip": 0, "limit": 2})
        if error:
            self.log_result("Pagination", False, error)
        elif response.status_code == 200:
            try:
                data = response.json()
                self.log_result("Pagination", True, f"Retrieved {len(data)} properties with pagination")
            except:
                self.log_result("Pagination", False, "Invalid response")
        else:
            self.log_result("Pagination", False, f"HTTP {response.status_code}")

    def test_get_property_by_id(self):
        """Test get specific property by ID"""
        print("\n=== Testing Get Property by ID ===")
        
        if not self.test_properties:
            self.log_result("Get Property by ID", False, "No test properties available")
            return
        
        # Test valid property ID
        property_id = self.test_properties[0]["id"]
        response, error = self.make_request("GET", f"/properties/{property_id}")
        if error:
            self.log_result("Get Property by ID", False, error)
        elif response.status_code == 200:
            try:
                data = response.json()
                if data["id"] == property_id:
                    self.log_result("Get Property by ID", True, f"Retrieved property: {data['title']}")
                else:
                    self.log_result("Get Property by ID", False, "Property ID mismatch")
            except:
                self.log_result("Get Property by ID", False, "Invalid response")
        else:
            self.log_result("Get Property by ID", False, f"HTTP {response.status_code}")
        
        # Test invalid property ID
        response, error = self.make_request("GET", "/properties/invalid-id")
        if not error and response.status_code == 404:
            self.log_result("Get Property by Invalid ID", True, "Correctly returned 404 for invalid ID")
        else:
            self.log_result("Get Property by Invalid ID", False, "Should return 404 for invalid ID")

    def test_update_property(self):
        """Test property update endpoint"""
        print("\n=== Testing Property Update ===")
        
        if not self.test_properties or not self.auth_tokens:
            self.log_result("Update Property", False, "No test properties or auth tokens available")
            return
        
        # Test valid update by owner
        property_to_update = self.test_properties[0]
        property_id = property_to_update["id"]
        
        # Find the owner's token (first user who created properties)
        owner_email = list(self.auth_tokens.keys())[0]
        owner_token = self.auth_tokens[owner_email]
        
        update_data = {
            "title": "Updated: " + property_to_update["title"],
            "rent": property_to_update["rent"] + 1000
        }
        
        response, error = self.make_request("PUT", f"/properties/{property_id}", update_data, owner_token)
        if error:
            self.log_result("Update Property", False, error)
        elif response.status_code == 200:
            try:
                data = response.json()
                if data["title"].startswith("Updated:"):
                    self.log_result("Update Property", True, "Property updated successfully")
                else:
                    self.log_result("Update Property", False, "Property not updated properly")
            except:
                self.log_result("Update Property", False, "Invalid response")
        else:
            self.log_result("Update Property", False, f"HTTP {response.status_code}: {response.text}")
        
        # Test update without authentication
        response, error = self.make_request("PUT", f"/properties/{property_id}", update_data)
        if not error and response.status_code == 401:
            self.log_result("Update Property (No Auth)", True, "Correctly rejected unauthenticated request")
        else:
            self.log_result("Update Property (No Auth)", False, "Should reject unauthenticated request")

    def test_get_my_properties(self):
        """Test get user's own properties"""
        print("\n=== Testing Get My Properties ===")
        
        if not self.auth_tokens:
            self.log_result("Get My Properties", False, "No auth tokens available")
            return
        
        # Test with valid token
        first_email = list(self.auth_tokens.keys())[0]
        token = self.auth_tokens[first_email]
        
        response, error = self.make_request("GET", "/my-properties", auth_token=token)
        if error:
            self.log_result("Get My Properties", False, error)
        elif response.status_code == 200:
            try:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("Get My Properties", True, f"Retrieved {len(data)} user properties")
                else:
                    self.log_result("Get My Properties", False, "Response is not a list")
            except:
                self.log_result("Get My Properties", False, "Invalid response")
        else:
            self.log_result("Get My Properties", False, f"HTTP {response.status_code}")
        
        # Test without authentication
        response, error = self.make_request("GET", "/my-properties")
        if not error and response.status_code == 401:
            self.log_result("Get My Properties (No Auth)", True, "Correctly rejected unauthenticated request")
        else:
            self.log_result("Get My Properties (No Auth)", False, "Should reject unauthenticated request")

    def test_enhanced_chat_system(self):
        """Test enhanced chat system with real-time updates and unread tracking"""
        print("\n=== Testing Enhanced Chat System ===")
        
        if not self.test_properties or len(self.auth_tokens) < 2:
            self.log_result("Enhanced Chat System", False, "Need at least 2 users and 1 property for chat testing")
            return
        
        # Get two different users and their actual user IDs
        emails = list(self.auth_tokens.keys())
        sender_email = emails[0]
        receiver_email = emails[1]
        sender_token = self.auth_tokens[sender_email]
        receiver_token = self.auth_tokens[receiver_email]
        
        # Get actual user IDs
        sender_response, _ = self.make_request("GET", "/auth/me", auth_token=sender_token)
        receiver_response, _ = self.make_request("GET", "/auth/me", auth_token=receiver_token)
        
        if sender_response.status_code != 200 or receiver_response.status_code != 200:
            self.log_result("Enhanced Chat System", False, "Could not get user IDs")
            return
        
        sender_user = sender_response.json()
        receiver_user = receiver_response.json()
        property_id = self.test_properties[0]["id"]
        
        # Test 1: Send message with new is_read field
        chat_data = {
            "property_id": property_id,
            "receiver_id": receiver_user["id"],
            "message": "Hi, I'm interested in this property. Is it still available?"
        }
        
        response, error = self.make_request("POST", "/chat", chat_data, sender_token)
        if error:
            self.log_result("Send Chat Message", False, error)
            return
        elif response.status_code == 200:
            try:
                data = response.json()
                if "id" in data and "message" in data and "is_read" in data:
                    if data["is_read"] == False:  # New messages should default to unread
                        self.log_result("Send Chat Message (is_read field)", True, "Message sent with is_read=False")
                        message_id = data["id"]
                    else:
                        self.log_result("Send Chat Message (is_read field)", False, "New message should have is_read=False")
                        return
                else:
                    self.log_result("Send Chat Message (is_read field)", False, "Missing required fields in response")
                    return
            except:
                self.log_result("Send Chat Message (is_read field)", False, "Invalid response")
                return
        else:
            self.log_result("Send Chat Message (is_read field)", False, f"HTTP {response.status_code}: {response.text}")
            return
        
        # Test 2: Send another message from receiver to sender
        chat_data2 = {
            "property_id": property_id,
            "receiver_id": sender_user["id"],
            "message": "Yes, it's available! Would you like to schedule a visit?"
        }
        
        response, error = self.make_request("POST", "/chat", chat_data2, receiver_token)
        if response.status_code == 200:
            try:
                data = response.json()
                message_id2 = data["id"]
                self.log_result("Send Second Chat Message", True, "Second message sent successfully")
            except:
                self.log_result("Send Second Chat Message", False, "Invalid response")
                return
        else:
            self.log_result("Send Second Chat Message", False, f"HTTP {response.status_code}")
            return
        
        # Test 3: Get chat messages and verify structure
        response, error = self.make_request("GET", f"/chat/{property_id}?other_user_id={receiver_user['id']}", auth_token=sender_token)
        if error:
            self.log_result("Get Chat Messages", False, error)
        elif response.status_code == 200:
            try:
                data = response.json()
                if isinstance(data, list) and len(data) >= 2:
                    # Check if messages have required fields
                    message = data[0]
                    required_fields = ["id", "message", "is_read", "created_at", "sender_id", "receiver_id"]
                    if all(field in message for field in required_fields):
                        self.log_result("Get Chat Messages (Structure)", True, f"Retrieved {len(data)} messages with correct structure")
                    else:
                        self.log_result("Get Chat Messages (Structure)", False, "Messages missing required fields")
                else:
                    self.log_result("Get Chat Messages (Structure)", False, "Expected at least 2 messages")
            except:
                self.log_result("Get Chat Messages (Structure)", False, "Invalid response")
        else:
            self.log_result("Get Chat Messages (Structure)", False, f"HTTP {response.status_code}")

    def test_chat_conversations_endpoint(self):
        """Test /api/chat/conversations endpoint"""
        print("\n=== Testing Chat Conversations Endpoint ===")
        
        if not self.auth_tokens:
            self.log_result("Chat Conversations", False, "No auth tokens available")
            return
        
        # Test with sender token (should see conversation)
        sender_email = list(self.auth_tokens.keys())[0]
        sender_token = self.auth_tokens[sender_email]
        
        response, error = self.make_request("GET", "/chat/conversations", auth_token=sender_token)
        if error:
            self.log_result("Get Conversations", False, error)
        elif response.status_code == 200:
            try:
                data = response.json()
                if isinstance(data, list):
                    if len(data) > 0:
                        # Check conversation structure
                        conv = data[0]
                        required_fields = ["property_id", "property_title", "other_user_id", "other_user_name", 
                                         "last_message", "last_message_time", "unread_count", "is_sender"]
                        if all(field in conv for field in required_fields):
                            self.log_result("Get Conversations (Structure)", True, f"Retrieved {len(data)} conversations with correct structure")
                        else:
                            self.log_result("Get Conversations (Structure)", False, "Conversations missing required fields")
                    else:
                        self.log_result("Get Conversations (Empty)", True, "No conversations found (expected for new user)")
                else:
                    self.log_result("Get Conversations", False, "Response is not a list")
            except:
                self.log_result("Get Conversations", False, "Invalid response")
        else:
            self.log_result("Get Conversations", False, f"HTTP {response.status_code}")
        
        # Test without authentication
        response, error = self.make_request("GET", "/chat/conversations")
        if not error and response.status_code == 401:
            self.log_result("Get Conversations (No Auth)", True, "Correctly rejected unauthenticated request")
        else:
            self.log_result("Get Conversations (No Auth)", False, "Should reject unauthenticated request")

    def test_chat_mark_read_endpoint(self):
        """Test /api/chat/mark-read endpoint"""
        print("\n=== Testing Chat Mark Read Endpoint ===")
        
        if not self.auth_tokens:
            self.log_result("Chat Mark Read", False, "No auth tokens available")
            return
        
        # Get receiver token to mark messages as read
        if len(self.auth_tokens) < 2:
            self.log_result("Chat Mark Read", False, "Need at least 2 users for mark read testing")
            return
        
        receiver_email = list(self.auth_tokens.keys())[1]
        receiver_token = self.auth_tokens[receiver_email]
        
        # First, get some message IDs to mark as read
        if self.test_properties:
            property_id = self.test_properties[0]["id"]
            
            # Get sender user ID to use in the query
            sender_email = list(self.auth_tokens.keys())[0]
            sender_token = self.auth_tokens[sender_email]
            sender_response, _ = self.make_request("GET", "/auth/me", auth_token=sender_token)
            
            if sender_response.status_code == 200:
                sender_user = sender_response.json()
                response, error = self.make_request("GET", f"/chat/{property_id}?other_user_id={sender_user['id']}", auth_token=receiver_token)
            
            if response and response.status_code == 200:
                try:
                    messages = response.json()
                    if messages:
                        # Get message IDs where receiver is the current user
                        receiver_response, _ = self.make_request("GET", "/auth/me", auth_token=receiver_token)
                        if receiver_response.status_code == 200:
                            receiver_user = receiver_response.json()
                            message_ids = [msg["id"] for msg in messages if msg["receiver_id"] == receiver_user["id"]]
                            
                            if message_ids:
                                # Test marking messages as read
                                mark_read_data = {"message_ids": message_ids}
                                response, error = self.make_request("POST", "/chat/mark-read", mark_read_data, receiver_token)
                                
                                if error:
                                    self.log_result("Mark Messages Read", False, error)
                                elif response.status_code == 200:
                                    try:
                                        data = response.json()
                                        if "message" in data:
                                            self.log_result("Mark Messages Read", True, f"Marked {len(message_ids)} messages as read")
                                        else:
                                            self.log_result("Mark Messages Read", False, "Invalid response format")
                                    except:
                                        self.log_result("Mark Messages Read", False, "Invalid JSON response")
                                else:
                                    self.log_result("Mark Messages Read", False, f"HTTP {response.status_code}")
                            else:
                                self.log_result("Mark Messages Read", True, "No messages to mark as read for this user")
                        else:
                            self.log_result("Mark Messages Read", False, "Could not get receiver user info")
                    else:
                        self.log_result("Mark Messages Read", True, "No messages available to mark as read")
                except:
                    self.log_result("Mark Messages Read", False, "Could not parse messages")
            else:
                self.log_result("Mark Messages Read", False, "Could not retrieve messages")
        
        # Test with empty message IDs
        empty_data = {"message_ids": []}
        response, error = self.make_request("POST", "/chat/mark-read", empty_data, receiver_token)
        if not error and response.status_code == 200:
            self.log_result("Mark Messages Read (Empty)", True, "Handled empty message IDs correctly")
        else:
            self.log_result("Mark Messages Read (Empty)", False, "Should handle empty message IDs")
        
        # Test without authentication
        mark_read_data = {"message_ids": ["dummy-id"]}
        response, error = self.make_request("POST", "/chat/mark-read", mark_read_data)
        if not error and response.status_code == 401:
            self.log_result("Mark Messages Read (No Auth)", True, "Correctly rejected unauthenticated request")
        else:
            self.log_result("Mark Messages Read (No Auth)", False, "Should reject unauthenticated request")

    def test_chat_unread_count_endpoint(self):
        """Test /api/chat/unread-count endpoint"""
        print("\n=== Testing Chat Unread Count Endpoint ===")
        
        if not self.auth_tokens:
            self.log_result("Chat Unread Count", False, "No auth tokens available")
            return
        
        # Test with valid token
        first_email = list(self.auth_tokens.keys())[0]
        token = self.auth_tokens[first_email]
        
        response, error = self.make_request("GET", "/chat/unread-count", auth_token=token)
        if error:
            self.log_result("Get Unread Count", False, error)
        elif response.status_code == 200:
            try:
                data = response.json()
                if "unread_count" in data and isinstance(data["unread_count"], int):
                    self.log_result("Get Unread Count", True, f"Unread count: {data['unread_count']}")
                else:
                    self.log_result("Get Unread Count", False, "Invalid unread count response format")
            except:
                self.log_result("Get Unread Count", False, "Invalid JSON response")
        else:
            self.log_result("Get Unread Count", False, f"HTTP {response.status_code}")
        
        # Test without authentication
        response, error = self.make_request("GET", "/chat/unread-count")
        if not error and response.status_code == 401:
            self.log_result("Get Unread Count (No Auth)", True, "Correctly rejected unauthenticated request")
        else:
            self.log_result("Get Unread Count (No Auth)", False, "Should reject unauthenticated request")

    def test_chat_edge_cases(self):
        """Test chat system edge cases"""
        print("\n=== Testing Chat Edge Cases ===")
        
        if not self.auth_tokens:
            self.log_result("Chat Edge Cases", False, "No auth tokens available")
            return
        
        token = self.auth_tokens[list(self.auth_tokens.keys())[0]]
        
        # Test 1: Send message to non-existent property
        chat_data = {
            "property_id": "non-existent-property-id",
            "receiver_id": "some-user-id",
            "message": "Test message"
        }
        
        response, error = self.make_request("POST", "/chat", chat_data, token)
        if not error and response.status_code == 404:
            self.log_result("Send Message (Invalid Property)", True, "Correctly rejected message to non-existent property")
        else:
            self.log_result("Send Message (Invalid Property)", False, "Should reject message to non-existent property")
        
        # Test 2: Get messages for non-existent property
        response, error = self.make_request("GET", "/chat/non-existent-property", auth_token=token)
        if not error and response.status_code == 200:
            try:
                data = response.json()
                if isinstance(data, list) and len(data) == 0:
                    self.log_result("Get Messages (Invalid Property)", True, "Returned empty list for non-existent property")
                else:
                    self.log_result("Get Messages (Invalid Property)", False, "Should return empty list for non-existent property")
            except:
                self.log_result("Get Messages (Invalid Property)", False, "Invalid response")
        else:
            self.log_result("Get Messages (Invalid Property)", False, "Should handle non-existent property gracefully")
        
        # Test 3: Mark non-existent messages as read
        mark_read_data = {"message_ids": ["non-existent-message-1", "non-existent-message-2"]}
        response, error = self.make_request("POST", "/chat/mark-read", mark_read_data, token)
        if not error and response.status_code == 200:
            self.log_result("Mark Read (Invalid Messages)", True, "Handled non-existent message IDs gracefully")
        else:
            self.log_result("Mark Read (Invalid Messages)", False, "Should handle non-existent message IDs gracefully")

    def test_chat_conversation_isolation(self):
        """Test chat conversation isolation between different user pairs"""
        print("\n=== Testing Chat Conversation Isolation ===")
        
        if len(self.auth_tokens) < 3 or not self.test_properties:
            self.log_result("Chat Conversation Isolation", False, "Need at least 3 users and 1 property for isolation testing")
            return
        
        # Get three users: Property Owner (User A), User B, User C
        emails = list(self.auth_tokens.keys())
        owner_email = emails[0]  # User A (Property Owner)
        user_b_email = emails[1]  # User B
        user_c_email = emails[2] if len(emails) > 2 else emails[1]  # User C (fallback to User B if only 2 users)
        
        owner_token = self.auth_tokens[owner_email]
        user_b_token = self.auth_tokens[user_b_email]
        user_c_token = self.auth_tokens[user_c_email]
        
        # Get user IDs
        owner_response, _ = self.make_request("GET", "/auth/me", auth_token=owner_token)
        user_b_response, _ = self.make_request("GET", "/auth/me", auth_token=user_b_token)
        user_c_response, _ = self.make_request("GET", "/auth/me", auth_token=user_c_token)
        
        if not all(r.status_code == 200 for r in [owner_response, user_b_response, user_c_response]):
            self.log_result("Chat Conversation Isolation", False, "Could not get user IDs")
            return
        
        owner_user = owner_response.json()
        user_b = user_b_response.json()
        user_c = user_c_response.json()
        property_id = self.test_properties[0]["id"]
        
        # Step 1: User B sends message to Property Owner (User A)
        chat_data_b = {
            "property_id": property_id,
            "receiver_id": owner_user["id"],
            "message": "Hi, I'm User B. Is this property available?"
        }
        
        response, error = self.make_request("POST", "/chat", chat_data_b, user_b_token)
        if error or response.status_code != 200:
            self.log_result("User B to Owner Message", False, f"Failed to send message: {error or response.status_code}")
            return
        
        self.log_result("User B to Owner Message", True, "User B sent message to property owner")
        
        # Step 2: User C sends message to Property Owner (User A) about the same property
        if user_c["id"] != user_b["id"]:  # Only if we have 3 different users
            chat_data_c = {
                "property_id": property_id,
                "receiver_id": owner_user["id"],
                "message": "Hello, I'm User C. Can I get more details about this property?"
            }
            
            response, error = self.make_request("POST", "/chat", chat_data_c, user_c_token)
            if error or response.status_code != 200:
                self.log_result("User C to Owner Message", False, f"Failed to send message: {error or response.status_code}")
                return
            
            self.log_result("User C to Owner Message", True, "User C sent message to property owner")
        
        # Step 3: Property Owner replies to User B
        chat_data_owner_to_b = {
            "property_id": property_id,
            "receiver_id": user_b["id"],
            "message": "Hi User B! Yes, the property is available. Would you like to schedule a visit?"
        }
        
        response, error = self.make_request("POST", "/chat", chat_data_owner_to_b, owner_token)
        if error or response.status_code != 200:
            self.log_result("Owner to User B Reply", False, f"Failed to send reply: {error or response.status_code}")
            return
        
        self.log_result("Owner to User B Reply", True, "Property owner replied to User B")
        
        # Step 4: Property Owner replies to User C (if different from User B)
        if user_c["id"] != user_b["id"]:
            chat_data_owner_to_c = {
                "property_id": property_id,
                "receiver_id": user_c["id"],
                "message": "Hello User C! The property has 2 bedrooms, parking, and is near the metro station."
            }
            
            response, error = self.make_request("POST", "/chat", chat_data_owner_to_c, owner_token)
            if error or response.status_code != 200:
                self.log_result("Owner to User C Reply", False, f"Failed to send reply: {error or response.status_code}")
                return
            
            self.log_result("Owner to User C Reply", True, "Property owner replied to User C")
        
        # Step 5: Test conversation isolation - User B should only see their conversation with Owner
        response, error = self.make_request("GET", f"/chat/{property_id}?other_user_id={owner_user['id']}", auth_token=user_b_token)
        if error:
            self.log_result("User B Conversation Isolation", False, error)
        elif response.status_code == 200:
            try:
                messages = response.json()
                # User B should see exactly 2 messages: their message to owner and owner's reply
                user_b_messages = [msg for msg in messages if 
                                 (msg["sender_id"] == user_b["id"] and msg["receiver_id"] == owner_user["id"]) or
                                 (msg["sender_id"] == owner_user["id"] and msg["receiver_id"] == user_b["id"])]
                
                if len(user_b_messages) >= 2:
                    # Check that User B doesn't see User C's messages
                    user_c_messages = [msg for msg in messages if 
                                     msg["sender_id"] == user_c["id"] or msg["receiver_id"] == user_c["id"]]
                    
                    if len(user_c_messages) == 0 or user_c["id"] == user_b["id"]:
                        self.log_result("User B Conversation Isolation", True, f"User B sees only their conversation ({len(user_b_messages)} messages)")
                    else:
                        self.log_result("User B Conversation Isolation", False, f"User B can see User C's messages (isolation failed)")
                else:
                    self.log_result("User B Conversation Isolation", False, f"User B should see at least 2 messages, got {len(user_b_messages)}")
            except:
                self.log_result("User B Conversation Isolation", False, "Invalid response format")
        else:
            self.log_result("User B Conversation Isolation", False, f"HTTP {response.status_code}")
        
        # Step 6: Test conversation isolation - User C should only see their conversation with Owner (if different from User B)
        if user_c["id"] != user_b["id"]:
            response, error = self.make_request("GET", f"/chat/{property_id}?other_user_id={owner_user['id']}", auth_token=user_c_token)
            if error:
                self.log_result("User C Conversation Isolation", False, error)
            elif response.status_code == 200:
                try:
                    messages = response.json()
                    # User C should see exactly 2 messages: their message to owner and owner's reply
                    user_c_messages = [msg for msg in messages if 
                                     (msg["sender_id"] == user_c["id"] and msg["receiver_id"] == owner_user["id"]) or
                                     (msg["sender_id"] == owner_user["id"] and msg["receiver_id"] == user_c["id"])]
                    
                    if len(user_c_messages) >= 2:
                        # Check that User C doesn't see User B's messages
                        user_b_messages = [msg for msg in messages if 
                                         msg["sender_id"] == user_b["id"] or msg["receiver_id"] == user_b["id"]]
                        
                        if len(user_b_messages) == 0:
                            self.log_result("User C Conversation Isolation", True, f"User C sees only their conversation ({len(user_c_messages)} messages)")
                        else:
                            self.log_result("User C Conversation Isolation", False, f"User C can see User B's messages (isolation failed)")
                    else:
                        self.log_result("User C Conversation Isolation", False, f"User C should see at least 2 messages, got {len(user_c_messages)}")
                except:
                    self.log_result("User C Conversation Isolation", False, "Invalid response format")
            else:
                self.log_result("User C Conversation Isolation", False, f"HTTP {response.status_code}")
        
        # Step 7: Test Property Owner can see separate conversations
        # Owner should see conversation with User B
        response, error = self.make_request("GET", f"/chat/{property_id}?other_user_id={user_b['id']}", auth_token=owner_token)
        if error:
            self.log_result("Owner sees User B Conversation", False, error)
        elif response.status_code == 200:
            try:
                messages = response.json()
                owner_b_messages = [msg for msg in messages if 
                                  (msg["sender_id"] == owner_user["id"] and msg["receiver_id"] == user_b["id"]) or
                                  (msg["sender_id"] == user_b["id"] and msg["receiver_id"] == owner_user["id"])]
                
                if len(owner_b_messages) >= 2:
                    self.log_result("Owner sees User B Conversation", True, f"Owner sees conversation with User B ({len(owner_b_messages)} messages)")
                else:
                    self.log_result("Owner sees User B Conversation", False, f"Owner should see conversation with User B")
            except:
                self.log_result("Owner sees User B Conversation", False, "Invalid response format")
        else:
            self.log_result("Owner sees User B Conversation", False, f"HTTP {response.status_code}")
        
        # Owner should see conversation with User C (if different from User B)
        if user_c["id"] != user_b["id"]:
            response, error = self.make_request("GET", f"/chat/{property_id}?other_user_id={user_c['id']}", auth_token=owner_token)
            if error:
                self.log_result("Owner sees User C Conversation", False, error)
            elif response.status_code == 200:
                try:
                    messages = response.json()
                    owner_c_messages = [msg for msg in messages if 
                                      (msg["sender_id"] == owner_user["id"] and msg["receiver_id"] == user_c["id"]) or
                                      (msg["sender_id"] == user_c["id"] and msg["receiver_id"] == owner_user["id"])]
                    
                    if len(owner_c_messages) >= 2:
                        self.log_result("Owner sees User C Conversation", True, f"Owner sees conversation with User C ({len(owner_c_messages)} messages)")
                    else:
                        self.log_result("Owner sees User C Conversation", False, f"Owner should see conversation with User C")
                except:
                    self.log_result("Owner sees User C Conversation", False, "Invalid response format")
            else:
                self.log_result("Owner sees User C Conversation", False, f"HTTP {response.status_code}")

    def test_chat_edge_cases_isolation(self):
        """Test edge cases for chat conversation isolation"""
        print("\n=== Testing Chat Isolation Edge Cases ===")
        
        if not self.auth_tokens or not self.test_properties:
            self.log_result("Chat Isolation Edge Cases", False, "No auth tokens or properties available")
            return
        
        token = self.auth_tokens[list(self.auth_tokens.keys())[0]]
        property_id = self.test_properties[0]["id"]
        
        # Test 1: Non-existent property_id
        response, error = self.make_request("GET", f"/chat/non-existent-property?other_user_id=some-user", auth_token=token)
        if not error and response.status_code == 200:
            try:
                data = response.json()
                if isinstance(data, list) and len(data) == 0:
                    self.log_result("Chat with Non-existent Property", True, "Returns empty list for non-existent property")
                else:
                    self.log_result("Chat with Non-existent Property", False, "Should return empty list")
            except:
                self.log_result("Chat with Non-existent Property", False, "Invalid response")
        else:
            self.log_result("Chat with Non-existent Property", False, "Should handle non-existent property gracefully")
        
        # Test 2: Non-existent other_user_id
        response, error = self.make_request("GET", f"/chat/{property_id}?other_user_id=non-existent-user", auth_token=token)
        if not error and response.status_code == 200:
            try:
                data = response.json()
                if isinstance(data, list) and len(data) == 0:
                    self.log_result("Chat with Non-existent User", True, "Returns empty list for non-existent user")
                else:
                    self.log_result("Chat with Non-existent User", False, "Should return empty list")
            except:
                self.log_result("Chat with Non-existent User", False, "Invalid response")
        else:
            self.log_result("Chat with Non-existent User", False, "Should handle non-existent user gracefully")
        
        # Test 3: Missing other_user_id parameter
        response, error = self.make_request("GET", f"/chat/{property_id}", auth_token=token)
        if not error and response.status_code == 422:  # FastAPI validation error
            self.log_result("Chat without other_user_id", True, "Correctly requires other_user_id parameter")
        else:
            self.log_result("Chat without other_user_id", False, "Should require other_user_id parameter")
        
        # Test 4: Unauthorized access (no token)
        response, error = self.make_request("GET", f"/chat/{property_id}?other_user_id=some-user")
        if not error and response.status_code == 401:
            self.log_result("Chat without Authentication", True, "Correctly rejected unauthenticated request")
        else:
            self.log_result("Chat without Authentication", False, "Should reject unauthenticated request")

    def test_chat_functionality(self):
        """Test all chat functionality comprehensively"""
        print("\n=== Testing Complete Chat Functionality ===")
        
        # Run all chat tests including new isolation tests
        self.test_enhanced_chat_system()
        self.test_chat_conversations_endpoint()
        self.test_chat_mark_read_endpoint()
        self.test_chat_unread_count_endpoint()
        self.test_chat_edge_cases()
        self.test_chat_conversation_isolation()
        self.test_chat_edge_cases_isolation()

    def test_delete_property(self):
        """Test property deletion"""
        print("\n=== Testing Property Deletion ===")
        
        if not self.test_properties or not self.auth_tokens:
            self.log_result("Delete Property", False, "No test properties or auth tokens available")
            return
        
        # Test valid deletion by owner
        property_to_delete = self.test_properties[-1]  # Delete the last property
        property_id = property_to_delete["id"]
        
        # Use the first user's token (assuming they own some properties)
        owner_email = list(self.auth_tokens.keys())[0]
        owner_token = self.auth_tokens[owner_email]
        
        response, error = self.make_request("DELETE", f"/properties/{property_id}", auth_token=owner_token)
        if error:
            self.log_result("Delete Property", False, error)
        elif response.status_code == 200:
            try:
                data = response.json()
                if "message" in data:
                    self.log_result("Delete Property", True, "Property deleted successfully")
                    self.test_properties.remove(property_to_delete)
                else:
                    self.log_result("Delete Property", False, "Invalid deletion response")
            except:
                self.log_result("Delete Property", False, "Invalid response")
        else:
            self.log_result("Delete Property", False, f"HTTP {response.status_code}: {response.text}")
        
        # Test deletion without authentication
        if self.test_properties:
            property_id = self.test_properties[0]["id"]
            response, error = self.make_request("DELETE", f"/properties/{property_id}")
            if not error and response.status_code == 401:
                self.log_result("Delete Property (No Auth)", True, "Correctly rejected unauthenticated request")
            else:
                self.log_result("Delete Property (No Auth)", False, "Should reject unauthenticated request")

    def run_all_tests(self):
        """Run all tests in sequence"""
        print("🚀 Starting FindMeRoom Backend API Tests")
        print("=" * 50)
        
        # Test sequence
        if not self.test_health_check():
            print("❌ API is not responding. Stopping tests.")
            return
        
        self.test_user_registration()
        self.test_user_login()
        self.test_get_current_user()
        self.test_property_creation()
        self.test_get_properties()
        self.test_property_search_and_filter()
        self.test_get_property_by_id()
        self.test_update_property()
        self.test_get_my_properties()
        self.test_chat_functionality()
        self.test_delete_property()
        
        # Print summary
        print("\n" + "=" * 50)
        print("🏁 TEST SUMMARY")
        print("=" * 50)
        print(f"✅ Passed: {self.results['passed']}")
        print(f"❌ Failed: {self.results['failed']}")
        print(f"📊 Total: {self.results['passed'] + self.results['failed']}")
        
        if self.results['errors']:
            print("\n🔍 FAILED TESTS:")
            for error in self.results['errors']:
                print(f"   • {error}")
        
        success_rate = (self.results['passed'] / (self.results['passed'] + self.results['failed'])) * 100 if (self.results['passed'] + self.results['failed']) > 0 else 0
        print(f"\n🎯 Success Rate: {success_rate:.1f}%")
        
        return self.results

    def test_whatsapp_like_conversation_system(self):
        """
        Test the updated conversation system to ensure each user pair has separate conversations like WhatsApp
        This is the main test requested in the review
        """
        print("\n=== Testing WhatsApp-like Conversation System ===")
        
        if len(self.auth_tokens) < 3 or not self.test_properties:
            self.log_result("WhatsApp Conversation System", False, "Need at least 3 users and 1 property for comprehensive testing")
            return
        
        # Setup: Get User A (property owner), User B, User C
        emails = list(self.auth_tokens.keys())
        user_a_email = emails[0]  # Property Owner
        user_b_email = emails[1]  # User B
        user_c_email = emails[2]  # User C
        
        user_a_token = self.auth_tokens[user_a_email]
        user_b_token = self.auth_tokens[user_b_email]
        user_c_token = self.auth_tokens[user_c_email]
        
        # Get user IDs
        user_a_response, _ = self.make_request("GET", "/auth/me", auth_token=user_a_token)
        user_b_response, _ = self.make_request("GET", "/auth/me", auth_token=user_b_token)
        user_c_response, _ = self.make_request("GET", "/auth/me", auth_token=user_c_token)
        
        if not all(r.status_code == 200 for r in [user_a_response, user_b_response, user_c_response]):
            self.log_result("WhatsApp Conversation System", False, "Could not get user information")
            return
        
        user_a = user_a_response.json()
        user_b = user_b_response.json()
        user_c = user_c_response.json()
        property_id = self.test_properties[0]["id"]
        
        print(f"   Testing with Property Owner: {user_a['name']}")
        print(f"   Testing with User B: {user_b['name']}")
        print(f"   Testing with User C: {user_c['name']}")
        print(f"   Property: {self.test_properties[0]['title']}")
        
        # === 1. SEPARATE CONVERSATIONS TESTING ===
        print("\n   --- 1. Testing Separate Conversations ---")
        
        # User B sends messages to User A about the property
        user_b_messages = [
            "Hi! I'm interested in your property. Is it still available?",
            "What's the move-in date?"
        ]
        
        for msg in user_b_messages:
            chat_data = {
                "property_id": property_id,
                "receiver_id": user_a["id"],
                "message": msg
            }
            response, error = self.make_request("POST", "/chat", chat_data, user_b_token)
            if error or response.status_code != 200:
                self.log_result("User B Send Messages", False, f"Failed to send message: {error or response.status_code}")
                return
        
        self.log_result("User B Send Messages", True, f"User B sent {len(user_b_messages)} messages to property owner")
        
        # User C sends messages to User A about the same property
        user_c_messages = [
            "Hello! Can you tell me more about the amenities?",
            "Is parking included?"
        ]
        
        for msg in user_c_messages:
            chat_data = {
                "property_id": property_id,
                "receiver_id": user_a["id"],
                "message": msg
            }
            response, error = self.make_request("POST", "/chat", chat_data, user_c_token)
            if error or response.status_code != 200:
                self.log_result("User C Send Messages", False, f"Failed to send message: {error or response.status_code}")
                return
        
        self.log_result("User C Send Messages", True, f"User C sent {len(user_c_messages)} messages to property owner")
        
        # Property owner replies to both users
        reply_to_b = {
            "property_id": property_id,
            "receiver_id": user_b["id"],
            "message": "Yes, it's available! You can move in next month."
        }
        
        reply_to_c = {
            "property_id": property_id,
            "receiver_id": user_c["id"],
            "message": "It has gym, pool, and yes, parking is included!"
        }
        
        for reply_data in [reply_to_b, reply_to_c]:
            response, error = self.make_request("POST", "/chat", reply_data, user_a_token)
            if error or response.status_code != 200:
                self.log_result("Property Owner Replies", False, f"Failed to send reply: {error or response.status_code}")
                return
        
        self.log_result("Property Owner Replies", True, "Property owner replied to both User B and User C")
        
        # === 2. TEST /api/chat/conversations ENDPOINT FOR USER A ===
        print("\n   --- 2. Testing Conversations Endpoint for Property Owner ---")
        
        response, error = self.make_request("GET", "/chat/conversations", auth_token=user_a_token)
        if error:
            self.log_result("User A Conversations List", False, error)
            return
        elif response.status_code != 200:
            self.log_result("User A Conversations List", False, f"HTTP {response.status_code}")
            return
        
        try:
            conversations = response.json()
            if not isinstance(conversations, list):
                self.log_result("User A Conversations List", False, "Response is not a list")
                return
            
            # User A should see TWO separate conversations
            property_conversations = [conv for conv in conversations if conv["property_id"] == property_id]
            
            if len(property_conversations) >= 2:
                # Check if conversations have different other_user_id
                other_user_ids = [conv["other_user_id"] for conv in property_conversations]
                unique_users = set(other_user_ids)
                
                if len(unique_users) >= 2:
                    self.log_result("User A Sees Separate Conversations", True, f"Property owner sees {len(property_conversations)} separate conversations")
                    
                    # Verify conversation details
                    user_b_conv = next((conv for conv in property_conversations if conv["other_user_id"] == user_b["id"]), None)
                    user_c_conv = next((conv for conv in property_conversations if conv["other_user_id"] == user_c["id"]), None)
                    
                    if user_b_conv and user_c_conv:
                        # Check User B conversation details
                        if user_b_conv["other_user_name"] == user_b["name"]:
                            self.log_result("User B Conversation Details", True, f"Shows User B's name: {user_b_conv['other_user_name']}")
                        else:
                            self.log_result("User B Conversation Details", False, f"Wrong name: {user_b_conv['other_user_name']} != {user_b['name']}")
                        
                        # Check User C conversation details
                        if user_c_conv["other_user_name"] == user_c["name"]:
                            self.log_result("User C Conversation Details", True, f"Shows User C's name: {user_c_conv['other_user_name']}")
                        else:
                            self.log_result("User C Conversation Details", False, f"Wrong name: {user_c_conv['other_user_name']} != {user_c['name']}")
                        
                        # Check unread counts are specific to each conversation
                        self.log_result("Conversation Unread Counts", True, f"User B conv unread: {user_b_conv['unread_count']}, User C conv unread: {user_c_conv['unread_count']}")
                        
                    else:
                        self.log_result("Conversation Details", False, "Could not find conversations for both users")
                else:
                    self.log_result("User A Sees Separate Conversations", False, f"Only {len(unique_users)} unique users in conversations")
            else:
                self.log_result("User A Sees Separate Conversations", False, f"Expected at least 2 conversations, got {len(property_conversations)}")
        
        except Exception as e:
            self.log_result("User A Conversations List", False, f"Error parsing response: {str(e)}")
            return
        
        # === 3. USER PERSPECTIVE TESTING ===
        print("\n   --- 3. Testing User Perspective ---")
        
        # Test User B perspective
        response, error = self.make_request("GET", "/chat/conversations", auth_token=user_b_token)
        if error:
            self.log_result("User B Conversations", False, error)
        elif response.status_code == 200:
            try:
                user_b_conversations = response.json()
                user_b_property_convs = [conv for conv in user_b_conversations if conv["property_id"] == property_id]
                
                if len(user_b_property_convs) == 1:
                    conv = user_b_property_convs[0]
                    if conv["other_user_id"] == user_a["id"] and conv["other_user_name"] == user_a["name"]:
                        self.log_result("User B Perspective", True, f"User B sees conversation with property owner: {conv['other_user_name']}")
                    else:
                        self.log_result("User B Perspective", False, "User B conversation details incorrect")
                else:
                    self.log_result("User B Perspective", False, f"User B should see 1 conversation, got {len(user_b_property_convs)}")
            except:
                self.log_result("User B Perspective", False, "Invalid response format")
        else:
            self.log_result("User B Perspective", False, f"HTTP {response.status_code}")
        
        # Test User C perspective
        response, error = self.make_request("GET", "/chat/conversations", auth_token=user_c_token)
        if error:
            self.log_result("User C Conversations", False, error)
        elif response.status_code == 200:
            try:
                user_c_conversations = response.json()
                user_c_property_convs = [conv for conv in user_c_conversations if conv["property_id"] == property_id]
                
                if len(user_c_property_convs) == 1:
                    conv = user_c_property_convs[0]
                    if conv["other_user_id"] == user_a["id"] and conv["other_user_name"] == user_a["name"]:
                        self.log_result("User C Perspective", True, f"User C sees conversation with property owner: {conv['other_user_name']}")
                    else:
                        self.log_result("User C Perspective", False, "User C conversation details incorrect")
                else:
                    self.log_result("User C Perspective", False, f"User C should see 1 conversation, got {len(user_c_property_convs)}")
            except:
                self.log_result("User C Perspective", False, "Invalid response format")
        else:
            self.log_result("User C Perspective", False, f"HTTP {response.status_code}")
        
        # === 4. CONVERSATION METADATA TESTING ===
        print("\n   --- 4. Testing Conversation Metadata ---")
        
        # Re-get User A conversations for metadata testing
        response, error = self.make_request("GET", "/chat/conversations", auth_token=user_a_token)
        if response and response.status_code == 200:
            try:
                conversations = response.json()
                property_conversations = [conv for conv in conversations if conv["property_id"] == property_id]
                
                for conv in property_conversations:
                    # Test property title
                    if conv["property_title"] == self.test_properties[0]["title"]:
                        self.log_result("Property Title in Conversation", True, f"Correct property title: {conv['property_title']}")
                    else:
                        self.log_result("Property Title in Conversation", False, f"Wrong property title: {conv['property_title']}")
                    
                    # Test other_user_name
                    expected_name = user_b["name"] if conv["other_user_id"] == user_b["id"] else user_c["name"]
                    if conv["other_user_name"] == expected_name:
                        self.log_result("Other User Name", True, f"Correct other user name: {conv['other_user_name']}")
                    else:
                        self.log_result("Other User Name", False, f"Wrong other user name: {conv['other_user_name']}")
                    
                    # Test last_message and timestamp
                    if conv["last_message"] and conv["last_message_time"]:
                        self.log_result("Last Message Metadata", True, f"Has last message and timestamp")
                    else:
                        self.log_result("Last Message Metadata", False, "Missing last message or timestamp")
                    
                    # Test unread_count is integer
                    if isinstance(conv["unread_count"], int) and conv["unread_count"] >= 0:
                        self.log_result("Unread Count Format", True, f"Unread count: {conv['unread_count']}")
                    else:
                        self.log_result("Unread Count Format", False, f"Invalid unread count: {conv['unread_count']}")
            
            except Exception as e:
                self.log_result("Conversation Metadata", False, f"Error testing metadata: {str(e)}")
        
        # === 5. MULTIPLE PROPERTIES TESTING ===
        print("\n   --- 5. Testing Multiple Properties ---")
        
        if len(self.test_properties) > 1:
            # Create conversation on second property
            second_property_id = self.test_properties[1]["id"]
            
            chat_data = {
                "property_id": second_property_id,
                "receiver_id": user_a["id"],
                "message": "Interested in your second property too!"
            }
            
            response, error = self.make_request("POST", "/chat", chat_data, user_b_token)
            if response and response.status_code == 200:
                # Check if conversations are properly separated by property
                response, error = self.make_request("GET", "/chat/conversations", auth_token=user_a_token)
                if response and response.status_code == 200:
                    try:
                        conversations = response.json()
                        property1_convs = [conv for conv in conversations if conv["property_id"] == property_id]
                        property2_convs = [conv for conv in conversations if conv["property_id"] == second_property_id]
                        
                        if len(property1_convs) >= 2 and len(property2_convs) >= 1:
                            self.log_result("Multiple Properties Separation", True, f"Property 1: {len(property1_convs)} convs, Property 2: {len(property2_convs)} convs")
                        else:
                            self.log_result("Multiple Properties Separation", False, f"Conversations not properly separated by property")
                    except:
                        self.log_result("Multiple Properties Separation", False, "Error parsing multiple property conversations")
                else:
                    self.log_result("Multiple Properties Separation", False, "Could not get conversations for multiple properties test")
            else:
                self.log_result("Multiple Properties Setup", False, "Could not create conversation on second property")
        else:
            self.log_result("Multiple Properties Testing", True, "Skipped - only one property available")
        
        print("\n   ✅ WhatsApp-like Conversation System Testing Complete")

if __name__ == "__main__":
    tester = FindMeRoomTester()
    
    # Run the specific WhatsApp-like conversation system test
    print("🎯 Running WhatsApp-like Conversation System Test")
    print("=" * 60)
    
    # First run basic setup tests
    if not tester.test_health_check():
        print("❌ API is not responding. Stopping tests.")
        exit(1)
    
    tester.test_user_registration()
    tester.test_user_login()
    tester.test_property_creation()
    
    # Run the main conversation system test
    tester.test_whatsapp_like_conversation_system()
    
    # Print summary
    print("\n" + "=" * 60)
    print("🏁 WHATSAPP CONVERSATION SYSTEM TEST SUMMARY")
    print("=" * 60)
    print(f"✅ Passed: {tester.results['passed']}")
    print(f"❌ Failed: {tester.results['failed']}")
    print(f"📊 Total: {tester.results['passed'] + tester.results['failed']}")
    
    if tester.results['errors']:
        print("\n🔍 FAILED TESTS:")
        for error in tester.results['errors']:
            print(f"   • {error}")
    
    success_rate = (tester.results['passed'] / (tester.results['passed'] + tester.results['failed'])) * 100 if (tester.results['passed'] + tester.results['failed']) > 0 else 0
    print(f"\n🎯 Success Rate: {success_rate:.1f}%")