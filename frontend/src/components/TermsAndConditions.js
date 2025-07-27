import React, { useEffect } from 'react';
import { useSEO } from '../App';

const TermsAndConditions = () => {
  const { updateSEO } = useSEO();

  useEffect(() => {
    updateSEO(
      'Terms and Conditions - GetRentals | User Agreement & Rules',
      'Read GetRentals Terms and Conditions to understand user rights, responsibilities, and platform rules for property listings, rentals, and usage.',
      'terms and conditions, user agreement, platform rules, property rental terms, user rights, responsibilities'
    );
  }, [updateSEO]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using GetRentals platform and services.
          </p>
          <p className="text-sm text-gray-500 mt-4">Last updated: January 2025</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to GetRentals! These Terms and Conditions ("Terms") govern your use of the GetRentals platform 
              and services. By accessing or using our platform, you agree to be bound by these Terms. If you do not 
              agree to these Terms, you may not use our services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              These Terms constitute a legally binding agreement between you and GetRentals. We reserve the right to 
              modify these Terms at any time, and your continued use of our services constitutes acceptance of any changes.
            </p>
          </section>

          {/* Platform Description */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Platform Description</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              GetRentals is an online platform that connects property owners and property seekers for rental purposes. 
              Our platform allows users to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Post property listings for rooms, PGs, and apartments</li>
              <li>Search and browse available rental properties</li>
              <li>Communicate with other users through our messaging system</li>
              <li>Manage property listings and rental inquiries</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              GetRentals acts as a facilitator and is not a party to any rental agreements between users. 
              We do not own, operate, or control any properties listed on our platform.
            </p>
          </section>

          {/* User Registration */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Registration and Account</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To use certain features of GetRentals, you must register for an account. When registering, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your account information</li>
              <li>Keep your login credentials secure and confidential</li>
              <li>Be responsible for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              You must be at least 18 years old to register for an account. We reserve the right to refuse service, 
              terminate accounts, or cancel listings at our discretion.
            </p>
          </section>

          {/* User Conduct */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Conduct and Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By using GetRentals, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Use the platform only for lawful purposes</li>
              <li>Provide accurate and truthful information in all communications</li>
              <li>Respect the rights and privacy of other users</li>
              <li>Not engage in fraudulent, abusive, or inappropriate behavior</li>
              <li>Not post false, misleading, or deceptive property listings</li>
              <li>Not spam or send unsolicited messages to other users</li>
              <li>Not violate any applicable laws or regulations</li>
            </ul>
            
            <h3 className="text-lg font-medium text-gray-900 mb-3">Prohibited Activities</h3>
            <p className="text-gray-700 leading-relaxed mb-4">You are prohibited from:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Posting discriminatory content or listings</li>
              <li>Uploading malicious code or viruses</li>
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Interfering with the proper functioning of the platform</li>
              <li>Collecting user information without consent</li>
              <li>Using the platform for commercial purposes other than property rental</li>
            </ul>
          </section>

          {/* Property Listings */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Property Listings</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When posting property listings, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>You have the legal right to rent the property</li>
              <li>All information and photos are accurate and current</li>
              <li>The property meets all applicable safety and legal requirements</li>
              <li>You will honor all inquiries and rental agreements made through the platform</li>
              <li>You will not discriminate against potential tenants</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              We reserve the right to remove listings that violate these Terms or are inappropriate. 
              Property owners are responsible for maintaining accurate listing information and promptly 
              updating availability status.
            </p>
          </section>

          {/* Rental Transactions */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Rental Transactions</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              GetRentals facilitates connections between property owners and seekers but is not involved in 
              rental transactions. You acknowledge that:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>All rental agreements are between users directly</li>
              <li>We do not guarantee the availability, condition, or legality of properties</li>
              <li>We are not responsible for the actions or behavior of users</li>
              <li>You should verify property details and meet in person before making agreements</li>
              <li>We do not handle payments or security deposits</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              We strongly recommend that users conduct proper due diligence, including property inspections 
              and background checks, before entering into rental agreements.
            </p>
          </section>

          {/* Fees and Payments */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Fees and Payments</h2>
            <p className="text-gray-700 leading-relaxed">
              GetRentals is currently a free platform with no listing fees or transaction charges. 
              We reserve the right to introduce fees for certain services in the future, with appropriate 
              notice to users. Any future fees will be clearly communicated and agreed upon before 
              implementation.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The GetRentals platform, including its design, functionality, and content, is protected by 
              intellectual property laws. You agree that:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>We own all rights to the platform and its content</li>
              <li>You may not copy, modify, or distribute our platform or content</li>
              <li>You retain ownership of content you post (photos, descriptions, etc.)</li>
              <li>By posting content, you grant us a license to use it for platform operations</li>
              <li>You will not infringe on the intellectual property rights of others</li>
            </ul>
          </section>

          {/* Privacy and Data Protection */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Privacy and Data Protection</h2>
            <p className="text-gray-700 leading-relaxed">
              Your privacy is important to us. Our collection and use of personal information is governed by 
              our Privacy Policy, which is incorporated into these Terms by reference. By using our platform, 
              you consent to the collection and use of your information as described in our Privacy Policy.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-semibant text-gray-900 mb-4">10. Disclaimers</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              GetRentals is provided "as is" and "as available" without warranties of any kind. We disclaim all 
              warranties, express or implied, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Accuracy, completeness, or reliability of platform content</li>
              <li>Availability or uninterrupted access to the platform</li>
              <li>Fitness for a particular purpose or merchantability</li>
              <li>Security of user data or communications</li>
              <li>Quality or condition of properties listed</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              We do not verify user identities, property ownership, or listing accuracy. Users are responsible 
              for their own due diligence and safety.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To the maximum extent permitted by law, GetRentals shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Loss of profits, data, or use</li>
              <li>Personal injury or property damage</li>
              <li>Fraudulent or illegal activities by users</li>
              <li>Disputes between users</li>
              <li>Platform outages or technical failures</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Our total liability to you for any claims arising from your use of the platform shall not exceed 
              the amount you have paid us, if any, in the twelve months preceding the claim.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify and hold harmless GetRentals, its officers, directors, employees, and agents 
              from any claims, damages, losses, or expenses arising from your use of the platform, violation of 
              these Terms, or infringement of any rights of another person or entity.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Termination</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may terminate or suspend your account and access to the platform at any time, with or without 
              cause, including for violation of these Terms. You may also terminate your account at any time 
              by contacting us.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Upon termination, your right to use the platform ceases immediately. Provisions that by their 
              nature should survive termination shall survive, including warranty disclaimers, indemnity, and 
              limitations of liability.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Governing Law and Jurisdiction</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes 
              arising from these Terms or your use of the platform shall be subject to the exclusive jurisdiction 
              of the courts in India.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Dispute Resolution</h2>
            <p className="text-gray-700 leading-relaxed">
              We encourage users to resolve disputes amicably. If you have a dispute with another user, 
              we recommend attempting direct communication first. For disputes with GetRentals, please contact 
              our support team at support@getrentals.online. We will make reasonable efforts to resolve 
              disputes through good faith negotiations.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Severability</h2>
            <p className="text-gray-700 leading-relaxed">
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions 
              shall continue to be valid and enforceable. The invalid provision shall be replaced with a valid 
              provision that most closely matches the intent of the original provision.
            </p>
          </section>

          {/* Entire Agreement */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">17. Entire Agreement</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and 
              GetRentals regarding your use of the platform. These Terms supersede all prior agreements and 
              understandings, whether written or oral, relating to the subject matter.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">18. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> support@getrentals.online<br />
                <strong>Subject:</strong> Terms and Conditions Inquiry
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;