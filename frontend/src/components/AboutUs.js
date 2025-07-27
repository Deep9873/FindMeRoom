import React, { useEffect } from 'react';
import { useSEO } from '../App';

const AboutUs = () => {
  const { updateSEO } = useSEO();

  useEffect(() => {
    updateSEO(
      'About GetRentals - India\'s Premier Room Rental Platform',
      'Learn about GetRentals - India\'s leading platform for finding and posting rooms, PGs, and apartments. Our mission is to make housing accessible, affordable, and hassle-free for everyone.',
      'about GetRentals, our story, mission, room rental, housing platform, India, accommodation, PG, flat rental'
    );
  }, [updateSEO]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About GetRentals</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            India's premier platform for finding and posting rooms, PGs, and apartments with zero brokerage
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            At GetRentals, we believe that finding the perfect accommodation shouldn't be a stressful or expensive experience. 
            Our mission is to revolutionize India's rental market by creating a transparent, efficient, and user-friendly 
            platform that connects property seekers with property owners directly.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We are committed to eliminating the traditional brokerage system and providing a seamless experience for both 
            tenants and landlords, making quality housing accessible to everyone across India.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Founded in 2024, GetRentals was born out of a simple yet powerful idea: to make the rental process in India 
            more transparent, efficient, and affordable. Our founders, having experienced the challenges of finding quality 
            accommodation in India's major cities, recognized the need for a platform that could eliminate the middleman 
            and connect property seekers directly with property owners.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Starting with major metropolitan cities like Delhi, Mumbai, Bangalore, and Pune, we have gradually expanded our 
            reach to cover over 100+ cities across India. Today, GetRentals serves thousands of users monthly, helping them 
            find their ideal homes while saving on brokerage fees.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our platform has facilitated thousands of successful rentals, from single rooms for students to luxury apartments 
            for families, all while maintaining our commitment to zero brokerage and transparent pricing.
          </p>
        </div>

        {/* What We Offer */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">For Property Seekers</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Extensive listing of verified rooms, PGs, and apartments</li>
                <li>• Advanced search and filter options</li>
                <li>• Direct communication with property owners</li>
                <li>• Real-time chat and messaging system</li>
                <li>• Zero brokerage fees</li>
                <li>• Mobile-responsive platform for on-the-go searches</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">For Property Owners</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Free property listing and management</li>
                <li>• Reach to thousands of potential tenants</li>
                <li>• Easy-to-use dashboard for property management</li>
                <li>• Direct tenant communication</li>
                <li>• Photo upload and detailed property descriptions</li>
                <li>• Performance analytics and listing insights</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparency</h3>
              <p className="text-gray-600">All listings are verified and pricing is transparent with no hidden fees</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Efficiency</h3>
              <p className="text-gray-600">Quick and easy platform designed for fast property searches and listings</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trust</h3>
              <p className="text-gray-600">Building trust through verified listings and secure user interactions</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Team</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            GetRentals is powered by a dedicated team of technology enthusiasts, real estate experts, and customer service 
            professionals who are passionate about transforming India's rental market. Our diverse team brings together 
            expertise in technology, real estate, user experience, and customer support.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Technology Team</h3>
              <p className="text-gray-600">Expert developers ensuring platform reliability and innovation</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Support Team</h3>
              <p className="text-gray-600">Dedicated customer service ensuring excellent user experience</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions about GetRentals or want to learn more about our services?
          </p>
          <a
            href="/contact"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;