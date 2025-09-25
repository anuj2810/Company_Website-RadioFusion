import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import usePageTitle from "../hooks/usePageTitle";

// Service data configuration
const serviceData = {
  telecom: {
    name: "Telecom Communication Solutions",
    tagline: "Redefining Connectivity with Advanced Telecom Solutions",
    description: "We provide end-to-end telecom communication solutions including network design, optimization, and deployment for enterprises and operators. Our expertise spans from traditional telecom infrastructure to cutting-edge 5G networks, ensuring seamless connectivity and optimal performance.",
    features: [
      {
        title: "Reliable & Scalable Networks",
        description: "Build robust telecom infrastructure that grows with your business needs",
        icon: "network"
      },
      {
        title: "Cutting-edge Technology",
        description: "Leverage the latest in 5G, IoT, and network optimization technologies",
        icon: "technology"
      },
      {
        title: "Cost-Effective Solutions",
        description: "Maximize ROI with efficient network designs and optimized operations",
        icon: "cost"
      },
      {
        title: "24/7 Expert Support",
        description: "Round-the-clock technical support and network monitoring services",
        icon: "support"
      }
    ],
    caseStudy: {
      title: "Enterprise Network Transformation",
      description: "Successfully deployed a comprehensive telecom solution for a multinational corporation, improving network efficiency by 40% and reducing operational costs by 25%."
    },
    heroBackground: "from-primary-900 via-primary-800 to-secondary-900"
  },
  automation: {
    name: "Automation Solutions",
    tagline: "Streamline Operations with Intelligent Automation",
    description: "Transform your business processes with our comprehensive automation solutions. We specialize in Python-based automation, AI-driven workflows, and custom software development that eliminates manual tasks and boosts productivity across your organization.",
    features: [
      {
        title: "Tailored Workflow Automation",
        description: "Custom automation solutions designed specifically for your business processes",
        icon: "workflow"
      },
      {
        title: "Python/AI-based Solutions",
        description: "Leverage advanced Python programming and AI technologies for smart automation",
        icon: "ai"
      },
      {
        title: "Boost Productivity",
        description: "Increase operational efficiency and free up valuable human resources",
        icon: "productivity"
      },
      {
        title: "Reduce Human Errors",
        description: "Minimize mistakes and ensure consistent, reliable process execution",
        icon: "accuracy"
      }
    ],
    caseStudy: {
      title: "Manufacturing Process Automation",
      description: "Implemented comprehensive automation system for a manufacturing client, reducing processing time by 60% and eliminating 95% of manual data entry errors."
    },
    heroBackground: "from-secondary-900 via-accent-800 to-primary-900"
  },
  education: {
    name: "Education & Internship Programs",
    tagline: "Empowering Future Talent Through Practical Learning",
    description: "Bridge the gap between academic learning and industry requirements with our comprehensive education and internship programs. We offer hands-on training in telecom, automation, and IT, preparing students for successful careers in technology.",
    features: [
      {
        title: "Hands-on Learning",
        description: "Practical training with real-world projects and industry-standard tools",
        icon: "learning"
      },
      {
        title: "Real-World Projects",
        description: "Work on actual industry projects to gain valuable experience",
        icon: "projects"
      },
      {
        title: "Expert Mentorship",
        description: "Learn from experienced professionals with deep industry knowledge",
        icon: "mentorship"
      },
      {
        title: "Career Opportunities",
        description: "Direct pathways to employment and professional growth",
        icon: "career"
      }
    ],
    caseStudy: {
      title: "Student Success Program",
      description: "Our internship program has successfully placed 85% of participants in full-time positions within 6 months of completion, with an average salary increase of 45%."
    },
    heroBackground: "from-accent-900 via-secondary-800 to-primary-900"
  }
};

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    const serviceInfo = serviceData[serviceId];
    if (serviceInfo) {
      setService(serviceInfo);
    }
  }, [serviceId]);

  // Set page title dynamically based on service name
  usePageTitle(service ? service.name : "Service Details");

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link to="/services" className="text-blue-600 hover:text-blue-800">
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const renderIcon = (iconType) => {
    const iconClasses = "w-8 h-8 text-white";
    
    switch (iconType) {
      case "network":
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        );
      case "technology":
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case "cost":
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        );
      case "support":
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
          </svg>
        );
      case "workflow":
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        );
      case "ai":
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case "productivity":
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case "accuracy":
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "learning":
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case "projects":
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case "mentorship":
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case "career":
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
          </svg>
        );
      default:
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className={`relative py-24 bg-gradient-to-br ${service.heroBackground} overflow-hidden`}>
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent-400/10 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl"></div>
          </div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {service.name}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            {service.tagline}
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
          >
            Get Started Today
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-primary-900 mb-6">
                Service Overview
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-accent-50 text-accent-700 px-6 py-3 rounded-2xl font-medium">
                  Professional
                </div>
                <div className="bg-primary-50 text-primary-700 px-6 py-3 rounded-2xl font-medium">
                  Reliable
                </div>
                <div className="bg-secondary-50 text-secondary-700 px-6 py-3 rounded-2xl font-medium">
                  Innovative
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8 shadow-xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-900 mb-2">99%</div>
                    <div className="text-neutral-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-600 mb-2">24/7</div>
                    <div className="text-neutral-600">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary-600 mb-2">50+</div>
                    <div className="text-neutral-600">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-700 mb-2">5★</div>
                    <div className="text-neutral-600">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Key Features
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Discover the powerful features that make our {service.name.toLowerCase()} stand out from the competition.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-neutral-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6">
                  {renderIcon(feature.icon)}
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Our Process
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              We follow a proven methodology to ensure successful project delivery and client satisfaction.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", description: "Understanding your requirements and objectives" },
              { step: "02", title: "Planning", description: "Creating detailed project roadmap and timeline" },
              { step: "03", title: "Implementation", description: "Executing the solution with precision and care" },
              { step: "04", title: "Support", description: "Ongoing maintenance and optimization services" }
            ].map((process, index) => (
              <div key={index} className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-white">{process.step}</span>
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-4">
                  {process.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {process.description}
                </p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-accent-300 to-primary-300 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="bg-gradient-to-br from-primary-600 to-accent-600 p-12 text-white">
                <h2 className="text-3xl font-bold mb-6">
                  Success Story
                </h2>
                <h3 className="text-2xl font-semibold mb-4">
                  {service.caseStudy.title}
                </h3>
                <p className="text-lg leading-relaxed text-primary-100">
                  {service.caseStudy.description}
                </p>
                <div className="mt-8 flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">40%</div>
                    <div className="text-sm text-primary-200">Efficiency Gain</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">95%</div>
                    <div className="text-sm text-primary-200">Error Reduction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">60%</div>
                    <div className="text-sm text-primary-200">Time Saved</div>
                  </div>
                </div>
              </div>
              <div className="p-12 bg-neutral-50">
                <div className="h-full flex flex-col justify-center">
                  <div className="mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-primary-900 mb-4">
                      Proven Results
                    </h4>
                    <p className="text-neutral-600 leading-relaxed">
                      Our solutions deliver measurable results that drive business growth and operational excellence.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-accent-500 rounded-full mr-3"></div>
                      <span className="text-neutral-700">Increased operational efficiency</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                      <span className="text-neutral-700">Reduced operational costs</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
                      <span className="text-neutral-700">Enhanced customer satisfaction</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent-400/10 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl"></div>
          </div>
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-neutral-200 mb-8 max-w-2xl mx-auto">
            Transform your business with our {service.name.toLowerCase()}. Contact us today for a free consultation and discover how we can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="inline-flex items-center px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
            >
              Start Your Project
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              to="/services" 
              className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}