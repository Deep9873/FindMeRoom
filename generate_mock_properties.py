#!/usr/bin/env python3
"""
Mock Property Generator for GetRentals
Creates realistic property listings for top 100 Indian cities
"""
import asyncio
import os
import sys
import random
import uuid
from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import base64
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent / 'backend'
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Top 100 Major Indian Cities (selected from the comprehensive list)
TOP_100_CITIES = [
    'Delhi', 'New Delhi', 'Mumbai, Maharashtra', 'Bangalore, Karnataka', 'Bengaluru, Karnataka',
    'Chennai, Tamil Nadu', 'Hyderabad, Telangana', 'Kolkata, West Bengal', 'Pune, Maharashtra',
    'Ahmedabad, Gujarat', 'Surat, Gujarat', 'Jaipur, Rajasthan', 'Lucknow, Uttar Pradesh',
    'Kanpur, Uttar Pradesh', 'Nagpur, Maharashtra', 'Indore, Madhya Pradesh', 'Thane, Maharashtra',
    'Bhopal, Madhya Pradesh', 'Visakhapatnam, Andhra Pradesh', 'Pimpri-Chinchwad, Maharashtra',
    'Patna, Bihar', 'Vadodara, Gujarat', 'Ghaziabad, Uttar Pradesh', 'Ludhiana, Punjab',
    'Agra, Uttar Pradesh', 'Nashik, Maharashtra', 'Faridabad, Haryana', 'Meerut, Uttar Pradesh',
    'Rajkot, Gujarat', 'Kalyan-Dombivli, Maharashtra', 'Vasai-Virar, Maharashtra', 'Varanasi, Uttar Pradesh',
    'Srinagar, Jammu and Kashmir', 'Dhanbad, Jharkhand', 'Amritsar, Punjab', 'Allahabad, Uttar Pradesh',
    'Ranchi, Jharkhand', 'Howrah, West Bengal', 'Coimbatore, Tamil Nadu', 'Jabalpur, Madhya Pradesh',
    'Gwalior, Madhya Pradesh', 'Vijayawada, Andhra Pradesh', 'Jodhpur, Rajasthan', 'Madurai, Tamil Nadu',
    'Raipur, Chhattisgarh', 'Kota, Rajasthan', 'Guwahati, Assam', 'Chandigarh, Chandigarh',
    'Solapur, Maharashtra', 'Hubballi-Dharwad, Karnataka', 'Tiruchirappalli, Tamil Nadu', 'Bareilly, Uttar Pradesh',
    'Mysore, Karnataka', 'Tiruppur, Tamil Nadu', 'Gurgaon, Haryana', 'Aligarh, Uttar Pradesh',
    'Jalandhar, Punjab', 'Bhubaneswar, Odisha', 'Salem, Tamil Nadu', 'Mira-Bhayandar, Maharashtra',
    'Warangal, Telangana', 'Guntur, Andhra Pradesh', 'Bhiwandi, Maharashtra', 'Saharanpur, Uttar Pradesh',
    'Gorakhpur, Uttar Pradesh', 'Bikaner, Rajasthan', 'Amravati, Maharashtra', 'Noida, Uttar Pradesh',
    'Jamshedpur, Jharkhand', 'Bhilai, Chhattisgarh', 'Cuttack, Odisha', 'Firozabad, Uttar Pradesh',
    'Kochi, Kerala', 'Nellore, Andhra Pradesh', 'Bhavnagar, Gujarat', 'Dehradun, Uttarakhand',
    'Durgapur, West Bengal', 'Asansol, West Bengal', 'Rourkela, Odisha', 'Nanded, Maharashtra',
    'Kolhapur, Maharashtra', 'Ajmer, Rajasthan', 'Akola, Maharashtra', 'Gulbarga, Karnataka',
    'Jamnagar, Gujarat', 'Ujjain, Madhya Pradesh', 'Loni, Uttar Pradesh', 'Siliguri, West Bengal',
    'Jhansi, Uttar Pradesh', 'Ulhasnagar, Maharashtra', 'Jammu, Jammu and Kashmir', 'Sangli-Miraj & Kupwad, Maharashtra',
    'Mangalore, Karnataka', 'Erode, Tamil Nadu', 'Belgaum, Karnataka', 'Ambattur, Tamil Nadu',
    'Tirunelveli, Tamil Nadu', 'Malegaon, Maharashtra', 'Gaya, Bihar', 'Jalgaon, Maharashtra',
    'Udaipur, Rajasthan', 'Maheshtala, West Bengal', 'Thiruvananthapuram, Kerala', 'Davanagere, Karnataka',
    'Kozhikode, Kerala', 'Kurnool, Andhra Pradesh', 'Rajpur Sonarpur, West Bengal', 'Rajahmundry, Andhra Pradesh',
    'Bokaro, Jharkhand', 'South Dumdum, West Bengal', 'Bellary, Karnataka', 'Patiala, Punjab',
    'Gopalpur, Odisha', 'Agartala, Tripura', 'Bhagalpur, Bihar', 'Muzaffarnagar, Uttar Pradesh',
    'Bhatpara, West Bengal', 'Panihati, West Bengal', 'Latur, Maharashtra', 'Dhule, Maharashtra'
]

