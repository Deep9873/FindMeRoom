import React, { useEffect, useState } from 'react';
import { useSEO } from '../App';

const Blog = () => {
  const { updateSEO } = useSEO();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    updateSEO(
      'GetRentals Blog - Property Rental Tips, Real Estate Advice & Housing Insights',
      'Discover expert property rental tips, real estate insights, apartment hunting guides, and housing market trends on GetRentals blog. Your ultimate resource for rental property advice in India.',
      'property rental blog, real estate tips, apartment hunting, housing market, rental advice, property investment, tenant tips, landlord advice, Indian real estate, property blog'
    );
  }, [updateSEO]);

  // Blog articles data
  const blogArticles = [
    {
      id: 1,
      title: "Ultimate Guide to Finding the Perfect Rental Property in India",
      excerpt: "Discover proven strategies and insider tips for finding your dream rental property in India's competitive housing market. From budget planning to negotiation tactics.",
      category: "Property Search",
      author: "GetRentals Team",
      date: "December 15, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1653918834459-c3e6bb3c47a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxwcm9wZXJ0eSUyMHJlbnRhbHxlbnwwfHx8fDE3NTQxMzAwNTd8MA&ixlib=rb-4.1.0&q=85",
      tags: ["rental tips", "property search", "housing guide"],
      featured: true
    },
    {
      id: 2,
      title: "10 Red Flags to Avoid When Renting a Property",
      excerpt: "Learn to identify common warning signs and avoid rental scams. Protect yourself from fraudulent landlords and problematic properties with these essential tips.",
      category: "Safety Tips",
      author: "Property Expert",
      date: "December 12, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1693948458360-c05c436177a8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwzfHxwcm9wZXJ0eSUyMHJlbnRhbHxlbnwwfHx8fDE3NTQxMzAwNTd8MA&ixlib=rb-4.1.0&q=85",
      tags: ["safety", "rental scams", "tenant protection"],
      featured: false
    },
    {
      id: 3,
      title: "How to Negotiate Rent Like a Pro: Money-Saving Strategies",
      excerpt: "Master the art of rent negotiation with proven techniques that can save you thousands annually. Build better relationships with landlords while reducing costs.",
      category: "Financial Tips",
      author: "Real Estate Advisor",
      date: "December 10, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlfGVufDB8fHx8MTc1NDEzMDA2Nnww&ixlib=rb-4.1.0&q=85",
      tags: ["rent negotiation", "money saving", "tenant tips"],
      featured: true
    },
    {
      id: 4,
      title: "Essential Tenant Rights Every Renter Should Know",
      excerpt: "Understand your legal rights as a tenant in India. From security deposits to maintenance responsibilities, know what landlords can and cannot do.",
      category: "Legal Advice",
      author: "Legal Expert",
      date: "December 8, 2024",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1494526585095-c41746248156?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxyZWFsJTIwZXN0YXRlfGVufDB8fHx8MTc1NDEzMDA2Nnww&ixlib=rb-4.1.0&q=85",
      tags: ["tenant rights", "legal advice", "rental law"],
      featured: false
    },
    {
      id: 5,
      title: "Student Housing Guide: Finding Affordable PGs and Hostels",
      excerpt: "Complete guide for students searching for budget-friendly accommodation. Compare PGs, hostels, and shared apartments near colleges and universities.",
      category: "Student Housing",
      author: "Student Advisor",
      date: "December 5, 2024",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHw0fHxyZWFsJTIwZXN0YXRlfGVufDB8fHx8MTc1NDEzMDA2Nnww&ixlib=rb-4.1.0&q=85",
      tags: ["student housing", "PG accommodation", "budget rental"],
      featured: true
    },
    {
      id: 6,
      title: "Property Investment 101: Buy vs Rent Analysis",
      excerpt: "Comprehensive comparison of buying versus renting property in India's current market. Make informed decisions based on financial analysis and market trends.",
      category: "Investment",
      author: "Investment Analyst",
      date: "December 3, 2024",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxhcGFydG1lbnR8ZW58MHx8fHwxNzU0MDU1NjAyfDA&ixlib=rb-4.1.0&q=85",
      tags: ["property investment", "buy vs rent", "real estate"],
      featured: false
    },
    {
      id: 7,
      title: "Smart Home Features That Add Value to Rental Properties",
      excerpt: "Explore how smart home technology is revolutionizing rental properties. From security systems to energy efficiency, discover features tenants love.",
      category: "Technology",
      author: "Tech Expert",
      date: "November 30, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnR8ZW58MHx8fHwxNzU0MDU1NjAyfDA&ixlib=rb-4.1.0&q=85",
      tags: ["smart home", "property technology", "rental features"],
      featured: false
    },
    {
      id: 8,
      title: "Moving Guide: Complete Checklist for Changing Apartments",
      excerpt: "Stress-free moving guide with timeline, checklist, and expert tips. Make your apartment transition smooth with proper planning and organization.",
      category: "Moving Tips",
      author: "Moving Expert",
      date: "November 28, 2024",
      readTime: "9 min read",
      image: "https://images.pexels.com/photos/8962228/pexels-photo-8962228.jpeg",
      tags: ["moving tips", "apartment change", "relocation guide"],
      featured: false
    }
  ];

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

  // Filter articles based on category and search term
  const filteredArticles = blogArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = blogArticles.filter(article => article.featured);

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
          "blogPost": blogArticles.map(article => ({
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
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
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
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* AdSense Ad Placeholder - Banner */}
        <div className="mb-12">
          <div className="bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500 text-sm">Advertisement</p>
            <p className="text-gray-400 text-xs mt-1">728x90 Banner Ad Placement</p>
          </div>
        </div>

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
          {filteredArticles.map((article, index) => (
            <React.Fragment key={article.id}>
              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
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
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>

              {/* AdSense Ad Placeholder - Inserted every 3 articles */}
              {(index + 1) % 3 === 0 && index < filteredArticles.length - 1 && (
                <div className="md:col-span-2 lg:col-span-3 my-8">
                  <div className="bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <p className="text-gray-500 text-sm">Advertisement</p>
                    <p className="text-gray-400 text-xs mt-1">Responsive Ad Placement</p>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </section>

        {/* Sidebar with AdSense and Newsletter */}
        <section className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Additional Content Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
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
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* AdSense Sidebar Ad */}
            <div className="bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <p className="text-gray-500 text-sm">Advertisement</p>
              <p className="text-gray-400 text-xs mt-1">300x250 Sidebar Ad</p>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Stay Updated</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get the latest property rental tips and real estate insights delivered to your inbox.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['rental tips', 'property search', 'tenant rights', 'real estate', 'PG accommodation', 'apartment hunting', 'property investment', 'moving guide'].map((tag, index) => (
                  <span key={index} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom AdSense Ad */}
        <div className="mt-12">
          <div className="bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500 text-sm">Advertisement</p>
            <p className="text-gray-400 text-xs mt-1">728x90 Bottom Banner Ad Placement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;