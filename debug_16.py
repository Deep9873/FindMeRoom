#!/usr/bin/env python3
"""
Test with truly 16-digit phone number
"""

import requests
import json

BASE_URL = "http://localhost:8001/api"
HEADERS = {"Content-Type": "application/json"}

def test_16_digits():
    # Test with truly 16 digits
    long_phone = "+1-234-567-890-123456"  # This should be 16 digits
    phone_digits = ''.join(filter(str.isdigit, long_phone))
    print(f"Original phone: {long_phone}")
    print(f"Digits only: {phone_digits}")
    print(f"Length: {len(phone_digits)}")
    
    user_data = {
        "email": "debug16real@example.com",
        "name": "Debug User 16",
        "phone": long_phone,
        "password": "testpass123"
    }
    
    response = requests.post(f"{BASE_URL}/auth/register", headers=HEADERS, json=user_data)
    print(f"Response status: {response.status_code}")
    print(f"Response: {response.text}")

if __name__ == "__main__":
    test_16_digits()