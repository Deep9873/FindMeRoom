import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import './App.css';
import axios from 'axios';

const RAW_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const BACKEND_URL = RAW_BACKEND_URL.replace(/\/+$/, '');
const API = `${BACKEND_URL}/api`;

// Major Indian Cities List
const MAJOR_INDIAN_CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 
  'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
  'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad',
  'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivali',
  'Vasai-Virar', 'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar',
  'Navi Mumbai', 'Allahabad', 'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur',
  'Gwalior', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati',
  'Chandigarh', 'Solapur', 'Hubballi-Dharwad', 'Tiruchirappalli', 'Bareilly',
  'Mysore', 'Tiruppur', 'Gurgaon', 'Aligarh', 'Jalandhar', 'Bhubaneswar',
  'Salem', 'Warangal', 'Guntur', 'Bhiwandi', 'Saharanpur', 'Gorakhpur',
  'Bikaner', 'Amravati', 'Noida', 'Jamshedpur', 'Bhilai', 'Cuttack',
  'Firozabad', 'Kochi', 'Nellore', 'Bhavnagar', 'Dehradun', 'Durgapur',
  'Asansol', 'Rourkela', 'Nanded', 'Kolhapur', 'Ajmer', 'Akola', 'Gulbarga',
  'Jamnagar', 'Ujjain', 'Loni', 'Siliguri', 'Jhansi', 'Ulhasnagar', 'Jammu',
  'Sangli-Miraj & Kupwad', 'Mangalore', 'Erode', 'Belgaum', 'Ambattur', 'Tirunelveli',
  'Malegaon', 'Gaya', 'Jalgaon', 'Udaipur', 'Maheshtala'
].sort();

