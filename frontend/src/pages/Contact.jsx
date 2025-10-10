import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import usePageTitle from "../hooks/usePageTitle";
import ImageUpload from "../components/ImageUpload";
import banner from "../assets/images/contact/banner.webp";
// Mobile-friendly alternate for small screens
const contactMobile = "/assets/images/contact/banner1.webp";

export default function Contact() {
  usePageTitle("Contact Us");
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://mycompany.com';
  
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    subject: "", 
    message: "" 
  });
  const [status, setStatus] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [contactHeroImage, setContactHeroImage] = useState(banner);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleContactHeroImageChange = (imageUrl, file) => {
    setContactHeroImage(imageUrl);
  };

  // Using native form submission so Netlify reCAPTCHA can validate

  return (
    <>
      <Helmet>
        <title>Contact Us - RadioFusion Global</title>
        <meta name="description" content="Get in touch with RadioFusion Global for inquiries about our technology solutions, training programs, and services. Contact us today!" />
        <meta name="keywords" content="contact RadioFusion Global, get in touch, inquiries, technology solutions, training programs" />
        <link rel="canonical" href={`${siteUrl}/contact`} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Contact Us - RadioFusion Global" />
        <meta property="og:description" content="Get in touch with RadioFusion Global for inquiries about our technology solutions, training programs, and services. Contact us today!" />
        <meta property="og:image" content={`${siteUrl}/assets/images/contact/banner.webp`} />
        <meta property="og:url" content={`${siteUrl}/contact`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="RadioFusion Global" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - RadioFusion Global" />
        <meta name="twitter:description" content="Get in touch with RadioFusion Global for inquiries about our technology solutions, training programs, and services. Contact us today!" />
        <meta name="twitter:image" content={`${siteUrl}/assets/images/contact/banner.webp`} />
        <meta name="twitter:site" content="@RadioFusionGlobal" />

        {/* JSON-LD: Breadcrumbs for Contact */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteUrl}/contact` }
            ]
          })}
        </script>

        {/* JSON-LD: ContactPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact RadioFusion Global',
            url: `${siteUrl}/contact`,
          })}
        </script>
      </Helmet>
      <main className="min-h-screen bg-background">
      {/* Hero Banner with Image Upload Support */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background Image Container */}
        <div className="absolute inset-0">
          <ImageUpload
            currentImage={contactHeroImage}
            onImageChange={handleContactHeroImageChange}
            mobileImage={contactMobile}
            className="w-full h-full"
            containerClassName="w-full h-full"
            fallbackGradient="from-primary-600/90 via-primary-500/85 to-primary-700/90"
            shape="rectangle"
            aspectRatio="h-full"
            showUploadButton={false}
            overlayContent={
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40"></div>
            }
            alt="Contact us hero background image"
          />
        </div>

        {/* Soft Tech Background */}
        <div className="absolute inset-0 opacity-10 z-10">
          <div className="absolute top-20 left-20 w-48 h-48 border border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-32 h-32 border border-white/15 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-24 h-24 border border-white/20 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-20 w-36 h-36 border border-white/15 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full"></div>
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Contact Details */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Contact Information</h2>
              
              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-4 p-6 bg-background rounded-2xl shadow-soft hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Address</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      KH No 356, Shiv Nagar Calony,<br />
                      Indira Nagar, Lucknow, Uttar Pradesh, India – 226028
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-6 bg-background rounded-2xl shadow-soft hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Email</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:info@radiofusionglobal.com" className="hover:text-primary-600 transition-colors">
                        info@radiofusionglobal.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-6 bg-background rounded-2xl shadow-soft hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Phone</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+91XXXXXXXXX" className="hover:text-primary-600 transition-colors">
                        +91 9258090909
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Professional Illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-12 shadow-soft">
                <div className="flex justify-center">
                  <svg className="w-64 h-64 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="absolute top-8 left-8 w-16 h-16 border-2 border-primary-200 rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 right-8 w-12 h-12 border-2 border-primary-300 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-8 w-8 h-8 border-2 border-primary-200 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Send Us a Message</h2>
            <p className="text-xl text-muted-foreground">
              Ready to start a conversation? Fill out the form below and we'll get back to you soon.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100">
            <form 
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              data-netlify-recaptcha="true"
              action="/contact?status=success"
              className="space-y-6"
            >
              {/* Netlify hidden fields */}
              <input type="hidden" name="form-name" value="contact" />
              <input type="text" name="bot-field" className="hidden" aria-hidden="true" />
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                    Full Name *
                  </label>
                  <input 
                    id="name"
                    name="name" 
                    type="text"
                    required 
                    value={form.name} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-background"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                    Email Address *
                  </label>
                  <input 
                    id="email"
                    name="email" 
                    type="email" 
                    required 
                    value={form.email} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-background"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                  Phone Number
                </label>
                <input 
                  id="phone"
                  name="phone" 
                  type="tel"
                  value={form.phone} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-background"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                  Subject *
                </label>
                <input 
                  id="subject"
                  name="subject" 
                  type="text"
                  required 
                  value={form.subject} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-background"
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  Message *
                </label>
                <textarea 
                  id="message"
                  name="message" 
                  required 
                  value={form.message} 
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none bg-background"
                  placeholder="Tell us more about your project, questions, or how we can help..."
                ></textarea>
              </div>

              {/* Netlify reCAPTCHA placeholder */}
              <div data-netlify-recaptcha="true"></div>

              <div className="text-center">
                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold px-8 py-4 rounded-xl shadow-soft hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center text-lg"
                >
                  {status === "loading" ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <div className="text-center p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center justify-center gap-2 text-green-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-semibold">{successMessage || "Thank you! We'll get back to you soon."}</span>
                  </div>
                </div>
              )}
              
              {status === "error" && (
                <div className="text-center p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center justify-center gap-2 text-red-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="font-semibold">{errorMessage || "Error sending message. Please try again."}</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Find Us</h2>
            <p className="text-xl text-muted-foreground">
              Visit our office in Lucknow, Uttar Pradesh
            </p>
          </div>
          
          <div className="bg-background rounded-3xl overflow-hidden shadow-soft border border-border">
            <div className="aspect-w-16 aspect-h-9 h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.7234567890123!2d80.9462!3d26.8467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUwJzQ4LjEiTiA4MMKwNTYnNDYuMyJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="RadioFusion Global India Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600/90 via-primary-500/85 to-primary-700/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/15 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Let's Work Together
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            Looking for telecom solutions, automation, or internship opportunities? Contact us today and let's make growth possible.
          </p>
          <button 
            onClick={() => document.getElementById('message').scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-primary-700 font-semibold px-12 py-5 rounded-xl shadow-soft hover:shadow-md transition-all duration-300 hover:bg-gray-50 inline-flex items-center text-lg"
          >
            Start Conversation →
          </button>
        </div>
      </section>

      {/* Social Media Links */}
      <section className="py-12 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-6">Connect With Us</h3>
            <div className="flex justify-center space-x-6">
              {/* LinkedIn */}
              <a 
                href="#" 
                className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-soft"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* Twitter */}
              <a 
                href="#" 
                className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-soft"
                aria-label="Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
</svg>
              </a>

              {/* Facebook */}
              <a 
                href="#" 
                className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-soft"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="#" 
                className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-soft"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
