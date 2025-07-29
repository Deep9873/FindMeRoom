#!/usr/bin/env python3
"""
Detailed investigation of city filtering issues in GetRentals API
"""

import requests
import json

BASE_URL = "https://getrentals.online/api"

def investigate_city_filtering():
    print("🔍 Investigating City Filtering Issues")
    print("=" * 50)
    
    # Get all properties first
    response = requests.get(f"{BASE_URL}/properties")
    if response.status_code == 200:
        all_properties = response.json()
        print(f"Total properties in database: {len(all_properties)}")
        
        # Show actual cities in database
        cities_in_db = set()
        for prop in all_properties:
            cities_in_db.add(prop.get("city", ""))
        
        print(f"Actual cities in database: {sorted(list(cities_in_db))}")
        
        # Test Delhi filter specifically
        print(f"\n--- Testing Delhi Filter ---")
        response = requests.get(f"{BASE_URL}/properties", params={"city": "Delhi"})
        if response.status_code == 200:
            delhi_properties = response.json()
            print(f"Properties returned for Delhi filter: {len(delhi_properties)}")
            
            # Show what cities are actually returned
            returned_cities = set()
            for prop in delhi_properties:
                returned_cities.add(prop.get("city", ""))
            
            print(f"Cities in Delhi filter results: {sorted(list(returned_cities))}")
            
            # Show first few properties
            print(f"\nFirst 3 properties from Delhi filter:")
            for i, prop in enumerate(delhi_properties[:3]):
                print(f"  {i+1}. Title: {prop.get('title', 'N/A')}")
                print(f"     City: {prop.get('city', 'N/A')}")
                print(f"     Type: {prop.get('property_type', 'N/A')}")
                print(f"     Rent: ₹{prop.get('rent', 0):,}")
                print()
        
        # Test exact city match
        print(f"\n--- Testing Exact City Matches ---")
        for city in ["Delhi", "New Delhi", "Mumbai, Maharashtra", "Faridabad, Haryana"]:
            response = requests.get(f"{BASE_URL}/properties", params={"city": city})
            if response.status_code == 200:
                properties = response.json()
                exact_matches = [p for p in properties if p.get("city", "").lower() == city.lower()]
                print(f"{city}: {len(properties)} total, {len(exact_matches)} exact matches")
    
    else:
        print(f"Failed to get properties: {response.status_code}")

if __name__ == "__main__":
    investigate_city_filtering()