// Reusable City Selector Component
const CitySelector = ({ value, onChange, placeholder = "Select City", className = "" }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCustomCity, setIsCustomCity] = useState(false);
  const dropdownRef = useRef(null);

  // Filter cities based on search term
  const filteredCities = MAJOR_INDIAN_CITIES.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCitySelect = (city) => {
    onChange(city);
    setIsDropdownOpen(false);
    setSearchTerm('');
    setIsCustomCity(false);
  };

  const handleCustomCityToggle = () => {
    setIsCustomCity(true);
    setIsDropdownOpen(false);
    if (!isCustomCity) {
      onChange(''); // Clear current value when switching to custom
    }
  };

  const handleCustomCityChange = (e) => {
    onChange(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Check if current value is a custom city (not in the major cities list)
  const isCurrentValueCustom = value && !MAJOR_INDIAN_CITIES.includes(value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {isCustomCity || isCurrentValueCustom ? (
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={handleCustomCityChange}
            placeholder="Enter your city"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-20"
          />
          <button
            type="button"
            onClick={() => {
              setIsCustomCity(false);
              onChange('');
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-blue-600 hover:text-blue-800"
          >
            Use List
          </button>
        </div>
      ) : (
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-left flex justify-between items-center"
          >
            <span className={value ? 'text-black' : 'text-gray-500'}>
              {value || placeholder}
            </span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {/* Search input */}
              <div className="p-2 border-b">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search cities..."
                  className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Custom city option */}
              <button
                type="button"
                onClick={handleCustomCityToggle}
                className="w-full px-3 py-2 text-left hover:bg-blue-50 text-blue-600 border-b text-sm font-medium"
              >
                + Add Other City
              </button>

              {/* Cities list */}
              <div className="max-h-40 overflow-y-auto">
                {filteredCities.length > 0 ? (
                  filteredCities.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => handleCitySelect(city)}
                      className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
                    >
                      {city}
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    No cities found. Try different search terms.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Context for authentication
const AuthContext = createContext();

// Context for city selection
const CityContext = createContext();

const CityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(() => {
    // Get from localStorage if available
    return localStorage.getItem('selectedCity') || '';
  });

  const updateSelectedCity = (city) => {
    setSelectedCity(city);
    if (city) {
      localStorage.setItem('selectedCity', city);
    } else {
      localStorage.removeItem('selectedCity');
    }
  };

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity: updateSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};

const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserInfo();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${API}/auth/me`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user info:', error);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API}/auth/login`, { email, password });
      const { access_token, user } = response.data;
      localStorage.setItem('token', access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API}/auth/register`, userData);
      const { access_token, user } = response.data;
      localStorage.setItem('token', access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Components
// Mobile Bottom Navigation Component
const MobileBottomNavigation = ({ currentView, setCurrentView }) => {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Load unread count when user is logged in
  useEffect(() => {
    if (user) {
      loadUnreadCount();
      
      // Set up polling for unread count
      const interval = setInterval(() => {
        loadUnreadCount();
      }, 5000); // Poll every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [user]);

  const loadUnreadCount = async () => {
    if (!user) return;
    
    try {
      const url = `${BACKEND_URL}/api/chat/unread-count`;
      console.log('Fetching unread count from URL:', url);
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUnreadCount(data.unread_count);
      }
    } catch (error) {
      console.error('Failed to load unread count:', error);
    }
  };
  
  const navItems = [
    { 
      id: 'home', 
      name: 'Home', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
        </svg>
      ),
      requireAuth: false
    },
    { 
      id: 'chat', 
      name: 'Chat', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      requireAuth: true
    },
    { 
      id: 'profile', 
      name: 'Profile', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      requireAuth: true
    }
  ];

  const handleNavClick = (item) => {
    if (item.requireAuth && !user) {
      setCurrentView('login');
    } else {
      setCurrentView(item.id);
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item)}
            className={`flex flex-col items-center justify-center p-2 flex-1 relative ${
              currentView === item.id 
                ? 'text-blue-600' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <div className="mb-1 relative">
              {item.icon}
              {item.id === 'chat' && user && unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Profile Component
const ProfilePage = ({ setCurrentView }) => {
  const { user, logout } = useAuth();
  
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to access your profile</p>
          <button
            onClick={() => setCurrentView('login')}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <button 
              onClick={() => setCurrentView('home')}
              className="text-gray-500 hover:text-gray-700 md:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-6">
            {/* User Info */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-gray-900">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                  <p className="text-gray-500 text-sm">{user.id}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setCurrentView('post')}
                  className="flex items-center justify-center p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Post New Property
                </button>
                <button
                  onClick={() => setCurrentView('my-properties')}
                  className="flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  </svg>
                  My Properties
                </button>
                <button
                  onClick={() => setCurrentView('chat')}
                  className="flex items-center justify-center p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Chat Messages
                </button>
                <button
                  onClick={() => setCurrentView('properties')}
                  className="flex items-center justify-center p-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Properties
                </button>
              </div>
            </div>

            {/* Account Actions */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Account</h2>
              <button
                onClick={logout}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = ({ currentView, setCurrentView }) => {
  const { user, logout } = useAuth();
  const { selectedCity, setSelectedCity } = useCity();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load unread count when user is logged in
  useEffect(() => {
    if (user) {
      loadUnreadCount();
      
      // Set up polling for unread count
      const interval = setInterval(() => {
        loadUnreadCount();
      }, 5000); // Poll every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [user]);

  const loadUnreadCount = async () => {
    if (!user) return;
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/chat/unread-count`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUnreadCount(data.unread_count);
      }
    } catch (error) {
      console.error('Failed to load unread count:', error);
    }
  };

  const handleChatClick = () => {
    if (user) {
      setCurrentView('chat');
    } else {
      setCurrentView('login');
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => setCurrentView('home')}>
              FindMeRoom
            </h1>
            
            {/* City Selector */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <CitySelector
                  value={selectedCity}
                  onChange={setSelectedCity}
                  placeholder="Select your city"
                  className="w-40"
                />
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => setCurrentView('home')}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentView('properties')}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Properties
            </button>
            <button 
              onClick={() => user ? setCurrentView('post') : setCurrentView('login')}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Post Property
            </button>
            <button 
              onClick={() => user ? setCurrentView('my-properties') : setCurrentView('login')}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              My Properties
            </button>
            <button 
              onClick={handleChatClick}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium relative"
            >
              Chat
              {user && unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user.name}!</span>
                <button 
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <button 
                  onClick={() => setCurrentView('login')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Login
                </button>
                <button 
                  onClick={() => setCurrentView('register')}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {/* Mobile City Selector */}
              <div className="px-3 py-2 border-b">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Your City</label>
                <CitySelector
                  value={selectedCity}
                  onChange={setSelectedCity}
                  placeholder="Select your city"
                  className="w-full"
                />
              </div>
              
              <button 
                onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md text-base font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => { setCurrentView('properties'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md text-base font-medium"
              >
                Properties
              </button>
              <button 
                onClick={() => { user ? setCurrentView('post') : setCurrentView('login'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md text-base font-medium"
              >
                Post Property
              </button>
              <button 
                onClick={() => { user ? setCurrentView('my-properties') : setCurrentView('login'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md text-base font-medium"
              >
                My Properties
              </button>
              <button 
                onClick={() => { handleChatClick(); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md text-base font-medium relative"
              >
                Chat
                {user && unreadCount > 0 && (
                  <span className="absolute top-2 right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              
              {/* Mobile Auth Buttons */}
              <div className="border-t pt-4">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-gray-700 text-sm">Welcome, {user.name}!</div>
                    <button 
                      onClick={() => { logout(); setMobileMenuOpen(false); }}
                      className="block w-full text-left px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button 
                      onClick={() => { setCurrentView('login'); setMobileMenuOpen(false); }}
                      className="block w-full text-left px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => { setCurrentView('register'); setMobileMenuOpen(false); }}
                      className="block w-full text-left px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                    >
                      Register
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const HeroSection = () => {
  const scrollToSearch = () => {
    const searchSection = document.getElementById('search-section');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688')`
        }}
      />
      <div className="relative z-10 text-center text-white">
        <h2 className="text-5xl font-bold mb-4">Find Your Perfect Room</h2>
        <p className="text-xl mb-8">Discover amazing rooms, houses, and PGs in your city</p>
        <button 
          onClick={scrollToSearch}
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
        >
          Start Searching
        </button>
      </div>
    </div>
  );
};

// Enhanced Chat Interface Component
const EnhancedChatInterface = ({ setCurrentView, selectedProperty = null, prefilledMessage = "" }) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(prefilledMessage);
  const [loading, setLoading] = useState(false);
  const [conversationsLoading, setConversationsLoading] = useState(true);
  const [error, setError] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);

  // Poll for new messages and unread count
  useEffect(() => {
    if (user) {
      loadConversations();
      loadUnreadCount();
      
      // Set up polling for real-time updates
      const interval = setInterval(() => {
        loadUnreadCount();
        if (selectedConversation) {
          loadChatMessages(selectedConversation.property_id, selectedConversation.other_user_id);
        }
      }, 10000); // Poll every 10 seconds
      
      return () => clearInterval(interval);
    }
  }, [user]); // Remove selectedConversation from dependencies to prevent reload loops

  // Load messages when conversation selection changes
  useEffect(() => {
    if (selectedConversation && selectedConversation.property_id && selectedConversation.other_user_id) {
      loadChatMessages(selectedConversation.property_id, selectedConversation.other_user_id);
    }
  }, [selectedConversation?.property_id, selectedConversation?.other_user_id]);

  // Handle initial property selection
  useEffect(() => {
    if (selectedProperty) {
      // Check if conversation already exists
      const existingConv = conversations.find(c => c.property_id === selectedProperty.id);
      if (existingConv) {
        setSelectedConversation(existingConv);
      } else {
        // Create a new conversation structure
        const newConv = {
          property_id: selectedProperty.id,
          property_title: selectedProperty.title,
          property_image: selectedProperty.images?.[0] || null,
          other_user_id: selectedProperty.user_id,
          other_user_name: "Property Owner",
          last_message: "",
          last_message_time: new Date(),
          unread_count: 0,
          is_sender: false
        };
        setSelectedConversation(newConv);
      }
    }
  }, [selectedProperty, conversations]);

  // Update message when prefilledMessage changes
  useEffect(() => {
    if (prefilledMessage) {
      setNewMessage(prefilledMessage);
    }
  }, [prefilledMessage]);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadConversations = async () => {
    setConversationsLoading(true);
    try {
      const url = `${BACKEND_URL}/api/chat/conversations`;
      console.log('Fetching conversations from URL:', url);
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      }
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setConversationsLoading(false);
    }
  };

  const loadUnreadCount = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/chat/unread-count`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUnreadCount(data.unread_count);
      }
    } catch (error) {
      console.error('Failed to load unread count:', error);
    }
  };

  const loadChatMessages = async (propertyId, otherUserId) => {
    if (!propertyId || !otherUserId || !user) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/chat/${propertyId}?other_user_id=${otherUserId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(data || []);
        
        // Mark messages as read
        const unreadMessages = data.filter(msg => 
          msg.receiver_id === user.id && !msg.is_read
        );
        if (unreadMessages.length > 0) {
          markMessagesRead(unreadMessages.map(msg => msg.id));
        }
      }
    } catch (error) {
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const markMessagesRead = async (messageIds) => {
    try {
      const url = `${BACKEND_URL}/api/chat/mark-read`;
      console.log('Marking messages as read with URL:', url);
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          message_ids: messageIds
        })
      });
      
      // Refresh unread count
      loadUnreadCount();
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;
    
    setLoading(true);
    try {
      const url = `${BACKEND_URL}/api/chat`;
      console.log('Sending message with URL:', url);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          property_id: selectedConversation.property_id,
          receiver_id: selectedConversation.other_user_id,
          message: newMessage
        }) 
      });
       
      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, data]);
        setNewMessage('');
        setError('');
        
        // Refresh conversations to update last message
        loadConversations();
      } else {
        setError('Failed to send message');
      }
    } catch (error) {
      setError('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    // loadChatMessages will be called by useEffect when selectedConversation changes
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to access the chat</p>
          <button
            onClick={() => setCurrentView('login')}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Conversations List */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Conversations</h2>
            <button
              onClick={() => setCurrentView('home')}
              className="text-gray-500 hover:text-gray-700 md:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversationsLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : conversations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No conversations yet</p>
              <p className="text-sm">Start chatting with property owners!</p>
            </div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation.property_id}
                onClick={() => handleConversationSelect(conversation)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedConversation?.property_id === conversation.property_id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0">
                    {conversation.property_image ? (
                      <img 
                        src={conversation.property_image.startsWith('data:') ? conversation.property_image : `data:image/jpeg;base64,${conversation.property_image}`}
                        alt={conversation.property_title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 truncate">{conversation.property_title}</h3>
                      {conversation.unread_count > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {conversation.unread_count}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.other_user_name}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {conversation.is_sender ? 'You: ' : ''}{conversation.last_message}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(conversation.last_message_time).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0">
                  {selectedConversation.property_image ? (
                    <img 
                      src={selectedConversation.property_image.startsWith('data:') ? selectedConversation.property_image : `data:image/jpeg;base64,${selectedConversation.property_image}`}
                      alt={selectedConversation.property_title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedConversation.property_title}</h3>
                  <p className="text-sm text-gray-600">{selectedConversation.other_user_name}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {loading && messages.length === 0 ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender_id === user.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-900 border'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className={`text-xs ${
                          message.sender_id === user.id ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {new Date(message.created_at).toLocaleTimeString()}
                        </p>
                        {message.sender_id === user.id && (
                          <div className="flex items-center space-x-1">
                            <svg className={`w-3 h-3 ${message.is_read ? 'text-blue-200' : 'text-blue-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {message.is_read && (
                              <svg className="w-3 h-3 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              {error && (
                <div className="mb-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}
              <form onSubmit={sendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !newMessage.trim()}
                  className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send'}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p>Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PropertyCard = ({ property, onViewDetails, setCurrentView, setChatProperty }) => {
  const { user } = useAuth();
  
  const handleContactOwner = async () => {
    if (!user) {
      setCurrentView('login');
      return;
    }
    
    // Check if user is the owner of this property
    if (user.id === property.user_id) {
      alert('You cannot contact yourself on your own property!');
      return;
    }
    
    // Open chat interface with this property
    setChatProperty(property);
    setCurrentView('chat');
  };
  
  // Check if current user is the owner of this property
  const isOwner = user && user.id === property.user_id;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 relative">
        {property.images && property.images.length > 0 ? (
          <img 
            src={property.images[0].startsWith('data:') ? property.images[0] : `data:image/jpeg;base64,${property.images[0]}`}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            property.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {property.available ? 'Available' : 'Not Available'}
          </span>
        </div>
        
        {isOwner && (
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
              Your Property
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">{property.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{property.location}</p>
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{property.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-green-600">₹{property.rent}</span>
            <span className="text-gray-500">/month</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Deposit:</span>
            <span className="text-sm font-semibold text-gray-900">₹{property.deposit}</span>
          </div>
        </div>
        
        {property.amenities && property.amenities.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {property.amenities.slice(0, 3).map((amenity, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                  +{property.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="flex space-x-2">
          <button 
            onClick={() => onViewDetails(property)}
            className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            View Details
          </button>
          {isOwner ? (
            <button 
              className="flex-1 bg-gray-400 text-white py-2 rounded-md cursor-not-allowed"
              disabled
              title="You cannot contact yourself on your own property"
            >
              Your Property
            </button>
          ) : (
            <button 
              onClick={handleContactOwner}
              className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Contact Owner
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const SearchFilters = ({ onSearch }) => {
  const { selectedCity } = useCity();
  const [filters, setFilters] = useState({
    city: '',
    property_type: '',
    min_rent: '',
    max_rent: ''
  });

  // Update filters when selectedCity changes
  useEffect(() => {
    if (selectedCity) {
      setFilters(prev => ({ ...prev, city: selectedCity }));
    }
  }, [selectedCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div id="search-section" className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-lg font-semibold mb-4">Search Properties</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <CitySelector
          value={filters.city}
          onChange={(city) => setFilters({...filters, city})}
          placeholder="Select City"
          className=""
        />
        <select
          value={filters.property_type}
          onChange={(e) => setFilters({...filters, property_type: e.target.value})}
          className="border rounded-md px-3 py-2"
        >
          <option value="">All Types</option>
          <option value="room">Room</option>
          <option value="house">House</option>
          <option value="pg">PG</option>
        </select>
        <input
          type="number"
          placeholder="Min Rent"
          value={filters.min_rent}
          onChange={(e) => setFilters({...filters, min_rent: e.target.value})}
          className="border rounded-md px-3 py-2"
        />
        <input
          type="number"
          placeholder="Max Rent"
          value={filters.max_rent}
          onChange={(e) => setFilters({...filters, max_rent: e.target.value})}
          className="border rounded-md px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
};

const PropertyDetails = ({ property, onClose, setCurrentView, setChatProperty }) => {
  const { user } = useAuth();

  const handleContactOwner = () => {
    if (!user) {
      setCurrentView('login');
      return;
    }
    
    // Check if user is the owner of this property
    if (user.id === property.user_id) {
      alert('You cannot contact yourself on your own property!');
      return;
    }
    
    // Open chat interface with this property
    setChatProperty(property);
    setCurrentView('chat');
    onClose(); // Close the modal
  };

  const handleScheduleVisit = () => {
    if (!user) {
      setCurrentView('login');
      return;
    }
    
    // Check if user is the owner of this property
    if (user.id === property.user_id) {
      alert('You cannot schedule a visit to your own property!');
      return;
    }
    
    // Open chat interface with prefilled message
    setChatProperty({
      ...property,
      prefilledMessage: "I am willing to visit your site"
    });
    setCurrentView('chat');
    onClose(); // Close the modal
  };

  // Check if current user is the owner of this property
  const isOwner = user && user.id === property.user_id;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">{property.title}</h2>
              {isOwner && (
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mt-2">
                  Your Property
                </span>
              )}
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {property.images && property.images.length > 0 && (
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.images.map((image, index) => (
                  <img 
                    key={index}
                    src={image.startsWith('data:') ? image : `data:image/jpeg;base64,${image}`}
                    alt={`Property ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Property Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{property.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rent:</span>
                  <span className="font-medium text-green-600">₹{property.rent}/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deposit:</span>
                  <span className="font-medium">₹{property.deposit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type:</span>
                  <span className="font-medium capitalize">{property.property_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${property.available ? 'text-green-600' : 'text-red-600'}`}>
                    {property.available ? 'Available' : 'Not Available'}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Amenities</h3>
              <div className="space-y-2">
                {property.amenities && property.amenities.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No amenities listed</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-700">{property.description}</p>
          </div>
          
          <div className="flex space-x-4">
            {isOwner ? (
              <div className="flex space-x-4 w-full">
                <button 
                  className="flex-1 bg-gray-400 text-white px-6 py-2 rounded-md cursor-not-allowed"
                  disabled
                  title="You cannot contact yourself on your own property"
                >
                  Your Property - Cannot Contact
                </button>
                <button 
                  className="flex-1 bg-gray-400 text-white px-6 py-2 rounded-md cursor-not-allowed"
                  disabled
                  title="You cannot schedule a visit to your own property"
                >
                  Your Property - Cannot Schedule Visit
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={handleContactOwner}
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Contact Owner
                </button>
                <button 
                  onClick={handleScheduleVisit}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Schedule Visit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginForm = ({ setCurrentView }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      setCurrentView('home');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

const RegisterForm = ({ setCurrentView }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await register(formData);
    
    if (result.success) {
      setCurrentView('home');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              // Only allow digits
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 15) {
                setFormData({...formData, phone: value});
              }
            }}
            onInput={(e) => {
              // Remove any non-digit characters
              e.target.value = e.target.value.replace(/\D/g, '');
            }}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter 10-15 digit phone number"
            minLength="10"
            maxLength="15"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

const PostPropertyForm = ({ setCurrentView }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property_type: 'room',
    rent: '',
    deposit: '',
    location: '',
    city: '',
    amenities: ''
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages(prev => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const propertyData = {
        ...formData,
        rent: parseInt(formData.rent),
        deposit: parseInt(formData.deposit),
        amenities: formData.amenities.split(',').map(a => a.trim()).filter(a => a),
        images: images
      };
      
      await axios.post(`${API}/properties`, propertyData);
      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        property_type: 'room',
        rent: '',
        deposit: '',
        location: '',
        city: '',
        amenities: ''
      });
      setImages([]);
      
      // Redirect to home after successful post
      setTimeout(() => {
        setCurrentView('home');
      }, 2000);
    } catch (error) {
      console.error('Error creating property:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Post New Property</h2>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Property posted successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Property Type</label>
            <select
              value={formData.property_type}
              onChange={(e) => setFormData({...formData, property_type: e.target.value})}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="room">Room</option>
              <option value="house">House</option>
              <option value="pg">PG</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
            <CitySelector
              value={formData.city}
              onChange={(city) => setFormData({...formData, city})}
              placeholder="Select City"
              className="w-full"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Rent (₹/month)</label>
            <input
              type="number"
              value={formData.rent}
              onChange={(e) => setFormData({...formData, rent: e.target.value})}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Deposit (₹)</label>
            <input
              type="number"
              value={formData.deposit}
              onChange={(e) => setFormData({...formData, deposit: e.target.value})}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Amenities (comma-separated)</label>
          <input
            type="text"
            value={formData.amenities}
            onChange={(e) => setFormData({...formData, amenities: e.target.value})}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="WiFi, AC, Furnished, Parking"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Images</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            multiple
            accept="image/*"
          />
          {images.length > 0 && (
            <div className="mt-2 grid grid-cols-3 gap-2">
              {images.map((image, index) => (
                <img key={index} src={image} alt={`Preview ${index}`} className="w-full h-20 object-cover rounded" />
              ))}
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Posting...' : 'Post Property'}
        </button>
      </form>
    </div>
  );
};

const HomePage = ({ setCurrentView, setChatProperty }) => {
  const { selectedCity } = useCity();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  // Fetch properties when selected city changes
  useEffect(() => {
    if (selectedCity) {
      fetchProperties({ city: selectedCity });
    } else {
      fetchProperties();
    }
  }, [selectedCity]);

  const fetchProperties = async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await axios.get(`${API}/properties?${params}`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchFilters onSearch={fetchProperties} />
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={setSelectedProperty}
                setCurrentView={setCurrentView}
                setChatProperty={setChatProperty}
              />
            ))}
          </div>
        )}
        
        {!loading && properties.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No properties found. Try adjusting your search filters.</p>
          </div>
        )}
      </div>
      
      {selectedProperty && (
        <PropertyDetails
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          setCurrentView={setCurrentView}
          setChatProperty={setChatProperty}
        />
      )}
    </div>
  );
};

const MyPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      const response = await axios.get(`${API}/my-properties`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching my properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await axios.delete(`${API}/properties/${propertyId}`);
        setProperties(properties.filter(p => p.id !== propertyId));
      } catch (error) {
        console.error('Error deleting property:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">My Properties</h1>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  {property.images && property.images.length > 0 ? (
                    <img 
                      src={property.images[0].startsWith('data:') ? property.images[0] : `data:image/jpeg;base64,${property.images[0]}`}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-3">{property.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-green-600">₹{property.rent}</span>
                      <span className="text-gray-500">/month</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-sm ${property.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {property.available ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(property.id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && properties.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">You haven't posted any properties yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  
  return (
    <AuthProvider>
      <CityProvider>
        <div className="App">
          <MainContent currentView={currentView} setCurrentView={setCurrentView} />
        </div>
      </CityProvider>
    </AuthProvider>
  );
};

const MainContent = ({ currentView, setCurrentView }) => {
  const { user, loading } = useAuth();
  const [chatProperty, setChatProperty] = useState(null);

  // Listen for navigation changes from Header
  useEffect(() => {
    const handleNavigation = (view) => {
      setCurrentView(view);
    };

    // You can add event listeners here if needed
    window.addEventListener('navigate', handleNavigation);
    
    return () => {
      window.removeEventListener('navigate', handleNavigation);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'home':
      case 'properties':
        return <HomePage setCurrentView={setCurrentView} setChatProperty={setChatProperty} />;
      case 'login':
        return !user ? <LoginForm setCurrentView={setCurrentView} /> : <HomePage setCurrentView={setCurrentView} setChatProperty={setChatProperty} />;
      case 'register':
        return !user ? <RegisterForm setCurrentView={setCurrentView} /> : <HomePage setCurrentView={setCurrentView} setChatProperty={setChatProperty} />;
      case 'post':
        return user ? <PostPropertyForm setCurrentView={setCurrentView} /> : <LoginForm setCurrentView={setCurrentView} />;
      case 'my-properties':
        return user ? <MyPropertiesPage /> : <LoginForm setCurrentView={setCurrentView} />;
      case 'chat':
        return <EnhancedChatInterface setCurrentView={setCurrentView} selectedProperty={chatProperty} prefilledMessage={chatProperty?.prefilledMessage || ""} />;
      case 'profile':
        return <ProfilePage setCurrentView={setCurrentView} />;
      default:
        return <HomePage setCurrentView={setCurrentView} setChatProperty={setChatProperty} />;
    }
  };

  return (
    <div className="pb-16 md:pb-0">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      {renderContent()}
      <MobileBottomNavigation currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
};

export default App;