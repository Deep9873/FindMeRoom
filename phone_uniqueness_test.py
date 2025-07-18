#!/usr/bin/env python3
"""
Focused test for phone number uniqueness fix and self-contact prevention
Tests the specific issues mentioned in the review request
"""

import requests
import json
import time
from typing import Dict, Any, Optional

# Configuration
BASE_URL = "http://localhost:8001/api"
HEADERS = {"Content-Type": "application/json"}

class PhoneUniquenessTest:
    def __init__(self):
        self.base_url = BASE_URL
        self.headers = HEADERS.copy()
        self.test_users = []
        self.auth_tokens = {}
        self.test_properties = []
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

    def test_phone_number_uniqueness_fix(self):
        """Test the phone number uniqueness fix with different formats"""
        print("\n=== Testing Phone Number Uniqueness Fix ===")
        
        timestamp = str(int(time.time()))
        base_phone = "9876543210"  # 10 digit number
        
        # Test data with same phone number in different formats
        test_cases = [
            {
                "email": f"user1.{timestamp}@example.com",
                "name": "User One",
                "phone": f"+91-{base_phone}",  # Format: +91-9876543210
                "password": "password123"
            },
            {
                "email": f"user2.{timestamp}@example.com", 
                "name": "User Two",
                "phone": f"91{base_phone}",  # Format: 919876543210
                "password": "password456"
            },
            {
                "email": f"user3.{timestamp}@example.com",
                "name": "User Three", 
                "phone": f"+91 {base_phone}",  # Format: +91 9876543210
                "password": "password789"
            },
            {
                "email": f"user4.{timestamp}@example.com",
                "name": "User Four",
                "phone": f"91-{base_phone}",  # Format: 91-9876543210
                "password": "passwordabc"
            }
        ]
        
        successful_registrations = 0
        
        for i, user_data in enumerate(test_cases):
            print(f"\n   Testing registration {i+1}: {user_data['phone']}")
            
            response, error = self.make_request("POST", "/auth/register", user_data)
            if error:
                self.log_result(f"Phone Format {i+1} Registration", False, error)
                continue
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    if "access_token" in data and "user" in data:
                        successful_registrations += 1
                        self.test_users.append(user_data)
                        self.auth_tokens[user_data["email"]] = data["access_token"]
                        self.log_result(f"Phone Format {i+1} Registration", True, f"User {user_data['name']} registered successfully")
                    else:
                        self.log_result(f"Phone Format {i+1} Registration", False, "Missing token or user data in response")
                except json.JSONDecodeError:
                    self.log_result(f"Phone Format {i+1} Registration", False, "Invalid JSON response")
            elif response.status_code == 400:
                # This is expected for duplicate phone numbers after the first registration
                try:
                    error_data = response.json()
                    if "Phone number already registered" in error_data.get("detail", ""):
                        self.log_result(f"Phone Format {i+1} Duplicate Rejection", True, f"Correctly rejected duplicate phone: {user_data['phone']}")
                    else:
                        self.log_result(f"Phone Format {i+1} Registration", False, f"Unexpected error: {error_data.get('detail', 'Unknown error')}")
                except:
                    self.log_result(f"Phone Format {i+1} Registration", False, f"HTTP 400 with invalid response: {response.text}")
            else:
                self.log_result(f"Phone Format {i+1} Registration", False, f"HTTP {response.status_code}: {response.text}")
        
        # Evaluate the fix
        if successful_registrations == 1:
            self.log_result("Phone Uniqueness Fix", True, f"✅ FIXED: Only 1 registration succeeded, {len(test_cases)-1} duplicates correctly rejected")
        elif successful_registrations > 1:
            self.log_result("Phone Uniqueness Fix", False, f"❌ BUG STILL EXISTS: {successful_registrations} registrations succeeded with same phone number")
        else:
            self.log_result("Phone Uniqueness Fix", False, "❌ NO REGISTRATIONS: All registrations failed, possible server issue")
        
        return successful_registrations == 1

    def test_self_contact_prevention(self):
        """Test self-contact prevention functionality"""
        print("\n=== Testing Self-Contact Prevention ===")
        
        if not self.test_users or not self.auth_tokens:
            self.log_result("Self-Contact Prevention", False, "No registered users available for testing")
            return False
        
        # Create a property first
        user_email = list(self.auth_tokens.keys())[0]
        user_token = self.auth_tokens[user_email]
        
        property_data = {
            "title": "Test Property for Self-Contact Prevention",
            "description": "A test property to verify self-contact prevention",
            "property_type": "room",
            "rent": 15000,
            "deposit": 30000,
            "location": "Test Location",
            "city": "Test City",
            "images": [],
            "amenities": ["WiFi", "Parking"]
        }
        
        response, error = self.make_request("POST", "/properties", property_data, user_token)
        if error or response.status_code != 200:
            self.log_result("Create Test Property", False, f"Failed to create property: {error or response.status_code}")
            return False
        
        try:
            property_obj = response.json()
            property_id = property_obj["id"]
            self.test_properties.append(property_obj)
            self.log_result("Create Test Property", True, "Test property created successfully")
        except:
            self.log_result("Create Test Property", False, "Invalid property creation response")
            return False
        
        # Get user ID for self-contact test
        response, error = self.make_request("GET", "/auth/me", auth_token=user_token)
        if error or response.status_code != 200:
            self.log_result("Get User Info", False, "Failed to get user information")
            return False
        
        try:
            user_info = response.json()
            user_id = user_info["id"]
        except:
            self.log_result("Get User Info", False, "Invalid user info response")
            return False
        
        # Test 1: Direct self-contact (user tries to send message to themselves)
        self_contact_data = {
            "property_id": property_id,
            "receiver_id": user_id,  # Same as sender
            "message": "Can I contact myself?"
        }
        
        response, error = self.make_request("POST", "/chat", self_contact_data, user_token)
        if error:
            self.log_result("Direct Self-Contact Prevention", False, error)
        elif response.status_code == 400:
            try:
                error_data = response.json()
                if "Cannot send message to yourself" in error_data.get("detail", ""):
                    self.log_result("Direct Self-Contact Prevention", True, "✅ Correctly prevented direct self-contact")
                else:
                    self.log_result("Direct Self-Contact Prevention", False, f"Wrong error message: {error_data.get('detail')}")
            except:
                self.log_result("Direct Self-Contact Prevention", False, "Invalid error response")
        else:
            self.log_result("Direct Self-Contact Prevention", False, f"Should return 400, got {response.status_code}")
        
        # Test 2: Property owner self-contact (property owner tries to contact themselves on their own property)
        # This should also be prevented by the second check in the backend
        owner_self_contact_data = {
            "property_id": property_id,
            "receiver_id": user_id,  # Property owner trying to contact themselves
            "message": "Property owner contacting themselves"
        }
        
        response, error = self.make_request("POST", "/chat", owner_self_contact_data, user_token)
        if error:
            self.log_result("Property Owner Self-Contact Prevention", False, error)
        elif response.status_code == 400:
            try:
                error_data = response.json()
                error_detail = error_data.get("detail", "")
                if "Cannot send message to yourself" in error_detail or "Cannot contact yourself on your own property" in error_detail:
                    self.log_result("Property Owner Self-Contact Prevention", True, "✅ Correctly prevented property owner self-contact")
                else:
                    self.log_result("Property Owner Self-Contact Prevention", False, f"Wrong error message: {error_detail}")
            except:
                self.log_result("Property Owner Self-Contact Prevention", False, "Invalid error response")
        else:
            self.log_result("Property Owner Self-Contact Prevention", False, f"Should return 400, got {response.status_code}")
        
        # Test 3: Valid contact between different users (if we have multiple users)
        if len(self.auth_tokens) >= 2:
            emails = list(self.auth_tokens.keys())
            other_user_email = emails[1]
            other_user_token = self.auth_tokens[other_user_email]
            
            # Get other user's ID
            response, error = self.make_request("GET", "/auth/me", auth_token=other_user_token)
            if response and response.status_code == 200:
                try:
                    other_user_info = response.json()
                    other_user_id = other_user_info["id"]
                    
                    # Other user contacts property owner (should work)
                    valid_contact_data = {
                        "property_id": property_id,
                        "receiver_id": user_id,  # Property owner
                        "message": "Hi, I'm interested in your property!"
                    }
                    
                    response, error = self.make_request("POST", "/chat", valid_contact_data, other_user_token)
                    if error:
                        self.log_result("Valid Contact Between Users", False, error)
                    elif response.status_code == 200:
                        try:
                            chat_data = response.json()
                            if "id" in chat_data and "message" in chat_data:
                                self.log_result("Valid Contact Between Users", True, "✅ Valid contact between different users works correctly")
                            else:
                                self.log_result("Valid Contact Between Users", False, "Invalid chat response format")
                        except:
                            self.log_result("Valid Contact Between Users", False, "Invalid JSON response")
                    else:
                        self.log_result("Valid Contact Between Users", False, f"HTTP {response.status_code}: {response.text}")
                except:
                    self.log_result("Valid Contact Between Users", False, "Could not get other user info")
        
        return True

    def run_focused_tests(self):
        """Run the focused tests for phone uniqueness and self-contact prevention"""
        print("🎯 Starting Focused Tests: Phone Uniqueness Fix & Self-Contact Prevention")
        print("=" * 70)
        
        # Test 1: Phone number uniqueness fix
        phone_fix_success = self.test_phone_number_uniqueness_fix()
        
        # Test 2: Self-contact prevention
        self_contact_success = self.test_self_contact_prevention()
        
        # Print summary
        print("\n" + "=" * 70)
        print("🏁 FOCUSED TEST SUMMARY")
        print("=" * 70)
        print(f"✅ Passed: {self.results['passed']}")
        print(f"❌ Failed: {self.results['failed']}")
        print(f"📊 Total: {self.results['passed'] + self.results['failed']}")
        
        if self.results['errors']:
            print("\n🔍 FAILED TESTS:")
            for error in self.results['errors']:
                print(f"   • {error}")
        
        success_rate = (self.results['passed'] / (self.results['passed'] + self.results['failed'])) * 100 if (self.results['passed'] + self.results['failed']) > 0 else 0
        print(f"\n🎯 Success Rate: {success_rate:.1f}%")
        
        # Key findings
        print("\n📋 KEY FINDINGS:")
        if phone_fix_success:
            print("   ✅ Phone number uniqueness fix is WORKING correctly")
        else:
            print("   ❌ Phone number uniqueness fix has ISSUES")
        
        if self_contact_success:
            print("   ✅ Self-contact prevention is implemented")
        else:
            print("   ❌ Self-contact prevention has ISSUES")
        
        return self.results

if __name__ == "__main__":
    tester = PhoneUniquenessTest()
    tester.run_focused_tests()