# City tiers for realistic pricing
TIER_1_CITIES = ['Delhi', 'New Delhi', 'Mumbai, Maharashtra', 'Bangalore, Karnataka', 'Bengaluru, Karnataka', 'Chennai, Tamil Nadu', 'Hyderabad, Telangana', 'Kolkata, West Bengal', 'Pune, Maharashtra', 'Gurgaon, Haryana', 'Noida, Uttar Pradesh']
TIER_2_CITIES = ['Ahmedabad, Gujarat', 'Surat, Gujarat', 'Jaipur, Rajasthan', 'Lucknow, Uttar Pradesh', 'Kanpur, Uttar Pradesh', 'Nagpur, Maharashtra', 'Indore, Madhya Pradesh', 'Thane, Maharashtra', 'Bhopal, Madhya Pradesh', 'Chandigarh, Chandigarh']

# Property types and their characteristics
PROPERTY_TYPES = ['room', 'house', 'pg']

# Placeholder images (simple base64 encoded 1x1 pixel images with different colors)
PLACEHOLDER_IMAGES = {
    'room': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAGAaI8bPQAAAABJRU5ErkJggg==',  # Blue
    'house': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',  # Green
    'pg': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='   # Red
}

# Common amenities
AMENITIES = [
    'WiFi', 'AC', 'Furnished', 'Parking', 'Security', 'Power Backup', 'Water Supply', 'Lift',
    'Gym', 'Swimming Pool', 'Garden', 'Balcony', 'Attached Bathroom', 'Kitchen', 'Fridge',
    'Washing Machine', 'TV', 'Sofa', 'Bed', 'Wardrobe', 'Study Table', 'Chair', 'Geyser',
    'Fan', 'Light', 'Cupboard', 'Mirror', 'Curtains', 'Carpet', 'Intercom', 'CCTV'
]

# Common location areas for Indian cities
LOCATION_AREAS = [
    'Central', 'East', 'West', 'North', 'South', 'Sector', 'Phase', 'Block', 'Colony', 'Nagar',
    'Vihar', 'Puram', 'Ganj', 'Town', 'Market', 'Circle', 'Cross', 'Junction', 'Road', 'Street'
]

def get_tier(city):
    """Get city tier for pricing"""
    if city in TIER_1_CITIES:
        return 1
    elif city in TIER_2_CITIES:
        return 2
    else:
        return 3

def get_rent_range(city, property_type):
    """Get realistic rent range based on city tier and property type"""
    tier = get_tier(city)
    
    if property_type == 'room':
        if tier == 1:
            return (8000, 25000)
        elif tier == 2:
            return (5000, 15000)
        else:
            return (3000, 10000)
    elif property_type == 'pg':
        if tier == 1:
            return (12000, 30000)
        elif tier == 2:
            return (8000, 18000)
        else:
            return (5000, 12000)
    else:  # house
        if tier == 1:
            return (20000, 80000)
        elif tier == 2:
            return (15000, 50000)
        else:
            return (8000, 30000)

def generate_title(property_type, city):
    """Generate realistic property titles"""
    city_name = city.split(',')[0]  # Get just the city name without state
    
    if property_type == 'room':
        templates = [
            f'Spacious Single Room in {city_name}',
            f'Furnished Room for Rent in {city_name}',
            f'Private Room with Attached Bath in {city_name}',
            f'Cozy Room for Working Professionals in {city_name}',
            f'Single Occupancy Room in {city_name}',
            f'Well-Ventilated Room in {city_name}',
            f'Affordable Room for Students in {city_name}',
            f'Independent Room in {city_name}'
        ]
    elif property_type == 'pg':
        templates = [
            f'PG for Boys in {city_name}',
            f'Girls PG with Meals in {city_name}',
            f'Co-living PG Space in {city_name}',
            f'Luxury PG Accommodation in {city_name}',
            f'PG for Working Professionals in {city_name}',
            f'Student PG near Metro in {city_name}',
            f'Premium PG with AC in {city_name}',
            f'Budget-Friendly PG in {city_name}'
        ]
    else:  # house
        templates = [
            f'2BHK Flat for Rent in {city_name}',
            f'1BHK Apartment in {city_name}',
            f'3BHK Independent House in {city_name}',
            f'Furnished Flat in {city_name}',
            f'Semi-Furnished House in {city_name}',
            f'Spacious 2BHK in {city_name}',
            f'Modern Apartment in {city_name}',
            f'Family House for Rent in {city_name}'
        ]
    
    return random.choice(templates)

def generate_description(property_type, title, amenities_list, rent):
    """Generate realistic property descriptions"""
    base_descriptions = {
        'room': [
            'A comfortable and well-ventilated room perfect for working professionals or students.',
            'Spacious room with ample natural light and ventilation.',
            'Cozy room in a peaceful locality with all basic amenities.',
            'Well-maintained room in a prime location with easy access to public transport.',
            'Private room with attached bathroom, ideal for single occupancy.'
        ],
        'pg': [
            'Well-maintained PG accommodation with homely environment and nutritious meals.',
            'Modern PG facility with all essential amenities and 24/7 security.',
            'Comfortable PG living with friendly atmosphere and excellent facilities.',
            'Premium PG accommodation with housekeeping and laundry services.',
            'Budget-friendly PG with all basic amenities and good connectivity.'
        ],
        'house': [
            'Beautifully designed apartment with modern amenities and excellent connectivity.',
            'Spacious flat in a well-developed residential area with all conveniences.',
            'Well-ventilated house with ample parking space and 24/7 security.',
            'Modern apartment with all amenities in a prime residential location.',
            'Independent house with private entrance and garden area.'
        ]
    }
    
    base_desc = random.choice(base_descriptions[property_type])
    amenities_text = f" Property includes: {', '.join(amenities_list[:5])}."
    location_text = " Located in a safe neighborhood with easy access to schools, hospitals, markets, and public transportation."
    pricing_text = f" Rent is ₹{rent:,} per month with reasonable security deposit."
    
    return base_desc + amenities_text + location_text + pricing_text

def generate_location(city):
    """Generate realistic location within city"""
    city_name = city.split(',')[0]
    area_type = random.choice(LOCATION_AREAS)
    
    if area_type in ['Sector', 'Phase', 'Block']:
        number = random.randint(1, 50)
        return f"{area_type} {number}, {city_name}"
    else:
        return f"{area_type}, {city_name}"

def generate_mock_property(city, user_id):
    """Generate a single mock property"""
    property_type = random.choice(PROPERTY_TYPES)
    rent_range = get_rent_range(city, property_type)
    rent = random.randint(rent_range[0], rent_range[1])
    deposit = rent * random.randint(1, 3)  # 1-3 months deposit
    
    # Select 4-8 amenities randomly
    property_amenities = random.sample(AMENITIES, random.randint(4, 8))
    
    # Generate multiple placeholder images for variety
    images = [PLACEHOLDER_IMAGES[property_type]] * random.randint(1, 3)
    
    title = generate_title(property_type, city)
    location = generate_location(city)
    description = generate_description(property_type, title, property_amenities, rent)
    
    return {
        'id': str(uuid.uuid4()),
        'user_id': user_id,
        'title': title,
        'description': description,
        'property_type': property_type,
        'rent': rent,
        'deposit': deposit,
        'location': location,
        'city': city,
        'images': images,
        'amenities': property_amenities,
        'available': True,
        'created_at': datetime.utcnow() - timedelta(days=random.randint(1, 365)),
        'updated_at': datetime.utcnow() - timedelta(days=random.randint(0, 30))
    }

