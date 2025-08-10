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
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Meet the GetRentals Team</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Our dedicated team of real estate professionals, technology experts, and customer service specialists work 
            tirelessly to provide you with the best rental experience in India. Every article and guide on our platform 
            is carefully crafted by the GetRentals Team, combining years of industry experience with deep market insights.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H7m5 0v-5a2 2 0 00-2-2H8a2 2 0 00-2 2v5m5 0V9a1 1 0 00-1-1H8a1 1 0 00-1 1v10m5 0h2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real Estate Experts</h3>
              <p className="text-gray-600 text-sm">10+ years combined experience in Indian property markets</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Specialists</h3>
              <p className="text-gray-600 text-sm">Creating valuable, original content for renters and property owners</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 110 19.5 9.75 9.75 0 010-19.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Success</h3>
              <p className="text-gray-600 text-sm">Ensuring excellent user experience and customer satisfaction</p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Editorial Standards</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Every piece of content published on GetRentals undergoes rigorous review by our team of experts. We are committed to:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Accuracy:</strong> All information is fact-checked and verified with current market data</li>
              <li>• <strong>Originality:</strong> We create unique, valuable content based on real market insights</li>
              <li>• <strong>Relevance:</strong> Content is updated regularly to reflect current market conditions</li>
              <li>• <strong>Expertise:</strong> Written by professionals with deep knowledge of Indian rental markets</li>
              <li>• <strong>User Value:</strong> Every article aims to solve real problems faced by renters and property owners</li>
            </ul>
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
