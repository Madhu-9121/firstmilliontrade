import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const categories = ['All', 'Market Analysis', 'Trading Tips', 'Investment', 'News', 'Education'];

const blogPosts = [
  {
    id: 1,
    title: '5 Key Technical Indicators Every Trader Should Know',
    excerpt: 'Master these essential technical indicators to make informed trading decisions. From RSI to MACD, learn how to read the markets like a pro.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
    category: 'Trading Tips',
    date: 'Jan 28, 2026',
    readTime: '5 min read',
    slug: 'technical-indicators-guide',
  },
  {
    id: 2,
    title: 'Understanding Market Cycles: A Complete Guide',
    excerpt: 'Learn to identify different market phases and adjust your strategy accordingly. Maximize gains in bull markets and protect capital in bear markets.',
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=400&fit=crop',
    category: 'Market Analysis',
    date: 'Jan 25, 2026',
    readTime: '8 min read',
    slug: 'market-cycles-guide',
  },
  {
    id: 3,
    title: 'How to Build a Diversified Portfolio for Long-term Wealth',
    excerpt: 'Portfolio diversification is the key to managing risk. Learn how to allocate assets across different sectors and asset classes.',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=400&fit=crop',
    category: 'Investment',
    date: 'Jan 22, 2026',
    readTime: '6 min read',
    slug: 'portfolio-diversification',
  },
  {
    id: 4,
    title: 'Budget 2026: What It Means for Stock Market Investors',
    excerpt: 'Breaking down the key announcements from Union Budget 2026 and their potential impact on different sectors and your portfolio.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    category: 'News',
    date: 'Jan 20, 2026',
    readTime: '7 min read',
    slug: 'budget-2026-analysis',
  },
  {
    id: 5,
    title: 'Trading Psychology: Mastering Your Emotions',
    excerpt: 'Fear and greed are a trader\'s worst enemies. Learn techniques to control emotions and make rational trading decisions.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    category: 'Education',
    date: 'Jan 18, 2026',
    readTime: '9 min read',
    slug: 'trading-psychology',
  },
  {
    id: 6,
    title: 'Introduction to Options Trading for Beginners',
    excerpt: 'Options can be powerful tools for hedging and generating income. This beginner\'s guide covers the basics of calls, puts, and strategies.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    category: 'Education',
    date: 'Jan 15, 2026',
    readTime: '10 min read',
    slug: 'options-trading-basics',
  },
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Blog & Insights
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Market Insights &{' '}
              <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
                Trading Knowledge
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Stay updated with market analysis, trading tips, and educational content from our expert team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted hover:bg-muted/80 text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link to={`/blog/${post.slug}`}>
                    <div className="h-full glass-card rounded-2xl overflow-hidden">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Meta */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                        </div>

                        <h2 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>

                        {/* Read more */}
                        <div className="flex items-center gap-2 text-accent font-medium text-sm">
                          Read more
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          )}

          {/* Load More */}
          {filteredPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Stay Updated with Market Insights
            </h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for weekly market analysis and trading tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button variant="hero">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
