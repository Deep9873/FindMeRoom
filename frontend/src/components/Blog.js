import React, { useEffect, useState } from 'react';
import { useSEO } from '../App';
import { useNavigate, useParams } from 'react-router-dom';

// Blog posts data with full content
const blogPosts = [
  {
    id: 1,
    slug: "ultimate-guide-finding-perfect-rental-property-india",
    title: "Ultimate Guide to Finding the Perfect Rental Property in India",
    excerpt: "Discover proven strategies and insider tips for finding your dream rental property in India's competitive housing market. From budget planning to negotiation tactics.",
    category: "Property Search",
    author: "GetRentals Team",
    date: "December 15, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1653918834459-c3e6bb3c47a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxwcm9wZXJ0eSUyMHJlbnRhbHxlbnwwfHx8fDE3NTQxMzAwNTd8MA&ixlib=rb-4.1.0&q=85",
    tags: ["rental tips", "property search", "housing guide"],
    featured: true,
    content: `
      <h2>Introduction</h2>
      <p>Finding the perfect rental property in India can be challenging, especially in major cities where competition is fierce and prices are constantly rising. This comprehensive guide will help you navigate the rental market effectively and secure your ideal home.</p>
      
      <h2>1. Setting Your Budget</h2>
      <p>Before you start your property search, it's crucial to establish a realistic budget. Financial experts recommend that your rent should not exceed 30% of your monthly income. This includes not just the rent, but also utilities, maintenance, and any society fees.</p>
      
      <h3>Budget Breakdown:</h3>
      <ul>
        <li><strong>Security Deposit:</strong> Typically 2-10 months' rent in advance</li>
        <li><strong>Brokerage:</strong> Usually 1-2 months' rent (avoid with zero-brokerage platforms like GetRentals)</li>
        <li><strong>Maintenance:</strong> ₹1,000-₹5,000 per month depending on the property</li>
        <li><strong>Utilities:</strong> ₹2,000-₹8,000 for electricity, water, gas, internet</li>
      </ul>
      
      <h2>2. Location Research</h2>
      <p>Location is everything in real estate. Consider these factors when choosing an area:</p>
      
      <h3>Proximity to Work</h3>
      <p>Calculate commute time during peak hours. A property that's 30 minutes away during off-peak hours might take 90 minutes during rush hour.</p>
      
      <h3>Infrastructure and Amenities</h3>
      <ul>
        <li>Nearby hospitals and clinics</li>
        <li>Schools and educational institutions</li>
        <li>Shopping centers and markets</li>
        <li>Banks and ATMs</li>
        <li>Public transportation connectivity</li>
      </ul>
      
      <h2>3. Online Property Search Strategy</h2>
      <p>Use multiple platforms to maximize your options:</p>
      
      <h3>GetRentals Advantage</h3>
      <p>GetRentals offers zero-brokerage property listings, allowing you to connect directly with property owners. This can save you thousands in brokerage fees.</p>
      
      <h3>Search Filters to Use</h3>
      <ul>
        <li>Price range (set realistic limits)</li>
        <li>Property type (1BHK, 2BHK, PG, etc.)</li>
        <li>Furnishing status</li>
        <li>Amenities (parking, gym, security)</li>
        <li>Age of building</li>
      </ul>
      
      <h2>4. Property Inspection Checklist</h2>
      <p>Never rent a property without physically inspecting it. Here's what to check:</p>
      
      <h3>Structural Elements</h3>
      <ul>
        <li>Walls for cracks or dampness</li>
        <li>Ceiling for leaks or stains</li>
        <li>Flooring condition</li>
        <li>Door and window functionality</li>
        <li>Balcony safety and condition</li>
      </ul>
      
      <h3>Utilities and Fittings</h3>
      <ul>
        <li>Water pressure and quality</li>
        <li>Electrical connections and switches</li>
        <li>Kitchen fittings and appliances</li>
        <li>Bathroom fixtures</li>
        <li>AC and fan functionality</li>
      </ul>
      
      <h2>5. Documentation and Legal Aspects</h2>
      <p>Ensure all paperwork is in order before signing any agreement:</p>
      
      <h3>Essential Documents</h3>
      <ul>
        <li>Rental agreement (11-month preferred for tax benefits)</li>
        <li>Property ownership documents</li>
        <li>Society NOC (for gated communities)</li>
        <li>Previous electricity and water bills</li>
        <li>Security deposit receipts</li>
      </ul>
      
      <h2>6. Negotiation Tips</h2>
      <p>Don't accept the first price quoted. Here are some negotiation strategies:</p>
      
      <ul>
        <li>Research market rates in the area</li>
        <li>Point out any maintenance issues</li>
        <li>Offer longer lease terms for better rates</li>
        <li>Negotiate included utilities or services</li>
        <li>Ask for rent escalation caps</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Finding the perfect rental property requires patience, research, and careful planning. By following this guide and using platforms like GetRentals that offer zero-brokerage listings, you can find a great home while saving money and avoiding common pitfalls.</p>
      
      <p>Remember, the perfect property is one that fits your budget, meets your needs, and is located in an area that enhances your quality of life. Take your time, inspect thoroughly, and don't hesitate to walk away if something doesn't feel right.</p>
    `
  },
  {
    id: 2,
    slug: "red-flags-avoid-when-renting-property",
    title: "10 Red Flags to Avoid When Renting a Property",
    excerpt: "Learn to identify common warning signs and avoid rental scams. Protect yourself from fraudulent landlords and problematic properties with these essential tips.",
    category: "Safety Tips",
    author: "Property Expert",
    date: "December 12, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1693948458360-c05c436177a8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwzfHxwcm9wZXJ0eSUyMHJlbnRhbHxlbnwwfHx8fDE3NTQxMzAwNTd8MA&ixlib=rb-4.1.0&q=85",
    tags: ["safety", "rental scams", "tenant protection"],
    featured: false,
    content: `
      <h2>Introduction</h2>
      <p>Renting a property can be exciting, but it's important to stay vigilant. Scammers and problematic landlords exist in every market, and knowing the warning signs can save you from financial loss and legal troubles.</p>
      
      <h2>1. Unrealistically Low Rent</h2>
      <p>If a property is priced significantly below market rate, be suspicious. This is often the first sign of a scam.</p>
      
      <h3>Why This Happens:</h3>
      <ul>
        <li>Scammers use low prices to attract victims quickly</li>
        <li>Hidden costs will be revealed later</li>
        <li>Property may not actually be available</li>
      </ul>
      
      <h3>What to Do:</h3>
      <p>Research market rates in the area. If a deal seems too good to be true, it probably is.</p>
      
      <h2>2. Landlord Refuses Physical Inspection</h2>
      <p>Any landlord who insists you rent without seeing the property is likely running a scam.</p>
      
      <h3>Common Excuses:</h3>
      <ul>
        <li>"I'm out of town, but you can see photos"</li>
        <li>"The current tenant doesn't allow viewings"</li>
        <li>"You need to pay deposit first to secure viewing"</li>
      </ul>
      
      <h3>Red Flag Alert:</h3>
      <p>Never pay any money without physically inspecting the property and meeting the landlord or authorized agent in person.</p>
      
      <h2>3. Pressure for Immediate Payment</h2>
      <p>Legitimate landlords understand that tenants need time to make important decisions.</p>
      
      <h3>Warning Signs:</h3>
      <ul>
        <li>"You must pay today or lose the property"</li>
        <li>Demands for cash payments only</li>
        <li>Refuses to provide proper receipts</li>
        <li>Asks for payment via untraceable methods</li>
      </ul>
      
      <h2>4. No Proper Documentation</h2>
      <p>A legitimate rental will always involve proper paperwork and documentation.</p>
      
      <h3>Required Documents:</h3>
      <ul>
        <li>Property ownership papers</li>
        <li>Rental agreement draft</li>
        <li>Previous utility bills</li>
        <li>Society NOC (if applicable)</li>
        <li>ID proof of landlord</li>
      </ul>
      
      <h2>5. Maintenance Issues Ignored</h2>
      <p>A landlord who dismisses obvious maintenance problems will likely ignore future issues too.</p>
      
      <h3>Watch Out For:</h3>
      <ul>
        <li>Visible water damage or leaks</li>
        <li>Electrical issues</li>
        <li>Plumbing problems</li>
        <li>Structural damage</li>
        <li>"We'll fix it after you move in" promises</li>
      </ul>
      
      <h2>6. Vague or Missing Lease Terms</h2>
      <p>A proper rental agreement should clearly outline all terms and conditions.</p>
      
      <h3>Essential Clauses:</h3>
      <ul>
        <li>Rent amount and due date</li>
        <li>Security deposit terms</li>
        <li>Maintenance responsibilities</li>
        <li>Notice period for termination</li>
        <li>Rent escalation terms</li>
      </ul>
      
      <h2>7. Unwilling to Meet in Person</h2>
      <p>Legitimate landlords will meet potential tenants face-to-face.</p>
      
      <h3>Red Flags:</h3>
      <ul>
        <li>Only communicates via text or email</li>
        <li>Provides different excuses to avoid meeting</li>
        <li>Sends representatives who can't answer basic questions</li>
      </ul>
      
      <h2>8. Neighborhood Concerns</h2>
      <p>Research the area thoroughly, not just the property itself.</p>
      
      <h3>Investigation Tips:</h3>
      <ul>
        <li>Visit at different times of day</li>
        <li>Talk to neighbors</li>
        <li>Check local crime statistics</li>
        <li>Verify public transportation options</li>
      </ul>
      
      <h2>9. Excessive Fees and Charges</h2>
      <p>Be wary of landlords who add numerous additional fees after initial discussions.</p>
      
      <h3>Common Hidden Charges:</h3>
      <ul>
        <li>Application fees</li>
        <li>Processing charges</li>
        <li>Documentation fees</li>
        <li>Key money or premium charges</li>
      </ul>
      
      <h2>10. Gut Feeling Says No</h2>
      <p>Trust your instincts. If something feels wrong, it probably is.</p>
      
      <h3>Listen to Your Intuition When:</h3>
      <ul>
        <li>The landlord seems evasive or dishonest</li>
        <li>The property feels unsafe</li>
        <li>Neighbors seem unwelcoming or warning you</li>
        <li>You feel pressured or uncomfortable</li>
      </ul>
      
      <h2>How to Protect Yourself</h2>
      
      <h3>Use Trusted Platforms</h3>
      <p>Platforms like GetRentals verify property listings and provide direct contact with verified property owners, reducing the risk of scams.</p>
      
      <h3>Verification Steps:</h3>
      <ol>
        <li>Always inspect the property physically</li>
        <li>Verify the landlord's identity and ownership</li>
        <li>Get all agreements in writing</li>
        <li>Pay only after proper documentation</li>
        <li>Keep copies of all payments and receipts</li>
      </ol>
      
      <h2>Conclusion</h2>
      <p>Being aware of these red flags can save you from rental scams and problematic situations. Take your time, do your research, and never hesitate to walk away from a deal that doesn't feel right. Remember, there are always other properties available, but recovering from a rental scam can be difficult and costly.</p>
      
      <p>Stay safe, stay informed, and happy house hunting!</p>
    `
  },
  {
    id: 3,
    slug: "negotiate-rent-like-pro-money-saving-strategies",
    title: "How to Negotiate Rent Like a Pro: Money-Saving Strategies",
    excerpt: "Master the art of rent negotiation with proven techniques that can save you thousands annually. Build better relationships with landlords while reducing costs.",
    category: "Financial Tips",
    author: "Real Estate Advisor",
    date: "December 10, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlfGVufDB8fHx8MTc1NDEzMDA2Nnww&ixlib=rb-4.1.0&q=85",
    tags: ["rent negotiation", "money saving", "tenant tips"],
    featured: true,
    content: `
      <h2>Introduction</h2>
      <p>Rent negotiation is an art that can save you thousands of rupees annually. Many tenants accept the first price quoted, but with the right approach, you can often secure better terms while maintaining a positive relationship with your landlord.</p>
      
      <h2>Understanding the Landlord's Perspective</h2>
      <p>Before starting negotiations, it's important to understand what motivates landlords:</p>
      
      <h3>Landlord Priorities:</h3>
      <ul>
        <li><strong>Reliable tenants:</strong> They prefer tenants who pay on time and take care of the property</li>
        <li><strong>Long-term stability:</strong> Finding new tenants is expensive and time-consuming</li>
        <li><strong>Minimal maintenance issues:</strong> Responsible tenants reduce their workload</li>
        <li><strong>Market-competitive returns:</strong> They want fair market value for their property</li>
      </ul>
      
      <h2>Pre-Negotiation Research</h2>
      
      <h3>Market Research</h3>
      <p>Knowledge is power in negotiations. Research similar properties in your area:</p>
      
      <ul>
        <li>Check rent prices for similar properties within 1-2 km radius</li>
        <li>Note differences in amenities, age, and condition</li>
        <li>Use platforms like GetRentals to compare current market rates</li>
        <li>Consider seasonal variations (rents often lower in monsoon)</li>
      </ul>
      
      <h3>Property Assessment</h3>
      <p>Document any issues that could justify a lower rent:</p>
      
      <ul>
        <li>Maintenance issues (plumbing, electrical, structural)</li>
        <li>Missing amenities compared to market standard</li>
        <li>Age and condition of appliances/fittings</li>
        <li>Parking or storage limitations</li>
        <li>Neighborhood drawbacks (noise, accessibility)</li>
      </ul>
      
      <h2>Timing Your Negotiation</h2>
      
      <h3>Best Times to Negotiate:</h3>
      <ul>
        <li><strong>Lease renewal time:</strong> Landlords prefer keeping good tenants</li>
        <li><strong>Off-peak seasons:</strong> Monsoon months (June-September) typically see lower demand</li>
        <li><strong>Economic downturns:</strong> When rental demand is generally low</li>
        <li><strong>After being a model tenant:</strong> Consistent payment history gives you leverage</li>
      </ul>
      
      <h3>Avoid These Times:</h3>
      <ul>
        <li>Peak moving seasons (November-February)</li>
        <li>Right after missing rent payments</li>
        <li>During property maintenance disputes</li>
        <li>When the market is clearly favoring landlords</li>
      </ul>
      
      <h2>Negotiation Strategies</h2>
      
      <h3>1. The Value Proposition Approach</h3>
      <p>Position yourself as the ideal tenant worth retaining:</p>
      
      <blockquote>
        "I've been thinking about our rental arrangement. Over the past year, I've maintained the property well, paid rent consistently on time, and haven't caused any issues. I'd love to continue this relationship. Given current market conditions and some maintenance concerns I've noticed, would you consider adjusting the rent to ₹X for the next lease term?"
      </blockquote>
      
      <h3>2. The Market Comparison Method</h3>
      <p>Present factual market data professionally:</p>
      
      <blockquote>
        "I've been researching similar properties in our area, and I found that comparable 2BHK apartments are renting for ₹15,000-18,000. Given that our unit doesn't have parking/gym/recent renovations, I believe a rent of ₹16,000 would be more aligned with current market rates."
      </blockquote>
      
      <h3>3. The Win-Win Proposal</h3>
      <p>Offer something valuable in return for reduced rent:</p>
      
      <ul>
        <li><strong>Longer lease terms:</strong> "I'm willing to sign a 2-year lease for a 10% rent reduction"</li>
        <li><strong>Property improvements:</strong> "I'll handle minor maintenance tasks for reduced rent"</li>
        <li><strong>Higher security deposit:</strong> "I can increase my deposit to 6 months for lower monthly rent"</li>
        <li><strong>Advance payments:</strong> "I can pay 6 months in advance for a discount"</li>
      </ul>
      
      <h2>What You Can Negotiate Beyond Rent</h2>
      
      <h3>Included Utilities</h3>
      <ul>
        <li>WiFi internet connection</li>
        <li>Cable/DTH services</li>
        <li>Maintenance charges</li>
        <li>Water and electricity (partial or full)</li>
      </ul>
      
      <h3>Property Improvements</h3>
      <ul>
        <li>Fresh paint before move-in</li>
        <li>Appliance upgrades or repairs</li>
        <li>Addition of storage solutions</li>
        <li>Security improvements</li>
      </ul>
      
      <h3>Lease Terms</h3>
      <ul>
        <li>Rent escalation caps (maximum 5-10% annually)</li>
        <li>Notice period reductions</li>
        <li>Security deposit reduction</li>
        <li>Pet-friendly terms</li>
      </ul>
      
      <h2>Negotiation Do's and Don'ts</h2>
      
      <h3>DO:</h3>
      <ul>
        <li>Be respectful and professional</li>
        <li>Present factual information</li>
        <li>Highlight your value as a tenant</li>
        <li>Give reasonable justifications</li>
        <li>Be prepared to compromise</li>
        <li>Get agreements in writing</li>
      </ul>
      
      <h3>DON'T:</h3>
      <ul>
        <li>Make demands or ultimatums</li>
        <li>Lie about your financial situation</li>
        <li>Compare to completely different property types</li>
        <li>Negotiate during emotional moments</li>
        <li>Threaten to leave unless you mean it</li>
        <li>Expect unrealistic reductions</li>
      </ul>
      
      <h2>Handling Rejection</h2>
      
      <p>If your landlord refuses to negotiate:</p>
      
      <h3>Options to Consider:</h3>
      <ol>
        <li><strong>Ask why:</strong> Understanding their reasoning might reveal room for compromise</li>
        <li><strong>Propose alternatives:</strong> If rent can't be reduced, negotiate other terms</li>
        <li><strong>Request gradual implementation:</strong> "Can we implement this change in 3 months?"</li>
        <li><strong>Accept gracefully:</strong> Thank them for considering and maintain the relationship</li>
        <li><strong>Plan your next move:</strong> Decide if staying at current terms makes sense</li>
      </ol>
      
      <h2>Legal Considerations</h2>
      
      <h3>Important Points:</h3>
      <ul>
        <li>Rent agreements must be updated to reflect new terms</li>
        <li>Stamp duty may apply to modified agreements</li>
        <li>Document all negotiated changes in writing</li>
        <li>Ensure compliance with local rent control laws</li>
      </ul>
      
      <h2>Sample Negotiation Scripts</h2>
      
      <h3>For New Rentals:</h3>
      <blockquote>
        "Thank you for showing me the property. I'm very interested, but I noticed [specific issues/concerns]. The market rate for similar properties seems to be around ₹X. Would you consider ₹Y, which accounts for these factors while still giving you a fair return?"
      </blockquote>
      
      <h3>For Lease Renewals:</h3>
      <blockquote>
        "I've really enjoyed living here and would like to continue. I've been researching market rates for similar properties, and they seem to be around ₹X. Given my track record as a reliable tenant and [specific reasons], would you consider keeping the rent at ₹Y for the next term?"
      </blockquote>
      
      <h2>Conclusion</h2>
      <p>Successful rent negotiation requires preparation, timing, and the right approach. Remember that it's not just about getting the lowest possible rent, but about creating a fair arrangement that works for both parties.</p>
      
      <p>The key is to position yourself as a valuable tenant worth retaining, present factual information professionally, and be willing to find creative solutions that benefit everyone involved.</p>
      
      <p>With practice and the right mindset, you can master the art of rent negotiation and save significant money while maintaining positive landlord relationships.</p>
    `
  }
];

const Blog = () => {
  const { updateSEO } = useSEO();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    updateSEO(
      'GetRentals Blog - Property Rental Tips, Real Estate Advice & Housing Insights',
      'Discover expert property rental tips, real estate insights, apartment hunting guides, and housing market trends on GetRentals blog. Your ultimate resource for rental property advice in India.',
      'property rental blog, real estate tips, apartment hunting, housing market, rental advice, property investment, tenant tips, landlord advice, Indian real estate, property blog'
    );
  }, [updateSEO]);

  const categories = [
    'all',
    'Property Search',
    'Safety Tips',
    'Financial Tips',
    'Legal Advice',
    'Student Housing',
    'Investment',
    'Technology',
    'Moving Tips'
  ];

  // Filter articles based on category
  const filteredArticles = blogPosts.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesCategory;
  });

  const featuredArticles = blogPosts.filter(article => article.featured);

  const handleReadMore = (slug) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema.org structured data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "GetRentals Blog",
          "description": "Expert property rental tips, real estate insights, and housing market trends",
          "url": "https://getrentals.online/blog",
          "publisher": {
            "@type": "Organization",
            "name": "GetRentals",
            "logo": {
              "@type": "ImageObject",
              "url": "https://getrentals.online/logo.png"
            }
          },
          "blogPost": blogPosts.map(article => ({
            "@type": "BlogPosting",
            "headline": article.title,
            "description": article.excerpt,
            "author": {
              "@type": "Person",
              "name": article.author
            },
            "datePublished": article.date,
            "image": article.image,
            "keywords": article.tags.join(", ")
          }))
        })}
      </script>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">GetRentals Blog</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Your ultimate resource for property rental tips, real estate insights, and housing market trends
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Articles Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-blue-600 font-medium">{article.category}</span>
                    <span className="text-sm text-gray-500">{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <span>By {article.author}</span>
                      <span className="mx-2">•</span>
                      <span>{article.date}</span>
                    </div>
                    <button 
                      onClick={() => handleReadMore(article.slug)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">All Articles</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredArticles.map((article) => (
            <article key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-blue-600 font-medium">{article.category}</span>
                  <span className="text-sm text-gray-500">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <span>By {article.author}</span>
                    <span className="mx-2">•</span>
                    <span>{article.date}</span>
                  </div>
                  <button 
                    onClick={() => handleReadMore(article.slug)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Additional Content Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Property Rental Resources</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">For Tenants</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Rental agreement templates</li>
                <li>• Security deposit guidelines</li>
                <li>• Tenant rights checklist</li>
                <li>• Property inspection guide</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">For Landlords</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Property listing optimization</li>
                <li>• Tenant screening process</li>
                <li>• Maintenance responsibilities</li>
                <li>• Legal compliance guide</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Individual Blog Post Component
const BlogPost = () => {
  const { slug } = useParams();
  const { updateSEO } = useSEO();
  const navigate = useNavigate();
  
  const post = blogPosts.find(p => p.slug === slug);
  
  useEffect(() => {
    if (post) {
      updateSEO(
        `${post.title} | GetRentals Blog`,
        post.excerpt,
        `${post.tags.join(', ')}, GetRentals blog, property rental`
      );
    }
  }, [post, updateSEO]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/blog')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back to Blog */}
        <button 
          onClick={() => navigate('/blog')}
          className="text-blue-600 hover:text-blue-800 mb-8 flex items-center"
        >
          ← Back to Blog
        </button>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm">{post.readTime}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center text-gray-600 mb-6">
            <span>By {post.author}</span>
            <span className="mx-2">•</span>
            <span>{post.date}</span>
          </div>

          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Related Articles */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts
              .filter(p => p.id !== post.id && p.category === post.category)
              .slice(0, 2)
              .map(relatedPost => (
                <div key={relatedPost.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src={relatedPost.image} 
                    alt={relatedPost.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2">{relatedPost.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{relatedPost.excerpt}</p>
                    <button 
                      onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </article>
    </div>
  );
};

export default Blog;
export { BlogPost };