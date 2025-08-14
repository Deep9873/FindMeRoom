import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSEO } from '../App';
import axios from 'axios';

const API = `${(process.env.REACT_APP_BACKEND_URL || '').replace(/\/+$/, '')}/api`;

// City-specific SEO data
const CITY_SEO_DATA = {
  'delhi': {
    displayName: 'Delhi',
    title: 'Rooms, PG, Flats for Rent in Delhi | GetRentals - Zero Brokerage',
    description: 'Find best rooms, PG accommodations, and flats for rent in Delhi. Browse verified listings in Connaught Place, Karol Bagh, Lajpat Nagar, South Delhi, North Delhi. Zero brokerage, direct owner contact.',
    keywords: 'delhi rooms for rent, pg in delhi, flats for rent delhi, delhi accommodation, rooms near connaught place, pg near metro, delhi flatmate finder, zero brokerage delhi',
    areas: ['Connaught Place', 'Karol Bagh', 'Lajpat Nagar', 'South Delhi', 'North Delhi', 'Dwarka', 'Rohini', 'Janakpuri']
  },
  'mumbai': {
    displayName: 'Mumbai',
    title: 'Rooms, PG, Flats for Rent in Mumbai | GetRentals - Zero Brokerage',
    description: 'Discover rooms, PG accommodations, and flats for rent in Mumbai. Browse listings in Andheri, Bandra, Lower Parel, Thane, Navi Mumbai. Direct owner contact, zero brokerage.',
    keywords: 'mumbai rooms for rent, pg in mumbai, mumbai flats for rent, andheri rooms, bandra accommodation, mumbai flatmate, thane pg, zero brokerage mumbai',
    areas: ['Andheri', 'Bandra', 'Lower Parel', 'Thane', 'Navi Mumbai', 'Powai', 'Malad', 'Goregaon']
  },
  'bangalore': {
    displayName: 'Bangalore',
    title: 'Rooms, PG, Flats for Rent in Bangalore | GetRentals - IT Hub Accommodation',
    description: 'Find tech-friendly rooms, PG accommodations, and flats for rent in Bangalore. Prime locations near IT parks - Whitefield, Electronic City, Koramangala, HSR Layout.',
    keywords: 'bangalore rooms for rent, pg in bangalore, bangalore flats for rent, whitefield accommodation, koramangala rooms, hsr layout pg, electronic city flats, it professional accommodation',
    areas: ['Whitefield', 'Electronic City', 'Koramangala', 'HSR Layout', 'Indiranagar', 'Marathahalli', 'BTM Layout', 'JP Nagar']
  },
  'pune': {
    displayName: 'Pune',
    title: 'Rooms, PG, Flats for Rent in Pune | GetRentals - IT & Student Hub',
    description: 'Explore rooms, PG accommodations, and flats for rent in Pune. Perfect for IT professionals and students - Hinjewadi, Kothrud, Viman Nagar, Wakad, Aundh.',
    keywords: 'pune rooms for rent, pg in pune, pune flats for rent, hinjewadi accommodation, kothrud rooms, viman nagar pg, wakad flats, aundh accommodation',
    areas: ['Hinjewadi', 'Kothrud', 'Viman Nagar', 'Wakad', 'Aundh', 'Baner', 'Magarpatta', 'Hadapsar']
  },
  'chennai': {
    displayName: 'Chennai',
    title: 'Rooms, PG, Flats for Rent in Chennai | GetRentals - IT Corridor Properties',
    description: 'Find rooms, PG accommodations, and flats for rent in Chennai. IT corridor locations - OMR, Velachery, Adyar, T Nagar, Anna Nagar. Zero brokerage guaranteed.',
    keywords: 'chennai rooms for rent, pg in chennai, chennai flats for rent, omr accommodation, velachery rooms, adyar pg, t nagar flats, anna nagar accommodation',
    areas: ['OMR (IT Corridor)', 'Velachery', 'Adyar', 'T Nagar', 'Anna Nagar', 'Tambaram', 'Chrompet', 'Porur']
  },
  'hyderabad': {
    displayName: 'Hyderabad',
    title: 'Rooms, PG, Flats for Rent in Hyderabad | GetRentals - Cyberabad Properties',
    description: 'Discover rooms, PG accommodations, and flats for rent in Hyderabad. Prime IT locations - Gachibowli, Madhapur, Hitech City, Kondapur, Kukatpally.',
    keywords: 'hyderabad rooms for rent, pg in hyderabad, hyderabad flats for rent, gachibowli accommodation, madhapur rooms, hitech city pg, kondapur flats, kukatpally accommodation',
    areas: ['Gachibowli', 'Madhapur', 'Hitech City', 'Kondapur', 'Kukatpally', 'Ameerpet', 'Secunderabad', 'Miyapur']
  },
  'kolkata': {
    displayName: 'Kolkata',
    title: 'Rooms, PG, Flats for Rent in Kolkata | GetRentals - Cultural Capital Accommodation',
    description: 'Find rooms, PG accommodations, and flats for rent in Kolkata. Popular areas - Salt Lake, Park Street, Ballygunge, Howrah, Rajarhat. Zero brokerage properties.',
    keywords: 'kolkata rooms for rent, pg in kolkata, kolkata flats for rent, salt lake accommodation, park street rooms, ballygunge pg, howrah flats, rajarhat accommodation',
    areas: ['Salt Lake', 'Park Street', 'Ballygunge', 'Howrah', 'Rajarhat', 'Garia', 'Tollygunge', 'Jadavpur']
  },
  'ahmedabad': {
    displayName: 'Ahmedabad',
    title: 'Rooms, PG, Flats for Rent in Ahmedabad | GetRentals - Gujarat Business Hub',
    description: 'Explore rooms, PG accommodations, and flats for rent in Ahmedabad. Business districts - SG Highway, Satellite, Vastrapur, Bopal, Prahlad Nagar.',
    keywords: 'ahmedabad rooms for rent, pg in ahmedabad, ahmedabad flats for rent, sg highway accommodation, satellite rooms, vastrapur pg, bopal flats, prahlad nagar accommodation',
    areas: ['SG Highway', 'Satellite', 'Vastrapur', 'Bopal', 'Prahlad Nagar', 'Navrangpura', 'CG Road', 'Ambawadi']
  },
  'gurgaon': {
    displayName: 'Gurgaon',
    title: 'Rooms, PG, Flats for Rent in Gurgaon | GetRentals - Millennium City Properties',
    description: 'Find premium rooms, PG accommodations, and flats for rent in Gurgaon. Corporate hubs - Cyber City, Golf Course Road, Sohna Road, Sector 32, MG Road.',
    keywords: 'gurgaon rooms for rent, pg in gurgaon, gurgaon flats for rent, cyber city accommodation, golf course road rooms, sohna road pg, sector 32 flats, mg road accommodation',
    areas: ['Cyber City', 'Golf Course Road', 'Sohna Road', 'Sector 32', 'MG Road', 'Udyog Vihar', 'DLF Phase 1-5', 'New Gurgaon']
  },
  'noida': {
    displayName: 'Noida',
    title: 'Rooms, PG, Flats for Rent in Noida | GetRentals - Planned City Living',
    description: 'Discover rooms, PG accommodations, and flats for rent in Noida. Tech hubs - Sector 62, Sector 18, Greater Noida, Noida Extension. Zero brokerage guaranteed.',
    keywords: 'noida rooms for rent, pg in noida, noida flats for rent, sector 62 accommodation, sector 18 rooms, greater noida pg, noida extension flats, tech city accommodation',
    areas: ['Sector 62', 'Sector 18', 'Greater Noida', 'Noida Extension', 'Sector 16', 'Sector 37', 'Sector 44', 'Botanical Garden']
  },
  'faridabad': {
    displayName: 'Faridabad',
    title: 'Rooms, PG, Flats for Rent in Faridabad | GetRentals - Industrial City Properties',
    description: 'Find affordable rooms, PG accommodations, and flats for rent in Faridabad. Popular sectors - Sector 16, Sector 21, NIT, Old Faridabad. Budget-friendly options.',
    keywords: 'faridabad rooms for rent, pg in faridabad, faridabad flats for rent, sector 16 accommodation, sector 21 rooms, nit faridabad pg, old faridabad flats, industrial city accommodation',
    areas: ['Sector 16', 'Sector 21', 'NIT Faridabad', 'Old Faridabad', 'Sector 15', 'Sector 37', 'New Industrial Town', 'Ballabgarh']
  },
  'ghaziabad': {
    displayName: 'Ghaziabad',
    title: 'Rooms, PG, Flats for Rent in Ghaziabad | GetRentals - NCR Gateway Properties',
    description: 'Explore rooms, PG accommodations, and flats for rent in Ghaziabad. Key locations - Vaishali, Indirapuram, Raj Nagar, Kaushambi. Affordable NCR living.',
    keywords: 'ghaziabad rooms for rent, pg in ghaziabad, ghaziabad flats for rent, vaishali accommodation, indirapuram rooms, raj nagar pg, kaushambi flats, ncr accommodation',
    areas: ['Vaishali', 'Indirapuram', 'Raj Nagar', 'Kaushambi', 'Crossings Republik', 'Loni', 'Sahibabad', 'Mohan Nagar']
  }
};

