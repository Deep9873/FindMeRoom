import React, { useEffect } from 'react';
import { useSEO } from '../App';

const SafetySecurity = () => {
  const { updateSEO } = useSEO();

  useEffect(() => {
    updateSEO(
      'Safety & Security Guide - GetRentals | Safe Property Rental Tips',
      'Learn essential safety tips for renting properties in India. Complete security guide for tenants and landlords on GetRentals platform with fraud prevention and safety measures.',
      'rental safety tips, property security, fraud prevention, tenant safety, landlord security, safe renting, property verification, rental scam protection'
    );
  }, [updateSEO]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Safety & Security Guide</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your comprehensive guide to safe and secure property rentals on GetRentals platform
          </p>
        </div>

        {/* General Safety Guidelines */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold text-gray-900">Essential Safety Guidelines</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">🚨 Red Flags to Watch Out For</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Property owners asking for advance payment before property visit</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Requests for payment through untraceable methods (cash only, cryptocurrency)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Unrealistically low rent prices compared to market rates</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Owners unwilling to meet in person or show original documents</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Pressure to make immediate decisions without proper verification</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Properties with no clear address or contact information</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">✅ Safety Best Practices</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Always visit the property in person during daylight hours</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Take a trusted friend or family member with you for property visits</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Verify the owner's identity through official documents</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Check property ownership papers and legal clearances</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Use secure payment methods with proper receipts</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Read and understand all terms before signing agreements</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* For Property Seekers */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold text-gray-900">Safety Tips for Property Seekers</h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">📋 Document Verification Checklist</h3>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">Before finalizing any property, ensure you verify these documents:</p>
                <ul className="grid md:grid-cols-2 gap-3 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" disabled />
                    <span>Property ownership documents (title deed, sale deed)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" disabled />
                    <span>Municipal tax receipts and bills</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" disabled />
                    <span>Society maintenance receipts (for apartments)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" disabled />
                    <span>Owner's identity proof (Aadhar, PAN card)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" disabled />
                    <span>No Objection Certificate (if applicable)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" disabled />
                    <span>Previous tenant's exit clearance</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">💰 Financial Safety Measures</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Payment Guidelines</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Never pay full security deposit before lease signing</li>
                    <li>• Use bank transfers or cheques for all payments</li>
                    <li>• Keep receipts for all payments made</li>
                    <li>• Negotiate payment terms clearly in writing</li>
                    <li>• Avoid cash-only transactions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Security Deposit Protection</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Ensure deposit terms are mentioned in agreement</li>
                    <li>• Document property condition during move-in</li>
                    <li>• Get written confirmation of deposit refund terms</li>
                    <li>• Take photos/videos of the property condition</li>
                    <li>• Keep all payment receipts safely</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">🏠 Property Inspection Checklist</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Safety & Security</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Working locks on all doors and windows</li>
                      <li>• Proper lighting in common areas</li>
                      <li>• Fire safety equipment availability</li>
                      <li>• Emergency exit routes</li>
                      <li>• Security guard or CCTV (if applicable)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Utilities</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Water supply and pressure</li>
                      <li>• Electricity connections and meter</li>
                      <li>• Internet connectivity strength</li>
                      <li>• Proper drainage system</li>
                      <li>• Gas connection (if required)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Legal & Compliance</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Building completion certificate</li>
                      <li>• Fire safety certificate</li>
                      <li>• Local authority approvals</li>
                      <li>• Society registration documents</li>
                      <li>• Environmental clearances</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* For Property Owners */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold text-gray-900">Safety Tips for Property Owners</h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">👥 Tenant Screening Best Practices</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Identity Verification</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Ask for government-issued photo ID</li>
                    <li>• Verify employment details and salary slips</li>
                    <li>• Check previous rental history and references</li>
                    <li>• Conduct background verification if needed</li>
                    <li>• Meet tenant in person before finalizing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Financial Assessment</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Verify monthly income (3x rent is ideal)</li>
                    <li>• Check credit history and financial stability</li>
                    <li>• Ask for employment confirmation letter</li>
                    <li>• Review bank statements if necessary</li>
                    <li>• Consider guarantor for additional security</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">📄 Legal Protection Measures</h3>
              <div className="bg-green-50 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Rental Agreement Essentials</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Clearly mention rent amount and due dates</li>
                      <li>• Define security deposit and refund terms</li>
                      <li>• Specify maintenance responsibilities</li>
                      <li>• Include termination clauses and notice period</li>
                      <li>• Add penalty clauses for damage or violations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Documentation Requirements</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Get agreement stamped and notarized</li>
                      <li>• Keep copies of tenant's ID proofs</li>
                      <li>• Document property condition with photos</li>
                      <li>• Maintain record of all payments</li>
                      <li>• Register agreement with local authorities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">🛡️ Property Protection Tips</h3>
              <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Install proper locks and security systems</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Consider property insurance coverage</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Conduct periodic property inspections</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Maintain emergency contact information</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Keep spare keys with trusted neighbors</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Document any property improvements or repairs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Platform Safety Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">GetRentals Safety Features</h2>
            <p className="text-gray-600 text-lg">Built-in security measures to protect our users</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Messaging</h3>
              <p className="text-gray-600">Protected chat system keeps your personal information private until you decide to share</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Listing Verification</h3>
              <p className="text-gray-600">All property listings are monitored and verified to ensure authenticity and accuracy</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Report & Support</h3>
              <p className="text-gray-600">Quick reporting system for suspicious activities with dedicated support team response</p>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Important Emergency Contacts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">National Emergency Numbers</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-medium">Police Emergency</span>
                  <span className="text-red-600 font-bold">100</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium">Fire Emergency</span>
                  <span className="text-orange-600 font-bold">101</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Medical Emergency</span>
                  <span className="text-green-600 font-bold">108</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Women's Helpline</span>
                  <span className="text-blue-600 font-bold">1091</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">GetRentals Support</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">For Platform Issues</h4>
                  <p className="text-gray-600 mb-2">Email: admin@getrentals.online</p>
                  <p className="text-gray-600 text-sm">Response time: Within 24 hours</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Report Suspicious Activity</h4>
                  <p className="text-gray-600 mb-2">Subject: "URGENT - Safety Report"</p>
                  <p className="text-gray-600 text-sm">Include: Screenshot, user details, and incident description</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Stay Safe While Renting</h2>
          <p className="text-gray-600 mb-6">
            Remember: Your safety is our priority. When in doubt, don't hesitate to ask questions or seek help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/how-it-works"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Learn How It Works
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetySecurity;