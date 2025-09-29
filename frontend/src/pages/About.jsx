import { Link } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import usePageTitle from "../hooks/usePageTitle";
import ImageUpload from "../components/ImageUpload";
import OptimizedImage from "../components/OptimizedImage";

// WebP optimized image paths
const about = "/assets/images/about/banner.webp";
const aboutMobile = "/assets/images/about/banner1.webp";

export default function About() {
    usePageTitle("About Us");
    
    const [aboutHeroImage, setAboutHeroImage] = useState(about);

    const handleAboutHeroImageChange = (imageUrl, file) => {
        setAboutHeroImage(imageUrl);
    };
    return (
        <>
            <Helmet>
                <title>About RadioFusion Global - Our Story & Mission</title>
                <meta name="description" content="Learn about RadioFusion Global's journey, mission, and commitment to delivering innovative technology solutions and comprehensive training programs." />
                <meta name="keywords" content="about RadioFusion Global, company story, mission, technology solutions, training programs, innovation" />
                <link rel="canonical" href="https://mycompany.com/about" />
                
                {/* Open Graph Tags */}
                <meta property="og:title" content="About RadioFusion Global - Our Story & Mission" />
                <meta property="og:description" content="Learn about RadioFusion Global's journey, mission, and commitment to delivering innovative technology solutions and comprehensive training programs." />
                <meta property="og:image" content="https://mycompany.com/assets/images/about/banner.webp" />
                <meta property="og:url" content="https://mycompany.com/about" />
                <meta property="og:type" content="website" />
                
                {/* Twitter Card Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About RadioFusion Global - Our Story & Mission" />
                <meta name="twitter:description" content="Learn about RadioFusion Global's journey, mission, and commitment to delivering innovative technology solutions and comprehensive training programs." />
                <meta name="twitter:image" content="https://mycompany.com/assets/images/about/banner.webp" />
            </Helmet>
            <main className="min-h-screen bg-background">
            {/* Hero Banner with Image Upload Support */}
            <section className="relative min-h-screen section-padding overflow-hidden rounded-hero">
                {/* Hero Background Image Container */}
                <div className="absolute inset-0">
                    <ImageUpload
                        currentImage={aboutHeroImage}
                        onImageChange={handleAboutHeroImageChange}
                        mobileImage={aboutMobile}
                        className="w-full h-full"
                        containerClassName="w-full h-full"
                        fallbackGradient="from-primary-950 via-primary-800 to-secondary-800"
                        shape="rectangle"
                        aspectRatio="h-full"
                        showUploadButton={false}
                        overlayContent={
                            <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-black/5 to-black/15"></div>
                        }
                        alt="About us hero background image"
                    />
                </div>

                {/* Subtle Tech Background */}
                <div className="absolute inset-0 opacity-10 z-10">
                    <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-32 h-32 sm:w-64 sm:h-64 border border-accent-300 rounded-full animate-pulse"></div>
                    <div className="absolute top-20 right-16 sm:top-40 sm:right-32 w-24 h-24 sm:w-48 sm:h-48 border border-accent-400 rounded-full animate-pulse delay-1000"></div>
                    <div className="absolute bottom-16 left-1/4 w-16 h-16 sm:w-32 sm:h-32 border border-accent-300 rounded-full animate-pulse delay-2000"></div>
                    <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-20 h-20 sm:w-40 sm:h-40 border border-accent-400 rounded-full animate-pulse delay-500"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 border border-neutral-400 rounded-full"></div>
                    
                    {/* Subtle Grid Pattern */}
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)`,
                        backgroundSize: '25px 25px'
                    }}></div>
                </div>
                
            </section>

            {/* Company Overview with Soft Styling */}
            <section className="section-padding bg-surface">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="heading-xl text-primary-950 mb-8 leading-tight">
                                Building Tomorrow's Solutions Today
                            </h2>
                            <div className="space-y-6 body-lg text-primary-700 leading-relaxed">
                                <p>
                                    Founded in 2025, <strong className="text-accent-600">RadioFusion Global India Pvt Ltd</strong> is a technology-driven company specializing in Telecom Communication Solutions, Custom Automation, and Education Programs.
                                </p>
                                <p>
                                    With the motto <em className="text-primary-600 font-semibold">"Work Together, Grow Together,"</em> we aim to bridge innovation with collaboration, delivering value to businesses, institutions, and individuals.
                                </p>
                                <p>
                                    Our journey has just begun, and we're committed to shaping the future of connectivity, automation, and learning through cutting-edge technology and strategic partnerships.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="card bg-gradient-to-br from-primary-600 to-accent-600 p-8 text-white">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold mb-2">2025</div>
                                        <div className="text-neutral-200">Founded</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold mb-2">3</div>
                                        <div className="text-neutral-200">Core Services</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold mb-2">∞</div>
                                        <div className="text-neutral-200">Possibilities</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold mb-2">1</div>
                                        <div className="text-neutral-200">Vision</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission, Vision, Motto with Soft Styling */}
            <section className="section-padding bg-background">
                <div className="container-custom">
                    <div className="text-center mb-20">
                        <h2 className="heading-xl text-primary-950 mb-6">Our Foundation</h2>
                        <p className="body-xl text-primary-600 max-w-3xl mx-auto">
                            The principles that guide our every decision and drive our commitment to excellence.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {/* Mission */}
                        <div className="card border-t-4 border-accent-500">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary-950 mb-3 sm:mb-4 text-center">Our Mission</h3>
                            <p className="text-sm sm:text-base text-primary-700 text-center leading-relaxed">
                                To deliver innovative telecom, automation, and education solutions that empower businesses and individuals to achieve growth through collaboration and technology.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="card border-t-4 border-primary-500">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary-950 mb-3 sm:mb-4 text-center">Our Vision</h3>
                            <p className="text-sm sm:text-base text-primary-700 text-center leading-relaxed">
                                To be recognized globally as a trusted technology partner for telecom solutions, automation innovation, and real-world learning opportunities.
                            </p>
                        </div>

                        {/* Motto */}
                        <div className="card border-t-4 border-secondary-500 sm:col-span-2 lg:col-span-1">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary-950 mb-3 sm:mb-4 text-center">Our Motto</h3>
                            <p className="text-lg sm:text-xl md:text-2xl text-primary-600 text-center leading-relaxed font-semibold">
                                "Work Together, Grow Together"
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values with Muted Colors */}
            <section className="section-padding bg-surface">
                <div className="container-custom">
                    <div className="text-center mb-20">
                        <h2 className="heading-xl text-primary-950 mb-6">Our Core Values</h2>
                        <p className="body-xl text-primary-600 max-w-3xl mx-auto">
                            The fundamental beliefs that shape our culture and drive our success.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                        {/* Innovation */}
                        <div className="text-center group">
                            <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6 mx-auto group-hover:scale-105 transition-transform duration-300 shadow-soft">
                                <svg className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-primary-950 mb-2 sm:mb-3">Innovation</h3>
                            <p className="text-xs sm:text-sm md:text-base text-primary-600">Fresh ideas for real challenges</p>
                        </div>

                        {/* Collaboration */}
                        <div className="text-center group">
                            <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6 mx-auto group-hover:scale-105 transition-transform duration-300 shadow-soft">
                                <svg className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-primary-950 mb-2 sm:mb-3">Collaboration</h3>
                            <p className="text-xs sm:text-sm md:text-base text-primary-600">Growth through teamwork</p>
                        </div>

                        {/* Integrity */}
                        <div className="text-center group">
                            <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6 mx-auto group-hover:scale-105 transition-transform duration-300 shadow-soft">
                                <svg className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-primary-950 mb-2 sm:mb-3">Integrity</h3>
                            <p className="text-xs sm:text-sm md:text-base text-primary-600">Transparency and trust in everything we do</p>
                        </div>

                        {/* Excellence */}
                        <div className="text-center group">
                            <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6 mx-auto group-hover:scale-105 transition-transform duration-300 shadow-soft">
                                <svg className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </div>
                            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-primary-950 mb-2 sm:mb-3">Excellence</h3>
                            <p className="text-xs sm:text-sm md:text-base text-primary-600">Delivering high-quality solutions always</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Section with Soft Styling */}
            <section className="section-padding bg-background">
                <div className="container-custom">
                    <div className="text-center mb-20">
                        <h2 className="heading-xl text-primary-950 mb-6">Our Leadership</h2>
                        <p className="body-xl text-primary-600 max-w-3xl mx-auto">
                            Visionary leaders driving innovation and excellence in technology solutions.
                        </p>
                    </div>
                    
                    <div className="card p-6 sm:p-8 md:p-12">
                        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
                            <div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-950 mb-4 sm:mb-5 md:mb-6">Leadership Vision</h3>
                                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg text-primary-700 leading-relaxed">
                                    <p>
                                        Our leadership team brings together decades of combined experience in telecommunications, automation, and education technology.
                                    </p>
                                    <p>
                                        With a deep understanding of industry challenges and emerging opportunities, our directors guide the company with a focus on sustainable growth, technological innovation, and meaningful partnerships.
                                    </p>
                                    <p>
                                        We believe in leading by example, fostering a culture of continuous learning, and empowering our team to deliver exceptional results for our clients and partners.
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full flex items-center justify-center shadow-soft">
                                    <svg className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us with Muted Colors */}
            <section className="section-padding bg-surface">
                <div className="container-custom">
                    <div className="text-center mb-20">
                        <h2 className="heading-xl text-primary-950 mb-6">Why RadioFusion Global?</h2>
                        <p className="body-xl text-primary-600 max-w-3xl mx-auto">
                            Discover what sets us apart in the technology solutions landscape.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-soft">
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-primary-950 mb-1 sm:mb-2">Proven Expertise in Telecom Communication Solutions</h3>
                                    <p className="text-xs sm:text-sm md:text-base text-primary-600">Deep technical knowledge and hands-on experience in modern telecommunications infrastructure and solutions.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-soft">
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-primary-950 mb-1 sm:mb-2">Cutting-edge Automation Tailored for Businesses</h3>
                                    <p className="text-xs sm:text-sm md:text-base text-primary-600">Custom automation solutions designed to streamline operations and boost productivity across industries.</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-soft">
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-primary-950 mb-1 sm:mb-2">Hands-on Education & Internship Programs</h3>
                                    <p className="text-xs sm:text-sm md:text-base text-primary-600">Comprehensive learning opportunities that bridge the gap between academic knowledge and industry requirements.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-secondary-400 to-accent-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-soft">
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-primary-950 mb-1 sm:mb-2">Strong Commitment to Growth for Partners and Learners</h3>
                                    <p className="text-xs sm:text-sm md:text-base text-primary-600">Dedicated to fostering long-term relationships and mutual success with all our stakeholders.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action with Soft Styling */}
            <section className="section-padding bg-gradient-to-br from-primary-800 via-primary-700 to-accent-700 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-900/20"></div>
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-20 w-32 h-32 border border-accent-300 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-24 h-24 border border-primary-300 rounded-full animate-pulse delay-1000"></div>
                </div>
                
                <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                    <h2 className="heading-display mb-8 leading-tight">
                        Let's Build the Future Together
                    </h2>
                    <p className="heading-lg text-primary-100 mb-12 leading-relaxed max-w-3xl mx-auto">
                        Join us on our journey to transform technology, automation, and learning. Together, we can create impactful solutions for tomorrow.
                    </p>
                    <Link 
                        to="/contact" 
                        className="btn-white group"
                    >
                        Contact Us
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </section>
        </main>
        </>
    );
}