async def create_sample_users():
    """Create some sample property owners"""
    sample_users = []
    
    for i in range(20):  # Create 20 sample users as property owners
        user_id = str(uuid.uuid4())
        sample_users.append({
            'id': user_id,
            'email': f'owner{i+1}@getrentals.com',
            'name': f'Property Owner {i+1}',
            'phone': f'98765{43210 + i}',
            'password_hash': '$2b$12$dummy.hash.for.sample.users',
            'created_at': datetime.utcnow() - timedelta(days=random.randint(30, 365))
        })
    
    return sample_users

async def generate_all_properties():
    """Generate properties for all top 100 cities"""
    print("🏠 Starting mock property generation for GetRentals...")
    
    try:
        # Create sample users first
        print("👤 Creating sample property owners...")
        sample_users = await create_sample_users()
        
        # Check if users already exist, if not insert them
        existing_users = await db.users.count_documents({'email': {'$regex': '@getrentals.com'}})
        if existing_users == 0:
            await db.users.insert_many(sample_users)
            print(f"✅ Created {len(sample_users)} sample users")
        else:
            print(f"📋 Using {existing_users} existing sample users")
            # Get existing users for property assignment
            sample_users = await db.users.find({'email': {'$regex': '@getrentals.com'}}).to_list(length=100)
        
        # Generate properties
        print("🏠 Generating properties...")
        all_properties = []
        
        for city in TOP_100_CITIES:
            print(f"📍 Generating properties for {city}...")
            
            # Create 8 properties per city
            for i in range(8):
                user_id = random.choice(sample_users)['id']
                property_data = generate_mock_property(city, user_id)
                all_properties.append(property_data)
        
        print(f"📊 Generated {len(all_properties)} properties for {len(TOP_100_CITIES)} cities")
        
        # Check existing properties
        existing_count = await db.properties.count_documents({})
        print(f"📋 Existing properties in database: {existing_count}")
        
        if existing_count > 100:  # If there are already many properties, ask before adding more
            print("⚠️  Database already has many properties. Skipping insertion to avoid duplicates.")
            print("💡 To force insert new properties, delete existing ones first.")
            return
        
        # Insert properties in batches
        batch_size = 100
        for i in range(0, len(all_properties), batch_size):
            batch = all_properties[i:i + batch_size]
            await db.properties.insert_many(batch)
            print(f"✅ Inserted batch {i//batch_size + 1}/{(len(all_properties) + batch_size - 1)//batch_size}")
        
        # Verify insertion
        final_count = await db.properties.count_documents({})
        print(f"🎉 Successfully created {final_count} total properties!")
        
        # Show some statistics
        print("\n📊 Property Statistics:")
        for prop_type in PROPERTY_TYPES:
            count = await db.properties.count_documents({'property_type': prop_type})
            print(f"   {prop_type.upper()}: {count} properties")
        
        print("\n🌟 Top 10 cities with most properties:")
        pipeline = [
            {'$group': {'_id': '$city', 'count': {'$sum': 1}}},
            {'$sort': {'count': -1}},
            {'$limit': 10}
        ]
        top_cities = await db.properties.aggregate(pipeline).to_list(length=10)
        for city_data in top_cities:
            print(f"   {city_data['_id']}: {city_data['count']} properties")
            
    except Exception as e:
        print(f"❌ Error generating properties: {str(e)}")
        raise
    finally:
        if client:
            client.close()

async def main():
    """Main function"""
    print("🚀 GetRentals Mock Property Generator")
    print("=" * 50)
    await generate_all_properties()
    print("=" * 50)
    print("✅ Mock property generation completed!")

if __name__ == "__main__":
    asyncio.run(main())