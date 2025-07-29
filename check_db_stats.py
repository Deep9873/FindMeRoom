#!/usr/bin/env python3
import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

async def check_db_stats():
    ROOT_DIR = Path(__file__).parent / 'backend'
    load_dotenv(ROOT_DIR / '.env')
    
    client = AsyncIOMotorClient(os.environ['MONGO_URL'])
    db = client[os.environ['DB_NAME']]
    
    print('📊 Current Database Statistics:')
    print('=' * 40)
    
    # Total properties
    total = await db.properties.count_documents({})
    print(f'Total Properties: {total}')
    
    # By type
    for prop_type in ['room', 'house', 'pg']:
        count = await db.properties.count_documents({'property_type': prop_type})
        print(f'{prop_type.upper()}: {count}')
    
    # Top 15 cities
    print('\n🏙️ Top 15 Cities with Properties:')
    pipeline = [
        {'$group': {'_id': '$city', 'count': {'$sum': 1}}},
        {'$sort': {'count': -1}},
        {'$limit': 15}
    ]
    top_cities = await db.properties.aggregate(pipeline).to_list(length=15)
    for city in top_cities:
        print(f'{city["_id"]}: {city["count"]} properties')
    
    # Check rent ranges
    print('\n💰 Rent Statistics:')
    rent_stats = await db.properties.aggregate([
        {'$group': {
            '_id': None,
            'min_rent': {'$min': '$rent'},
            'max_rent': {'$max': '$rent'},
            'avg_rent': {'$avg': '$rent'}
        }}
    ]).to_list(length=1)
    
    if rent_stats:
        stats = rent_stats[0]
        print(f'Min Rent: ₹{stats["min_rent"]:,}')
        print(f'Max Rent: ₹{stats["max_rent"]:,}')
        print(f'Average Rent: ₹{int(stats["avg_rent"]):,}')
    
    # Sample property
    print('\n🏠 Sample Property:')
    sample = await db.properties.find_one()
    if sample:
        print(f'Title: {sample["title"]}')
        print(f'City: {sample["city"]}')
        print(f'Type: {sample["property_type"]}')
        print(f'Rent: ₹{sample["rent"]:,}')
        print(f'Amenities: {len(sample["amenities"])} items - {", ".join(sample["amenities"][:3])}...')
        print(f'Images: {len(sample["images"])} images')
        print(f'Location: {sample["location"]}')
    
    client.close()

if __name__ == "__main__":
    asyncio.run(check_db_stats())