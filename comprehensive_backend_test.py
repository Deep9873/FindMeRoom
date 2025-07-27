#!/usr/bin/env python3
"""
Comprehensive Backend Test for GetRentals Application
Tests all core functionality mentioned in test_result.md
"""

import requests
import json
import time
from typing import Dict, Any

# Configuration - Use local backend
BASE_URL = "http://localhost:8001/api"
HEADERS = {"Content-Type": "application/json"}

class ComprehensiveTester:
    def __init__(self):
        self.base_url = BASE_URL
        self.headers = HEADERS.copy()
        self.test_user_token = None
        self.test_user_id = None
        self.test_property_id = None
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

    def make_request(self, method: str, endpoint: str, data: Dict = None, auth_token: str = None, timeout: int = 10) -> tuple:
        """Make HTTP request with proper error handling"""
        url = f"{self.base_url}{endpoint}"
        headers = self.headers.copy()
        
        if auth_token:
            headers["Authorization"] = f"Bearer {auth_token}"
        
        try:
            if method.upper() == "GET":
                response = requests.get(url, headers=headers, params=data, timeout=timeout)
            elif method.upper() == "POST":
                response = requests.post(url, headers=headers, json=data, timeout=timeout)
            elif method.upper() == "PUT":
                response = requests.put(url, headers=headers, json=data, timeout=timeout)
            elif method.upper() == "DELETE":
                response = requests.delete(url, headers=headers, timeout=timeout)
            else:
                return None, f"Unsupported method: {method}"
            
            return response, None
        except requests.exceptions.Timeout:
            return None, f"Request timeout after {timeout} seconds"
        except requests.exceptions.RequestException as e:
            return None, f"Request failed: {str(e)}"

    def test_user_authentication_system(self):
        """Test User Authentication System (High Priority)"""
        print("\n=== Testing User Authentication System ===")
        
        # Test user registration
        timestamp = str(int(time.time()))
        test_user = {
            "email": f"testuser.{timestamp}@getrentals.com",
            "name": "Test User",
            "phone": f"9876543{timestamp[-3:]}",
            "password": "securepass123"
        }
        
        response, error = self.make_request("POST", "/auth/register", test_user)
        if error:
            self.log_result("User Registration", False, error)
            return False
        
        if response.status_code == 200:
            try:
                data = response.json()
                if "access_token" in data and "user" in data:
                    self.test_user_token = data["access_token"]
                    self.test_user_id = data["user"]["id"]
                    self.log_result("User Registration", True, f"User registered: {data['user']['email']}")
                else:
                    self.log_result("User Registration", False, "Missing token or user data")
                    return False
            except:
                self.log_result("User Registration", False, "Invalid JSON response")
                return False
        else:
            self.log_result("User Registration", False, f"Registration failed: {response.status_code}")
            return False
        
        # Test user login
        login_data = {
            "email": test_user["email"],
            "password": test_user["password"]
        }
        
        response, error = self.make_request("POST", "/auth/login", login_data)
        if error:
            self.log_result("User Login", False, error)
            return False
        
        if response.status_code == 200:
            try:
                data = response.json()
                if "access_token" in data:
                    self.log_result("User Login", True, "Login successful")
                else:
                    self.log_result("User Login", False, "Missing access token")
                    return False
            except:
                self.log_result("User Login", False, "Invalid JSON response")
                return False
        else:
            self.log_result("User Login", False, f"Login failed: {response.status_code}")
            return False
        
        # Test token validation
        response, error = self.make_request("GET", "/auth/me", auth_token=self.test_user_token)
        if error:
            self.log_result("Token Validation", False, error)
            return False
        
        if response.status_code == 200:
            try:
                data = response.json()
                if "id" in data and "email" in data:
                    self.log_result("Token Validation", True, f"Token valid for user: {data['email']}")
                    return True
                else:
                    self.log_result("Token Validation", False, "Missing user data")
                    return False
            except:
                self.log_result("Token Validation", False, "Invalid JSON response")
                return False
        else:
            self.log_result("Token Validation", False, f"Token validation failed: {response.status_code}")
            return False

    def test_property_crud_operations(self):
        """Test Property CRUD Operations (High Priority)"""
        print("\n=== Testing Property CRUD Operations ===")
        
        if not self.test_user_token:
            self.log_result("Property CRUD", False, "No authentication token available")
            return False
        
        # Test property creation
        property_data = {
            "title": "Test Property for CRUD Operations",
            "description": "A beautiful test property with all amenities for comprehensive testing.",
            "property_type": "house",
            "rent": 20000,
            "deposit": 40000,
            "location": "Test Location, Sector 1",
            "city": "Test City",
            "images": ["data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="],
            "amenities": ["WiFi", "Parking", "Security", "Gym"]
        }
        
        response, error = self.make_request("POST", "/properties", property_data, self.test_user_token)
        if error:
            self.log_result("Property Creation", False, error)
            return False
        
        if response.status_code == 200:
            try:
                data = response.json()
                if "id" in data and "title" in data:
                    self.test_property_id = data["id"]
                    self.log_result("Property Creation", True, f"Property created: {data['title']}")
                else:
                    self.log_result("Property Creation", False, "Missing property data")
                    return False
            except:
                self.log_result("Property Creation", False, "Invalid JSON response")
                return False
        else:
            self.log_result("Property Creation", False, f"Property creation failed: {response.status_code}")
            return False
        
        # Test property retrieval by ID
        response, error = self.make_request("GET", f"/properties/{self.test_property_id}")
        if error:
            self.log_result("Property Retrieval by ID", False, error)
            return False
        
        if response.status_code == 200:
            try:
                data = response.json()
                if data["id"] == self.test_property_id:
                    self.log_result("Property Retrieval by ID", True, f"Property retrieved: {data['title']}")
                else:
                    self.log_result("Property Retrieval by ID", False, "Property ID mismatch")
                    return False
            except:
                self.log_result("Property Retrieval by ID", False, "Invalid JSON response")
                return False
        else:
            self.log_result("Property Retrieval by ID", False, f"Property retrieval failed: {response.status_code}")
            return False
        
        # Test property update
        update_data = {
            "title": "Updated Test Property",
            "rent": 25000
        }
        
        response, error = self.make_request("PUT", f"/properties/{self.test_property_id}", update_data, self.test_user_token)
        if error:
            self.log_result("Property Update", False, error)
            return False
        
        if response.status_code == 200:
            try:
                data = response.json()
                if data["title"] == "Updated Test Property" and data["rent"] == 25000:
                    self.log_result("Property Update", True, "Property updated successfully")
                else:
                    self.log_result("Property Update", False, "Property not updated properly")
                    return False
            except:
                self.log_result("Property Update", False, "Invalid JSON response")
                return False
        else:
            self.log_result("Property Update", False, f"Property update failed: {response.status_code}")
            return False
        
        return True

    def test_search_and_filter_system(self):
        """Test Search and Filter System (High Priority)"""
        print("\n=== Testing Search and Filter System ===")
        
        # Test get all properties
        response, error = self.make_request("GET", "/properties")
        if error:
            self.log_result("Get All Properties", False, error)
            return False
        
        if response.status_code == 200:
            try:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("Get All Properties", True, f"Retrieved {len(data)} properties")
                else:
                    self.log_result("Get All Properties", False, "Response is not a list")
                    return False
            except:
                self.log_result("Get All Properties", False, "Invalid JSON response")
                return False
        else:
            self.log_result("Get All Properties", False, f"Get properties failed: {response.status_code}")
            return False
        
        # Test city filter
        response, error = self.make_request("GET", "/properties", {"city": "Test City"})
        if error:
            self.log_result("City Filter", False, error)
            return False
        
        if response.status_code == 200:
            try:
                data = response.json()
                self.log_result("City Filter", True, f"Found {len(data)} properties in Test City")
            except:
                self.log_result("City Filter", False, "Invalid JSON response")
                return False
        else:
            self.log_result("City Filter", False, f"City filter failed: {response.status_code}")
            return False
        
        # Test property type filter
        response, error = self.make_request("GET", "/properties", {"property_type": "house"})
        if error:
            self.log_result("Property Type Filter", False, error)
            return False
        
        if response.status_code == 200:
            try:
                data = response.json()
                self.log_result("Property Type Filter", True, f"Found {len(data)} house properties")
            except:
                self.log_result("Property Type Filter", False, "Invalid JSON response")
                return False
        else:
            self.log_result("Property Type Filter", False, f"Property type filter failed: {response.status_code}")
            return False
        
        # Test rent range filter
        response, error = self.make_request("GET", "/properties", {"min_rent": 15000, "max_rent": 30000})
        if error:
            self.log_result("Rent Range Filter", False, error)
            return False
        
        if response.status_code == 200:
            try:
                data = response.json()
                self.log_result("Rent Range Filter", True, f"Found {len(data)} properties in rent range")
            except:
                self.log_result("Rent Range Filter", False, "Invalid JSON response")
                return False
        else:
            self.log_result("Rent Range Filter", False, f"Rent range filter failed: {response.status_code}")
            return False
        
        return True

    def test_enhanced_chat_system(self):
        """Test Enhanced Chat System (High Priority)"""
        print("\n=== Testing Enhanced Chat System ===")
        
        if not self.test_user_token or not self.test_property_id:
            self.log_result("Enhanced Chat System", False, "Missing authentication or property data")
            return False
        
        # Create a second user for chat testing
        timestamp = str(int(time.time()))
        second_user = {
            "email": f"chatuser.{timestamp}@getrentals.com",
            "name": "Chat Test User",
            "phone": f"9876544{timestamp[-3:]}",
            "password": "chatpass123"
        }
        
        response, error = self.make_request("POST", "/auth/register", second_user)
        if error or response.status_code != 200:
            self.log_result("Chat System - Second User Creation", False, "Could not create second user for chat testing")
            return False
        
        second_user_data = response.json()
        second_user_token = second_user_data["access_token"]
        second_user_id = second_user_data["user"]["id"]
        
        # Test sending a chat message
        chat_data = {
            "property_id": self.test_property_id,
            "receiver_id": second_user_id,
            "message": "Hello, I'm interested in your property. Is it still available?"
        }
        
        response, error = self.make_request("POST", "/chat", chat_data, self.test_user_token)
        if error:
            self.log_result("Send Chat Message", False, error)
            return False
        
        if response.status_code == 200:
            try:
                data = response.json()
                if "id" in data and "message" in data and "is_read" in data:
                    message_id = data["id"]
                    if data["is_read"] == False:
                        self.log_result("Send Chat Message", True, "Message sent with correct is_read=False")
                    else:
                        self.log_result("Send Chat Message", False, "New message should have is_read=False")
                        return False
                else:
                    self.log_result("Send Chat Message", False, "Missing required fields in response")
                    return False
            except:
                self.log_result("Send Chat Message", False, "Invalid JSON response")
                return False
        else:
            self.log_result("Send Chat Message", False, f"Send message failed: {response.status_code}")
            return False
        
        # Test getting chat messages
        response, error = self.make_request("GET", f"/chat/{self.test_property_id}", {"other_user_id": second_user_id}, self.test_user_token)
        if error:
            self.log_result("Get Chat Messages", False, error)
            return False
        
        if response.status_code == 200:
            try:
                data = response.json()
                if isinstance(data, list) and len(data) > 0:
                    message = data[0]
                    required_fields = ["id", "message", "is_read", "created_at", "sender_id", "receiver_id"]
                    if all(field in message for field in required_fields):
                        self.log_result("Get Chat Messages", True, f"Retrieved {len(data)} messages with correct structure")
                    else:
                        self.log_result("Get Chat Messages", False, "Messages missing required fields")
                        return False
                else:
                    self.log_result("Get Chat Messages", False, "Expected at least 1 message")
                    return False
            except:
                self.log_result("Get Chat Messages", False, "Invalid JSON response")
                return False
        else:
            self.log_result("Get Chat Messages", False, f"Get messages failed: {response.status_code}")
            return False
        
        # Test conversations endpoint
        response, error = self.make_request("GET", "/chat/conversations", auth_token=self.test_user_token)
        if error:
            self.log_result("Get Conversations", False, error)
            return False
        
        if response.status_code == 200:
            try:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("Get Conversations", True, f"Retrieved {len(data)} conversations")
                else:
                    self.log_result("Get Conversations", False, "Response is not a list")
                    return False
            except:
                self.log_result("Get Conversations", False, "Invalid JSON response")
                return False
        else:
            self.log_result("Get Conversations", False, f"Get conversations failed: {response.status_code}")
            return False
        
        # Test unread count endpoint
        response, error = self.make_request("GET", "/chat/unread-count", auth_token=second_user_token)
        if error:
            self.log_result("Get Unread Count", False, error)
            return False
        
        if response.status_code == 200:
            try:
                data = response.json()
                if "unread_count" in data and isinstance(data["unread_count"], int):
                    self.log_result("Get Unread Count", True, f"Unread count: {data['unread_count']}")
                else:
                    self.log_result("Get Unread Count", False, "Invalid unread count format")
                    return False
            except:
                self.log_result("Get Unread Count", False, "Invalid JSON response")
                return False
        else:
            self.log_result("Get Unread Count", False, f"Get unread count failed: {response.status_code}")
            return False
        
        # Test mark messages as read
        mark_read_data = {"message_ids": [message_id]}
        response, error = self.make_request("POST", "/chat/mark-read", mark_read_data, second_user_token)
        if error:
            self.log_result("Mark Messages Read", False, error)
            return False
        
        if response.status_code == 200:
            try:
                data = response.json()
                if "message" in data:
                    self.log_result("Mark Messages Read", True, "Messages marked as read successfully")
                else:
                    self.log_result("Mark Messages Read", False, "Invalid response format")
                    return False
            except:
                self.log_result("Mark Messages Read", False, "Invalid JSON response")
                return False
        else:
            self.log_result("Mark Messages Read", False, f"Mark read failed: {response.status_code}")
            return False
        
        return True

    def test_my_properties_management(self):
        """Test My Properties Management (Medium Priority)"""
        print("\n=== Testing My Properties Management ===")
        
        if not self.test_user_token:
            self.log_result("My Properties Management", False, "No authentication token available")
            return False
        
        # Test get my properties
        response, error = self.make_request("GET", "/my-properties", auth_token=self.test_user_token)
        if error:
            self.log_result("Get My Properties", False, error)
            return False
        
        if response.status_code == 200:
            try:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("Get My Properties", True, f"Retrieved {len(data)} user properties")
                    
                    # Test property deletion if we have properties
                    if len(data) > 0 and self.test_property_id:
                        response, error = self.make_request("DELETE", f"/properties/{self.test_property_id}", auth_token=self.test_user_token)
                        if error:
                            self.log_result("Delete Property", False, error)
                            return False
                        
                        if response.status_code == 200:
                            try:
                                delete_data = response.json()
                                if "message" in delete_data:
                                    self.log_result("Delete Property", True, "Property deleted successfully")
                                else:
                                    self.log_result("Delete Property", False, "Invalid deletion response")
                                    return False
                            except:
                                self.log_result("Delete Property", False, "Invalid JSON response")
                                return False
                        else:
                            self.log_result("Delete Property", False, f"Delete failed: {response.status_code}")
                            return False
                    
                    return True
                else:
                    self.log_result("Get My Properties", False, "Response is not a list")
                    return False
            except:
                self.log_result("Get My Properties", False, "Invalid JSON response")
                return False
        else:
            self.log_result("Get My Properties", False, f"Get my properties failed: {response.status_code}")
            return False

    def run_comprehensive_test(self):
        """Run comprehensive backend tests"""
        print("🚀 Starting GetRentals Comprehensive Backend Test")
        print("=" * 60)
        
        # Test all core functionality from test_result.md
        success = True
        
        if not self.test_user_authentication_system():
            success = False
        
        if not self.test_property_crud_operations():
            success = False
        
        if not self.test_search_and_filter_system():
            success = False
        
        if not self.test_enhanced_chat_system():
            success = False
        
        if not self.test_my_properties_management():
            success = False
        
        # Print summary
        print("\n" + "=" * 60)
        print("🏁 COMPREHENSIVE TEST SUMMARY")
        print("=" * 60)
        print(f"✅ Passed: {self.results['passed']}")
        print(f"❌ Failed: {self.results['failed']}")
        print(f"📊 Total: {self.results['passed'] + self.results['failed']}")
        
        if self.results['errors']:
            print("\n🔍 FAILED TESTS:")
            for error in self.results['errors']:
                print(f"   • {error}")
        
        success_rate = (self.results['passed'] / (self.results['passed'] + self.results['failed'])) * 100 if (self.results['passed'] + self.results['failed']) > 0 else 0
        print(f"\n🎯 Success Rate: {success_rate:.1f}%")
        
        if success_rate >= 80:
            print("✅ COMPREHENSIVE TEST PASSED - All core functionality working")
        elif success_rate >= 60:
            print("⚠️  COMPREHENSIVE TEST PARTIAL - Most functionality working")
        else:
            print("❌ COMPREHENSIVE TEST FAILED - Critical issues found")
        
        return self.results

if __name__ == "__main__":
    tester = ComprehensiveTester()
    results = tester.run_comprehensive_test()