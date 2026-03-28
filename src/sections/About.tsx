import { useEffect, useRef, useState } from 'react';
import { Database, BarChart3, Brain, LineChart } from 'lucide-react';

const stats = [
  { label: 'Years Experience', value: 2 },
  { label: 'Datasets Analyzed', value: 10 },
  { label: 'Insights Delivered', value: 10 },
  { label: 'Business Impact', value: 10 },
];

const services = [
  {
    icon: Database,
    title: 'Data Engineering',
    description: 'Building robust data pipelines and cleaning complex datasets to ensure high-quality, analysis-ready data.',
  },
  {
    icon: BarChart3,
    title: 'Data Visualization',
    description: 'Creating compelling dashboards and reports that transform raw numbers into actionable insights.',
  },
  {
    icon: Brain,
    title: 'Predictive Analytics',
    description: 'Leveraging statistical models and machine learning to forecast trends and drive strategic decisions.',
  },
  {
    icon: LineChart,
    title: 'Business Intelligence',
    description: 'Translating complex data into clear business recommendations that optimize performance and growth.',
  },
];

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(target * easeOut));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function About() {
  return (
    <section id="about" className="py-24 px-4 relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-emerald-400 text-sm font-medium uppercase tracking-wider">About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
            Turning data into{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">actionable insights</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm a data analyst passionate about uncovering patterns, optimizing processes, 
            and driving data-informed decisions that create real business value.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-emerald-500/30 transition-colors"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                <AnimatedCounter target={stat.value} />
                {stat.label === 'Business Impact' ? 'M+' : '+'}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-600/20 to-cyan-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-emerald-600/10 via-cyan-600/5 to-transparent border border-emerald-500/20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">My Analytical Journey</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                With over 5 years of experience in data analytics, I've helped organizations 
                across finance, healthcare, and e-commerce sectors unlock the power of their data.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                My expertise spans SQL, Python, R, Tableau, and Power BI. I specialize in 
                transforming messy, complex datasets into clear narratives that drive strategic 
                decision-making and measurable business outcomes.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not querying databases, you'll find me exploring new visualization 
                techniques, contributing to data science communities, or mentoring aspiring 
                analysts in the field.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-emerald-600 to-cyan-600 p-1">
                <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">98%</div>
                    <div className="text-muted-foreground">Accuracy Rate</div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-600/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-cyan-600/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
