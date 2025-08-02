import React, { useEffect } from 'react';
import { useSEO } from '../../App';
import { useNavigate } from 'react-router-dom';

const SecurityDepositGuidelines = () => {
  const { updateSEO } = useSEO();
  const navigate = useNavigate();

  useEffect(() => {
    updateSEO(
      "Security Deposit Guidelines for Tenants - Complete Guide | GetRentals",
      "Complete guide to security deposit for rental properties in India. Know your rights, refund rules, deduction policies, and legal recourse for security deposits.",
      "security deposit, rental deposit, tenant rights, security deposit refund, rental property deposit, landlord tenant law, deposit guidelines"
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
              💰 Security Deposit Guidelines
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete guide to understanding security deposits in rental properties. Know your rights as a tenant and ensure fair treatment from landlords.
            </p>
          </div>
        </div>

        {/* Quick Facts */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">📊 Quick Facts About Security Deposits</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2-10 months</div>
              <p className="text-blue-800">Typical deposit range</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">30-45 days</div>
              <p className="text-blue-800">Standard refund period</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <p className="text-blue-800">Refundable if no damages</p>
            </div>
          </div>
        </div>

        {/* Deposit Amount Guidelines */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">💵 Deposit Amount Guidelines</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left">City Tier</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Typical Range</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Property Type</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Market Standard</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Metro Cities</td>
                  <td className="border border-gray-300 px-4 py-3">6-10 months</td>
                  <td className="border border-gray-300 px-4 py-3">Apartments/Houses</td>
                  <td className="border border-gray-300 px-4 py-3">High demand areas</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Tier-2 Cities</td>
                  <td className="border border-gray-300 px-4 py-3">3-6 months</td>
                  <td className="border border-gray-300 px-4 py-3">Apartments/Houses</td>
                  <td className="border border-gray-300 px-4 py-3">Moderate demand</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">PG Accommodation</td>
                  <td className="border border-gray-300 px-4 py-3">1-3 months</td>
                  <td className="border border-gray-300 px-4 py-3">Shared/Single rooms</td>
                  <td className="border border-gray-300 px-4 py-3">Lower risk profile</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Commercial Properties</td>
                  <td className="border border-gray-300 px-4 py-3">6-12 months</td>
                  <td className="border border-gray-300 px-4 py-3">Office/Retail spaces</td>
                  <td className="border border-gray-300 px-4 py-3">Business requirements</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Your Rights as a Tenant */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">⚖️ Your Rights as a Tenant</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-4">✅ What You Can Demand</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <div>
                    <strong>Written Receipt:</strong> Always demand a written receipt for the security deposit mentioning the exact amount and purpose.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <div>
                    <strong>Property Condition Documentation:</strong> Take photographs and videos of the property condition before moving in.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <div>
                    <strong>Refund Timeline:</strong> The landlord must return the deposit within 30-45 days after you vacate.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <div>
                    <strong>Interest on Deposit:</strong> In some cases, you can demand interest on the security deposit if held for extended periods.
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-4">❌ What Landlords Cannot Do</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">✗</span>
                  <div>
                    <strong>Excessive Deposit:</strong> Cannot demand unreasonably high deposits beyond market standards.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">✗</span>
                  <div>
                    <strong>No Documentation:</strong> Cannot refuse to provide written receipt or agreement for the deposit.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">✗</span>
                  <div>
                    <strong>Arbitrary Deductions:</strong> Cannot make deductions without proper justification and evidence.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">✗</span>
                  <div>
                    <strong>Indefinite Retention:</strong> Cannot hold the deposit indefinitely without valid reasons.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Valid Deductions */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📋 Valid vs Invalid Deductions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-4">✅ Valid Deductions</h3>
              <ul className="space-y-2 text-green-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Unpaid rent or utility bills
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Damage beyond normal wear and tear
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Cleaning costs if property left dirty
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Repair costs for tenant-caused damage
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Unpaid maintenance charges
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Breach of contract penalties (if specified in agreement)
                </li>
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-red-800 mb-4">❌ Invalid Deductions</h3>
              <ul className="space-y-2 text-red-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Normal wear and tear (paint fading, minor scuffs)
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Carpet cleaning in normal circumstances
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Replacement of items at end of normal lifespan
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Repairs for pre-existing damages
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Arbitrary fees not mentioned in agreement
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Deductions without proper evidence or receipts
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Step-by-Step Refund Process */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🔄 Step-by-Step Refund Process</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Before Moving Out</h3>
                <p className="text-gray-600">Give proper notice as per agreement, clear all dues, and arrange final inspection with landlord.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Final Inspection</h3>
                <p className="text-gray-600">Conduct joint inspection with landlord, document property condition, and agree on any deductions.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Handover Process</h3>
                <p className="text-gray-600">Return all keys, remote controls, and access cards. Get acknowledgment of handover in writing.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                4
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Refund Timeline</h3>
                <p className="text-gray-600">Landlord should refund within 30-45 days. Follow up regularly and maintain written communication.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                5
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">If Refund Delayed</h3>
                <p className="text-gray-600">Send formal notice, approach local authorities, or consider legal action if necessary.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Recourse */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            ⚖️ Legal Recourse Options
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-3">Local Authorities</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Consumer Court for unfair practices
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Police complaint for fraud cases
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Rent Controller Office in some states
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-3">Civil Remedies</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Small Claims Court for amounts under ₹20 lakhs
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Civil suit for breach of contract
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Mediation through legal aid services
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tips for Future */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">💡 Tips for Future Rentals</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Before Signing Agreement</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  Research market standards for security deposits in the area
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  Negotiate deposit amount based on property condition and location
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  Ensure deposit refund clause is clearly mentioned in agreement
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  Check landlord's reputation and previous tenant feedback
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">During Tenancy</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  Maintain property in good condition and document any issues
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  Keep all payment receipts and correspondence with landlord
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  Report maintenance issues promptly to avoid damage escalation
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  Build good relationship with landlord through clear communication
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Find Fair Rental Deals</h3>
          <p className="text-xl mb-6">
            Use our platform to find transparent rental properties with reasonable security deposit requirements
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => navigate('/properties')}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              🏠 Browse Properties
            </button>
            <button 
              onClick={() => navigate('/rent-calculator')}
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              🧮 Calculate Fair Rent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityDepositGuidelines;