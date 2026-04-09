import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, FileText, ArrowRight, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Sales Performance Dashboard',
    description: 'Interactive Power BI dashboard analyzing $10M+ in sales data, identifying key trends, seasonal patterns, and regional performance metrics.',
    // Add full content for detail view
    content: `
## Project Overview

Built a comprehensive sales analytics solution that transformed how executives understand business performance.

## Key Features
- Real-time data refresh from SQL Server
- Drill-through capabilities from summary to transaction level
- Custom DAX measures for YoY and MoM comparisons
- Role-based security for regional access

## Business Impact
- Reduced reporting time from 3 days to real-time
- Identified $2M in underperforming product lines
- Enabled data-driven decisions across 5 regional offices
    `,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['Power BI', 'SQL', 'DAX', 'Excel'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  // ... rest of your projects with added `content` field
  {
    id: 2,
    title: 'Customer Churn Prediction',
    description: 'Machine learning model using Python and scikit-learn to predict customer churn with 89% accuracy, reducing retention costs by 25%.',
    content: `
## The Challenge
Subscription-based SaaS losing 15% customers annually.

## Solution
Random Forest classifier with 89% precision and 85% recall.

## Tech Stack
- Python, Pandas, scikit-learn
- Feature engineering on 50K records
- Automated retraining pipeline
    `,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['Python', 'scikit-learn', 'Pandas', 'Matplotlib'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  // Add content to remaining projects...
  {
    id: 3,
    title: 'Market Segmentation Analysis',
    description: 'K-means clustering analysis on 50K+ customer records to identify distinct segments, enabling targeted marketing campaigns.',
    content: 'Detailed clustering methodology and marketing strategy recommendations...',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    tags: ['R', 'K-means', 'ggplot2', 'Statistics'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 4,
    title: 'Financial Forecasting Model',
    description: 'Time series analysis using ARIMA and Prophet to forecast quarterly revenue with 95% confidence intervals for budget planning.',
    content: 'Comprehensive forecasting methodology and budget planning integration...',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
    tags: ['Python', 'Prophet', 'ARIMA', 'Tableau'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 5,
    title: 'Supply Chain Optimization',
    description: 'SQL-based analysis of inventory data identifying bottlenecks, reducing stockouts by 30% and saving $500K annually.',
    content: 'SQL optimization strategies and inventory management improvements...',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
    tags: ['SQL', 'Python', 'Pandas', 'Looker'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 6,
    title: 'A/B Testing Framework',
    description: 'Statistical hypothesis testing framework for product experiments, analyzing conversion rates and user behavior at scale.',
    content: 'Statistical methodology and experimentation platform architecture...',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['Python', 'SciPy', 'Statsmodels', 'BigQuery'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
];

const categories = ['All', 'Visualization', 'Machine Learning', 'Statistical Analysis'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => {
        if (activeCategory === 'Visualization') return p.tags.some(t => ['Power BI', 'Tableau', 'Looker', 'Matplotlib', 'ggplot2'].includes(t));
        if (activeCategory === 'Machine Learning') return p.tags.some(t => ['scikit-learn', 'K-means', 'Prophet', 'ARIMA', 'SciPy'].includes(t));
        if (activeCategory === 'Statistical Analysis') return p.tags.some(t => ['Statistics', 'Statsmodels', 'A/B Testing'].includes(t));
        return true;
      });

  // DETAIL VIEW - shown when a project is selected
  if (selectedProject) {
    return (
      <section id="projects" className="py-24 px-4 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => setSelectedProject(null)}
            className="mb-6 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
          >
            ← Back to Projects
          </Button>

          {/* Project Detail Card */}
          <article className="bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-border overflow-hidden shadow-sm">
            <img 
              src={selectedProject.image} 
              alt={selectedProject.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            
            <div className="p-8 md:p-12">
              {/* Meta Info */}
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                  {selectedProject.featured ? 'Featured Project' : 'Project'}
                </Badge>
                <div className="flex gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-emerald-500/10 text-gray-600 dark:text-emerald-400 border border-gray-200 dark:border-emerald-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-foreground">
                {selectedProject.title}
              </h1>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-8 pb-8 border-b border-gray-100 dark:border-border">
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-medium hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live Demo
                </a>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-border text-gray-700 dark:text-foreground font-medium hover:bg-gray-50 dark:hover:bg-emerald-500/10 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  View Code
                </a>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-600 dark:text-muted-foreground mb-8 leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Full Content */}
              <div className="prose prose-lg max-w-none text-gray-700 dark:text-muted-foreground leading-relaxed whitespace-pre-line">
                {selectedProject.content}
              </div>
            </div>
          </article>
        </div>
      </section>
    );
  }

  // LIST VIEW - default view with grid
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-emerald-400 text-sm font-medium uppercase tracking-wider">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
            Featured{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of data-driven projects demonstrating expertise in analytics, 
            visualization, and statistical modeling.
          </p>
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
                  : 'border-emerald-500/30 hover:bg-emerald-500/10'
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
                
                {/* Featured Badge */}
                {project.featured && (
                  <Badge className="absolute top-4 left-4 bg-emerald-600/90 text-white">
                    Featured
                  </Badge>
                )}

                {/* Hover Overlay - Changed to "View Details" */}
                <div className="absolute inset-0 bg-emerald-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-white font-medium">
                    View Details <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-emerald-500/50 hover:bg-emerald-500/10"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
