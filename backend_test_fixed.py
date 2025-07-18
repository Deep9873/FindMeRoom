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

    def create_test_property(self):
        """Create a test property for chat testing"""
        if not self.auth_tokens:
            return False
        
        property_data = {
            "title": "Test Property for Chat Isolation",
            "description": "A test property to verify chat conversation isolation",
            "property_type": "house",
            "rent": 15000,
            "deposit": 30000,
            "location": "Test Location",
            "city": "Test City",
            "images": [],
            "amenities": ["WiFi", "Parking"]
        }
        
        # Use first user as property owner
        owner_email = list(self.auth_tokens.keys())[0]
        owner_token = self.auth_tokens[owner_email]
        
        response, error = self.make_request("POST", "/properties", property_data, owner_token)
        if error or response.status_code != 200:
            return False
        
        try:
            data = response.json()
            if "id" in data:
                self.test_properties.append(data)
                return True
        except:
            pass
        
        return False

    def run_isolation_tests(self):
        """Run focused chat isolation tests"""
        print("🚀 Starting Chat Conversation Isolation Tests")
        print("=" * 50)
        
        # Test sequence
        if not self.test_health_check():
            print("❌ API is not responding. Stopping tests.")
            return
        
        self.test_user_registration()
        
        if not self.create_test_property():
            print("❌ Failed to create test property. Stopping tests.")
            return
        
        self.test_chat_conversation_isolation()
        self.test_chat_edge_cases_isolation()
        
        # Print summary
        print("\n" + "=" * 50)
        print("🏁 CHAT ISOLATION TEST SUMMARY")
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

if __name__ == "__main__":
    tester = FindMeRoomTester()
    results = tester.run_isolation_tests()