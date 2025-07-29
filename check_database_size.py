#!/usr/bin/env python3
"""
Check if there are more properties in the database and verify the expected 961 properties
"""

import requests
import json

BASE_URL = "https://getrentals.online/api"

def check_database_size():
    print("📊 Checking Database Size and Content")
    print("=" * 50)
    
    # Try to get all properties with a high limit
    response = requests.get(f"{BASE_URL}/properties", params={"limit": 1000})
    if response.status_code == 200:
        all_properties = response.json()
        print(f"Total properties retrieved: {len(all_properties)}")
        
        if len(all_properties) >= 20:
            print("⚠️  Only 20 properties found, but review request mentioned 961 properties")
            print("This suggests the database may not have been populated with mock data yet")
        
        # Analyze what we have
        cities = set()
        property_types = set()
        rent_ranges = {"min": float('inf'), "max": 0}
        
        for prop in all_properties:
            if prop.get("city"):
                cities.add(prop["city"])
            if prop.get("property_type"):
                property_types.add(prop["property_type"])
            
            rent = prop.get("rent", 0)
            if rent > 0:
                rent_ranges["min"] = min(rent_ranges["min"], rent)
                rent_ranges["max"] = max(rent_ranges["max"], rent)
        
        print(f"\nCurrent Database Analysis:")
        print(f"  Cities: {len(cities)} - {sorted(list(cities))}")
        print(f"  Property Types: {len(property_types)} - {sorted(list(property_types))}")
        print(f"  Rent Range: ₹{rent_ranges['min']:,} to ₹{rent_ranges['max']:,}")
        
        # Check if these look like real mock data
        sample_titles = [prop.get("title", "") for prop in all_properties[:5]]
        print(f"\nSample Property Titles:")
        for i, title in enumerate(sample_titles, 1):
            print(f"  {i}. {title}")
        
        # Test pagination to see if there are more
        print(f"\n--- Testing Pagination for More Properties ---")
        response2 = requests.get(f"{BASE_URL}/properties", params={"skip": 20, "limit": 20})
        if response2.status_code == 200:
            more_properties = response2.json()
            print(f"Properties with skip=20: {len(more_properties)}")
            
            if len(more_properties) > 0:
                print("✅ More properties found beyond the first 20")
                # Get total count by trying larger skips
                total_found = 20
                skip = 20
                while True:
                    response_test = requests.get(f"{BASE_URL}/properties", params={"skip": skip, "limit": 50})
                    if response_test.status_code == 200:
                        test_properties = response_test.json()
                        if len(test_properties) == 0:
                            break
                        total_found += len(test_properties)
                        skip += 50
                        if skip > 1000:  # Safety break
                            break
                    else:
                        break
                
                print(f"Estimated total properties: {total_found}")
            else:
                print("❌ No more properties found - database only has 20 properties")
    else:
        print(f"Failed to get properties: {response.status_code}")

if __name__ == "__main__":
    check_database_size()