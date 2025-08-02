#!/usr/bin/env python3
"""
Test script to verify 413 Request Entity Too Large fix
"""

import requests
import json
import base64
import sys

def create_large_base64_image(size_mb=2):
    """Create a large base64 image for testing"""
    # Create a simple image data (just repeated pattern)
    size_bytes = size_mb * 1024 * 1024
    image_data = b'test_image_data' * (size_bytes // 15 + 1)
    image_data = image_data[:size_bytes]
    
    # Convert to base64 (this will be ~33% larger)
    return base64.b64encode(image_data).decode('utf-8')

def test_property_creation():
    """Test property creation with different payload sizes"""
    base_url = "http://localhost:8001/api"
    
    # Test 1: Small payload (should work)
    print("Test 1: Small payload...")
    small_image = create_large_base64_image(0.1)  # 0.1 MB
    small_payload = {
        "title": "Test Property",
        "description": "Test description",
        "property_type": "room",
        "rent": 5000,
        "deposit": 10000,
        "location": "Test Location",
        "city": "Test City",
        "images": [small_image],
        "amenities": ["test"]
    }
    
    # This would normally require authentication, but we're just testing payload size
    try:
        response = requests.post(f"{base_url}/properties", json=small_payload, timeout=30)
        print(f"Small payload response: {response.status_code}")
        if response.status_code == 401:
            print("✓ Small payload accepted (authentication required, which is expected)")
        else:
            print(f"Response: {response.text[:200]}...")
    except requests.exceptions.RequestException as e:
        print(f"Small payload error: {e}")
    
    # Test 2: Large payload (should trigger 413)
    print("\nTest 2: Large payload (>100MB)...")
    large_images = [create_large_base64_image(30) for _ in range(4)]  # 4 x 30MB = ~120MB
    large_payload = {
        "title": "Test Property Large",
        "description": "Test description",
        "property_type": "room", 
        "rent": 5000,
        "deposit": 10000,
        "location": "Test Location",
        "city": "Test City",
        "images": large_images,
        "amenities": ["test"]
    }
    
    try:
        response = requests.post(f"{base_url}/properties", json=large_payload, timeout=30)
        print(f"Large payload response: {response.status_code}")
        if response.status_code == 413:
            print("✓ Large payload correctly rejected with 413")
            print(f"Response: {response.text[:200]}...")
        else:
            print(f"Unexpected response: {response.text[:200]}...")
    except requests.exceptions.RequestException as e:
        print(f"Large payload error: {e}")
    
    # Test 3: Medium payload (should work)
    print("\nTest 3: Medium payload (~20MB)...")
    medium_images = [create_large_base64_image(5) for _ in range(3)]  # 3 x 5MB = ~15MB
    medium_payload = {
        "title": "Test Property Medium",
        "description": "Test description",
        "property_type": "room",
        "rent": 5000,
        "deposit": 10000,
        "location": "Test Location", 
        "city": "Test City",
        "images": medium_images,
        "amenities": ["test"]
    }
    
    try:
        response = requests.post(f"{base_url}/properties", json=medium_payload, timeout=30)
        print(f"Medium payload response: {response.status_code}")
        if response.status_code == 401:
            print("✓ Medium payload accepted (authentication required, which is expected)")
        elif response.status_code == 413:
            print("⚠ Medium payload rejected - might need adjustment")
        else:
            print(f"Response: {response.text[:200]}...")
    except requests.exceptions.RequestException as e:
        print(f"Medium payload error: {e}")

if __name__ == "__main__":
    print("Testing 413 Request Entity Too Large fix...")
    print("=" * 50)
    test_property_creation()
    print("=" * 50)
    print("Test completed!")