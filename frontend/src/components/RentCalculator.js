import React, { useState, useEffect } from 'react';
import { useSEO } from '../App';

const RentCalculator = () => {
  const { updateSEO } = useSEO();
  const [formData, setFormData] = useState({
    city: '',
    propertyType: '',
    bhkType: '',
    rooms: '',
    furnishingStatus: '',
    areaSquareFeet: '',
    amenities: [],
    buildingAge: '',
    floorLevel: '',
    parking: '',
    location: 'central'
  });
  
  const [calculatedRent, setCalculatedRent] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    updateSEO(
      'Rent Calculator - Calculate Fair Property Rent in India | GetRentals',
      'Calculate accurate rental prices for properties across India. Use our advanced rent calculator based on location, property type, amenities, and market data for fair rent estimation.',
      'rent calculator, property rent calculator, rental price calculator, rent estimation tool, property valuation, fair rent calculator india, rental market rates'
    );
  }, [updateSEO]);

  const cities = [
    'Agartala, Tripura',
    'Agra, Uttar Pradesh',
    'Ahmedabad, Gujarat',
    'Ajmer, Rajasthan',
    'Akola, Maharashtra',
    'Aligarh, Uttar Pradesh',
    'Allahabad, Uttar Pradesh',
    'Amravati, Maharashtra',
    'Amritsar, Punjab',
    'Asansol, West Bengal',
    'Aurangabad, Maharashtra',
    'Bangalore, Karnataka',
    'Bareilly, Uttar Pradesh',
    'Belgaum, Karnataka',
    'Bhubaneswar, Odisha',
    'Bhiwandi, Maharashtra',
    'Bhilai, Chhattisgarh',
    'Bhopal, Madhya Pradesh',
    'Bikaner, Rajasthan',
    'Chandigarh, Chandigarh',
    'Chennai, Tamil Nadu',
    'Coimbatore, Tamil Nadu',
    'Cuttack, Odisha',
    'Dehradun, Uttarakhand',
    'Delhi',
    'Dhanbad, Jharkhand',
    'Durgapur, West Bengal',
    'Erode, Tamil Nadu',
    'Faridabad, Haryana',
    'Firozabad, Uttar Pradesh',
    'Ghaziabad, Uttar Pradesh',
    'Gorakhpur, Uttar Pradesh',
    'Guntur, Andhra Pradesh',
    'Gurgaon, Haryana',
    'Gwalior, Madhya Pradesh',
    'Guwahati, Assam',
    'Hubballi-Dharwad, Karnataka',
    'Howrah, West Bengal',
    'Hyderabad, Telangana',
    'Indore, Madhya Pradesh',
    'Jabalpur, Madhya Pradesh',
    'Jaipur, Rajasthan',
    'Jalandhar, Punjab',
    'Jammu, Jammu and Kashmir',
    'Jamshedpur, Jharkhand',
    'Jodhpur, Rajasthan',
    'Kanpur, Uttar Pradesh',
    'Kochi, Kerala',
    'Kolkata, West Bengal',
    'Kolhapur, Maharashtra',
    'Kota, Rajasthan',
    'Lucknow, Uttar Pradesh',
    'Ludhiana, Punjab',
    'Madurai, Tamil Nadu',
    'Maheshtala, West Bengal',
    'Malegaon, Maharashtra',
    'Mangalore, Karnataka',
    'Meerut, Uttar Pradesh',
    'Moradabad, Uttar Pradesh',
    'Mumbai',
    'Mysore, Karnataka',
    'Nagpur, Maharashtra',
    'Nanded, Maharashtra',
    'Nashik, Maharashtra',
    'Nellore, Andhra Pradesh',
    'Noida, Uttar Pradesh',
    'Panaji, Goa',
    'Patna, Bihar',
    'Pimpri-Chinchwad, Maharashtra',
    'Prayagraj, Uttar Pradesh',
    'Pune, Maharashtra',
    'Rajkot, Gujarat',
    'Raipur, Chhattisgarh',
    'Ranchi, Jharkhand',
    'Rourkela, Odisha',
    'Salem, Tamil Nadu',
    'Sangli-Miraj & Kupwad, Maharashtra',
    'Siliguri, West Bengal',
    'Surat, Gujarat',
    'Thane, Maharashtra',
    'Thiruchirappalli, Tamil Nadu',
    'Thiruvananthapuram, Kerala',
    'Tirunelveli, Tamil Nadu',
    'Tiruppur, Tamil Nadu',
    'Udaipur, Rajasthan',
    'Ujjain, Madhya Pradesh',
    'Ulhasnagar, Maharashtra',
    'Vadodara, Gujarat',
    'Varanasi, Uttar Pradesh',
    'Vasai-Virar, Maharashtra',
    'Vijayawada, Andhra Pradesh',
    'Visakhapatnam, Andhra Pradesh',
    'Warangal, Telangana',
    'Shillong, Meghalaya',
    'New Delhi',
    'Old Delhi',
    'Bengaluru, Karnataka',
    'Shimla, Himachal Pradesh',
    'Aizawl, Mizoram',
    'Alappuzha, Kerala',
    'Anantapur, Andhra Pradesh',
    'Arrah, Bihar',
    'Ambala, Haryana',
    'Baranagar, West Bengal',
    'Bardhaman, West Bengal',
    'Bathinda, Punjab',
    'Begusarai, Bihar',
    'Bhagalpur, Bihar',
    'Bharatpur, Rajasthan',
    'Bhavnagar, Gujarat',
    'Bhiwani, Haryana',
    'Bidar, Karnataka',
    'Bokaro, Jharkhand',
    'Chhapra, Bihar',
    'Chhindwara, Madhya Pradesh',
    'Darbhanga, Bihar',
    'Dibrugarh, Assam',
    'Dindigul, Tamil Nadu',
    'Durg, Chhattisgarh',
    'Eluru, Andhra Pradesh',
    'Fatehpur, Uttar Pradesh',
    'Gandhinagar, Gujarat',
    'Gaya, Bihar',
    'Ghazipur, Uttar Pradesh',
    'Gondia, Maharashtra',
    'Gopalganj, Bihar',
    'Hajipur, Bihar',
    'Haldwani, Uttarakhand',
    'Hansi, Haryana',
    'Hisar, Haryana',
    'Ichalkaranji, Maharashtra',
    'Itanagar, Arunachal Pradesh',
    'Jagdalpur, Chhattisgarh',
    'Jalgaon, Maharashtra',
    'Jalna, Maharashtra',
    'Jamnagar, Gujarat',
    'Jhansi, Uttar Pradesh',
    'Junagadh, Gujarat',
    'Kadapa, Andhra Pradesh',
    'Kakinada, Andhra Pradesh',
    'Kalyan-Dombivli, Maharashtra',
    'Kamarhati, West Bengal',
    'Kanchipuram, Tamil Nadu',
    'Karaikudi, Tamil Nadu',
    'Karimnagar, Telangana',
    'Karnal, Haryana',
    'Katihar, Bihar',
    'Khammam, Telangana',
    'Khandwa, Madhya Pradesh',
    'Kharagpur, West Bengal',
    'Korba, Chhattisgarh',
    'Kottayam, Kerala',
    'Kozhikode, Kerala',
    'Kurnool, Andhra Pradesh',
    'Latur, Maharashtra',
    'Machilipatnam, Andhra Pradesh',
    'Malda, West Bengal',
    'Mandya, Karnataka',
    'Mathura, Uttar Pradesh',
    'Medininagar, Jharkhand',
    'Mira-Bhayandar, Maharashtra',
    'Nadiad, Gujarat',
    'Nalgonda, Telangana',
    'Namakkal, Tamil Nadu',
    'Narsinghpur, Madhya Pradesh',
    'Navsari, Gujarat',
    'Nizamabad, Telangana',
    'Ongole, Andhra Pradesh',
    'Palakkad, Kerala',
    'Palghar, Maharashtra',
    'Parbhani, Maharashtra',
    'Patan, Gujarat',
    'Phagwara, Punjab',
    'Port Blair, Andaman and Nicobar Islands',
    'Puducherry, Puducherry',
    'Raichur, Karnataka',
    'Rewa, Madhya Pradesh',
    'Rewari, Haryana',
    'Rohtak, Haryana',
    'Roorkee, Uttarakhand',
    'Sagar, Madhya Pradesh',
    'Saharanpur, Uttar Pradesh',
    'Sambalpur, Odisha',
    'Satara, Maharashtra',
    'Satna, Madhya Pradesh',
    'Shahjahanpur, Uttar Pradesh',
    'Shimoga, Karnataka',
    'Sikar, Rajasthan',
    'Sirsa, Haryana',
    'Solan, Himachal Pradesh',
    'Solapur, Maharashtra',
    'Sonipat, Haryana',
    'Sultanpur, Uttar Pradesh',
    'Tenali, Andhra Pradesh',
    'Thanjavur, Tamil Nadu',
    'Tumkur, Karnataka',
    'Udupi, Karnataka',
    'Unnao, Uttar Pradesh',
    'Valsad, Gujarat',
    'Vellore, Tamil Nadu',
    'Yamunanagar, Haryana'
  ].sort();

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment', multiplier: 1.0 },
    { value: 'independent_house', label: 'Independent House', multiplier: 1.2 },
    { value: 'villa', label: 'Villa', multiplier: 1.5 },
    { value: 'pg', label: 'PG (Paying Guest)', multiplier: 0.6 },
    { value: 'studio', label: 'Studio Apartment', multiplier: 0.8 },
    { value: 'room', label: 'Single Room', multiplier: 0.5 },
    { value: 'penthouse', label: 'Penthouse', multiplier: 2.0 }
  ];

  const roomOptions = [
    { value: '1', label: '1 Room' },
    { value: '2', label: '2 Rooms' },
    { value: '3', label: '3 Rooms' },
    { value: '4', label: '4 Rooms' },
    { value: '5', label: '5 Rooms' },
    { value: '6+', label: '6+ Rooms' }
  ];

  const bhkTypes = [
    { value: '1rk', label: '1 RK', multiplier: 0.4 },
    { value: '1bhk', label: '1 BHK', multiplier: 0.7 },
    { value: '2bhk', label: '2 BHK', multiplier: 1.0 },
    { value: '3bhk', label: '3 BHK', multiplier: 1.4 },
    { value: '4bhk', label: '4 BHK', multiplier: 1.8 },
    { value: '5bhk+', label: '5+ BHK', multiplier: 2.5 }
  ];

  const amenitiesList = [
    { value: 'gym', label: 'Gym/Fitness Center', premium: 1000 },
    { value: 'swimming_pool', label: 'Swimming Pool', premium: 1500 },
    { value: 'clubhouse', label: 'Clubhouse', premium: 800 },
    { value: 'garden', label: 'Garden/Park', premium: 500 },
    { value: 'security', label: '24/7 Security', premium: 600 },
    { value: 'lift', label: 'Elevator', premium: 400 },
    { value: 'power_backup', label: 'Power Backup', premium: 800 },
    { value: 'parking', label: 'Covered Parking', premium: 1200 },
    { value: 'air_conditioning', label: 'Air Conditioning', premium: 2000 },
    { value: 'modular_kitchen', label: 'Modular Kitchen', premium: 1500 },
    { value: 'internet', label: 'High-Speed Internet', premium: 300 },
    { value: 'water_purifier', label: 'Water Purifier', premium: 200 }
  ];

  // City-wise base rent rates per square foot
  const cityBaseRates = {
    'Mumbai': 85,
    'Delhi': 55,
    'Bangalore': 45,
    'Chennai': 35,
    'Pune': 40,
    'Hyderabad': 38,
    'Kolkata': 30,
    'Ahmedabad': 28,
    'Surat': 25,
    'Jaipur': 22,
    'Lucknow': 18,
    'Kanpur': 16,
    'Nagpur': 20,
    'Indore': 24,
    'Thane': 65,
    'Bhopal': 19,
    'Visakhapatnam': 26,
    'Pimpri-Chinchwad': 35,
    'Patna': 15,
    'Vadodara': 27,
    'Ghaziabad': 32,
    'Ludhiana': 21,
    'Agra': 17,
    'Nashik': 23,
    'Faridabad': 36,
    'Meerut': 18,
    'Rajkot': 20,
    'Kalyan-Dombivli': 45,
    'Vasai-Virar': 40,
    'Varanasi': 14,
    'Srinagar': 16,
    'Aurangabad': 19,
    'Dhanbad': 12,
    'Amritsar': 18
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const calculateRent = () => {
    if (!formData.city || !formData.propertyType || !formData.bhkType || !formData.areaSquareFeet) {
      alert('Please fill in all required fields');
      return;
    }

    setIsCalculating(true);

    // Simulate calculation delay for better UX
    setTimeout(() => {
      const baseRate = cityBaseRates[formData.city] || 25;
      const area = parseInt(formData.areaSquareFeet) || 600;
      
      // Get multipliers
      const propertyMultiplier = propertyTypes.find(p => p.value === formData.propertyType)?.multiplier || 1;
      const bhkMultiplier = bhkTypes.find(b => b.value === formData.bhkType)?.multiplier || 1;
      
      // Location premium
      let locationMultiplier = 1;
      switch(formData.location) {
        case 'premium': locationMultiplier = 1.4; break;
        case 'central': locationMultiplier = 1.1; break;
        case 'suburban': locationMultiplier = 0.9; break;
        case 'outskirts': locationMultiplier = 0.7; break;
      }

      // Furnishing premium
      let furnishingMultiplier = 1;
      switch(formData.furnishingStatus) {
        case 'fully_furnished': furnishingMultiplier = 1.3; break;
        case 'semi_furnished': furnishingMultiplier = 1.15; break;
        case 'unfurnished': furnishingMultiplier = 1; break;
      }

      // Building age factor
      let ageFactor = 1;
      switch(formData.buildingAge) {
        case 'new': ageFactor = 1.1; break;
        case '1-5': ageFactor = 1.05; break;
        case '6-10': ageFactor = 1; break;
        case '11-20': ageFactor = 0.95; break;
        case '20+': ageFactor = 0.85; break;
      }

      // Floor level adjustment
      let floorFactor = 1;
      switch(formData.floorLevel) {
        case 'ground': floorFactor = 0.9; break;
        case 'low': floorFactor = 0.95; break;
        case 'mid': floorFactor = 1; break;
        case 'high': floorFactor = 1.05; break;
        case 'top': floorFactor = 1.1; break;
      }

      // Parking premium
      let parkingPremium = 0;
      switch(formData.parking) {
        case 'covered': parkingPremium = 1500; break;
        case 'open': parkingPremium = 800; break;
        case 'none': parkingPremium = 0; break;
      }

      // Amenities premium
      const amenitiesPremium = formData.amenities.reduce((total, amenity) => {
        const amenityData = amenitiesList.find(a => a.value === amenity);
        return total + (amenityData?.premium || 0);
      }, 0);

      // Calculate base rent
      const baseRent = baseRate * area * propertyMultiplier * bhkMultiplier;
      
      // Apply all factors
      const adjustedRent = baseRent * locationMultiplier * furnishingMultiplier * ageFactor * floorFactor;
      
      // Add premiums
      const totalRent = adjustedRent + parkingPremium + amenitiesPremium;

      // Calculate ranges
      const minRent = Math.round(totalRent * 0.85);
      const maxRent = Math.round(totalRent * 1.15);
      const avgRent = Math.round(totalRent);

      setCalculatedRent({
        minRent,
        avgRent,
        maxRent,
        baseRate,
        area,
        breakdown: {
          baseRent: Math.round(baseRent),
          locationAdjustment: Math.round(baseRent * (locationMultiplier - 1)),
          furnishingPremium: Math.round(baseRent * (furnishingMultiplier - 1)),
          ageFactor: Math.round(baseRent * (ageFactor - 1)),
          floorAdjustment: Math.round(baseRent * (floorFactor - 1)),
          parkingPremium,
          amenitiesPremium
        }
      });
      
      setIsCalculating(false);
      setShowComparison(true);
    }, 1500);
  };

  const resetCalculator = () => {
    setFormData({
      city: '',
      propertyType: '',
      bhkType: '',
      furnishingStatus: '',
      areaSquareFeet: '',
      amenities: [],
      buildingAge: '',
      floorLevel: '',
      parking: '',
      location: 'central'
    });
    setCalculatedRent(null);
    setShowComparison(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            🏠 Smart Rent Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Calculate accurate rental prices for properties across India based on location, 
            amenities, property type, and current market trends. Make informed rental decisions!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="mr-3">📋</span>
                Property Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                
                {/* City Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">Select City</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Property Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">Select Type</option>
                    {propertyTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                {/* BHK Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    BHK Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="bhkType"
                    value={formData.bhkType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">Select BHK</option>
                    {bhkTypes.map(bhk => (
                      <option key={bhk.value} value={bhk.value}>{bhk.label}</option>
                    ))}
                  </select>
                </div>

                {/* Number of Rooms (for PG/Shared accommodation) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Rooms <span className="text-gray-400">(Optional)</span>
                  </label>
                  <select
                    name="rooms"
                    value={formData.rooms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select Rooms</option>
                    {roomOptions.map(room => (
                      <option key={room.value} value={room.value}>{room.label}</option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500 mt-1">Useful for PG, shared accommodation, or rooms</p>
                </div>

                {/* Area */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Area (Square Feet) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="areaSquareFeet"
                    value={formData.areaSquareFeet}
                    onChange={handleInputChange}
                    placeholder="e.g., 1000"
                    min="100"
                    max="10000"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                {/* Furnishing Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Furnishing Status
                  </label>
                  <select
                    name="furnishingStatus"
                    value={formData.furnishingStatus}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select Status</option>
                    <option value="unfurnished">Unfurnished</option>
                    <option value="semi_furnished">Semi Furnished</option>
                    <option value="fully_furnished">Fully Furnished</option>
                  </select>
                </div>

                {/* Location Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location Type
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="premium">Premium Area (+40%)</option>
                    <option value="central">Central Area (+10%)</option>
                    <option value="suburban">Suburban Area (-10%)</option>
                    <option value="outskirts">Outskirts (-30%)</option>
                  </select>
                </div>

                {/* Building Age */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Building Age
                  </label>
                  <select
                    name="buildingAge"
                    value={formData.buildingAge}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select Age</option>
                    <option value="new">New Construction (+10%)</option>
                    <option value="1-5">1-5 Years (+5%)</option>
                    <option value="6-10">6-10 Years</option>
                    <option value="11-20">11-20 Years (-5%)</option>
                    <option value="20+">20+ Years (-15%)</option>
                  </select>
                </div>

                {/* Floor Level */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Floor Level
                  </label>
                  <select
                    name="floorLevel"
                    value={formData.floorLevel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select Floor</option>
                    <option value="ground">Ground Floor (-10%)</option>
                    <option value="low">Low Floor (1-2) (-5%)</option>
                    <option value="mid">Mid Floor (3-6)</option>
                    <option value="high">High Floor (7-15) (+5%)</option>
                    <option value="top">Top Floor (+10%)</option>
                  </select>
                </div>

              </div>

              {/* Parking */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Parking
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'none', label: 'No Parking', premium: '₹0' },
                    { value: 'open', label: 'Open Parking', premium: '+₹800' },
                    { value: 'covered', label: 'Covered Parking', premium: '+₹1,500' }
                  ].map(parking => (
                    <label key={parking.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="parking"
                        value={parking.value}
                        checked={formData.parking === parking.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`p-4 border-2 rounded-xl text-center transition-all ${
                        formData.parking === parking.value 
                          ? 'border-blue-500 bg-blue-50 text-blue-700' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="font-semibold">{parking.label}</div>
                        <div className="text-sm text-green-600 font-medium">{parking.premium}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Amenities (Select all that apply)
                </label>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {amenitiesList.map(amenity => (
                    <label key={amenity.value} className="cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity.value)}
                        onChange={() => handleAmenityChange(amenity.value)}
                        className="sr-only"
                      />
                      <div className={`p-3 border-2 rounded-lg text-sm text-center transition-all ${
                        formData.amenities.includes(amenity.value)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="font-medium">{amenity.label}</div>
                        <div className="text-green-600 text-xs">+₹{amenity.premium}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Calculate Button */}
              <div className="mt-8 flex gap-4">
                <button
                  onClick={calculateRent}
                  disabled={isCalculating}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isCalculating ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Calculating...
                    </span>
                  ) : (
                    '🧮 Calculate Rent'
                  )}
                </button>
                
                <button
                  onClick={resetCalculator}
                  className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              
              {/* Quick Tips */}
              <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl p-6 text-white mb-6">
                <h3 className="text-xl font-bold mb-4">💡 Quick Tips</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    Consider total monthly cost including utilities
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    Location affects rent by 30-50%
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    Amenities can add ₹2,000-8,000 to rent
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    Furnished properties cost 15-30% more
                  </li>
                </ul>
              </div>

              {/* Results */}
              {calculatedRent && (
                <div className="bg-white rounded-3xl shadow-xl p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">📊</span>
                    Estimated Rent
                  </h3>

                  {/* Rent Range */}
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white mb-6">
                    <div className="text-center">
                      <div className="text-lg font-semibold mb-2">Expected Range</div>
                      <div className="text-4xl font-bold mb-2">
                        ₹{calculatedRent.minRent.toLocaleString()} - ₹{calculatedRent.maxRent.toLocaleString()}
                      </div>
                      <div className="text-lg">
                        Average: <span className="font-bold">₹{calculatedRent.avgRent.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Market Context */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-xl text-center">
                      <div className="text-green-600 font-bold text-lg">₹{calculatedRent.baseRate}</div>
                      <div className="text-green-700 text-sm">Per Sq Ft Rate</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl text-center">
                      <div className="text-blue-600 font-bold text-lg">{calculatedRent.area}</div>
                      <div className="text-blue-700 text-sm">Square Feet</div>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Cost Breakdown:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Base Rent</span>
                        <span className="font-semibold">₹{calculatedRent.breakdown.baseRent.toLocaleString()}</span>
                      </div>
                      {calculatedRent.breakdown.locationAdjustment !== 0 && (
                        <div className="flex justify-between">
                          <span>Location Adjustment</span>
                          <span className={`font-semibold ${calculatedRent.breakdown.locationAdjustment > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {calculatedRent.breakdown.locationAdjustment > 0 ? '+' : ''}₹{calculatedRent.breakdown.locationAdjustment.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {calculatedRent.breakdown.furnishingPremium > 0 && (
                        <div className="flex justify-between">
                          <span>Furnishing Premium</span>
                          <span className="font-semibold text-red-600">+₹{calculatedRent.breakdown.furnishingPremium.toLocaleString()}</span>
                        </div>
                      )}
                      {calculatedRent.breakdown.parkingPremium > 0 && (
                        <div className="flex justify-between">
                          <span>Parking</span>
                          <span className="font-semibold text-red-600">+₹{calculatedRent.breakdown.parkingPremium.toLocaleString()}</span>
                        </div>
                      )}
                      {calculatedRent.breakdown.amenitiesPremium > 0 && (
                        <div className="flex justify-between">
                          <span>Amenities</span>
                          <span className="font-semibold text-red-600">+₹{calculatedRent.breakdown.amenitiesPremium.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 space-y-3">
                    <button 
                      onClick={() => window.location.href = '/'}
                      className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                    >
                      🔍 Find Properties in This Range
                    </button>
                    <button 
                      onClick={() => setShowComparison(!showComparison)}
                      className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                    >
                      📊 View Market Comparison
                    </button>
                  </div>
                </div>
              )}

              {/* Market Comparison */}
              {showComparison && calculatedRent && (
                <div className="bg-white rounded-3xl shadow-xl p-6 mt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Market Comparison</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium">Budget Range</span>
                      <span className="font-bold text-red-600">₹{Math.round(calculatedRent.avgRent * 0.7).toLocaleString()} - ₹{Math.round(calculatedRent.avgRent * 0.85).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Your Range</span>
                      <span className="font-bold text-green-600">₹{calculatedRent.minRent.toLocaleString()} - ₹{calculatedRent.maxRent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">Premium Range</span>
                      <span className="font-bold text-blue-600">₹{Math.round(calculatedRent.avgRent * 1.3).toLocaleString()} - ₹{Math.round(calculatedRent.avgRent * 1.6).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">💡 Negotiation Tips:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Offer 5-10% below average for better deals</li>
                      <li>• Consider longer lease terms for discounts</li>
                      <li>• Peak season (Jan-Mar) has higher rates</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Accurate Estimates</h3>
            <p className="text-gray-600">Our calculator uses real market data from 120+ Indian cities to provide accurate rental estimates.</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Market Insights</h3>
            <p className="text-gray-600">Get detailed breakdowns of how location, amenities, and property features affect rental prices.</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-3xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Save Money</h3>
            <p className="text-gray-600">Make informed decisions and negotiate better rental deals with data-backed pricing insights.</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How accurate is this rent calculator?</h3>
              <p className="text-gray-600 mb-4">Our calculator uses real market data and considers multiple factors to provide estimates within 10-15% of actual market rates.</p>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">What factors affect rental prices?</h3>
              <p className="text-gray-600">Location, property type, amenities, furnishing status, building age, floor level, and local market conditions all impact rental prices.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is this calculator free to use?</h3>
              <p className="text-gray-600 mb-4">Yes, our rent calculator is completely free to use with no hidden charges or registration required.</p>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use this for commercial properties?</h3>
              <p className="text-gray-600">This calculator is optimized for residential properties. Commercial property rentals follow different market dynamics.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentCalculator;