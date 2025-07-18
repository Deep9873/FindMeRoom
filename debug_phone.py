#!/usr/bin/env python3
"""
Debug phone validation issues
"""

import requests
import json

BASE_URL = "http://localhost:8001/api"
HEADERS = {"Content-Type": "application/json"}

def test_phone_debug():
    # Test the 16-digit phone number
    long_phone = "+1-234-567-890-12345"
    phone_digits = ''.join(filter(str.isdigit, long_phone))
    print(f"Original phone: {long_phone}")
    print(f"Digits only: {phone_digits}")
    print(f"Length: {len(phone_digits)}")
    
    user_data = {
        "email": "debug16@example.com",
        "name": "Debug User",
        "phone": long_phone,
        "password": "testpass123"
    }
    
    response = requests.post(f"{BASE_URL}/auth/register", headers=HEADERS, json=user_data)
    print(f"Response status: {response.status_code}")
    print(f"Response: {response.text}")
    
    # Test duplicate phone
    print("\n--- Testing duplicate phone ---")
    
    # First register with formatted phone
    user1_data = {
        "email": "user1@example.com",
        "name": "User 1",
        "phone": "+91-9999999999",
        "password": "testpass123"
    }
    
    response1 = requests.post(f"{BASE_URL}/auth/register", headers=HEADERS, json=user1_data)
    print(f"User 1 registration: {response1.status_code}")
    
    # Try to register with same phone but different format
    user2_data = {
        "email": "user2@example.com",
        "name": "User 2", 
        "phone": "919999999999",  # Same digits, different format
        "password": "testpass123"
    }
    
    response2 = requests.post(f"{BASE_URL}/auth/register", headers=HEADERS, json=user2_data)
    print(f"User 2 registration (duplicate): {response2.status_code}")
    print(f"Response: {response2.text}")

if __name__ == "__main__":
    test_phone_debug()