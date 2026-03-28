import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, ArrowRight, Search, Tag, User } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Predicting Customer Churn: A Machine Learning Approach',
    excerpt: 'How I built a Random Forest classifier to identify at-risk customers with 89% accuracy, saving the company $500K in retention costs.',
    content: `
      Customer churn is one of the most critical metrics for subscription-based businesses. In this post, I'll walk through my end-to-end process...

      ## The Problem
      
      Our SaaS company was losing 15% of customers annually, with each churned customer representing $2K in lost lifetime value.

      ## Data Collection
      
      I gathered 50,000 customer records including:
      - Usage metrics (login frequency, feature adoption)
      - Support tickets and NPS scores
      - Billing history and plan changes
      
      ## Feature Engineering
      
      The most predictive features turned out to be:
      1. Days since last login (correlation: 0.72)
      2. Support ticket sentiment
      3. Payment failure count
      
      ## Model Selection
      
      I tested Logistic Regression, Random Forest, and XGBoost. Random Forest won with 89% precision and 85% recall.
    `,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    category: 'Machine Learning',
    tags: ['Python', 'scikit-learn', 'Pandas', 'Classification'],
    author: 'Your Name',
    date: 'Mar 15, 2024',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 2,
    title: 'SQL Window Functions Every Data Analyst Should Know',
    excerpt: 'Master these 5 window functions to level up your data analysis game: ROW_NUMBER(), RANK(), LAG(), LEAD(), and running totals.',
    content: 'Window functions are game-changers for complex analytics...',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop',
    category: 'SQL',
    tags: ['SQL', 'PostgreSQL', 'Data Engineering'],
    author: 'Your Name',
    date: 'Mar 8, 2024',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: 3,
    title: 'Building Executive Dashboards That Actually Get Used',
    excerpt: 'Lessons learned from redesigning our C-suite analytics dashboard. Spoiler: less is more, and context is everything.',
    content: 'Dashboards often fail because they prioritize data over decisions...',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    category: 'Visualization',
    tags: ['Tableau', 'Power BI', 'Data Storytelling'],
    author: 'Your Name',
    date: 'Feb 28, 2024',
    readTime: '5 min read',
    featured: false,
  },
  {
    id: 4,
    title: 'A/B Testing Mistakes That Are Costing You Money',
    excerpt: 'Common statistical errors in experimentation and how to avoid them. Includes a Python calculator for sample size and power analysis.',
    content: 'Stopping tests too early, ignoring segmentation, and peeking at results...',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    category: 'Statistics',
    tags: ['Python', 'Statistics', 'A/B Testing', 'SciPy'],
    author: 'Your Name',
    date: 'Feb 15, 2024',
    readTime: '10 min read',
    featured: false,
  },
  {
    id: 5,
    title: 'From Excel to Python: A Migration Guide',
    excerpt: 'How I transitioned our finance team from Excel workflows to reproducible Python scripts. Templates and code examples included.',
    content: 'Excel is great until it breaks at 1M rows...',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
    category: 'Tutorial',
    tags: ['Python', 'Pandas', 'Excel', 'Automation'],
    author: 'Your Name',
    date: 'Feb 1, 2024',
    readTime: '12 min read',
    featured: false,
  },
  {
    id: 6,
    title: 'Real-Time Analytics with BigQuery and Looker',
    excerpt: 'Architecting a streaming data pipeline for real-time business metrics. Latency under 30 seconds, cost under $200/month.',
    content: 'Real-time data used to be enterprise-only...',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    category: 'Data Engineering',
    tags: ['BigQuery', 'Looker', 'GCP', 'Streaming'],
    author: 'Your Name',
    date: 'Jan 20, 2024',
    readTime: '7 min read',
    featured: false,
  },
];

const categories = ['All', 'Machine Learning', 'SQL', 'Visualization', 'Statistics', 'Tutorial', 'Data Engineering'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(p => p.featured);

  if (selectedPost) {
    return (
      <section id="blog" className="py-24 px-4 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedPost(null)}
            className="mb-6 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
          >
            ← Back to Blog
          </Button>

          <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <img 
              src={selectedPost.image} 
              alt={selectedPost.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                  {selectedPost.category}
                </Badge>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {selectedPost.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedPost.readTime}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                {selectedPost.title}
              </h1>

              <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-white font-semibold">
                  {selectedPost.author.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{selectedPost.author}</p>
                  <p className="text-sm text-gray-500">Data Analyst</p>
                </div>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedPost.content}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-3">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600 border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-24 px-4 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-emerald-600 text-sm font-medium uppercase tracking-wider">Blog</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6 text-gray-900">
            Data Insights &{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">Tutorials</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sharing lessons learned, technical deep-dives, and practical guides from the world of data analytics.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search articles, topics, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 bg-white border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={
                activeCategory === category
                  ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white'
                  : 'border-gray-200 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200'
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && activeCategory === 'All' && !searchQuery && (
          <div className="mb-12">
            <div 
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-100"
              onClick={() => setSelectedPost(featuredPost)}
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute top-4 left-4 bg-emerald-600 text-white">
                    Featured
                  </Badge>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <span className="text-emerald-600 font-medium">{featuredPost.category}</span>
                    <span>•</span>
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-emerald-600 font-medium group-hover:gap-3 transition-all">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.filter(p => p !== featuredPost || activeCategory !== 'All' || searchQuery).map((post, index) => (
            <div
              key={post.id}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-100 flex flex-col"
              onClick={() => setSelectedPost(post)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                    {post.category}
                  </Badge>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <div className="flex gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
    </section>
  );
}
