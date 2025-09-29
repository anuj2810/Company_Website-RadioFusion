import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import usePageTitle from "../hooks/usePageTitle";
import ImageUpload from "../components/ImageUpload";
import OptimizedImage from "../components/OptimizedImage";

// WebP optimized image paths
const banner = "/assets/images/course/banner.webp";
const empoweringFuture = "/assets/images/course/banner1.webp";
const notify = "/assets/images/course/notify.webp";

export default function Courses() {
  usePageTitle("Courses");
  
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState(null);
  const [coursesHeroImage, setCoursesHeroImage] = useState(banner);
  const [empoweringFutureImage, setEmpoweringFutureImage] = useState(empoweringFuture);
  const [notifyImage, setNotifyImage] = useState(notify);

  const handleCoursesHeroImageChange = (imageUrl, file) => {
    setCoursesHeroImage(imageUrl);
  };

  const handleEmpoweringFutureImageChange = (imageUrl, file) => {
    setEmpoweringFutureImage(imageUrl);
  };

  const handleNotifyImageChange = (imageUrl, file) => {
    setNotifyImage(imageUrl);
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      // Simulate API call for email subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus("success");
      setForm({ name: "", email: "" });
    } catch (err) {
      console.error("Subscription error:", err);
      setStatus("error");
    }
  };

  return (
    <>
      <Helmet>
        <title>Courses - RadioFusion Global Training Programs</title>
        <meta name="description" content="Discover RadioFusion Global's comprehensive training courses and educational programs designed to enhance your skills in technology and automation." />
        <meta name="keywords" content="training courses, educational programs, technology training, automation courses, RadioFusion Global courses" />
        <link rel="canonical" href="https://mycompany.com/courses" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Courses - RadioFusion Global Training Programs" />
        <meta property="og:description" content="Discover RadioFusion Global's comprehensive training courses and educational programs designed to enhance your skills in technology and automation." />
        <meta property="og:image" content="https://mycompany.com/assets/images/course/banner.webp" />
        <meta property="og:url" content="https://mycompany.com/courses" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Courses - RadioFusion Global Training Programs" />
        <meta name="twitter:description" content="Discover RadioFusion Global's comprehensive training courses and educational programs designed to enhance your skills in technology and automation." />
        <meta name="twitter:image" content="https://mycompany.com/assets/images/course/banner.webp" />
      </Helmet>
      <main className="min-h-screen bg-neutral-50">
      {/* Hero Banner with Image Upload Support */}
      <section className="relative min-h-screen py-12 sm:py-16 md:py-24 overflow-hidden">
        {/* Hero Background Image Container */}
        <div className="absolute inset-0">
          <ImageUpload
            currentImage={coursesHeroImage}
            onImageChange={handleCoursesHeroImageChange}
            mobileImage={empoweringFuture}
            className="w-full h-full"
            containerClassName="w-full h-full"
            fallbackGradient="from-primary-900 via-primary-800 to-accent-900"
            shape="rectangle"
            aspectRatio="h-full"
            showUploadButton={false}
            overlayContent={
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/5 to-black/10"></div>
            }
            alt="Courses hero background image"
          />
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-8 left-8 sm:top-12 sm:left-12 md:top-20 md:left-20 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 md:bottom-20 md:right-20 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 bg-accent-400/10 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-primary-400/5 rounded-full blur-3xl"></div>
          </div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px] sm:bg-[size:40px_40px] md:bg-[size:50px_50px]"></div>
          
          {/* Learning Icons Pattern */}
          <div className="absolute top-8 left-1/3 sm:top-12 sm:left-1/3 md:top-16 md:left-1/3 opacity-10 z-10">
            <svg className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="absolute bottom-8 right-1/3 sm:bottom-12 sm:right-1/3 md:bottom-16 md:right-1/3 opacity-10 z-10">
            <svg className="w-6 h-6 sm:w-9 sm:h-9 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            {/* Left Side - Text Content */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6 md:mb-8 leading-tight">
                Empowering Future Talent
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-neutral-700 mb-6 sm:mb-8 leading-relaxed">
                We are designing hands-on training and internship programs to prepare the next generation of professionals in telecom, automation, and IT. Our programs will focus on real-world projects, mentorship, and practical learning.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-neutral-700 font-medium">Real-world project experience</span>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-neutral-700 font-medium">Industry-level mentorship</span>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-neutral-700 font-medium">Career-focused skill development</span>
                </div>
              </div>
            </div>

            {/* Right Side - Learning Illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/5 to-secondary/10 rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg border border-primary/10">
                <div className="flex justify-center mb-6 sm:mb-8">
                  <ImageUpload
                    currentImage={empoweringFutureImage}
                    onImageChange={handleEmpoweringFutureImageChange}
                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full"
                    containerClassName="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
                    fallbackGradient="from-primary to-secondary"
                    shape="circle"
                    aspectRatio="aspect-square"
                    showUploadButton={false}
                    overlayContent={
                      <svg className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                    }
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm text-neutral-600 font-medium">Tech Skills</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span className="text-sm text-neutral-600 font-medium">Mentorship</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-sm text-neutral-600 font-medium">Innovation</span>
                  </div>
                </div>
                <div className="absolute top-8 left-8 w-16 h-16 border-2 border-primary/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 right-8 w-12 h-12 border-2 border-secondary/20 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-8 w-8 h-8 border-2 border-accent/20 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Cards Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6 leading-tight">
              Upcoming Training Programs
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
              We're developing comprehensive training programs to equip you with the skills needed for tomorrow's challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Telecom Training */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 sm:p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2 sm:mb-3 text-center">Telecom Training</h3>
              <p className="text-sm sm:text-base text-neutral-600 text-center mb-4 sm:mb-6">
                Comprehensive training in telecommunications technology and infrastructure.
              </p>
              <div className="text-center">
                <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-primary/20 text-primary text-xs sm:text-sm font-semibold rounded-full">
                  Coming Soon
                </span>
              </div>
            </div>

            {/* Automation with Python */}
            <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl p-6 sm:p-8 border border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2 sm:mb-3 text-center">Automation with Python</h3>
              <p className="text-sm sm:text-base text-neutral-600 text-center mb-4 sm:mb-6">
                Learn to automate processes and build efficient solutions using Python.
              </p>
              <div className="text-center">
                <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-secondary/20 text-secondary text-xs sm:text-sm font-semibold rounded-full">
                  Coming Soon
                </span>
              </div>
            </div>

            {/* IT & Software Skills */}
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl p-6 sm:p-8 border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2 sm:mb-3 text-center">IT & Software Skills</h3>
              <p className="text-sm sm:text-base text-neutral-600 text-center mb-4 sm:mb-6">
                Essential IT skills and software development fundamentals.
              </p>
              <div className="text-center">
                <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-accent/20 text-accent text-xs sm:text-sm font-semibold rounded-full">
                  Coming Soon
                </span>
              </div>
            </div>

            {/* Internship Opportunities */}
            <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl p-6 sm:p-8 border border-neutral-300 hover:border-neutral-400 transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2 sm:mb-3 text-center">Internship Opportunities</h3>
              <p className="text-sm sm:text-base text-neutral-600 text-center mb-4 sm:mb-6">
                Hands-on experience with real projects and industry mentorship.
              </p>
              <div className="text-center">
                <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-neutral-300 text-neutral-700 text-xs sm:text-sm font-semibold rounded-full">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notify Section */}
      <section id="notify" className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-primary/5 to-secondary/10 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-8 left-8 sm:top-12 sm:left-12 md:top-20 md:left-20 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 bg-primary/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 md:bottom-20 md:right-20 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            {/* Left Side - Content */}
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6 md:mb-8 leading-tight">
                Be the First to Know
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-neutral-700 mb-6 sm:mb-8 leading-relaxed">
                Get notified when our training programs launch. Join our community of future professionals and be part of the next generation of tech leaders.
              </p>
              
              <form className="space-y-4 sm:space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg border border-neutral-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg border border-neutral-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <select className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg border border-neutral-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-sm sm:text-base text-neutral-700">
                    <option value="">Select Program Interest</option>
                    <option value="telecom">Telecom Training</option>
                    <option value="automation">Automation with Python</option>
                    <option value="it-software">IT & Software Skills</option>
                    <option value="internship">Internship Opportunities</option>
                    <option value="all">All Programs</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 md:px-12 py-3 sm:py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-bold text-sm sm:text-base md:text-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Notify Me
                  <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 1 1 15 0v5z" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Right Side - Notification Icon */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <ImageUpload
                  currentImage={notifyImage}
                  onImageChange={handleNotifyImageChange}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                  containerClassName="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                  fallbackGradient="from-primary to-secondary"
                  shape="circle"
                  aspectRatio="square"
                  showUploadButton={false}
                  overlayContent={
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 1 1 15 0v5z" />
                    </svg>
                  }
                  alt="Notification bell icon"
                />
                {/* Decorative Elements */}
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-accent-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-3 h-3 sm:w-4 sm:h-4 bg-primary-400 rounded-full opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 left-8 sm:top-12 sm:left-12 md:top-20 md:left-20 w-24 h-24 sm:w-32 sm:h-32 border border-primary-300 rounded-full animate-pulse"></div>
          <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 md:bottom-20 md:right-20 w-16 h-16 sm:w-24 sm:h-24 border border-secondary-300 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 border border-accent-300 rounded-full animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 md:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight">
            Work Together, Grow Together
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-100 mb-6 sm:mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto">
            We're building courses that transform learning into real opportunities. Stay tuned for an educational experience that bridges theory with practice.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-accent to-primary text-white rounded-lg font-bold text-sm sm:text-base md:text-lg hover:from-accent/90 hover:to-primary/90 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
    </>
  );
}
