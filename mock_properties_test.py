#!/usr/bin/env python3
"""
Mock Properties Data Quality Testing for GetRentals Application
Tests the backend API to verify mock properties are working correctly across multiple cities
Focus on property data quality, city coverage, search functionality, and data consistency
"""

import requests
import json
import time
from typing import Dict, Any, List, Optional

# Configuration
BASE_URL = "https://getrentals.online/api"
HEADERS = {"Content-Type": "application/json"}

class MockPropertiesDataTester:
    def __init__(self):
        self.base_url = BASE_URL
        self.headers = HEADERS.copy()
        self.results = {
            "passed": 0,
            "failed": 0,
            "errors": [],
            "properties_data": [],
            "cities_found": set(),
            "property_types_found": set()
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
            else:
                return None, f"Unsupported method: {method}"
            
            return response, None
        except requests.exceptions.RequestException as e:
            return None, f"Request failed: {str(e)}"

    def test_api_health_check(self):
        """Test basic API health check"""
        print("\n=== Testing API Health Check ===")
        
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

    def test_get_all_properties(self):
        """Test getting all properties and analyze the data"""
        print("\n=== Testing Get All Properties & Data Analysis ===")
        
        response, error = self.make_request("GET", "/properties")
        if error:
            self.log_result("Get All Properties", False, error)
            return []
        
        if response.status_code == 200:
            try:
                properties = response.json()
                if isinstance(properties, list):
                    self.results["properties_data"] = properties
                    self.log_result("Get All Properties", True, f"Retrieved {len(properties)} properties from database")
                    
                    # Analyze the data
                    self.analyze_properties_data(properties)
                    return properties
                else:
                    self.log_result("Get All Properties", False, "Response is not a list")
                    return []
            except json.JSONDecodeError:
                self.log_result("Get All Properties", False, "Invalid JSON response")
                return []
        else:
            self.log_result("Get All Properties", False, f"HTTP {response.status_code}")
            return []

    def analyze_properties_data(self, properties: List[Dict]):
        """Analyze the quality and consistency of properties data"""
        print("\n=== Analyzing Properties Data Quality ===")
        
        if not properties:
            self.log_result("Properties Data Analysis", False, "No properties found in database")
            return
        
        # Required fields for each property
        required_fields = ["id", "title", "description", "property_type", "rent", "deposit", 
                          "location", "city", "images", "amenities", "available", "created_at"]
        
        # Data quality checks
        missing_fields_count = 0
        invalid_rent_count = 0
        empty_title_count = 0
        empty_description_count = 0
        invalid_property_type_count = 0
        
        valid_property_types = {"room", "house", "pg"}
        cities = set()
        property_types = set()
        rent_ranges = {"min": float('inf'), "max": 0}
        
        for i, prop in enumerate(properties):
            # Check required fields
            missing_fields = [field for field in required_fields if field not in prop]
            if missing_fields:
                missing_fields_count += 1
                print(f"   Property {i+1} missing fields: {missing_fields}")
            
            # Check data quality
            if prop.get("rent", 0) <= 0:
                invalid_rent_count += 1
            
            if not prop.get("title", "").strip():
                empty_title_count += 1
            
            if not prop.get("description", "").strip():
                empty_description_count += 1
            
            if prop.get("property_type") not in valid_property_types:
                invalid_property_type_count += 1
            
            # Collect statistics
            if prop.get("city"):
                cities.add(prop["city"])
            if prop.get("property_type"):
                property_types.add(prop["property_type"])
            
            rent = prop.get("rent", 0)
            if rent > 0:
                rent_ranges["min"] = min(rent_ranges["min"], rent)
                rent_ranges["max"] = max(rent_ranges["max"], rent)
        
        # Store for later use
        self.results["cities_found"] = cities
        self.results["property_types_found"] = property_types
        
        # Report findings
        total_properties = len(properties)
        
        if missing_fields_count == 0:
            self.log_result("Required Fields Check", True, f"All {total_properties} properties have required fields")
        else:
            self.log_result("Required Fields Check", False, f"{missing_fields_count}/{total_properties} properties missing required fields")
        
        if invalid_rent_count == 0:
            self.log_result("Rent Values Check", True, f"All properties have valid rent values")
        else:
            self.log_result("Rent Values Check", False, f"{invalid_rent_count}/{total_properties} properties have invalid rent values")
        
        if empty_title_count == 0:
            self.log_result("Property Titles Check", True, f"All properties have non-empty titles")
        else:
            self.log_result("Property Titles Check", False, f"{empty_title_count}/{total_properties} properties have empty titles")
        
        if empty_description_count == 0:
            self.log_result("Property Descriptions Check", True, f"All properties have non-empty descriptions")
        else:
            self.log_result("Property Descriptions Check", False, f"{empty_description_count}/{total_properties} properties have empty descriptions")
        
        if invalid_property_type_count == 0:
            self.log_result("Property Types Check", True, f"All properties have valid types: {property_types}")
        else:
            self.log_result("Property Types Check", False, f"{invalid_property_type_count}/{total_properties} properties have invalid types")
        
        # City coverage analysis
        expected_major_cities = {"Delhi", "Mumbai", "Bangalore", "Chennai", "Pune", "Hyderabad", "Kolkata", "Ahmedabad"}
        found_major_cities = cities.intersection(expected_major_cities)
        
        self.log_result("City Coverage Check", True, f"Found {len(cities)} unique cities, including {len(found_major_cities)} major cities: {sorted(found_major_cities)}")
        
        # Rent range analysis
        if rent_ranges["min"] != float('inf'):
            self.log_result("Rent Range Analysis", True, f"Rent ranges from ₹{rent_ranges['min']:,} to ₹{rent_ranges['max']:,}")
        
        print(f"\n📊 DATA SUMMARY:")
        print(f"   Total Properties: {total_properties}")
        print(f"   Unique Cities: {len(cities)}")
        print(f"   Property Types: {sorted(property_types)}")
        print(f"   Cities Found: {sorted(list(cities))[:10]}{'...' if len(cities) > 10 else ''}")

    def test_city_filtering(self):
        """Test city-based filtering with multiple Indian cities"""
        print("\n=== Testing City-Based Filtering ===")
        
        # Test major Indian cities
        test_cities = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Pune", "Hyderabad", "Kolkata", "Ahmedabad", "Faridabad", "Gurgaon"]
        
        cities_with_properties = []
        
        for city in test_cities:
            response, error = self.make_request("GET", "/properties", {"city": city})
            if error:
                self.log_result(f"City Filter - {city}", False, error)
                continue
            
            if response.status_code == 200:
                try:
                    properties = response.json()
                    if isinstance(properties, list):
                        if len(properties) > 0:
                            cities_with_properties.append(city)
                            self.log_result(f"City Filter - {city}", True, f"Found {len(properties)} properties")
                            
                            # Verify all returned properties are from the requested city
                            all_correct_city = all(prop.get("city", "").lower() == city.lower() for prop in properties)
                            if all_correct_city:
                                self.log_result(f"City Filter Accuracy - {city}", True, "All properties match requested city")
                            else:
                                self.log_result(f"City Filter Accuracy - {city}", False, "Some properties don't match requested city")
                        else:
                            self.log_result(f"City Filter - {city}", True, f"No properties found in {city} (expected)")
                    else:
                        self.log_result(f"City Filter - {city}", False, "Invalid response format")
                except json.JSONDecodeError:
                    self.log_result(f"City Filter - {city}", False, "Invalid JSON response")
            else:
                self.log_result(f"City Filter - {city}", False, f"HTTP {response.status_code}")
        
        if cities_with_properties:
            self.log_result("City Coverage Summary", True, f"Found properties in {len(cities_with_properties)} cities: {cities_with_properties}")
        else:
            self.log_result("City Coverage Summary", False, "No properties found in any tested cities")

    def test_property_type_filtering(self):
        """Test property type filtering"""
        print("\n=== Testing Property Type Filtering ===")
        
        property_types = ["room", "house", "pg"]
        
        for prop_type in property_types:
            response, error = self.make_request("GET", "/properties", {"property_type": prop_type})
            if error:
                self.log_result(f"Property Type Filter - {prop_type}", False, error)
                continue
            
            if response.status_code == 200:
                try:
                    properties = response.json()
                    if isinstance(properties, list):
                        if len(properties) > 0:
                            self.log_result(f"Property Type Filter - {prop_type}", True, f"Found {len(properties)} {prop_type} properties")
                            
                            # Verify all returned properties are of the requested type
                            all_correct_type = all(prop.get("property_type") == prop_type for prop in properties)
                            if all_correct_type:
                                self.log_result(f"Property Type Accuracy - {prop_type}", True, "All properties match requested type")
                            else:
                                self.log_result(f"Property Type Accuracy - {prop_type}", False, "Some properties don't match requested type")
                        else:
                            self.log_result(f"Property Type Filter - {prop_type}", True, f"No {prop_type} properties found")
                    else:
                        self.log_result(f"Property Type Filter - {prop_type}", False, "Invalid response format")
                except json.JSONDecodeError:
                    self.log_result(f"Property Type Filter - {prop_type}", False, "Invalid JSON response")
            else:
                self.log_result(f"Property Type Filter - {prop_type}", False, f"HTTP {response.status_code}")

    def test_rent_range_filtering(self):
        """Test rent range filtering with realistic Indian rent ranges"""
        print("\n=== Testing Rent Range Filtering ===")
        
        # Test different rent ranges typical for Indian cities
        rent_ranges = [
            {"min_rent": 3000, "max_rent": 10000, "description": "Budget range (₹3K-10K)"},
            {"min_rent": 10000, "max_rent": 25000, "description": "Mid range (₹10K-25K)"},
            {"min_rent": 25000, "max_rent": 50000, "description": "Premium range (₹25K-50K)"},
            {"min_rent": 50000, "max_rent": 80000, "description": "Luxury range (₹50K-80K)"},
            {"min_rent": 5000, "description": "Minimum ₹5K+"},
            {"max_rent": 30000, "description": "Maximum ₹30K"}
        ]
        
        for rent_range in rent_ranges:
            params = {}
            if "min_rent" in rent_range:
                params["min_rent"] = rent_range["min_rent"]
            if "max_rent" in rent_range:
                params["max_rent"] = rent_range["max_rent"]
            
            response, error = self.make_request("GET", "/properties", params)
            if error:
                self.log_result(f"Rent Range Filter - {rent_range['description']}", False, error)
                continue
            
            if response.status_code == 200:
                try:
                    properties = response.json()
                    if isinstance(properties, list):
                        self.log_result(f"Rent Range Filter - {rent_range['description']}", True, f"Found {len(properties)} properties")
                        
                        # Verify all returned properties are within the requested range
                        if properties:
                            valid_range = True
                            for prop in properties:
                                rent = prop.get("rent", 0)
                                if "min_rent" in params and rent < params["min_rent"]:
                                    valid_range = False
                                    break
                                if "max_rent" in params and rent > params["max_rent"]:
                                    valid_range = False
                                    break
                            
                            if valid_range:
                                self.log_result(f"Rent Range Accuracy - {rent_range['description']}", True, "All properties within requested range")
                            else:
                                self.log_result(f"Rent Range Accuracy - {rent_range['description']}", False, "Some properties outside requested range")
                    else:
                        self.log_result(f"Rent Range Filter - {rent_range['description']}", False, "Invalid response format")
                except json.JSONDecodeError:
                    self.log_result(f"Rent Range Filter - {rent_range['description']}", False, "Invalid JSON response")
            else:
                self.log_result(f"Rent Range Filter - {rent_range['description']}", False, f"HTTP {response.status_code}")

    def test_combined_filters(self):
        """Test combining multiple filters"""
        print("\n=== Testing Combined Filters ===")
        
        # Test combinations that should return results
        filter_combinations = [
            {"city": "Bangalore", "property_type": "room", "description": "Bangalore rooms"},
            {"city": "Delhi", "property_type": "house", "description": "Delhi houses"},
            {"city": "Mumbai", "min_rent": 15000, "max_rent": 40000, "description": "Mumbai mid-range"},
            {"property_type": "pg", "min_rent": 8000, "max_rent": 20000, "description": "PG mid-range"},
            {"city": "Pune", "property_type": "room", "min_rent": 5000, "max_rent": 15000, "description": "Pune budget rooms"}
        ]
        
        for filters in filter_combinations:
            description = filters.pop("description")
            
            response, error = self.make_request("GET", "/properties", filters)
            if error:
                self.log_result(f"Combined Filter - {description}", False, error)
                continue
            
            if response.status_code == 200:
                try:
                    properties = response.json()
                    if isinstance(properties, list):
                        self.log_result(f"Combined Filter - {description}", True, f"Found {len(properties)} properties")
                        
                        # Verify properties match all filters
                        if properties:
                            all_match = True
                            for prop in properties:
                                if "city" in filters and prop.get("city", "").lower() != filters["city"].lower():
                                    all_match = False
                                    break
                                if "property_type" in filters and prop.get("property_type") != filters["property_type"]:
                                    all_match = False
                                    break
                                if "min_rent" in filters and prop.get("rent", 0) < filters["min_rent"]:
                                    all_match = False
                                    break
                                if "max_rent" in filters and prop.get("rent", 0) > filters["max_rent"]:
                                    all_match = False
                                    break
                            
                            if all_match:
                                self.log_result(f"Combined Filter Accuracy - {description}", True, "All properties match combined filters")
                            else:
                                self.log_result(f"Combined Filter Accuracy - {description}", False, "Some properties don't match all filters")
                    else:
                        self.log_result(f"Combined Filter - {description}", False, "Invalid response format")
                except json.JSONDecodeError:
                    self.log_result(f"Combined Filter - {description}", False, "Invalid JSON response")
            else:
                self.log_result(f"Combined Filter - {description}", False, f"HTTP {response.status_code}")

    def test_pagination(self):
        """Test pagination functionality"""
        print("\n=== Testing Pagination ===")
        
        # Test basic pagination
        response, error = self.make_request("GET", "/properties", {"skip": 0, "limit": 5})
        if error:
            self.log_result("Pagination - First Page", False, error)
        elif response.status_code == 200:
            try:
                properties = response.json()
                if isinstance(properties, list):
                    first_page_count = len(properties)
                    self.log_result("Pagination - First Page", True, f"Retrieved {first_page_count} properties (limit 5)")
                    
                    # Test second page
                    response2, error2 = self.make_request("GET", "/properties", {"skip": 5, "limit": 5})
                    if not error2 and response2.status_code == 200:
                        properties2 = response2.json()
                        if isinstance(properties2, list):
                            second_page_count = len(properties2)
                            self.log_result("Pagination - Second Page", True, f"Retrieved {second_page_count} properties (skip 5, limit 5)")
                            
                            # Check for overlap (should be none)
                            first_ids = {prop.get("id") for prop in properties}
                            second_ids = {prop.get("id") for prop in properties2}
                            overlap = first_ids.intersection(second_ids)
                            
                            if not overlap:
                                self.log_result("Pagination - No Overlap", True, "No duplicate properties between pages")
                            else:
                                self.log_result("Pagination - No Overlap", False, f"Found {len(overlap)} duplicate properties")
                        else:
                            self.log_result("Pagination - Second Page", False, "Invalid response format")
                    else:
                        self.log_result("Pagination - Second Page", False, "Failed to get second page")
                else:
                    self.log_result("Pagination - First Page", False, "Invalid response format")
            except json.JSONDecodeError:
                self.log_result("Pagination - First Page", False, "Invalid JSON response")
        else:
            self.log_result("Pagination - First Page", False, f"HTTP {response.status_code}")

    def test_data_realism(self):
        """Test the realism of property data"""
        print("\n=== Testing Data Realism ===")
        
        if not self.results["properties_data"]:
            self.log_result("Data Realism Check", False, "No properties data available")
            return
        
        properties = self.results["properties_data"]
        
        # Check for realistic titles
        realistic_title_keywords = ["bhk", "room", "apartment", "flat", "pg", "hostel", "accommodation", 
                                   "furnished", "unfurnished", "spacious", "cozy", "modern", "luxury"]
        
        realistic_titles = 0
        for prop in properties:
            title = prop.get("title", "").lower()
            if any(keyword in title for keyword in realistic_title_keywords):
                realistic_titles += 1
        
        title_realism_rate = (realistic_titles / len(properties)) * 100 if properties else 0
        if title_realism_rate >= 70:
            self.log_result("Title Realism Check", True, f"{title_realism_rate:.1f}% of titles contain realistic keywords")
        else:
            self.log_result("Title Realism Check", False, f"Only {title_realism_rate:.1f}% of titles contain realistic keywords")
        
        # Check for realistic amenities
        common_amenities = ["wifi", "parking", "security", "gym", "swimming", "ac", "furnished", 
                           "kitchen", "laundry", "elevator", "balcony", "garden"]
        
        properties_with_amenities = 0
        for prop in properties:
            amenities = prop.get("amenities", [])
            if isinstance(amenities, list) and len(amenities) > 0:
                properties_with_amenities += 1
        
        amenities_rate = (properties_with_amenities / len(properties)) * 100 if properties else 0
        if amenities_rate >= 80:
            self.log_result("Amenities Presence Check", True, f"{amenities_rate:.1f}% of properties have amenities listed")
        else:
            self.log_result("Amenities Presence Check", False, f"Only {amenities_rate:.1f}% of properties have amenities listed")
        
        # Check rent reasonableness for Indian market
        reasonable_rent_count = 0
        for prop in properties:
            rent = prop.get("rent", 0)
            # Reasonable range for Indian rental market: ₹3,000 to ₹80,000
            if 3000 <= rent <= 80000:
                reasonable_rent_count += 1
        
        rent_reasonableness = (reasonable_rent_count / len(properties)) * 100 if properties else 0
        if rent_reasonableness >= 90:
            self.log_result("Rent Reasonableness Check", True, f"{rent_reasonableness:.1f}% of properties have reasonable rent (₹3K-80K)")
        else:
            self.log_result("Rent Reasonableness Check", False, f"Only {rent_reasonableness:.1f}% of properties have reasonable rent")

    def run_comprehensive_test(self):
        """Run all mock properties tests"""
        print("🏠 Starting GetRentals Mock Properties Data Quality Tests")
        print("=" * 60)
        
        # Test sequence
        if not self.test_api_health_check():
            print("❌ API is not responding. Stopping tests.")
            return
        
        # Get and analyze all properties
        properties = self.test_get_all_properties()
        
        if not properties:
            print("❌ No properties found. Cannot continue with data quality tests.")
            return
        
        # Run all data quality tests
        self.test_city_filtering()
        self.test_property_type_filtering()
        self.test_rent_range_filtering()
        self.test_combined_filters()
        self.test_pagination()
        self.test_data_realism()
        
        # Print comprehensive summary
        self.print_comprehensive_summary()
        
        return self.results

    def print_comprehensive_summary(self):
        """Print detailed test summary"""
        print("\n" + "=" * 60)
        print("🏁 MOCK PROPERTIES DATA QUALITY TEST SUMMARY")
        print("=" * 60)
        
        total_tests = self.results['passed'] + self.results['failed']
        success_rate = (self.results['passed'] / total_tests) * 100 if total_tests > 0 else 0
        
        print(f"✅ Passed: {self.results['passed']}")
        print(f"❌ Failed: {self.results['failed']}")
        print(f"📊 Total: {total_tests}")
        print(f"🎯 Success Rate: {success_rate:.1f}%")
        
        # Data summary
        properties_count = len(self.results["properties_data"])
        cities_count = len(self.results["cities_found"])
        property_types_count = len(self.results["property_types_found"])
        
        print(f"\n📈 DATA OVERVIEW:")
        print(f"   Total Properties: {properties_count}")
        print(f"   Unique Cities: {cities_count}")
        print(f"   Property Types: {property_types_count}")
        
        if self.results["cities_found"]:
            print(f"   Cities: {sorted(list(self.results['cities_found']))}")
        if self.results["property_types_found"]:
            print(f"   Types: {sorted(list(self.results['property_types_found']))}")
        
        if self.results['errors']:
            print(f"\n🔍 FAILED TESTS:")
            for error in self.results['errors']:
                print(f"   • {error}")
        
        # Final verdict
        if success_rate >= 90:
            print(f"\n🎉 EXCELLENT: Mock properties data is high quality and API is working perfectly!")
        elif success_rate >= 75:
            print(f"\n✅ GOOD: Mock properties data is good quality with minor issues.")
        elif success_rate >= 50:
            print(f"\n⚠️  FAIR: Mock properties data has some quality issues that need attention.")
        else:
            print(f"\n❌ POOR: Mock properties data has significant quality issues.")

if __name__ == "__main__":
    tester = MockPropertiesDataTester()
    results = tester.run_comprehensive_test()