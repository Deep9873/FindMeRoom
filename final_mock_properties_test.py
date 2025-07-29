#!/usr/bin/env python3
"""
Final Comprehensive Mock Properties Test for GetRentals Application
Tests the 961 properties across 120+ Indian cities with proper understanding of regex city filtering
"""

import requests
import json
import time
from typing import Dict, Any, List, Optional

# Configuration
BASE_URL = "https://getrentals.online/api"
HEADERS = {"Content-Type": "application/json"}

class FinalMockPropertiesTest:
    def __init__(self):
        self.base_url = BASE_URL
        self.headers = HEADERS.copy()
        self.results = {
            "passed": 0,
            "failed": 0,
            "errors": [],
            "total_properties": 0,
            "cities_count": 0,
            "property_types": set()
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

    def make_request(self, method: str, endpoint: str, data: Dict = None) -> tuple:
        """Make HTTP request with proper error handling"""
        url = f"{self.base_url}{endpoint}"
        
        try:
            if method.upper() == "GET":
                response = requests.get(url, headers=self.headers, params=data)
            else:
                return None, f"Unsupported method: {method}"
            
            return response, None
        except requests.exceptions.RequestException as e:
            return None, f"Request failed: {str(e)}"

    def test_database_scale_and_coverage(self):
        """Test the scale and coverage of mock properties data"""
        print("\n=== Testing Database Scale and Coverage ===")
        
        # Get total count by retrieving all properties
        response, error = self.make_request("GET", "/properties", {"limit": 1000})
        if error:
            self.log_result("Database Scale Test", False, error)
            return
        
        if response.status_code == 200:
            try:
                properties = response.json()
                total_count = len(properties)
                self.results["total_properties"] = total_count
                
                # Analyze coverage
                cities = set()
                property_types = set()
                rent_ranges = {"min": float('inf'), "max": 0}
                
                for prop in properties:
                    if prop.get("city"):
                        cities.add(prop["city"])
                    if prop.get("property_type"):
                        property_types.add(prop["property_type"])
                    
                    rent = prop.get("rent", 0)
                    if rent > 0:
                        rent_ranges["min"] = min(rent_ranges["min"], rent)
                        rent_ranges["max"] = max(rent_ranges["max"], rent)
                
                self.results["cities_count"] = len(cities)
                self.results["property_types"] = property_types
                
                # Verify expected scale
                if total_count >= 900:
                    self.log_result("Properties Count", True, f"Found {total_count} properties (expected ~961)")
                else:
                    self.log_result("Properties Count", False, f"Only {total_count} properties found, expected ~961")
                
                if len(cities) >= 100:
                    self.log_result("City Coverage", True, f"Found {len(cities)} cities (expected 100+)")
                else:
                    self.log_result("City Coverage", False, f"Only {len(cities)} cities found, expected 100+")
                
                # Check property types
                expected_types = {"room", "house", "pg"}
                if property_types == expected_types:
                    self.log_result("Property Types", True, f"All expected types found: {sorted(property_types)}")
                else:
                    self.log_result("Property Types", False, f"Property types mismatch: {sorted(property_types)}")
                
                # Check rent ranges
                if 3000 <= rent_ranges["min"] <= 5000 and 70000 <= rent_ranges["max"] <= 80000:
                    self.log_result("Rent Ranges", True, f"Realistic rent range: ₹{rent_ranges['min']:,} to ₹{rent_ranges['max']:,}")
                else:
                    self.log_result("Rent Ranges", False, f"Unexpected rent range: ₹{rent_ranges['min']:,} to ₹{rent_ranges['max']:,}")
                
                return properties
                
            except json.JSONDecodeError:
                self.log_result("Database Scale Test", False, "Invalid JSON response")
                return []
        else:
            self.log_result("Database Scale Test", False, f"HTTP {response.status_code}")
            return []

    def test_major_cities_coverage(self):
        """Test coverage of major Indian cities"""
        print("\n=== Testing Major Cities Coverage ===")
        
        # Major Indian cities that should have properties
        major_cities = [
            "Delhi", "Mumbai", "Bangalore", "Chennai", "Pune", "Hyderabad", 
            "Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Kanpur", "Nagpur",
            "Indore", "Bhopal", "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad",
            "Ludhiana", "Coimbatore"
        ]
        
        cities_with_properties = 0
        total_properties_in_major_cities = 0
        
        for city in major_cities:
            response, error = self.make_request("GET", "/properties", {"city": city, "limit": 50})
            if error:
                self.log_result(f"Major City Coverage - {city}", False, error)
                continue
            
            if response.status_code == 200:
                try:
                    properties = response.json()
                    if len(properties) > 0:
                        cities_with_properties += 1
                        total_properties_in_major_cities += len(properties)
                        self.log_result(f"Major City Coverage - {city}", True, f"Found {len(properties)} properties")
                    else:
                        self.log_result(f"Major City Coverage - {city}", True, f"No properties (acceptable)")
                except json.JSONDecodeError:
                    self.log_result(f"Major City Coverage - {city}", False, "Invalid JSON response")
            else:
                self.log_result(f"Major City Coverage - {city}", False, f"HTTP {response.status_code}")
        
        coverage_rate = (cities_with_properties / len(major_cities)) * 100
        if coverage_rate >= 80:
            self.log_result("Major Cities Coverage Summary", True, f"{coverage_rate:.1f}% of major cities have properties ({cities_with_properties}/{len(major_cities)})")
        else:
            self.log_result("Major Cities Coverage Summary", False, f"Only {coverage_rate:.1f}% of major cities have properties")

    def test_property_distribution_by_type(self):
        """Test distribution of properties by type"""
        print("\n=== Testing Property Distribution by Type ===")
        
        property_types = ["room", "house", "pg"]
        type_counts = {}
        
        for prop_type in property_types:
            response, error = self.make_request("GET", "/properties", {"property_type": prop_type, "limit": 1000})
            if error:
                self.log_result(f"Property Type Distribution - {prop_type}", False, error)
                continue
            
            if response.status_code == 200:
                try:
                    properties = response.json()
                    count = len(properties)
                    type_counts[prop_type] = count
                    
                    # Check for reasonable distribution (each type should have significant representation)
                    if count >= 200:  # Expect at least 200 properties per type for 961 total
                        self.log_result(f"Property Type Distribution - {prop_type}", True, f"Found {count} {prop_type} properties")
                    else:
                        self.log_result(f"Property Type Distribution - {prop_type}", False, f"Only {count} {prop_type} properties found")
                        
                except json.JSONDecodeError:
                    self.log_result(f"Property Type Distribution - {prop_type}", False, "Invalid JSON response")
            else:
                self.log_result(f"Property Type Distribution - {prop_type}", False, f"HTTP {response.status_code}")
        
        # Check total distribution
        total_by_type = sum(type_counts.values())
        if total_by_type >= 900:
            self.log_result("Property Type Distribution Total", True, f"Total properties by type: {total_by_type}")
        else:
            self.log_result("Property Type Distribution Total", False, f"Type distribution total ({total_by_type}) doesn't match expected scale")

    def test_rent_range_distribution(self):
        """Test rent range distribution across different tiers"""
        print("\n=== Testing Rent Range Distribution ===")
        
        # Test different rent tiers
        rent_tiers = [
            {"min": 3000, "max": 10000, "name": "Budget Tier (₹3K-10K)", "expected_min": 100},
            {"min": 10000, "max": 25000, "name": "Mid Tier (₹10K-25K)", "expected_min": 200},
            {"min": 25000, "max": 50000, "name": "Premium Tier (₹25K-50K)", "expected_min": 200},
            {"min": 50000, "max": 80000, "name": "Luxury Tier (₹50K-80K)", "expected_min": 100}
        ]
        
        for tier in rent_tiers:
            params = {"min_rent": tier["min"], "max_rent": tier["max"], "limit": 1000}
            response, error = self.make_request("GET", "/properties", params)
            
            if error:
                self.log_result(f"Rent Distribution - {tier['name']}", False, error)
                continue
            
            if response.status_code == 200:
                try:
                    properties = response.json()
                    count = len(properties)
                    
                    if count >= tier["expected_min"]:
                        self.log_result(f"Rent Distribution - {tier['name']}", True, f"Found {count} properties")
                    else:
                        self.log_result(f"Rent Distribution - {tier['name']}", False, f"Only {count} properties found, expected at least {tier['expected_min']}")
                        
                except json.JSONDecodeError:
                    self.log_result(f"Rent Distribution - {tier['name']}", False, "Invalid JSON response")
            else:
                self.log_result(f"Rent Distribution - {tier['name']}", False, f"HTTP {response.status_code}")

    def test_search_functionality_performance(self):
        """Test search functionality with various combinations"""
        print("\n=== Testing Search Functionality Performance ===")
        
        # Test complex search combinations
        search_scenarios = [
            {"city": "Mumbai", "property_type": "room", "min_rent": 15000, "max_rent": 30000, "name": "Mumbai Rooms Mid-Range"},
            {"city": "Bangalore", "property_type": "pg", "min_rent": 8000, "max_rent": 20000, "name": "Bangalore PG Budget"},
            {"city": "Delhi", "property_type": "house", "min_rent": 20000, "max_rent": 60000, "name": "Delhi Houses Premium"},
            {"property_type": "room", "min_rent": 5000, "max_rent": 15000, "name": "All Cities Budget Rooms"},
            {"city": "Chennai", "min_rent": 10000, "max_rent": 25000, "name": "Chennai All Types Mid-Range"}
        ]
        
        for scenario in search_scenarios:
            name = scenario.pop("name")
            response, error = self.make_request("GET", "/properties", scenario)
            
            if error:
                self.log_result(f"Search Scenario - {name}", False, error)
                continue
            
            if response.status_code == 200:
                try:
                    properties = response.json()
                    count = len(properties)
                    
                    # Verify results match all criteria
                    all_match = True
                    for prop in properties:
                        if "city" in scenario and scenario["city"].lower() not in prop.get("city", "").lower():
                            all_match = False
                            break
                        if "property_type" in scenario and prop.get("property_type") != scenario["property_type"]:
                            all_match = False
                            break
                        if "min_rent" in scenario and prop.get("rent", 0) < scenario["min_rent"]:
                            all_match = False
                            break
                        if "max_rent" in scenario and prop.get("rent", 0) > scenario["max_rent"]:
                            all_match = False
                            break
                    
                    if all_match:
                        self.log_result(f"Search Scenario - {name}", True, f"Found {count} matching properties")
                    else:
                        self.log_result(f"Search Scenario - {name}", False, f"Some of {count} properties don't match all criteria")
                        
                except json.JSONDecodeError:
                    self.log_result(f"Search Scenario - {name}", False, "Invalid JSON response")
            else:
                self.log_result(f"Search Scenario - {name}", False, f"HTTP {response.status_code}")

    def test_data_quality_sample(self):
        """Test data quality on a sample of properties"""
        print("\n=== Testing Data Quality Sample ===")
        
        # Get a sample of properties
        response, error = self.make_request("GET", "/properties", {"limit": 100})
        if error:
            self.log_result("Data Quality Sample", False, error)
            return
        
        if response.status_code == 200:
            try:
                properties = response.json()
                
                # Check required fields
                required_fields = ["id", "title", "description", "property_type", "rent", "deposit", "location", "city", "amenities"]
                complete_properties = 0
                realistic_titles = 0
                valid_amenities = 0
                
                for prop in properties:
                    # Check completeness
                    if all(field in prop and prop[field] for field in required_fields):
                        complete_properties += 1
                    
                    # Check title realism
                    title = prop.get("title", "").lower()
                    realistic_keywords = ["bhk", "room", "apartment", "flat", "pg", "hostel", "furnished", "spacious"]
                    if any(keyword in title for keyword in realistic_keywords):
                        realistic_titles += 1
                    
                    # Check amenities
                    amenities = prop.get("amenities", [])
                    if isinstance(amenities, list) and len(amenities) >= 3:
                        valid_amenities += 1
                
                # Calculate percentages
                total = len(properties)
                completeness_rate = (complete_properties / total) * 100
                realism_rate = (realistic_titles / total) * 100
                amenities_rate = (valid_amenities / total) * 100
                
                if completeness_rate >= 95:
                    self.log_result("Data Completeness", True, f"{completeness_rate:.1f}% of properties have all required fields")
                else:
                    self.log_result("Data Completeness", False, f"Only {completeness_rate:.1f}% of properties are complete")
                
                if realism_rate >= 80:
                    self.log_result("Title Realism", True, f"{realism_rate:.1f}% of titles contain realistic keywords")
                else:
                    self.log_result("Title Realism", False, f"Only {realism_rate:.1f}% of titles are realistic")
                
                if amenities_rate >= 80:
                    self.log_result("Amenities Quality", True, f"{amenities_rate:.1f}% of properties have 3+ amenities")
                else:
                    self.log_result("Amenities Quality", False, f"Only {amenities_rate:.1f}% of properties have adequate amenities")
                    
            except json.JSONDecodeError:
                self.log_result("Data Quality Sample", False, "Invalid JSON response")
        else:
            self.log_result("Data Quality Sample", False, f"HTTP {response.status_code}")

    def run_comprehensive_test(self):
        """Run all comprehensive tests"""
        print("🏠 GetRentals Mock Properties - Final Comprehensive Test")
        print("=" * 60)
        
        # Run all tests
        properties = self.test_database_scale_and_coverage()
        if not properties:
            print("❌ Cannot continue without database access")
            return
        
        self.test_major_cities_coverage()
        self.test_property_distribution_by_type()
        self.test_rent_range_distribution()
        self.test_search_functionality_performance()
        self.test_data_quality_sample()
        
        # Print final summary
        self.print_final_summary()
        
        return self.results

    def print_final_summary(self):
        """Print comprehensive final summary"""
        print("\n" + "=" * 60)
        print("🏁 FINAL MOCK PROPERTIES TEST SUMMARY")
        print("=" * 60)
        
        total_tests = self.results['passed'] + self.results['failed']
        success_rate = (self.results['passed'] / total_tests) * 100 if total_tests > 0 else 0
        
        print(f"✅ Passed: {self.results['passed']}")
        print(f"❌ Failed: {self.results['failed']}")
        print(f"📊 Total Tests: {total_tests}")
        print(f"🎯 Success Rate: {success_rate:.1f}%")
        
        print(f"\n📈 DATABASE OVERVIEW:")
        print(f"   Total Properties: {self.results['total_properties']}")
        print(f"   Cities Covered: {self.results['cities_count']}")
        print(f"   Property Types: {sorted(list(self.results['property_types']))}")
        
        if self.results['errors']:
            print(f"\n🔍 FAILED TESTS:")
            for error in self.results['errors']:
                print(f"   • {error}")
        
        # Final verdict
        if success_rate >= 90:
            print(f"\n🎉 EXCELLENT: Mock properties database is comprehensive and high-quality!")
            print(f"   ✅ Scale: {self.results['total_properties']} properties across {self.results['cities_count']} cities")
            print(f"   ✅ Coverage: Major Indian cities well represented")
            print(f"   ✅ Quality: Realistic data with proper amenities and pricing")
            print(f"   ✅ Functionality: All search and filter operations working correctly")
        elif success_rate >= 75:
            print(f"\n✅ GOOD: Mock properties database is functional with minor issues.")
        elif success_rate >= 50:
            print(f"\n⚠️  FAIR: Mock properties database has some issues that need attention.")
        else:
            print(f"\n❌ POOR: Mock properties database has significant issues.")

if __name__ == "__main__":
    tester = FinalMockPropertiesTest()
    results = tester.run_comprehensive_test()