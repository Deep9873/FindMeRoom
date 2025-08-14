import React, { useEffect } from 'react';
import { useSEO } from '../../App';
import { useNavigate } from 'react-router-dom';

const PropertyInspectionGuide = () => {
  const { updateSEO } = useSEO();
  const navigate = useNavigate();

  useEffect(() => {
    updateSEO(
      "Property Inspection Guide - Complete Checklist for Tenants | GetRentals",
      "Comprehensive property inspection guide for tenants. Learn what to check before signing a rental agreement, avoid costly mistakes, and ensure a safe living environment.",
      "property inspection, rental property checklist, tenant inspection guide, property viewing, rental inspection, housing inspection, apartment checklist"
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
              🔍 Property Inspection Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete checklist for inspecting rental properties. Learn what to look for, questions to ask, and red flags to avoid before signing your rental agreement.
            </p>
          </div>
        </div>

        {/* Pre-Inspection Preparation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">📋 Pre-Inspection Preparation</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">What to Bring</h3>
              <ul className="space-y-2 text-blue-600">
                <li className="flex items-center">
                  <span className="mr-2">📱</span>
                  Smartphone for photos and videos
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📝</span>
                  Notepad and pen for observations
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📏</span>
                  Measuring tape for room dimensions
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🔦</span>
                  Flashlight for dark areas
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🔌</span>
                  Phone charger to test outlets
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Questions to Prepare</h3>
              <ul className="space-y-2 text-blue-600">
                <li>• What utilities are included in rent?</li>
                <li>• Who handles maintenance and repairs?</li>
                <li>• Are there any ongoing construction issues?</li>
                <li>• What's the policy on pets and guests?</li>
                <li>• How secure is the building and area?</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Room-by-Room Inspection */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🏠 Room-by-Room Inspection Checklist</h2>
          
          {/* Living Room & Bedrooms */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">🛋️ Living Room & Bedrooms</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3 text-green-600">✅ What to Check</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Wall condition (cracks, dampness, paint quality)</li>
                  <li>• Floor condition (tiles, wood, carpet damage)</li>
                  <li>• Natural light and ventilation</li>
                  <li>• Electrical outlets and switches functionality</li>
                  <li>• Ceiling fans and light fixtures</li>
                  <li>• Windows and door locks</li>
                  <li>• Storage space availability</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3 text-red-600">❌ Red Flags</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Water stains or mold growth</li>
                  <li>• Cracked or broken windows</li>
                  <li>• Non-functional electrical outlets</li>
                  <li>• Strong odors (dampness, chemicals)</li>
                  <li>• Poor lighting or no natural light</li>
                  <li>• Damaged flooring or loose tiles</li>
                  <li>• Signs of pest infestation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Kitchen */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">🍳 Kitchen</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3 text-green-600">✅ What to Check</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Water pressure in taps and proper drainage</li>
                  <li>• Gas connection and safety (if applicable)</li>
                  <li>• Electrical outlets for appliances</li>
                  <li>• Exhaust fan or chimney functionality</li>
                  <li>• Storage cabinets and drawers</li>
                  <li>• Counter space and condition</li>
                  <li>• Refrigerator space and power point</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3 text-red-600">❌ Red Flags</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Leaking taps or poor water pressure</li>
                  <li>• Gas leaks or faulty connections</li>
                  <li>• Blocked drains or sewage smell</li>
                  <li>• Non-functional exhaust system</li>
                  <li>• Damaged cabinets or countertops</li>
                  <li>• Insufficient electrical points</li>
                  <li>• Signs of cockroaches or rodents</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bathrooms */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">🚿 Bathrooms</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3 text-green-600">✅ What to Check</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Hot and cold water supply</li>
                  <li>• Water pressure in shower and taps</li>
                  <li>• Proper drainage in shower and floor</li>
                  <li>• Toilet flush functionality</li>
                  <li>• Exhaust fan for ventilation</li>
                  <li>• Mirror and lighting conditions</li>
                  <li>• Tile condition and grout</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3 text-red-600">❌ Red Flags</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• No hot water or inconsistent temperature</li>
                  <li>• Poor drainage causing water stagnation</li>
                  <li>• Toilet flush issues or leaks</li>
                  <li>• Mold or mildew on walls/ceiling</li>
                  <li>• Broken tiles or damaged fixtures</li>
                  <li>• Poor ventilation causing humidity</li>
                  <li>• Strong sewage odors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Safety & Security Inspection */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🔒 Safety & Security Inspection</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-orange-600 mb-4">🔥 Fire Safety</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  Check for fire extinguishers in common areas
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  Identify emergency exit routes
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  Ensure stairways are well-lit and unobstructed
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  Check electrical wiring condition
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  Look for smoke detectors (if applicable)
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">🛡️ Building Security</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  Main door locks and security systems
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  Window grills and balcony safety
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  Building entry control (security guard/intercom)
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  CCTV cameras in common areas
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  Adequate lighting in parking and entrance
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="font-semibold text-lg mb-3 text-yellow-800">⚠️ Structural Safety Checks</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-2 text-yellow-700">
                <li>• Check for cracks in walls or ceiling</li>
                <li>• Ensure balconies have proper railings</li>
                <li>• Test stairway handrails for stability</li>
                <li>• Look for signs of water damage</li>
              </ul>
              <ul className="space-y-2 text-yellow-700">
                <li>• Check foundation for settling issues</li>
                <li>• Ensure windows open and close properly</li>
                <li>• Test all doors for proper alignment</li>
                <li>• Look for signs of termite damage</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Documentation & Legal Checks */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📄 Documentation & Legal Checks</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-purple-600 mb-4">📋 Documents to Verify</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1">•</span>
                  <div>
                    <strong>Property ownership documents</strong>
                    <p className="text-sm text-gray-600">Sale deed, title documents, or property registration</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1">•</span>
                  <div>
                    <strong>Society NOC (if applicable)</strong>
                    <p className="text-sm text-gray-600">No objection certificate for renting</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1">•</span>
                  <div>
                    <strong>Occupancy certificate</strong>
                    <p className="text-sm text-gray-600">Legal approval for habitation</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1">•</span>
                  <div>
                    <strong>Property tax receipts</strong>
                    <p className="text-sm text-gray-600">Up-to-date tax payments</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-4">✅ Legal Compliance</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  <div>
                    <strong>Building approvals</strong>
                    <p className="text-sm text-gray-600">Check if construction is legally approved</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  <div>
                    <strong>RERA registration</strong>
                    <p className="text-sm text-gray-600">For properties under RERA guidelines</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  <div>
                    <strong>Environmental clearances</strong>
                    <p className="text-sm text-gray-600">For properties in sensitive areas</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  <div>
                    <strong>Fire safety certificate</strong>
                    <p className="text-sm text-gray-600">For high-rise buildings</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Neighborhood Assessment */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🌍 Neighborhood Assessment</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-600 mb-4">🚗 Transportation</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Distance to nearest metro/bus stop</li>
                <li>• Peak hour traffic conditions</li>
                <li>• Availability of auto/taxi services</li>
                <li>• Parking space availability</li>
                <li>• Road condition and street lighting</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-4">🏪 Amenities</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Grocery stores and markets</li>
                <li>• Hospitals and medical facilities</li>
                <li>• Schools and educational institutions</li>
                <li>• Banks and ATMs</li>
                <li>• Restaurants and food outlets</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-600 mb-4">🛡️ Safety</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Police station proximity</li>
                <li>• Crime rate in the area</li>
                <li>• Women's safety at night</li>
                <li>• CCTV coverage on streets</li>
                <li>• Neighborhood community relations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Final Decision Framework */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🎯 Final Decision Framework</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-4">✅ Green Signals - Proceed</h3>
              <ul className="space-y-2 text-green-700">
                <li>• All basic amenities working properly</li>
                <li>• Property is clean and well-maintained</li>
                <li>• Landlord is cooperative and transparent</li>
                <li>• All legal documents are in order</li>
                <li>• Rent is reasonable for the location</li>
                <li>• Good connectivity and neighborhood</li>
                <li>• Safety and security measures adequate</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-4">❌ Red Signals - Avoid</h3>
              <ul className="space-y-2 text-red-700">
                <li>• Major structural or safety issues</li>
                <li>• Persistent water, electricity, or drainage problems</li>
                <li>• Landlord refuses to show documents</li>
                <li>• Property is overpriced for the condition</li>
                <li>• Poor neighborhood safety or amenities</li>
                <li>• Signs of legal disputes or complications</li>
                <li>• Unreasonable rental terms or hidden costs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Inspection Checklist Download */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">📋 Downloadable Inspection Checklist</h2>
          
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Property Inspection Checklist PDF
              </h3>
              <p className="text-gray-600 mb-4">
                Download our comprehensive checklist to use during property visits
              </p>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                Download Free Checklist
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Property?</h3>
          <p className="text-xl mb-6">
            Use this guide to inspect properties and find verified listings on GetRentals
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => navigate('/properties')}
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              🏠 Browse Properties
            </button>
            <button 
              onClick={() => navigate('/rent-calculator')}
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Calculate Fair Rent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInspectionGuide;