import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '../App';
import axios from 'axios';

const API = `${(process.env.REACT_APP_BACKEND_URL || '').replace(/\/+$/, '')}/api`;

// Popular cities data
const POPULAR_CITIES = [
  { name: 'Delhi', slug: 'delhi', description: 'Capital city with diverse accommodation options' },
  { name: 'Mumbai', slug: 'mumbai', description: 'Financial capital with premium and budget rentals' },
  { name: 'Bangalore', slug: 'bangalore', description: 'IT hub with tech-friendly accommodations' },
  { name: 'Pune', slug: 'pune', description: 'Student and IT professional haven' },
  { name: 'Chennai', slug: 'chennai', description: 'Cultural capital with IT corridor properties' },
  { name: 'Hyderabad', slug: 'hyderabad', description: 'Cyberabad with modern living spaces' },
  { name: 'Kolkata', slug: 'kolkata', description: 'Cultural heritage with affordable options' },
  { name: 'Ahmedabad', slug: 'ahmedabad', description: 'Business hub with quality accommodations' },
  { name: 'Gurgaon', slug: 'gurgaon', description: 'Millennium city with premium properties' },
  { name: 'Noida', slug: 'noida', description: 'Planned city with modern amenities' },
  { name: 'Faridabad', slug: 'faridabad', description: 'Industrial city with budget-friendly options' },
  { name: 'Ghaziabad', slug: 'ghaziabad', description: 'NCR gateway with affordable living' }
];

const PropertiesSitemap = () => {
  const navigate = useNavigate();
  const { updateSEO } = useSEO();
  const [cityStats, setCityStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateSEO(
      'Properties by City - Browse All Locations | GetRentals',
      'Explore rental properties across major Indian cities. Find rooms, PG accommodations, and flats in Delhi, Mumbai, Bangalore, Pune, Chennai, Hyderabad and more cities.',
      'properties by city, rental properties india, city wise properties, rooms for rent cities, pg accommodation cities'
    );
    
    fetchCityStats();
  }, [updateSEO]);

  const fetchCityStats = async () => {
    try {
      // Fetch property counts for each popular city
      const statsPromises = POPULAR_CITIES.map(async (city) => {
        try {
          const response = await axios.get(`${API}/properties?city=${encodeURIComponent(city.name)}`);
          return {
            city: city.slug,
            count: response.data?.length || 0
          };
        } catch (error) {
          console.error(`Error fetching stats for ${city.name}:`, error);
          return {
            city: city.slug,
            count: 0
          };
        }
      });

      const results = await Promise.all(statsPromises);
      const stats = {};
      results.forEach(result => {
        stats[result.city] = result.count;
      });
      
      setCityStats(stats);
    } catch (error) {
      console.error('Error fetching city stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCityClick = (citySlug) => {
    navigate(`/properties/${citySlug}`);
  };

  const totalProperties = Object.values(cityStats).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Find Properties Across India
          </h1>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            Browse {totalProperties.toLocaleString()}+ verified rental properties in major Indian cities
          </p>
          <p className="text-base opacity-80">
            Zero brokerage • Direct owner contact • Verified listings
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-800">
            Home
          </button>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">Properties</span>
        </nav>

        {/* Stats Section */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Popular Cities for Rental Properties
          </h2>
          <p className="text-gray-600 text-lg">
            Discover your perfect accommodation in India's major metropolitan cities
          </p>
        </div>

        {/* Cities Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading city data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {POPULAR_CITIES.map((city) => (
              <div
                key={city.slug}
                onClick={() => handleCityClick(city.slug)}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{city.name}</h3>
                      <p className="text-gray-600 text-sm">{city.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {cityStats[city.slug] || 0} properties
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      View Properties
                    </div>
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Property Types Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Find Properties by Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Rooms & Flats</h3>
              <p className="text-gray-600 text-sm">Single rooms, 1BHK, 2BHK, 3BHK apartments and shared accommodations</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl mb-4">🏫</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">PG & Hostels</h3>
              <p className="text-gray-600 text-sm">Paying guest accommodations for students and working professionals</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Flatmate Finder</h3>
              <p className="text-gray-600 text-sm">Find compatible roommates and shared living arrangements</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-8 text-white text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Why Choose GetRentals?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl mb-2">🆓</div>
              <h3 className="font-semibold mb-2">Zero Brokerage</h3>
              <p className="text-sm opacity-90">Connect directly with property owners without any commission fees</p>
            </div>
            <div>
              <div className="text-3xl mb-2">✅</div>
              <h3 className="font-semibold mb-2">Verified Listings</h3>
              <p className="text-sm opacity-90">All properties are verified with authentic photos and details</p>
            </div>
            <div>
              <div className="text-3xl mb-2">💬</div>
              <h3 className="font-semibold mb-2">Real-time Chat</h3>
              <p className="text-sm opacity-90">Instant messaging with property owners for quick communication</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Can't find properties in your city?
          </h2>
          <p className="text-gray-600 mb-6">
            Help build our community by posting your property or checking other cities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/post-property')}
              className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
            >
              Post Your Property
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-200 text-gray-800 px-8 py-3 rounded-md font-semibold hover:bg-gray-300 transition-colors"
            >
              Browse All Properties
            </button>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Find Rental Properties Across India
          </h2>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              GetRentals connects you with rental properties across India's major cities. Whether you're a student looking for 
              affordable PG accommodation, a working professional seeking a comfortable 1BHK, or someone searching for shared 
              living arrangements, we have verified listings to match your needs.
            </p>
            
            <h3 className="text-lg font-semibold mb-2">Popular Rental Destinations</h3>
            <p className="mb-4">
              Our platform covers major metropolitan cities including Delhi NCR (Gurgaon, Noida, Faridabad, Ghaziabad), 
              Mumbai, Bangalore, Pune, Chennai, Hyderabad, Kolkata, and Ahmedabad. Each city offers unique opportunities 
              from budget-friendly options to premium accommodations.
            </p>
            
            <h3 className="text-lg font-semibold mb-2">Zero Brokerage Promise</h3>
            <p className="mb-4">
              Unlike traditional property portals, GetRentals eliminates brokerage fees by connecting you directly with 
              property owners. This means significant savings on your rental journey while ensuring transparent and 
              honest communication throughout the process.
            </p>
            
            <h3 className="text-lg font-semibold mb-2">Property Types Available</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Single and shared rooms for students and professionals</li>
              <li>1BHK, 2BHK, and 3BHK apartments for families</li>
              <li>PG accommodations with meal facilities</li>
              <li>Co-living spaces with modern amenities</li>
              <li>Independent houses and villas</li>
              <li>Flatmate and roommate matching services</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesSitemap;