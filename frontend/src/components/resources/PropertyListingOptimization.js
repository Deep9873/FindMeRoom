import React, { useEffect } from 'react';
import { useSEO } from '../../App';
import { useNavigate } from 'react-router-dom';

const PropertyListingOptimization = () => {
  const { updateSEO } = useSEO();
  const navigate = useNavigate();

  useEffect(() => {
    updateSEO(
      "Property Listing Optimization Guide - Attract Quality Tenants | GetRentals",
      "Complete guide to optimizing your property listings. Learn how to create compelling descriptions, take great photos, and attract quality tenants faster.",
      "property listing optimization, rental listing, property marketing, landlord guide, attract tenants, property photography, rental description"
    );
  }, [updateSEO]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </button>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              📈 Property Listing Optimization Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master the art of creating compelling property listings that attract quality tenants faster. Learn professional techniques for descriptions, photography, and marketing.
            </p>
          </div>
        </div>

        {/* Quick Statistics */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📊 Impact of Optimized Listings</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">3x</div>
              <p className="text-blue-800">More inquiries with good photos</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50%</div>
              <p className="text-blue-800">Faster rentals with detailed descriptions</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">25%</div>
              <p className="text-blue-800">Higher rent with premium presentation</p>
            </div>
          </div>
        </div>

        {/* Photography Guide */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📸 Professional Photography Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-4">✅ Do's</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <div>
                    <strong>Take photos during golden hours</strong>
                    <p className="text-sm text-gray-600">Natural light makes spaces look brighter and more inviting</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <div>
                    <strong>Clean and declutter before shooting</strong>
                    <p className="text-sm text-gray-600">Remove personal items and organize spaces</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <div>
                    <strong>Use wide-angle lens/setting</strong>
                    <p className="text-sm text-gray-600">Makes rooms appear larger and more spacious</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <div>
                    <strong>Include all rooms and amenities</strong>
                    <p className="text-sm text-gray-600">Show kitchen, bathroom, balcony, parking, etc.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-4">❌ Don'ts</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">✗</span>
                  <div>
                    <strong>Don't use flash or artificial lighting</strong>
                    <p className="text-sm text-gray-600">Creates harsh shadows and unnatural colors</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">✗</span>
                  <div>
                    <strong>Avoid blurry or low-quality images</strong>
                    <p className="text-sm text-gray-600">Poor quality photos reduce credibility</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">✗</span>
                  <div>
                    <strong>Don't oversaturate or over-edit</strong>
                    <p className="text-sm text-gray-600">Unrealistic photos disappoint viewers during visits</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">✗</span>
                  <div>
                    <strong>Avoid photos with people</strong>
                    <p className="text-sm text-gray-600">Let viewers imagine themselves in the space</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="font-semibold text-lg mb-3 text-yellow-800">📷 Photo Checklist</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-2 text-yellow-700">
                <li>• Living room from multiple angles</li>
                <li>• All bedrooms with natural light</li>
                <li>• Kitchen with appliances visible</li>
                <li>• Bathroom(s) clean and bright</li>
                <li>• Balcony/terrace with view</li>
              </ul>
              <ul className="space-y-2 text-yellow-700">
                <li>• Building exterior and entrance</li>
                <li>• Parking space (if available)</li>
                <li>• Common areas (gym, pool, etc.)</li>
                <li>• Nearby landmarks or amenities</li>
                <li>• Street view for location context</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Writing Compelling Descriptions */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">✍️ Writing Compelling Descriptions</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">🎯 Title Optimization</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="mb-4">
                  <h4 className="font-medium text-green-600 mb-2">✅ Good Example:</h4>
                  <p className="bg-white p-3 rounded border text-green-700">
                    "Spacious 2BHK with Balcony in Prime Koramangala Location - Fully Furnished"
                  </p>
                </div>
                <div className="mb-4">
                  <h4 className="font-medium text-red-600 mb-2">❌ Poor Example:</h4>
                  <p className="bg-white p-3 rounded border text-red-700">
                    "2bhk for rent"
                  </p>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Key Elements:</strong> Property type, key features, location, furnishing status
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">📝 Description Structure</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="font-semibold text-lg mb-2">1. Opening Hook (25-30 words)</h4>
                  <p className="text-gray-600">Start with the most attractive feature or unique selling point</p>
                  <p className="text-sm text-blue-600 italic">Example: "Discover luxury living in this stunning 3BHK apartment with panoramic city views, located in the heart of Bandra West."</p>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-semibold text-lg mb-2">2. Property Details (50-75 words)</h4>
                  <p className="text-gray-600">Describe layout, size, and key features systematically</p>
                  <p className="text-sm text-green-600 italic">Example: "This spacious 1200 sq ft home features two large bedrooms with attached bathrooms, a modern kitchen with granite countertops, and a bright living area opening to a private balcony."</p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="font-semibold text-lg mb-2">3. Amenities & Location (40-50 words)</h4>
                  <p className="text-gray-600">Highlight building amenities and location advantages</p>
                  <p className="text-sm text-purple-600 italic">Example: "Building amenities include 24/7 security, power backup, and covered parking. Located just 5 minutes from Bandra Station with easy access to malls, restaurants, and schools."</p>
                </div>

                <div className="border-l-4 border-orange-500 pl-6">
                  <h4 className="font-semibold text-lg mb-2">4. Call to Action (15-20 words)</h4>
                  <p className="text-gray-600">Encourage immediate action and provide contact method</p>
                  <p className="text-sm text-orange-600 italic">Example: "Schedule your viewing today! Contact us for immediate possession and flexible terms."</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Strategy */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">💰 Strategic Pricing</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">📊 Market Research</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Compare similar properties in 1km radius
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Check recent rental rates on GetRentals and other platforms
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Consider seasonal demand fluctuations
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Factor in property condition and amenities
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Analyze local infrastructure development
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-4">💡 Pricing Psychology</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Use charm pricing (₹24,900 instead of ₹25,000)
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Highlight value propositions in pricing
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Offer flexible deposit terms
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Bundle utilities for transparent pricing
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Consider introductory discounts for quality tenants
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Response Management */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📞 Managing Inquiries Effectively</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-purple-600 mb-4">⚡ Quick Response Strategy</h3>
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Response Time Goals</h4>
                    <ul className="space-y-2 text-purple-700">
                      <li>• Within 2 hours during business hours</li>
                      <li>• Within 24 hours for evening/weekend inquiries</li>
                      <li>• Immediate auto-replies for online inquiries</li>
                      <li>• Follow-up within 48 hours if no response</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Professional Communication</h4>
                    <ul className="space-y-2 text-purple-700">
                      <li>• Use proper greeting and introduction</li>
                      <li>• Provide clear, accurate information</li>
                      <li>• Ask qualifying questions about requirements</li>
                      <li>• Schedule viewings promptly</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-orange-600 mb-4">📋 Inquiry Qualification Process</h3>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-3">Key Questions to Ask</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-2 text-orange-700">
                    <li>• When are you looking to move in?</li>
                    <li>• How many people will be staying?</li>
                    <li>• What's your preferred lease duration?</li>
                    <li>• Are you currently employed? Where?</li>
                  </ul>
                  <ul className="space-y-2 text-orange-700">
                    <li>• Do you have any pets?</li>
                    <li>• What's your budget range?</li>
                    <li>• Any specific requirements or preferences?</li>
                    <li>• References from previous landlords?</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform-Specific Optimization */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🚀 Platform-Specific Optimization</h2>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">🎯 GetRentals Optimization</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-700">Best Practices</h4>
                <ul className="space-y-2 text-blue-600">
                  <li>• Use all available photo slots (minimum 8-10 photos)</li>
                  <li>• Fill out all property amenities and features</li>
                  <li>• Update listing regularly to maintain visibility</li>
                  <li>• Respond quickly to maintain high response rate</li>
                  <li>• Use accurate location mapping</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-blue-700">Unique Advantages</h4>
                <ul className="space-y-2 text-blue-600">
                  <li>• Zero brokerage means more tenant interest</li>
                  <li>• Direct contact with serious inquiries</li>
                  <li>• Verified user base for quality connections</li>
                  <li>• Chat feature for immediate communication</li>
                  <li>• Mobile-optimized for maximum reach</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking Performance */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📈 Tracking Listing Performance</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4 text-yellow-800">📊 Key Metrics</h3>
              <ul className="space-y-2 text-yellow-700">
                <li>• Number of views per day</li>
                <li>• Inquiry-to-view ratio</li>
                <li>• Viewing-to-application ratio</li>
                <li>• Time on market</li>
                <li>• Response rate to inquiries</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4 text-yellow-800">🔄 Optimization Tactics</h3>
              <ul className="space-y-2 text-yellow-700">
                <li>• A/B test different titles</li>
                <li>• Update photos if low views</li>
                <li>• Adjust pricing based on market response</li>
                <li>• Refresh listing weekly</li>
                <li>• Promote during peak browsing hours</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4 text-yellow-800">📅 Timeline Expectations</h3>
              <ul className="space-y-2 text-yellow-700">
                <li>• Week 1-2: High initial interest</li>
                <li>• Week 3-4: Optimize based on feedback</li>
                <li>• Week 5-6: Consider price adjustment</li>
                <li>• Week 7+: Major listing overhaul</li>
                <li>• Average: 3-6 weeks for good listings</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Create Your Optimized Listing?</h3>
          <p className="text-xl mb-6">
            Use GetRentals' zero-brokerage platform to reach quality tenants directly
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => navigate('/post-property')}
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              📝 Post Your Property
            </button>
            <button 
              onClick={() => navigate('/rent-calculator')}
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              🧮 Calculate Market Rent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingOptimization;