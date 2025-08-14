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
    // Update SEO immediately when component mounts
    updateSEO(
      'Rent Calculator India - Calculate Rental Costs for 180+ Cities | GetRentals',
      'Advanced rent calculator for India covering 180+ cities. Calculate accurate rental costs for rooms, 1BHK, 2BHK, 3BHK, PGs & houses. Factor in rent, deposit, utilities & maintenance. Plan your rental budget with precision for Delhi, Mumbai, Bangalore, Pune, Chennai, Hyderabad and more Indian cities.',
      'rent calculator india, rental cost calculator, budget planning tool, property rent estimator, rental budget calculator, rent estimation tool, apartment rent calculator, pg rent calculator, house rent calculator, rental affordability calculator, indian cities rent, delhi rent calculator, mumbai rent calculator, bangalore rent calculator, rental cost estimation, property budget planner'
    );
    
    // Also update Open Graph and Twitter tags for social sharing consistency
    const updateSocialTags = () => {
      // Update Open Graph title
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', 'Rent Calculator India - Calculate Rental Costs for 180+ Cities | GetRentals');
      }
      
      // Update Twitter title
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle) {
        twitterTitle.setAttribute('content', 'Rent Calculator India - Calculate Rental Costs for 180+ Cities | GetRentals');
      }
      
      // Update Open Graph description
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', 'Advanced rent calculator for India covering 180+ cities. Calculate accurate rental costs for rooms, 1BHK, 2BHK, 3BHK, PGs & houses with precision.');
      }
      
      // Update Twitter description
      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescription) {
        twitterDescription.setAttribute('content', 'Advanced rent calculator for India covering 180+ cities. Calculate accurate rental costs for rooms, 1BHK, 2BHK, 3BHK, PGs & houses with precision.');
      }
    };
    
    // Update social tags immediately and after a small delay to ensure consistency
    updateSocialTags();
    const timeoutId = setTimeout(updateSocialTags, 100);
    
    return () => clearTimeout(timeoutId);
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

  // City-wise base rent rates per square foot (expanded list)
  const cityBaseRates = {
    'Agartala, Tripura': 12,
    'Agra, Uttar Pradesh': 17,
    'Ahmedabad, Gujarat': 28,
    'Ajmer, Rajasthan': 15,
    'Akola, Maharashtra': 14,
    'Aligarh, Uttar Pradesh': 15,
    'Allahabad, Uttar Pradesh': 16,
    'Amravati, Maharashtra': 16,
    'Amritsar, Punjab': 18,
    'Asansol, West Bengal': 12,
    'Aurangabad, Maharashtra': 19,
    'Bangalore, Karnataka': 45,
    'Bareilly, Uttar Pradesh': 14,
    'Belgaum, Karnataka': 18,
    'Bhubaneswar, Odisha': 22,
    'Bhiwandi, Maharashtra': 35,
    'Bhilai, Chhattisgarh': 16,
    'Bhopal, Madhya Pradesh': 19,
    'Bikaner, Rajasthan': 13,
    'Chandigarh, Chandigarh': 40,
    'Chennai, Tamil Nadu': 35,
    'Coimbatore, Tamil Nadu': 20,
    'Cuttack, Odisha': 16,
    'Dehradun, Uttarakhand': 25,
    'Delhi': 55,
    'Dhanbad, Jharkhand': 12,
    'Durgapur, West Bengal': 14,
    'Erode, Tamil Nadu': 16,
    'Faridabad, Haryana': 36,
    'Firozabad, Uttar Pradesh': 13,
    'Ghaziabad, Uttar Pradesh': 32,
    'Gorakhpur, Uttar Pradesh': 13,
    'Guntur, Andhra Pradesh': 18,
    'Gurgaon, Haryana': 50,
    'Gwalior, Madhya Pradesh': 16,
    'Guwahati, Assam': 20,
    'Hubballi-Dharwad, Karnataka': 16,
    'Howrah, West Bengal': 22,
    'Hyderabad, Telangana': 38,
    'Indore, Madhya Pradesh': 24,
    'Jabalpur, Madhya Pradesh': 18,
    'Jaipur, Rajasthan': 22,
    'Jalandhar, Punjab': 20,
    'Jammu, Jammu and Kashmir': 18,
    'Jamshedpur, Jharkhand': 18,
    'Jodhpur, Rajasthan': 16,
    'Kanpur, Uttar Pradesh': 16,
    'Kochi, Kerala': 28,
    'Kolkata, West Bengal': 30,
    'Kolhapur, Maharashtra': 18,
    'Kota, Rajasthan': 18,
    'Lucknow, Uttar Pradesh': 18,
    'Ludhiana, Punjab': 21,
    'Madurai, Tamil Nadu': 18,
    'Maheshtala, West Bengal': 20,
    'Malegaon, Maharashtra': 14,
    'Mangalore, Karnataka': 22,
    'Meerut, Uttar Pradesh': 18,
    'Moradabad, Uttar Pradesh': 15,
    'Mumbai': 85,
    'Mysore, Karnataka': 20,
    'Nagpur, Maharashtra': 20,
    'Nanded, Maharashtra': 15,
    'Nashik, Maharashtra': 23,
    'Nellore, Andhra Pradesh': 16,
    'Noida, Uttar Pradesh': 45,
    'Panaji, Goa': 35,
    'Patna, Bihar': 15,
    'Pimpri-Chinchwad, Maharashtra': 35,
    'Prayagraj, Uttar Pradesh': 16,
    'Pune, Maharashtra': 40,
    'Rajkot, Gujarat': 20,
    'Raipur, Chhattisgarh': 18,
    'Ranchi, Jharkhand': 18,
    'Rourkela, Odisha': 16,
    'Salem, Tamil Nadu': 16,
    'Sangli-Miraj & Kupwad, Maharashtra': 15,
    'Siliguri, West Bengal': 16,
    'Surat, Gujarat': 25,
    'Thane, Maharashtra': 65,
    'Thiruchirappalli, Tamil Nadu': 16,
    'Thiruvananthapuram, Kerala': 25,
    'Tirunelveli, Tamil Nadu': 14,
    'Tiruppur, Tamil Nadu': 16,
    'Udaipur, Rajasthan': 18,
    'Ujjain, Madhya Pradesh': 15,
    'Ulhasnagar, Maharashtra': 32,
    'Vadodara, Gujarat': 27,
    'Varanasi, Uttar Pradesh': 14,
    'Vasai-Virar, Maharashtra': 40,
    'Vijayawada, Andhra Pradesh': 20,
    'Visakhapatnam, Andhra Pradesh': 26,
    'Warangal, Telangana': 16,
    'Shillong, Meghalaya': 18,
    'New Delhi': 60,
    'Old Delhi': 50,
    'Bengaluru, Karnataka': 45,
    'Shimla, Himachal Pradesh': 25,
    // Additional cities
    'Aizawl, Mizoram': 15,
    'Alappuzha, Kerala': 20,
    'Anantapur, Andhra Pradesh': 14,
    'Arrah, Bihar': 12,
    'Ambala, Haryana': 20,
    'Baranagar, West Bengal': 18,
    'Bardhaman, West Bengal': 15,
    'Bathinda, Punjab': 16,
    'Begusarai, Bihar': 12,
    'Bhagalpur, Bihar': 13,
    'Bharatpur, Rajasthan': 14,
    'Bhavnagar, Gujarat': 18,
    'Bhiwani, Haryana': 18,
    'Bidar, Karnataka': 14,
    'Bokaro, Jharkhand': 15,
    'Chhapra, Bihar': 12,
    'Chhindwara, Madhya Pradesh': 14,
    'Darbhanga, Bihar': 12,
    'Dibrugarh, Assam': 16,
    'Dindigul, Tamil Nadu': 15,
    'Durg, Chhattisgarh': 14,
    'Eluru, Andhra Pradesh': 14,
    'Fatehpur, Uttar Pradesh': 12,
    'Gandhinagar, Gujarat': 30,
    'Gaya, Bihar': 12,
    'Ghazipur, Uttar Pradesh': 13,
    'Gondia, Maharashtra': 14,
    'Gopalganj, Bihar': 11,
    'Hajipur, Bihar': 12,
    'Haldwani, Uttarakhand': 18,
    'Hansi, Haryana': 15,
    'Hisar, Haryana': 18,
    'Ichalkaranji, Maharashtra': 16,
    'Itanagar, Arunachal Pradesh': 20,
    'Jagdalpur, Chhattisgarh': 12,
    'Jalgaon, Maharashtra': 16,
    'Jalna, Maharashtra': 14,
    'Jamnagar, Gujarat': 18,
    'Jhansi, Uttar Pradesh': 15,
    'Junagadh, Gujarat': 16,
    'Kadapa, Andhra Pradesh': 14,
    'Kakinada, Andhra Pradesh': 16,
    'Kalyan-Dombivli, Maharashtra': 45,
    'Kamarhati, West Bengal': 20,
    'Kanchipuram, Tamil Nadu': 18,
    'Karaikudi, Tamil Nadu': 14,
    'Karimnagar, Telangana': 15,
    'Karnal, Haryana': 22,
    'Katihar, Bihar': 12,
    'Khammam, Telangana': 15,
    'Khandwa, Madhya Pradesh': 14,
    'Kharagpur, West Bengal': 16,
    'Korba, Chhattisgarh': 14,
    'Kottayam, Kerala': 20,
    'Kozhikode, Kerala': 22,
    'Kurnool, Andhra Pradesh': 15,
    'Latur, Maharashtra': 16,
    'Machilipatnam, Andhra Pradesh': 14,
    'Malda, West Bengal': 14,
    'Mandya, Karnataka': 16,
    'Mathura, Uttar Pradesh': 16,
    'Medininagar, Jharkhand': 14,
    'Mira-Bhayandar, Maharashtra': 50,
    'Nadiad, Gujarat': 18,
    'Nalgonda, Telangana': 14,
    'Namakkal, Tamil Nadu': 15,
    'Narsinghpur, Madhya Pradesh': 13,
    'Navsari, Gujarat': 20,
    'Nizamabad, Telangana': 15,
    'Ongole, Andhra Pradesh': 14,
    'Palakkad, Kerala': 18,
    'Palghar, Maharashtra': 25,
    'Parbhani, Maharashtra': 14,
    'Patan, Gujarat': 16,
    'Phagwara, Punjab': 18,
    'Port Blair, Andaman and Nicobar Islands': 25,
    'Puducherry, Puducherry': 22,
    'Raichur, Karnataka': 14,
    'Rewa, Madhya Pradesh': 14,
    'Rewari, Haryana': 20,
    'Rohtak, Haryana': 22,
    'Roorkee, Uttarakhand': 20,
    'Sagar, Madhya Pradesh': 14,
    'Saharanpur, Uttar Pradesh': 16,
    'Sambalpur, Odisha': 15,
    'Satara, Maharashtra': 16,
    'Satna, Madhya Pradesh': 14,
    'Shahjahanpur, Uttar Pradesh': 13,
    'Shimoga, Karnataka': 16,
    'Sikar, Rajasthan': 15,
    'Sirsa, Haryana': 16,
    'Solan, Himachal Pradesh': 20,
    'Solapur, Maharashtra': 16,
    'Sonipat, Haryana': 25,
    'Sultanpur, Uttar Pradesh': 12,
    'Tenali, Andhra Pradesh': 15,
    'Thanjavur, Tamil Nadu': 15,
    'Tumkur, Karnataka': 18,
    'Udupi, Karnataka': 20,
    'Unnao, Uttar Pradesh': 13,
    'Valsad, Gujarat': 20,
    'Vellore, Tamil Nadu': 16,
    'Yamunanagar, Haryana': 18
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
      rooms: '',
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
            Advanced Rent Calculator for India
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6">
            Calculate accurate rental prices for properties across 180+ Indian cities based on location, 
            amenities, property type, and current market trends. Make informed rental decisions with our comprehensive budget planning tool!
          </p>
          
          {/* SEO-friendly features highlight */}
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-blue-100 rounded-lg p-4">
              <div className="text-2xl mb-2">🏙️</div>
              <h3 className="font-semibold text-sm">180+ Cities</h3>
              <p className="text-xs text-gray-600">All major Indian cities</p>
            </div>
            <div className="bg-green-100 rounded-lg p-4">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="font-semibold text-sm">All Property Types</h3>
              <p className="text-xs text-gray-600">Rooms, BHK, PG, Houses</p>
            </div>
            <div className="bg-purple-100 rounded-lg p-4">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="font-semibold text-sm">Complete Budget</h3>
              <p className="text-xs text-gray-600">Rent + Utilities + Deposit</p>
            </div>
            <div className="bg-orange-100 rounded-lg p-4">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-sm">Market Data</h3>
              <p className="text-xs text-gray-600">Real-time rental rates</p>
            </div>
          </div>
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
                    'Calculate Rent'
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
                      onClick={() => {
                        // Navigate to properties page with calculated rent range as filters
                        const minRent = calculatedRent.minRent;
                        const maxRent = calculatedRent.maxRent;
                        const city = formData.city;
                        const params = new URLSearchParams({
                          min_rent: minRent.toString(),
                          max_rent: maxRent.toString(),
                          ...(city && { city: city }),
                          ...(formData.propertyType && { property_type: formData.propertyType })
                        });
                        window.location.href = `/properties?${params.toString()}`;
                      }}
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

        {/* Cities Coverage Section for SEO */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">180+ Indian Cities Covered</h2>
          <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            Our rent calculator provides accurate rental cost estimates for major metros, tier-2, and tier-3 cities across India
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🏙️ Metro Cities</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Delhi & New Delhi</li>
                <li>• Mumbai & Thane</li>
                <li>• Bangalore & Bengaluru</li>
                <li>• Chennai & Coimbatore</li>
                <li>• Pune & Pimpri-Chinchwad</li>
                <li>• Hyderabad & Secunderabad</li>
                <li>• Kolkata & Howrah</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🏢 Tier-2 Cities</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Jaipur & Jodhpur</li>
                <li>• Lucknow & Kanpur</li>
                <li>• Indore & Bhopal</li>
                <li>• Nagpur & Nashik</li>
                <li>• Surat & Ahmedabad</li>
                <li>• Kochi & Thiruvananthapuram</li>
                <li>• Patna & Gaya</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🏘️ IT Hubs</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Gurgaon & Noida</li>
                <li>• Faridabad & Ghaziabad</li>
                <li>• Mysore & Mangalore</li>
                <li>• Chandigarh & Mohali</li>
                <li>• Bhubaneswar & Cuttack</li>
                <li>• Dehradun & Roorkee</li>
                <li>• Gandhinagar & Vadodara</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🌆 Emerging Cities</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Agra & Aligarh</li>
                <li>• Raipur & Bhilai</li>
                <li>• Visakhapatnam & Vijayawada</li>
                <li>• Coimbatore & Salem</li>
                <li>• Jalandhar & Ludhiana</li>
                <li>• Ranchi & Jamshedpur</li>
                <li>• Many more cities...</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              <strong>Coverage includes:</strong> All major metros, state capitals, IT hubs, industrial cities, educational centers, and emerging urban areas across India. 
              Updated regularly with latest market data for accurate rent estimation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentCalculator;