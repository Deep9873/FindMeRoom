import React, { useEffect } from 'react';
import { useSEO } from '../App';

const ContactUs = () => {
  const { updateSEO } = useSEO();

  useEffect(() => {
    updateSEO(
      'Contact GetRentals - Customer Support & Help',
      'Get in touch with GetRentals customer support for assistance with room rentals, property listings, account issues, and general inquiries. We\'re here to help!',
      'contact GetRentals, customer support, help, room rental support, property listing help, contact support'
    );
  }, [updateSEO]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Need help? We're here to assist you with all your rental needs
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Support</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email Support</p>
                    <a
                      href="mailto:admin@getrentals.online"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      admin@getrentals.online
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Response Time</p>
                    <p className="text-gray-600">We typically respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-medium">Monday - Friday:</span> 9:00 AM - 6:00 PM (IST)</p>
                <p><span className="font-medium">Saturday:</span> 10:00 AM - 4:00 PM (IST)</p>
                <p><span className="font-medium">Sunday:</span> Closed</p>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Note:</span> Email support is available 24/7. 
                  We monitor our support email continuously and respond as quickly as possible.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Categories */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">How We Can Help</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 15l4-4 4 4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Property Listings</h3>
              <p className="text-gray-600 text-sm">Help with posting, editing, or managing your property listings</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Property Search</h3>
              <p className="text-gray-600 text-sm">Assistance with finding the perfect room, PG, or apartment</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Issues</h3>
              <p className="text-gray-600 text-sm">Help with login, registration, or account management</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Chat & Messages</h3>
              <p className="text-gray-600 text-sm">Support with messaging system and communication features</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Platform Usage</h3>
              <p className="text-gray-600 text-sm">General guidance on using GetRentals platform features</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">General Inquiries</h3>
              <p className="text-gray-600 text-sm">Any other questions about our services and platform</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">How do I post a property on GetRentals?</h3>
              <p className="text-gray-600">
                Simply register or login to your account, click on "Post Property" in the navigation menu, 
                and fill out the property details form. It's completely free to list your property!
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Is there any brokerage fee?</h3>
              <p className="text-gray-600">
                No, GetRentals is a zero-brokerage platform. We don't charge any fees for listing properties 
                or for connecting tenants with landlords.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">How do I contact a property owner?</h3>
              <p className="text-gray-600">
                You can use our built-in chat system to directly message property owners. Simply click on 
                "Contact Owner" or "Schedule Visit" on any property listing.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Can I edit my property listing after posting?</h3>
              <p className="text-gray-600">
                Yes, you can edit your property listing anytime by going to "My Properties" section in your 
                account dashboard.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">How do I report a problem with a listing?</h3>
              <p className="text-gray-600">
                If you encounter any issues with a property listing, please email us at admin@getrentals.online 
                with the listing details and we'll investigate immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6">
            Don't hesitate to reach out to our support team. We're here to help!
          </p>
          <a
            href="mailto:admin@getrentals.online"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Email Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
