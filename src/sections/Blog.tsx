import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, ArrowRight, Search, ArrowLeft } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Predicting Customer Churn: A Machine Learning Approach',
    excerpt: 'How I built a Random Forest classifier to identify at-risk customers with 89% accuracy, saving the company $500K in retention costs.',
    content: `
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

## Business Impact

- Reduced churn by 12% in Q2
- Saved $500K in retention costs
- Improved customer satisfaction scores
    `,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    category: 'Machine Learning',
    tags: ['Python', 'scikit-learn', 'Pandas', 'Classification'],
    author: 'Audrey Murigi',
    date: 'Mar 15, 2024',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 2,
    title: 'SQL Window Functions Every Data Analyst Should Know',
    excerpt: 'Master these 5 window functions to level up your data analysis game: ROW_NUMBER(), RANK(), LAG(), LEAD(), and running totals.',
    content: `
## Why Window Functions?

Window functions are game-changers for complex analytics. Unlike aggregate functions, they don't collapse rows.

## ROW_NUMBER()

Assigns a unique sequential integer to rows within a partition.

## RANK() vs DENSE_RANK()

Handle ties differently - know when to use each.

## LAG() and LEAD()

Access previous and next row values without self-joins.

## Running Totals

Cumulative sums for trend analysis.
    `,
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop',
    category: 'SQL',
    tags: ['SQL', 'PostgreSQL', 'Data Engineering'],
    author: 'Audrey Murigi',
    date: 'Mar 8, 2024',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: 3,
    title: 'Building Executive Dashboards That Actually Get Used',
    excerpt: 'Lessons learned from redesigning our C-suite analytics dashboard. Spoiler: less is more, and context is everything.',
    content: `
## The Problem

Our executives weren't using the dashboards we built. Here's what I learned.

## Lesson 1: Start with Decisions

Don't show data, show decisions that need to be made.

## Lesson 2: Less is More

Three metrics that drive action beat twenty metrics that confuse.

## Lesson 3: Context is Everything

A number without comparison is meaningless. Always show:
- Previous period
- Target/goal
- Industry benchmark
    `,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    category: 'Visualization',
    tags: ['Tableau', 'Power BI', 'Data Storytelling'],
    author: 'Audrey Murigi',
    date: 'Feb 28, 2024',
    readTime: '5 min read',
    featured: false,
  },
  {
    id: 4,
    title: 'A/B Testing Mistakes That Are Costing You Money',
    excerpt: 'Common statistical errors in experimentation and how to avoid them. Includes a Python calculator for sample size and power analysis.',
    content: `
## Stopping Too Early

Peeking at results invalidates your p-values. Use proper sequential testing.

## Ignoring Segmentation

Overall lift might hide negative effects in key segments.

## Wrong Success Metric

Optimizing for clicks might hurt revenue. Choose north star metrics carefully.

## Sample Size Calculation

Always calculate required sample size before launching.
    `,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    category: 'Statistics',
    tags: ['Python', 'Statistics', 'A/B Testing', 'SciPy'],
    author: 'Audrey Murigi',
    date: 'Feb 15, 2024',
    readTime: '10 min read',
    featured: false,
  },
  {
    id: 5,
    title: 'From Excel to Python: A Migration Guide',
    excerpt: 'How I transitioned our finance team from Excel workflows to reproducible Python scripts. Templates and code examples included.',
    content: `
## The Breaking Point

1 million rows. That's when Excel breaks and you need real tools.

## Phase 1: Python + Pandas

Read Excel files, manipulate with Pandas, export back to Excel.

## Phase 2: Automation

Schedule scripts with cron/Windows Task Scheduler.

## Phase 3: Full Pipeline

Direct database connections, automated reporting, no Excel needed.
    `,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
    category: 'Tutorial',
    tags: ['Python', 'Pandas', 'Excel', 'Automation'],
    author: 'Audrey Murigi',
    date: 'Feb 1, 2024',
    readTime: '12 min read',
    featured: false,
  },
  {
    id: 6,
    title: 'Real-Time Analytics with BigQuery and Looker',
    excerpt: 'Architecting a streaming data pipeline for real-time business metrics. Latency under 30 seconds, cost under $200/month.',
    content: `
## Architecture Overview

Pub/Sub → Dataflow → BigQuery → Looker

## Streaming vs Batch

When you need real-time vs when hourly is enough.

## Cost Optimization

Partitioning and clustering saved us 70% on query costs.

## Latency Breakdown

- Ingestion: 5 seconds
- Processing: 10 seconds
- Visualization: 5 seconds
- Total: Under 30 seconds
    `,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    category: 'Data Engineering',
    tags: ['BigQuery', 'Looker', 'GCP', 'Streaming'],
    author: 'Audrey Murigi',
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

  // Handle URL hash changes and initial load
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/#blog\/(\d+)/);
      if (match) {
        const postId = parseInt(match[1]);
        const post = blogPosts.find(p => p.id === postId);
        if (post) {
          setSelectedPost(post);
        }
      } else if (hash === '#blog') {
        setSelectedPost(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update URL when post changes
  useEffect(() => {
    if (selectedPost) {
      window.location.hash = `#blog/${selectedPost.id}`;
    } else if (window.location.hash.includes('/')) {
      window.location.hash = '#blog';
    }
  }, [selectedPost]);

  // Lock body scroll when post is open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPost]);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(p => p.featured);

  return (
    <>
      {/* FULL PAGE VIEW */}
      {selectedPost && (
        <div className="fixed inset-0 z-[9999] bg-background overflow-y-auto">
          {/* Back Button */}
          <div className="fixed top-4 left-4 z-50">
            <Button 
              variant="outline"
              size="lg"
              onClick={() => setSelectedPost(null)}
              className="bg-background/95 backdrop-blur border-border hover:bg-emerald-500/10 hover:border-emerald-500/30"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Blog
            </Button>
          </div>

          <article className="min-h-screen">
            {/* Hero Image - NO FADE, clean edges */}
            <div className="relative h-[50vh] w-full overflow-hidden">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              {/* NO gradient overlay - image is clean */}
            </div>

            {/* Title Section - Below image, not overlaid */}
            <div className="bg-background border-b border-border">
              <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 md:py-12">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className="bg-emerald-600 text-white text-sm px-3 py-1">
                    {selectedPost.category}
                  </Badge>
                  <span className="text-muted-foreground text-sm flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedPost.date}
                  </span>
                  <span className="text-muted-foreground text-sm flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedPost.readTime}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
                  {selectedPost.title}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  {selectedPost.excerpt}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="bg-background">
              <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
                {/* Author */}
                <div className="flex items-center gap-4 mb-12 pb-12 border-b border-border">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-white font-bold text-xl">
                    {selectedPost.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-lg">{selectedPost.author}</p>
                    <p className="text-muted-foreground">Data Analyst</p>
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-xl dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line mb-16">
                  {selectedPost.content}
                </div>

                {/* Tags */}
                <div className="pt-8 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 text-sm rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      )}

      {/* GRID VIEW */}
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
                  
                  {/* Hover "Read Article" */}
                  <div className="absolute inset-0 bg-emerald-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-medium flex items-center gap-2 text-lg">
                      Read Article <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
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
    </>
  );
}
