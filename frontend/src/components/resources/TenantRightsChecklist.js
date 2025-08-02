import React, { useEffect } from 'react';
import { useSEO } from '../../App';
import { useNavigate } from 'react-router-dom';

const TenantRightsChecklist = () => {
  const { updateSEO } = useSEO();
  const navigate = useNavigate();

  useEffect(() => {
    updateSEO(
      "Tenant Rights Checklist - Know Your Legal Rights | GetRentals",
      "Complete checklist of tenant rights in India. Know your legal protections, what landlords can and cannot do, and how to handle rental disputes effectively.",
      "tenant rights, rental rights, landlord tenant law, rental property rights, housing rights, rental disputes, tenant protection"
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
              ⚖️ Tenant Rights Checklist
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Know your legal rights as a tenant in India. This comprehensive checklist covers everything from basic housing rights to protection against unfair practices.
            </p>
          </div>
        </div>

        {/* Fundamental Rights */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🏠 Fundamental Tenant Rights</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-green-600 mb-3 flex items-center">
                  <span className="mr-2">✅</span> Right to Peaceful Enjoyment
                </h3>
                <ul className="space-y-2 text-gray-600 pl-8">
                  <li>• Privacy in your rented premises</li>
                  <li>• Protection from landlord harassment</li>
                  <li>• Right to reasonable quiet hours</li>
                  <li>• Freedom from unauthorized entry</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-green-600 mb-3 flex items-center">
                  <span className="mr-2">✅</span> Right to Habitable Conditions
                </h3>
                <ul className="space-y-2 text-gray-600 pl-8">
                  <li>• Safe drinking water supply</li>
                  <li>• Proper electricity connections</li>
                  <li>• Functional plumbing and drainage</li>
                  <li>• Structural safety of the building</li>
                </ul>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-green-600 mb-3 flex items-center">
                  <span className="mr-2">✅</span> Right to Fair Treatment
                </h3>
                <ul className="space-y-2 text-gray-600 pl-8">
                  <li>• No discrimination based on religion, caste, etc.</li>
                  <li>• Fair and reasonable rental terms</li>
                  <li>• Transparent additional charges</li>
                  <li>• Equal access to common amenities</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-green-600 mb-3 flex items-center">
                  <span className="mr-2">✅</span> Right to Legal Protection
                </h3>
                <ul className="space-y-2 text-gray-600 pl-8">
                  <li>• Protection under Rent Control Acts</li>
                  <li>• Right to approach consumer courts</li>
                  <li>• Legal recourse for contract violations</li>
                  <li>• Right to legal representation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* What Landlords Cannot Do */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-red-800 mb-6">❌ What Your Landlord CANNOT Do</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-red-700 mb-4">Entry & Privacy Violations</h3>
              <ul className="space-y-2 text-red-600">
                <li>• Enter your home without 24-hour notice (except emergencies)</li>
                <li>• Install surveillance cameras inside your unit</li>
                <li>• Give spare keys to third parties without permission</li>
                <li>• Disturb you during reasonable quiet hours</li>
              </ul>

              <h3 className="text-lg font-semibold text-red-700 mb-4 mt-6">Discriminatory Practices</h3>
              <ul className="space-y-2 text-red-600">
                <li>• Refuse tenancy based on religion or caste</li>
                <li>• Discriminate against single women or unmarried couples</li>
                <li>• Impose different rules for different tenants</li>
                <li>• Harass tenants based on personal choices</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-red-700 mb-4">Financial Misconduct</h3>
              <ul className="space-y-2 text-red-600">
                <li>• Demand excessive or unreasonable deposits</li>
                <li>• Increase rent arbitrarily during lease period</li>
                <li>• Impose hidden charges not mentioned in agreement</li>
                <li>• Refuse to return security deposit without valid reasons</li>
              </ul>

              <h3 className="text-lg font-semibold text-red-700 mb-4 mt-6">Eviction Abuse</h3>
              <ul className="space-y-2 text-red-600">
                <li>• Evict without proper legal notice period</li>
                <li>• Change locks while you're away</li>
                <li>• Threaten or intimidate to force eviction</li>
                <li>• Cut off utilities to force you to leave</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Your Rights During Different Situations */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📋 Rights in Specific Situations</h2>
          
          <div className="space-y-8">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">During Rent Increases</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Right to advance notice (usually 30-60 days)</li>
                <li>• Right to know the reason for increase</li>
                <li>• Right to negotiate or dispute unreasonable increases</li>
                <li>• Protection from mid-lease arbitrary increases</li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-semibold text-green-700 mb-3">During Maintenance Issues</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Right to prompt repair of essential services</li>
                <li>• Right to withhold rent for major unaddressed issues</li>
                <li>• Right to hire contractors and deduct from rent (with notice)</li>
                <li>• Right to break lease for uninhabitable conditions</li>
              </ul>
            </div>

            <div className="border-l-4 border-yellow-500 pl-6">
              <h3 className="text-xl font-semibold text-yellow-700 mb-3">During Lease Termination</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Right to proper notice period as per agreement</li>
                <li>• Right to final inspection with landlord present</li>
                <li>• Right to security deposit refund within specified time</li>
                <li>• Right to receive itemized list of any deductions</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-semibold text-purple-700 mb-3">During Emergencies</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Right to emergency repairs without prior landlord approval</li>
                <li>• Right to temporary alternative accommodation if uninhabitable</li>
                <li>• Right to compensation for damaged personal belongings</li>
                <li>• Right to break lease without penalty for safety reasons</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Steps Checklist */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">✅ Action Steps Checklist</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Before Signing Lease</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">Read and understand all clauses in the agreement</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">Verify landlord's ownership documents</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">Document property condition with photos/videos</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">Negotiate unfair clauses or excessive deposits</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">Get proper receipt for security deposit</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">During Tenancy</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">Maintain all payment receipts and communications</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">Report maintenance issues promptly in writing</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">Know your local tenant rights organization contacts</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">Build positive relationship with neighbors</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">Keep emergency contact information updated</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Resources */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📞 Legal Resources & Support</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Government Agencies</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Rent Controller Office</li>
                <li>• Consumer Protection Authority</li>
                <li>• District Collector Office</li>
                <li>• Legal Aid Services</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Legal Remedies</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Consumer Court</li>
                <li>• Civil Court</li>
                <li>• Police Complaint (for harassment)</li>
                <li>• Mediation Centers</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Support Organizations</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Tenant Rights Groups</li>
                <li>• Legal Aid Clinics</li>
                <li>• Housing Rights Organizations</li>
                <li>• Consumer Rights Forums</li>
              </ul>
            </div>
          </div>
        </div>

        {/* When to Seek Legal Help */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            ⚠️ When to Seek Immediate Legal Help
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Illegal eviction or threats of eviction
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Harassment or intimidation by landlord
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Discrimination or unfair treatment
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Refusal to return security deposit
              </li>
            </ul>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Unsafe living conditions ignored by landlord
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Unauthorized entry or privacy violations
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Arbitrary rent increases or hidden charges
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Breach of rental agreement by landlord
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Find Tenant-Friendly Properties</h3>
          <p className="text-xl mb-6">
            Use GetRentals to connect directly with verified property owners who respect tenant rights
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => navigate('/properties')}
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              🏠 Browse Properties
            </button>
            <button 
              onClick={() => navigate('/blog')}
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              📚 More Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantRightsChecklist;