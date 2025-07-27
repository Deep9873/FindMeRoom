#!/usr/bin/env python3
"""
Quick Health Check for GetRentals Backend API
Tests basic functionality to ensure the application is operational
"""

import requests
import json
import time
from typing import Dict, Any

# Configuration
BASE_URL = "https://getrentals.online/api"
HEADERS = {"Content-Type": "application/json"}

class HealthChecker:
    def __init__(self):
        self.base_url = BASE_URL
        self.headers = HEADERS.copy()
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
            else:
                return None, f"Unsupported method: {method}"
            
            return response, None
        except requests.exceptions.Timeout:
            return None, f"Request timeout after {timeout} seconds"
        except requests.exceptions.RequestException as e:
            return None, f"Request failed: {str(e)}"

    def test_api_health(self):
        """Test basic API health check"""
        print("\n=== Testing API Health ===")
        
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

    def test_database_connectivity(self):
        """Test database connectivity by trying to get properties"""
        print("\n=== Testing Database Connectivity ===")
        
        response, error = self.make_request("GET", "/properties")
        if error:
            self.log_result("Database Connectivity", False, error)
            return False
        
        if response.status_code == 200:
            try:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("Database Connectivity", True, f"Database connected - retrieved {len(data)} properties")
                    return True
            except:
                pass
        
        self.log_result("Database Connectivity", False, f"Database connection issue: {response.status_code}")
        return False

    def test_authentication_system(self):
        """Test authentication system with a quick registration and login"""
        print("\n=== Testing Authentication System ===")
        
        # Test registration
        timestamp = str(int(time.time()))
        test_user = {
            "email": f"healthcheck.{timestamp}@example.com",
            "name": "Health Check User",
            "phone": f"9876543{timestamp[-3:]}",
            "password": "testpass123"
        }
        
        response, error = self.make_request("POST", "/auth/register", test_user)
        if error:
            self.log_result("Authentication - Registration", False, error)
            return False
        
        if response.status_code == 200:
            try:
                data = response.json()
                if "access_token" in data and "user" in data:
                    token = data["access_token"]
                    self.log_result("Authentication - Registration", True, "User registered successfully")
                    
                    # Test token validation
                    response, error = self.make_request("GET", "/auth/me", auth_token=token)
                    if error:
                        self.log_result("Authentication - Token Validation", False, error)
                        return False
                    
                    if response.status_code == 200:
                        try:
                            user_data = response.json()
                            if "id" in user_data and "email" in user_data:
                                self.log_result("Authentication - Token Validation", True, "Token validation successful")
                                return True
                        except:
                            pass
                    
                    self.log_result("Authentication - Token Validation", False, f"Token validation failed: {response.status_code}")
                    return False
                else:
                    self.log_result("Authentication - Registration", False, "Missing token or user data")
                    return False
            except:
                self.log_result("Authentication - Registration", False, "Invalid JSON response")
                return False
        else:
            self.log_result("Authentication - Registration", False, f"Registration failed: {response.status_code}")
            return False

    def test_core_endpoints(self):
        """Test core API endpoints are accessible"""
        print("\n=== Testing Core Endpoints ===")
        
        endpoints = [
            ("/properties", "GET", "Properties endpoint"),
            ("/chat/unread-count", "GET", "Chat unread count endpoint"),
        ]
        
        all_passed = True
        for endpoint, method, description in endpoints:
            response, error = self.make_request(method, endpoint)
            if error:
                self.log_result(f"Core Endpoint - {description}", False, error)
                all_passed = False
            elif response.status_code in [200, 401]:  # 401 is expected for protected endpoints
                self.log_result(f"Core Endpoint - {description}", True, f"Endpoint accessible (HTTP {response.status_code})")
            else:
                self.log_result(f"Core Endpoint - {description}", False, f"Unexpected status: {response.status_code}")
                all_passed = False
        
        return all_passed

    def run_health_check(self):
        """Run quick health check tests"""
        print("🏥 Starting GetRentals Backend Health Check")
        print("=" * 50)
        
        # Test sequence - stop if critical tests fail
        if not self.test_api_health():
            print("❌ API is not responding. Stopping health check.")
            return self.results
        
        if not self.test_database_connectivity():
            print("❌ Database connectivity failed. Stopping health check.")
            return self.results
        
        self.test_authentication_system()
        self.test_core_endpoints()
        
        # Print summary
        print("\n" + "=" * 50)
        print("🏁 HEALTH CHECK SUMMARY")
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
        
        if success_rate >= 75:
            print("✅ HEALTH CHECK PASSED - Backend is operational")
        else:
            print("❌ HEALTH CHECK FAILED - Backend has issues")
        
        return self.results

if __name__ == "__main__":
    checker = HealthChecker()
    results = checker.run_health_check()