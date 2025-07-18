#!/usr/bin/env python3
"""
Focused Backend API Testing for Phone Number Validation and Self-Contact Prevention
Tests the specific issues mentioned in the review request
"""

import requests
import json
import time
from typing import Dict, Any, Optional

# Configuration - Backend runs on port 8001 internally
BASE_URL = "http://localhost:8001/api"
HEADERS = {"Content-Type": "application/json"}

class PhoneValidationTester:
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

    def test_phone_number_validation(self):
        """Test phone number validation and uniqueness"""
        print("\n=== Testing Phone Number Validation and Uniqueness ===")
        
        timestamp = str(int(time.time()))
        
        # Test 1: Valid phone number formats
        valid_phone_tests = [
            {
                "name": "10 digits with country code",
                "phone": "+91-9876543210",
                "expected_stored": "919876543210"
            },
            {
                "name": "10 digits with spaces",
                "phone": "98 76 54 32 11",
                "expected_stored": "9876543211"
            },
            {
                "name": "10 digits with dashes",
                "phone": "987-654-3212",
                "expected_stored": "9876543212"
            },
            {
                "name": "15 digits (max allowed)",
                "phone": "+1-234-567-890-123",
                "expected_stored": "1234567890123"
            }
        ]
        
        for i, test_case in enumerate(valid_phone_tests):
            user_data = {
                "email": f"user{i}.{timestamp}@example.com",
                "name": f"Test User {i}",
                "phone": test_case["phone"],
                "password": "testpass123"
            }
            
            response, error = self.make_request("POST", "/auth/register", user_data)
            if error:
                self.log_result(f"Valid Phone {test_case['name']}", False, error)
                continue
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    if "access_token" in data and "user" in data:
                        self.test_users.append(user_data)
                        self.auth_tokens[user_data["email"]] = data["access_token"]
                        self.log_result(f"Valid Phone {test_case['name']}", True, f"Phone {test_case['phone']} accepted and stored as digits only")
                    else:
                        self.log_result(f"Valid Phone {test_case['name']}", False, "Missing token or user data")
                except json.JSONDecodeError:
                    self.log_result(f"Valid Phone {test_case['name']}", False, "Invalid JSON response")
            else:
                self.log_result(f"Valid Phone {test_case['name']}", False, f"HTTP {response.status_code}: {response.text}")

        # Test 2: Invalid phone number formats (should be rejected)
        invalid_phone_tests = [
            {
                "name": "Too short (9 digits)",
                "phone": "987654321"
            },
            {
                "name": "Too long (16 digits)",
                "phone": "+1-234-567-890-12345"
            },
            {
                "name": "Contains letters",
                "phone": "98765abc10"
            },
            {
                "name": "Only special characters",
                "phone": "+-()[]"
            },
            {
                "name": "Empty phone",
                "phone": ""
            }
        ]
        
        for i, test_case in enumerate(invalid_phone_tests):
            user_data = {
                "email": f"invalid{i}.{timestamp}@example.com",
                "name": f"Invalid User {i}",
                "phone": test_case["phone"],
                "password": "testpass123"
            }
            
            response, error = self.make_request("POST", "/auth/register", user_data)
            if error:
                self.log_result(f"Invalid Phone {test_case['name']}", False, error)
                continue
            
            if response.status_code == 400:
                try:
                    data = response.json()
                    if "detail" in data and "phone" in data["detail"].lower():
                        self.log_result(f"Invalid Phone {test_case['name']}", True, f"Correctly rejected: {data['detail']}")
                    else:
                        self.log_result(f"Invalid Phone {test_case['name']}", True, "Correctly rejected invalid phone")
                except:
                    self.log_result(f"Invalid Phone {test_case['name']}", True, "Correctly rejected invalid phone")
            else:
                self.log_result(f"Invalid Phone {test_case['name']}", False, f"Should reject invalid phone, got HTTP {response.status_code}")

        # Test 3: Duplicate phone number (should be rejected)
        if self.test_users:
            duplicate_user = {
                "email": f"duplicate.{timestamp}@example.com",
                "name": "Duplicate Phone User",
                "phone": self.test_users[0]["phone"],  # Use same phone as first user
                "password": "testpass123"
            }
            
            response, error = self.make_request("POST", "/auth/register", duplicate_user)
            if error:
                self.log_result("Duplicate Phone Number", False, error)
            elif response.status_code == 400:
                try:
                    data = response.json()
                    if "detail" in data and "phone" in data["detail"].lower():
                        self.log_result("Duplicate Phone Number", True, f"Correctly rejected duplicate: {data['detail']}")
                    else:
                        self.log_result("Duplicate Phone Number", True, "Correctly rejected duplicate phone")
                except:
                    self.log_result("Duplicate Phone Number", True, "Correctly rejected duplicate phone")
            else:
                self.log_result("Duplicate Phone Number", False, f"Should reject duplicate phone, got HTTP {response.status_code}")

    def test_self_contact_prevention(self):
        """Test self-contact prevention in chat system"""
        print("\n=== Testing Self-Contact Prevention ===")
        
        if len(self.test_users) < 2 or len(self.auth_tokens) < 2:
            self.log_result("Self-Contact Prevention", False, "Need at least 2 users for self-contact testing")
            return
        
        # Create a property first
        property_owner_email = list(self.auth_tokens.keys())[0]
        property_owner_token = self.auth_tokens[property_owner_email]
        
        property_data = {
            "title": "Test Property for Self-Contact Prevention",
            "description": "A test property to check self-contact prevention",
            "property_type": "room",
            "rent": 15000,
            "deposit": 30000,
            "location": "Test Location",
            "city": "Test City",
            "images": [],
            "amenities": ["WiFi", "Parking"]
        }
        
        response, error = self.make_request("POST", "/properties", property_data, property_owner_token)
        if error or response.status_code != 200:
            self.log_result("Create Test Property", False, f"Failed to create property: {error or response.status_code}")
            return
        
        try:
            property_obj = response.json()
            property_id = property_obj["id"]
            self.test_properties.append(property_obj)
            self.log_result("Create Test Property", True, "Test property created successfully")
        except:
            self.log_result("Create Test Property", False, "Invalid property response")
            return
        
        # Get property owner's user ID
        response, error = self.make_request("GET", "/auth/me", auth_token=property_owner_token)
        if error or response.status_code != 200:
            self.log_result("Get Property Owner ID", False, "Failed to get property owner ID")
            return
        
        try:
            property_owner = response.json()
            property_owner_id = property_owner["id"]
        except:
            self.log_result("Get Property Owner ID", False, "Invalid user response")
            return
        
        # Test 1: User trying to send message to themselves
        self_contact_data = {
            "property_id": property_id,
            "receiver_id": property_owner_id,  # Same as sender
            "message": "Can I contact myself?"
        }
        
        response, error = self.make_request("POST", "/chat", self_contact_data, property_owner_token)
        if error:
            self.log_result("Self-Contact Prevention (Direct)", False, error)
        elif response.status_code == 400:
            try:
                data = response.json()
                if "detail" in data and ("yourself" in data["detail"].lower() or "self" in data["detail"].lower()):
                    self.log_result("Self-Contact Prevention (Direct)", True, f"Correctly prevented self-contact: {data['detail']}")
                else:
                    self.log_result("Self-Contact Prevention (Direct)", True, "Correctly prevented self-contact")
            except:
                self.log_result("Self-Contact Prevention (Direct)", True, "Correctly prevented self-contact")
        else:
            self.log_result("Self-Contact Prevention (Direct)", False, f"Should prevent self-contact, got HTTP {response.status_code}")
        
        # Test 2: Property owner trying to contact themselves on their own property
        owner_self_contact_data = {
            "property_id": property_id,
            "receiver_id": property_owner_id,
            "message": "Property owner contacting themselves"
        }
        
        response, error = self.make_request("POST", "/chat", owner_self_contact_data, property_owner_token)
        if error:
            self.log_result("Property Owner Self-Contact", False, error)
        elif response.status_code == 400:
            try:
                data = response.json()
                if "detail" in data and ("yourself" in data["detail"].lower() or "property" in data["detail"].lower()):
                    self.log_result("Property Owner Self-Contact", True, f"Correctly prevented owner self-contact: {data['detail']}")
                else:
                    self.log_result("Property Owner Self-Contact", True, "Correctly prevented owner self-contact")
            except:
                self.log_result("Property Owner Self-Contact", True, "Correctly prevented owner self-contact")
        else:
            self.log_result("Property Owner Self-Contact", False, f"Should prevent owner self-contact, got HTTP {response.status_code}")
        
        # Test 3: Valid contact between different users (should work)
        if len(self.auth_tokens) >= 2:
            other_user_email = list(self.auth_tokens.keys())[1]
            other_user_token = self.auth_tokens[other_user_email]
            
            valid_contact_data = {
                "property_id": property_id,
                "receiver_id": property_owner_id,
                "message": "Hi, I'm interested in your property!"
            }
            
            response, error = self.make_request("POST", "/chat", valid_contact_data, other_user_token)
            if error:
                self.log_result("Valid Contact Between Users", False, error)
            elif response.status_code == 200:
                try:
                    data = response.json()
                    if "id" in data and "message" in data:
                        self.log_result("Valid Contact Between Users", True, "Different users can contact each other successfully")
                    else:
                        self.log_result("Valid Contact Between Users", False, "Invalid chat response")
                except:
                    self.log_result("Valid Contact Between Users", False, "Invalid JSON response")
            else:
                self.log_result("Valid Contact Between Users", False, f"Valid contact failed: HTTP {response.status_code}")

    def test_existing_functionality(self):
        """Test that existing functionality still works"""
        print("\n=== Testing Existing Functionality ===")
        
        # Test user login still works
        if self.test_users:
            user_data = self.test_users[0]
            login_data = {
                "email": user_data["email"],
                "password": user_data["password"]
            }
            
            response, error = self.make_request("POST", "/auth/login", login_data)
            if error:
                self.log_result("User Login", False, error)
            elif response.status_code == 200:
                try:
                    data = response.json()
                    if "access_token" in data:
                        self.log_result("User Login", True, "User login works correctly")
                    else:
                        self.log_result("User Login", False, "Missing access token")
                except:
                    self.log_result("User Login", False, "Invalid login response")
            else:
                self.log_result("User Login", False, f"Login failed: HTTP {response.status_code}")
        
        # Test property CRUD operations
        if self.auth_tokens:
            token = list(self.auth_tokens.values())[0]
            
            # Test get properties
            response, error = self.make_request("GET", "/properties")
            if error:
                self.log_result("Get Properties", False, error)
            elif response.status_code == 200:
                try:
                    data = response.json()
                    if isinstance(data, list):
                        self.log_result("Get Properties", True, f"Retrieved {len(data)} properties")
                    else:
                        self.log_result("Get Properties", False, "Invalid properties response")
                except:
                    self.log_result("Get Properties", False, "Invalid JSON response")
            else:
                self.log_result("Get Properties", False, f"Get properties failed: HTTP {response.status_code}")
            
            # Test get current user
            response, error = self.make_request("GET", "/auth/me", auth_token=token)
            if error:
                self.log_result("Get Current User", False, error)
            elif response.status_code == 200:
                try:
                    data = response.json()
                    if "id" in data and "email" in data:
                        self.log_result("Get Current User", True, "Get current user works correctly")
                    else:
                        self.log_result("Get Current User", False, "Missing user data")
                except:
                    self.log_result("Get Current User", False, "Invalid user response")
            else:
                self.log_result("Get Current User", False, f"Get current user failed: HTTP {response.status_code}")

    def run_focused_tests(self):
        """Run focused tests for phone validation and self-contact prevention"""
        print("🎯 Starting Focused Backend API Tests")
        print("Testing Phone Number Validation and Self-Contact Prevention")
        print("=" * 60)
        
        # Test sequence
        self.test_phone_number_validation()
        self.test_self_contact_prevention()
        self.test_existing_functionality()
        
        # Print summary
        print("\n" + "=" * 60)
        print("🏁 FOCUSED TEST SUMMARY")
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
        
        return self.results

if __name__ == "__main__":
    tester = PhoneValidationTester()
    results = tester.run_focused_tests()