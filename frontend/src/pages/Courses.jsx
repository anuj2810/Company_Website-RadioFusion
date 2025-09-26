import { useState } from "react";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
import ImageUpload from "../components/ImageUpload";
import OptimizedImage from "../components/OptimizedImage";

// WebP optimized image paths
const banner = "/assets/course/banner.png";
const empoweringFuture = "/assets/course/empower.png";
const notify = "/assets/course/notify.png";

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
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Banner with Image Upload Support */}
      <section className="relative min-h-screen py-24 overflow-hidden">
        {/* Hero Background Image Container */}
        <div className="absolute inset-0">
          <ImageUpload
            currentImage={coursesHeroImage}
            onImageChange={handleCoursesHeroImageChange}
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
            <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent-400/10 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl"></div>
          </div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
          
          {/* Learning Icons Pattern */}
          <div className="absolute top-16 left-1/3 opacity-10 z-10">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="absolute bottom-16 right-1/3 opacity-10 z-10">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>

      </section>

      {/* Intro Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Text Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
                Empowering Future Talent
              </h2>
              <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
                We are designing hands-on training and internship programs to prepare the next generation of professionals in telecom, automation, and IT. Our programs will focus on real-world projects, mentorship, and practical learning.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-neutral-700 font-medium">Real-world project experience</span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-neutral-700 font-medium">Industry-level mentorship</span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-neutral-700 font-medium">Career-focused skill development</span>
                </div>
              </div>
            </div>

            {/* Right Side - Learning Illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/5 to-secondary/10 rounded-2xl p-12 shadow-lg border border-primary/10">
                <div className="flex justify-center mb-8">
                  <ImageUpload
                    currentImage={empoweringFutureImage}
                    onImageChange={handleEmpoweringFutureImageChange}
                    className="w-48 h-48 rounded-full"
                    containerClassName="w-48 h-48"
                    fallbackGradient="from-primary to-secondary"
                    shape="circle"
                    aspectRatio="aspect-square"
                    showUploadButton={false}
                    overlayContent={
                      <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Courses Preview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">Our Upcoming Programs</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Comprehensive training programs designed to bridge the gap between academic learning and industry requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Telecom Training Card */}
            <div className="relative bg-neutral-50 rounded-2xl shadow-lg p-8 opacity-75 hover:opacity-90 transition-all duration-300 border border-neutral-200 hover:border-primary/20">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  Coming Soon
                </span>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Telecom Training</h3>
              <p className="text-neutral-600 leading-relaxed">
                In-depth learning of telecom solutions and network optimization with hands-on experience.
              </p>
            </div>

            {/* Automation with Python Card */}
            <div className="relative bg-neutral-50 rounded-2xl shadow-lg p-8 opacity-75 hover:opacity-90 transition-all duration-300 border border-neutral-200 hover:border-secondary/20">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary/10 text-secondary">
                  Coming Soon
                </span>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Automation with Python</h3>
              <p className="text-neutral-600 leading-relaxed">
                Practical automation projects with Python & tools for modern workflow optimization.
              </p>
            </div>

            {/* IT & Software Skills Card */}
            <div className="relative bg-neutral-50 rounded-2xl shadow-lg p-8 opacity-75 hover:opacity-90 transition-all duration-300 border border-neutral-200 hover:border-accent/20">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent">
                  Coming Soon
                </span>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">IT & Software Skills</h3>
              <p className="text-neutral-600 leading-relaxed">
                Hands-on IT and software skills for real-world applications and career advancement.
              </p>
            </div>

            {/* Internship Opportunities Card */}
            <div className="relative bg-neutral-50 rounded-2xl shadow-lg p-8 opacity-75 hover:opacity-90 transition-all duration-300 border border-neutral-200 hover:border-primary/20">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  Coming Soon
                </span>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Internship Opportunities</h3>
              <p className="text-neutral-600 leading-relaxed">
                Live projects and mentorship for career growth with industry professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notify Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-primary/5 to-secondary/10 rounded-3xl p-12 shadow-xl border border-primary/10">
            <div className="mb-8">
              <ImageUpload
                currentImage={notifyImage}
                onImageChange={handleNotifyImageChange}
                className="w-20 h-20 rounded-full mx-auto mb-6"
                containerClassName="w-20 h-20 mx-auto"
                fallbackGradient="from-primary to-secondary"
                shape="circle"
                aspectRatio="aspect-square"
                showUploadButton={false}
              />
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">Be the First to Know</h2>
              <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                Our programs are launching soon. Stay updated and be among the first to join when we open enrollment.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-grey rounded-lg font-semibold text-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </>
                ) : (
                  <>
                    Get Notified
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>

              {/* Status Messages */}
              {status === "success" && (
                <div className="mt-4 p-4 bg-secondary/10 border border-secondary/20 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-secondary">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Thank you! We'll notify you when courses are available.</span>
                  </div>
                </div>
              )}
              
              {status === "error" && (
                <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-accent">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="font-medium">Something went wrong. Please try again.</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-primary-300 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-secondary-300 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-accent-300 rounded-full animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Work Together, Grow Together
          </h2>
          <p className="text-xl md:text-2xl text-primary-100 mb-12 leading-relaxed max-w-3xl mx-auto">
            We're building courses that transform learning into real opportunities. Stay tuned for an educational experience that bridges theory with practice.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center px-12 py-5 bg-gradient-to-r from-accent to-primary text-white rounded-lg font-bold text-lg hover:from-accent/90 hover:to-primary/90 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