const CityPropertyPage = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const { updateSEO } = useSEO();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    property_type: '',
    min_rent: '',
    max_rent: ''
  });
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const cityData = CITY_SEO_DATA[cityName?.toLowerCase()] || {
    displayName: cityName,
    title: `Properties for Rent in ${cityName} | GetRentals`,
    description: `Find rooms, PG, and flats for rent in ${cityName}. Browse verified listings with zero brokerage.`,
    keywords: `${cityName} rooms for rent, pg in ${cityName}, ${cityName} flats for rent`,
    areas: []
  };

  // Update SEO meta tags
  useEffect(() => {
    updateSEO(cityData.title, cityData.description, cityData.keywords);
  }, [cityName, updateSEO]);

  // Fetch properties for the city
  useEffect(() => {
    fetchCityProperties();
  }, [cityName, filters]);

  const fetchCityProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('city', cityData.displayName);
      
      if (filters.property_type) params.append('property_type', filters.property_type);
      if (filters.min_rent) params.append('min_rent', filters.min_rent);
      if (filters.max_rent) params.append('max_rent', filters.max_rent);

      const response = await axios.get(`${API}/properties?${params}`);
      setProperties(response.data || []);
    } catch (error) {
      console.error('Error fetching city properties:', error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      property_type: '',
      min_rent: '',
      max_rent: ''
    });
  };

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
  };

  const handleContactOwner = (property) => {
    navigate('/chat', { state: { selectedProperty: property, prefilledMessage: `Hi! I'm interested in your property: ${property.title}` } });
  };

  const rentRanges = [
    { label: 'Under ₹10,000', min: '', max: '10000' },
    { label: '₹10,000 - ₹20,000', min: '10000', max: '20000' },
    { label: '₹20,000 - ₹30,000', min: '20000', max: '30000' },
    { label: '₹30,000 - ₹50,000', min: '30000', max: '50000' },
    { label: 'Above ₹50,000', min: '50000', max: '' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* City Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Properties for Rent in {cityData.displayName}
            </h1>
            <p className="text-lg md:text-xl mb-6 opacity-90">
              Discover verified rooms, PG accommodations, and flats with zero brokerage
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              {cityData.areas.slice(0, 6).map((area, index) => (
                <span key={index} className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-800">
            Home
          </button>
          <span className="mx-2 text-gray-400">/</span>
          <button onClick={() => navigate('/properties')} className="text-blue-600 hover:text-blue-800">
            Properties
          </button>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{cityData.displayName}</span>
        </nav>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Filter Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select
                name="property_type"
                value={filters.property_type}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value="room">Room</option>
                <option value="house">House/Flat</option>
                <option value="pg">PG (Paying Guest)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rent Range</label>
              <select
                onChange={(e) => {
                  const selectedRange = rentRanges.find(r => r.label === e.target.value);
                  if (selectedRange) {
                    setFilters(prev => ({
                      ...prev,
                      min_rent: selectedRange.min,
                      max_rent: selectedRange.max
                    }));
                  } else {
                    setFilters(prev => ({
                      ...prev,
                      min_rent: '',
                      max_rent: ''
                    }));
                  }
                }}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Ranges</option>
                {rentRanges.map((range, index) => (
                  <option key={index} value={range.label}>{range.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Rent</label>
              <input
                type="number"
                name="min_rent"
                value={filters.min_rent}
                onChange={handleFilterChange}
                placeholder="Min rent"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Rent</label>
              <input
                type="number"
                name="max_rent"
                value={filters.max_rent}
                onChange={handleFilterChange}
                placeholder="Max rent"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {properties.length} Properties Available in {cityData.displayName}
          </h2>
          <p className="text-gray-600">
            Find your perfect accommodation with verified listings and zero brokerage
          </p>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or check back later for new listings in {cityData.displayName}.
            </p>
            <button
              onClick={() => navigate('/post-property')}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Post Your Property
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {property.images && property.images.length > 0 && (
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => handlePropertyClick(property)}
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600"
                      onClick={() => handlePropertyClick(property)}>
                    {property.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{property.description}</p>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-2xl font-bold text-green-600">₹{property.rent?.toLocaleString()}</span>
                      <span className="text-gray-500 text-sm">/month</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Deposit</div>
                      <div className="font-semibold">₹{property.deposit?.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full capitalize">
                      {property.property_type}
                    </span>
                    <span className="text-sm text-gray-500">📍 {property.location}</span>
                  </div>

                  {property.amenities && property.amenities.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {property.amenities.slice(0, 3).map((amenity, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {amenity}
                          </span>
                        ))}
                        {property.amenities.length > 3 && (
                          <span className="text-xs text-gray-500">+{property.amenities.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePropertyClick(property)}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleContactOwner(property)}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm"
                    >
                      Contact Owner
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* City Information Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About Rental Properties in {cityData.displayName}
          </h2>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              {cityData.displayName} offers diverse rental accommodation options for students, working professionals, and families. 
              From budget-friendly PG accommodations to premium 1BHK, 2BHK, and 3BHK apartments, find your perfect home with zero brokerage fees.
            </p>
            
            {cityData.areas.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Popular Areas in {cityData.displayName}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {cityData.areas.map((area, index) => (
                    <div key={index} className="bg-gray-50 p-2 rounded text-sm text-center">
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <h3 className="text-lg font-semibold mb-2">Why Choose GetRentals for {cityData.displayName}?</h3>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Zero brokerage fees - Connect directly with property owners</li>
              <li>Verified listings with authentic photos and details</li>
              <li>Real-time chat with property owners</li>
              <li>Wide range of options: Rooms, PG, Flats, Houses</li>
              <li>Advanced filters to find exactly what you need</li>
              <li>Safe and secure platform for property transactions</li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Have a Property in {cityData.displayName}?</h2>
          <p className="mb-6">List your room, PG, or flat for free and connect with verified tenants</p>
          <button
            onClick={() => navigate('/post-property')}
            className="bg-white text-green-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            Post Your Property Free
          </button>
        </div>
      </div>

      {/* Property Details Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full m-4 max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {selectedProperty.images && selectedProperty.images.length > 0 && (
                <img
                  src={selectedProperty.images[0]}
                  alt={selectedProperty.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedProperty.title}</h2>
              <p className="text-gray-700 mb-6">{selectedProperty.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Property Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rent:</span>
                      <span className="font-semibold text-green-600">₹{selectedProperty.rent?.toLocaleString()}/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deposit:</span>
                      <span className="font-semibold">₹{selectedProperty.deposit?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-semibold capitalize">{selectedProperty.property_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-semibold">{selectedProperty.location}</span>
                    </div>
                  </div>
                </div>
                
                {selectedProperty.amenities && selectedProperty.amenities.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProperty.amenities.map((amenity, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => handleContactOwner(selectedProperty)}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors font-semibold"
                >
                  Contact Owner
                </button>
                <button
                  onClick={() => navigate('/chat', { state: { selectedProperty, prefilledMessage: 'I would like to schedule a visit for this property.' } })}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                >
                  Schedule Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CityPropertyPage;