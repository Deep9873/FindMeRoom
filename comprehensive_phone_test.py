#!/usr/bin/env python3
"""
Comprehensive test for phone number uniqueness fix and self-contact prevention
Tests multiple scenarios and edge cases as requested in the review
"""

import requests
import json
import time
from typing import Dict, Any, Optional

# Configuration
BASE_URL = "http://localhost:8001/api"
HEADERS = {"Content-Type": "application/json"}

class ComprehensivePhoneTest:
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

    def test_phone_number_variations(self):
        """Test phone number uniqueness with various format variations"""
        print("\n=== Testing Phone Number Format Variations ===")
        
        timestamp = str(int(time.time()))
        base_phone = f"987654{timestamp[-4:]}"  # Use timestamp to make it unique
        
        # Test cases with same phone number in different formats
        test_variations = [
            {
                "format": "+91-XXXXXXXXXX",
                "phone": f"+91-{base_phone}",
                "email": f"user1.{timestamp}@example.com",
                "name": "User Format 1"
            },
            {
                "format": "91XXXXXXXXXX", 
                "phone": f"91{base_phone}",
                "email": f"user2.{timestamp}@example.com",
                "name": "User Format 2"
            },
            {
                "format": "+91 XXXXXXXXXX",
                "phone": f"+91 {base_phone}",
                "email": f"user3.{timestamp}@example.com", 
                "name": "User Format 3"
            },
            {
                "format": "91-XXXXXXXXXX",
                "phone": f"91-{base_phone}",
                "email": f"user4.{timestamp}@example.com",
                "name": "User Format 4"
            },
            {
                "format": "(+91) XXXXXXXXXX",
                "phone": f"(+91) {base_phone}",
                "email": f"user5.{timestamp}@example.com",
                "name": "User Format 5"
            },
            {
                "format": "+91.XXXXXXXXXX",
                "phone": f"+91.{base_phone}",
                "email": f"user6.{timestamp}@example.com",
                "name": "User Format 6"
            }
        ]
        
        successful_registrations = 0
        
        for i, test_case in enumerate(test_variations):
            user_data = {
                "email": test_case["email"],
                "name": test_case["name"],
                "phone": test_case["phone"],
                "password": f"password{i+1}"
            }
            
            print(f"\n   Testing format {i+1}: {test_case['format']} -> {test_case['phone']}")
            
            response, error = self.make_request("POST", "/auth/register", user_data)
            if error:
                self.log_result(f"Phone Format {i+1} ({test_case['format']})", False, error)
                continue
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    if "access_token" in data and "user" in data:
                        successful_registrations += 1
                        self.test_users.append(user_data)
                        self.auth_tokens[user_data["email"]] = data["access_token"]
                        self.log_result(f"Phone Format {i+1} ({test_case['format']})", True, f"✅ First registration successful")
                    else:
                        self.log_result(f"Phone Format {i+1} ({test_case['format']})", False, "Missing token or user data")
                except json.JSONDecodeError:
                    self.log_result(f"Phone Format {i+1} ({test_case['format']})", False, "Invalid JSON response")
            elif response.status_code == 400:
                try:
                    error_data = response.json()
                    if "Phone number already registered" in error_data.get("detail", ""):
                        self.log_result(f"Phone Format {i+1} ({test_case['format']})", True, f"✅ Correctly rejected duplicate")
                    else:
                        self.log_result(f"Phone Format {i+1} ({test_case['format']})", False, f"Unexpected error: {error_data.get('detail')}")
                except:
                    self.log_result(f"Phone Format {i+1} ({test_case['format']})", False, f"HTTP 400 with invalid response")
            else:
                self.log_result(f"Phone Format {i+1} ({test_case['format']})", False, f"HTTP {response.status_code}: {response.text}")
        
        # Evaluate the fix
        if successful_registrations == 1:
            self.log_result("Phone Uniqueness Fix (Variations)", True, f"✅ PERFECT: Only 1 registration succeeded, {len(test_variations)-1} duplicates correctly rejected")
            return True
        elif successful_registrations > 1:
            self.log_result("Phone Uniqueness Fix (Variations)", False, f"❌ BUG: {successful_registrations} registrations succeeded with same phone number")
            return False
        else:
            self.log_result("Phone Uniqueness Fix (Variations)", False, "❌ NO REGISTRATIONS: All failed, possible server issue")
            return False

    def test_different_phone_numbers(self):
        """Test that different phone numbers can be registered successfully"""
        print("\n=== Testing Different Phone Numbers ===")
        
        timestamp = str(int(time.time()))
        
        # Test cases with genuinely different phone numbers
        different_phones = [
            {
                "phone": f"+91-9876{timestamp[-6:]}",
                "email": f"diff1.{timestamp}@example.com",
                "name": "Different User 1"
            },
            {
                "phone": f"91-8765{timestamp[-6:]}",
                "email": f"diff2.{timestamp}@example.com", 
                "name": "Different User 2"
            },
            {
                "phone": f"+91 7654{timestamp[-6:]}",
                "email": f"diff3.{timestamp}@example.com",
                "name": "Different User 3"
            }
        ]
        
        successful_registrations = 0
        
        for i, phone_data in enumerate(different_phones):
            user_data = {
                "email": phone_data["email"],
                "name": phone_data["name"],
                "phone": phone_data["phone"],
                "password": f"diffpass{i+1}"
            }
            
            response, error = self.make_request("POST", "/auth/register", user_data)
            if error:
                self.log_result(f"Different Phone {i+1}", False, error)
                continue
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    if "access_token" in data and "user" in data:
                        successful_registrations += 1
                        self.test_users.append(user_data)
                        self.auth_tokens[user_data["email"]] = data["access_token"]
                        self.log_result(f"Different Phone {i+1}", True, f"✅ User {user_data['name']} registered with {user_data['phone']}")
                    else:
                        self.log_result(f"Different Phone {i+1}", False, "Missing token or user data")
                except json.JSONDecodeError:
                    self.log_result(f"Different Phone {i+1}", False, "Invalid JSON response")
            else:
                self.log_result(f"Different Phone {i+1}", False, f"HTTP {response.status_code}: {response.text}")
        
        if successful_registrations == len(different_phones):
            self.log_result("Different Phone Numbers", True, f"✅ All {successful_registrations} different phone numbers registered successfully")
            return True
        else:
            self.log_result("Different Phone Numbers", False, f"❌ Only {successful_registrations}/{len(different_phones)} different phone numbers registered")
            return False

    def test_comprehensive_self_contact_prevention(self):
        """Test comprehensive self-contact prevention scenarios"""
        print("\n=== Testing Comprehensive Self-Contact Prevention ===")
        
        if len(self.test_users) < 2 or len(self.auth_tokens) < 2:
            self.log_result("Comprehensive Self-Contact", False, "Need at least 2 users for comprehensive testing")
            return False
        
        # Get two users
        emails = list(self.auth_tokens.keys())
        user1_email = emails[0]
        user2_email = emails[1]
        user1_token = self.auth_tokens[user1_email]
        user2_token = self.auth_tokens[user2_email]
        
        # Get user IDs
        user1_response, _ = self.make_request("GET", "/auth/me", auth_token=user1_token)
        user2_response, _ = self.make_request("GET", "/auth/me", auth_token=user2_token)
        
        if user1_response.status_code != 200 or user2_response.status_code != 200:
            self.log_result("Get User Info for Self-Contact Test", False, "Failed to get user information")
            return False
        
        user1_info = user1_response.json()
        user2_info = user2_response.json()
        
        # Create properties for both users
        property1_data = {
            "title": "User 1's Property for Self-Contact Test",
            "description": "Test property owned by User 1",
            "property_type": "room",
            "rent": 15000,
            "deposit": 30000,
            "location": "Test Location 1",
            "city": "Test City",
            "images": [],
            "amenities": ["WiFi"]
        }
        
        property2_data = {
            "title": "User 2's Property for Self-Contact Test", 
            "description": "Test property owned by User 2",
            "property_type": "house",
            "rent": 25000,
            "deposit": 50000,
            "location": "Test Location 2",
            "city": "Test City",
            "images": [],
            "amenities": ["Parking"]
        }
        
        # Create User 1's property
        response, error = self.make_request("POST", "/properties", property1_data, user1_token)
        if error or response.status_code != 200:
            self.log_result("Create User 1 Property", False, f"Failed: {error or response.status_code}")
            return False
        
        property1 = response.json()
        self.test_properties.append(property1)
        self.log_result("Create User 1 Property", True, "User 1's property created")
        
        # Create User 2's property
        response, error = self.make_request("POST", "/properties", property2_data, user2_token)
        if error or response.status_code != 200:
            self.log_result("Create User 2 Property", False, f"Failed: {error or response.status_code}")
            return False
        
        property2 = response.json()
        self.test_properties.append(property2)
        self.log_result("Create User 2 Property", True, "User 2's property created")
        
        # Test scenarios
        test_scenarios = [
            {
                "name": "User 1 Self-Contact on Own Property",
                "sender_token": user1_token,
                "property_id": property1["id"],
                "receiver_id": user1_info["id"],
                "should_fail": True,
                "expected_error": "Cannot send message to yourself"
            },
            {
                "name": "User 2 Self-Contact on Own Property",
                "sender_token": user2_token,
                "property_id": property2["id"],
                "receiver_id": user2_info["id"],
                "should_fail": True,
                "expected_error": "Cannot send message to yourself"
            },
            {
                "name": "User 1 Contact User 2 (Valid)",
                "sender_token": user1_token,
                "property_id": property2["id"],  # User 1 contacts User 2 about User 2's property
                "receiver_id": user2_info["id"],
                "should_fail": False,
                "expected_error": None
            },
            {
                "name": "User 2 Contact User 1 (Valid)",
                "sender_token": user2_token,
                "property_id": property1["id"],  # User 2 contacts User 1 about User 1's property
                "receiver_id": user1_info["id"],
                "should_fail": False,
                "expected_error": None
            },
            {
                "name": "User 1 Self-Contact on User 2's Property",
                "sender_token": user1_token,
                "property_id": property2["id"],
                "receiver_id": user1_info["id"],  # User 1 tries to contact themselves
                "should_fail": True,
                "expected_error": "Cannot send message to yourself"
            }
        ]
        
        for scenario in test_scenarios:
            chat_data = {
                "property_id": scenario["property_id"],
                "receiver_id": scenario["receiver_id"],
                "message": f"Test message for {scenario['name']}"
            }
            
            response, error = self.make_request("POST", "/chat", chat_data, scenario["sender_token"])
            
            if error:
                self.log_result(scenario["name"], False, error)
                continue
            
            if scenario["should_fail"]:
                # Should return 400 with appropriate error message
                if response.status_code == 400:
                    try:
                        error_data = response.json()
                        error_detail = error_data.get("detail", "")
                        if scenario["expected_error"] in error_detail:
                            self.log_result(scenario["name"], True, f"✅ Correctly prevented: {error_detail}")
                        else:
                            self.log_result(scenario["name"], False, f"Wrong error message: {error_detail}")
                    except:
                        self.log_result(scenario["name"], False, "Invalid error response")
                else:
                    self.log_result(scenario["name"], False, f"Should return 400, got {response.status_code}")
            else:
                # Should succeed (200)
                if response.status_code == 200:
                    try:
                        chat_response = response.json()
                        if "id" in chat_response and "message" in chat_response:
                            self.log_result(scenario["name"], True, "✅ Valid contact succeeded")
                        else:
                            self.log_result(scenario["name"], False, "Invalid chat response format")
                    except:
                        self.log_result(scenario["name"], False, "Invalid JSON response")
                else:
                    self.log_result(scenario["name"], False, f"Should return 200, got {response.status_code}: {response.text}")
        
        return True

    def run_comprehensive_tests(self):
        """Run all comprehensive tests"""
        print("🔍 Starting Comprehensive Phone Uniqueness & Self-Contact Tests")
        print("=" * 80)
        
        # Test 1: Phone number format variations
        phone_variations_success = self.test_phone_number_variations()
        
        # Test 2: Different phone numbers should work
        different_phones_success = self.test_different_phone_numbers()
        
        # Test 3: Comprehensive self-contact prevention
        self_contact_success = self.test_comprehensive_self_contact_prevention()
        
        # Print summary
        print("\n" + "=" * 80)
        print("🏁 COMPREHENSIVE TEST SUMMARY")
        print("=" * 80)
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
        print("\n📋 COMPREHENSIVE TEST RESULTS:")
        print(f"   {'✅' if phone_variations_success else '❌'} Phone Number Uniqueness Fix: {'WORKING' if phone_variations_success else 'ISSUES'}")
        print(f"   {'✅' if different_phones_success else '❌'} Different Phone Numbers: {'WORKING' if different_phones_success else 'ISSUES'}")
        print(f"   {'✅' if self_contact_success else '❌'} Self-Contact Prevention: {'WORKING' if self_contact_success else 'ISSUES'}")
        
        # Overall assessment
        all_critical_tests_passed = phone_variations_success and different_phones_success and self_contact_success
        print(f"\n🎯 OVERALL ASSESSMENT: {'✅ ALL CRITICAL TESTS PASSED' if all_critical_tests_passed else '❌ SOME CRITICAL TESTS FAILED'}")
        
        return self.results

if __name__ == "__main__":
    tester = ComprehensivePhoneTest()
    tester.run_comprehensive_tests()