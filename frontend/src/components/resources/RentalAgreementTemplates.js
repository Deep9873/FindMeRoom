import React, { useEffect } from 'react';
import { useSEO } from '../../App';
import { useNavigate } from 'react-router-dom';

const RentalAgreementTemplates = () => {
  const { updateSEO } = useSEO();
  const navigate = useNavigate();

  useEffect(() => {
    updateSEO(
      "Rental Agreement Templates - Free Download | GetRentals",
      "Download free rental agreement templates for India. Legally compliant lease and leave & license agreements for tenants and landlords. State-wise formats available.",
      "rental agreement template, lease agreement, leave license agreement, rental contract, property rental documents, tenant agreement, landlord agreement"
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
              📋 Rental Agreement Templates
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Download free, legally compliant rental agreement templates for India. Choose from lease agreements and leave & license formats based on your state requirements.
            </p>
          </div>
        </div>

        {/* Template Categories */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          
          {/* Leave & License Agreements */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              📄 Leave & License Agreements
            </h2>
            <p className="text-gray-600 mb-6">
              Most common format for residential rentals in India. Typically for 11 months duration.
            </p>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-lg mb-2">Maharashtra Format</h3>
                <p className="text-gray-600 text-sm mb-3">Compliant with Maharashtra Rent Control Act</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-medium">Free Download</span>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                    Download PDF
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-lg mb-2">Delhi NCR Format</h3>
                <p className="text-gray-600 text-sm mb-3">Suitable for Delhi, Gurgaon, Noida properties</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-medium">Free Download</span>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                    Download PDF
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-lg mb-2">Karnataka Format</h3>
                <p className="text-gray-600 text-sm mb-3">Bangalore and Karnataka state compliant</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-medium">Free Download</span>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lease Agreements */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              📜 Lease Agreements
            </h2>
            <p className="text-gray-600 mb-6">
              For longer duration rentals (1+ years) with stronger tenant rights.
            </p>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-lg mb-2">Residential Lease</h3>
                <p className="text-gray-600 text-sm mb-3">For residential properties with family occupation</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-medium">Free Download</span>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                    Download PDF
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-lg mb-2">Commercial Lease</h3>
                <p className="text-gray-600 text-sm mb-3">For office, shop, or business purposes</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-medium">Free Download</span>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                    Download PDF
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-lg mb-2">PG Agreement</h3>
                <p className="text-gray-600 text-sm mb-3">Specially designed for paying guest arrangements</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-medium">Free Download</span>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Components Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Essential Components of Rental Agreements</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🔑 Basic Information</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Full names and addresses of landlord and tenant
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Complete property address and description
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Duration of tenancy with start and end dates
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Monthly rent amount in words and figures
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">💰 Financial Terms</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Security deposit amount and refund conditions
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Rent payment schedule and late fee policy
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Annual rent escalation percentage
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Utility bills and maintenance charge division
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🏠 Property Usage</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Permitted use (residential/commercial)
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Number of occupants allowed
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Guest policy and visiting hours
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Pet policy and restrictions
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">⚖️ Legal Clauses</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Termination conditions and notice period
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Dispute resolution mechanism
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Force majeure and emergency clauses
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Registration requirements compliance
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Important Tips */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            ⚠️ Important Tips Before Signing
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Read every clause carefully before signing
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Ensure property registration documents are verified
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Get the agreement registered if rent exceeds ₹50,000/year
              </li>
            </ul>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Take photographs of property condition
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Keep copies of all payment receipts
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Consult legal expert for complex agreements
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Need Help with Your Rental Agreement?</h3>
          <p className="text-xl mb-6">
            Use our rent calculator to determine fair market rates before signing your agreement
          </p>
          <button 
            onClick={() => navigate('/rent-calculator')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            🧮 Use Rent Calculator
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentalAgreementTemplates;