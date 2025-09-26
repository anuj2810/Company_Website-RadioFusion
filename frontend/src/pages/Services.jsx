import { Link } from "react-router-dom";
import { useState } from "react";
import usePageTitle from "../hooks/usePageTitle";
import ImageUpload from "../components/ImageUpload";
import OptimizedImage from "../components/OptimizedImage";

// WebP optimized image paths
const banner = "/assets/images/services/banner.webp";
const telecomImg = "/assets/images/services/telecom.webp";
const automationImg = "/assets/images/services/automation.webp";
const courseImg = "/assets/images/services/course.webp";

export default function Services() {
    usePageTitle("Services");
    
    const [servicesHeroImage, setServicesHeroImage] = useState(banner);
    const [serviceImages, setServiceImages] = useState({
        telecom: telecomImg,
        automation: automationImg,
        education: courseImg
    });

    const handleServicesHeroImageChange = (imageUrl, file) => {
        setServicesHeroImage(imageUrl);
    };

    const handleServiceImageChange = (serviceType, imageUrl, file) => {
        setServiceImages(prev => ({
            ...prev,
            [serviceType]: imageUrl
        }));
    };
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Banner with Image Upload Support */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden rounded-b-hero">
                {/* Hero Background Image Container */}
                <div className="absolute inset-0">
                    <ImageUpload
                        currentImage={servicesHeroImage}
                        onImageChange={handleServicesHeroImageChange}
                        className="w-full h-full"
                        containerClassName="w-full h-full"
                        fallbackGradient="from-primary-800 via-primary-700 to-accent-700"
                        shape="rectangle"
                        aspectRatio="h-full"
                        showUploadButton={false}
                        overlayContent={
                            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/15 to-black/30"></div>
                        }
                        alt="Services hero background image"
                    />
                </div>

                {/* Overlay for reduced brightness */}
                <div className="absolute inset-0 bg-primary-900/20 z-10"></div>
                
                {/* Abstract Tech Background */}
                <div className="absolute inset-0 opacity-5 z-10">
                    <div className="absolute top-20 left-20 w-64 h-64 border border-accent-300 rounded-full animate-pulse"></div>
                    <div className="absolute top-40 right-32 w-48 h-48 border border-primary-300 rounded-full animate-pulse delay-1000"></div>
                    <div className="absolute bottom-32 left-1/4 w-32 h-32 border border-secondary-300 rounded-full animate-pulse delay-2000"></div>
                    <div className="absolute bottom-20 right-20 w-40 h-40 border border-accent-300 rounded-full animate-pulse delay-500"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-neutral-400 rounded-full"></div>
                    
                    {/* Grid Pattern */}
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}></div>
                </div>
                
            </section>

            {/* Service 1: Telecom Communication Solutions */}
            <section className="section-padding bg-surface">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <ImageUpload
                                currentImage={serviceImages.telecom}
                                onImageChange={(imageUrl, file) => handleServiceImageChange('telecom', imageUrl, file)}
                                className="w-full h-full"
                                containerClassName="w-full h-full"
                                fallbackGradient="from-primary-400 to-accent-500"
                                shape="rectangle"
                                aspectRatio="aspect-[16/9]"
                                showUploadButton={false}
                                overlayContent={
                                    !serviceImages.telecom && (
                                        <div className="flex justify-center">
                                            <svg className="w-48 h-48 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                                            </svg>
                                        </div>
                                    )
                                }
                                alt="Telecom Solutions service image"
                            />
                            <div className="absolute top-8 left-8 w-16 h-16 border-2 border-white/20 rounded-full animate-pulse"></div>
                            <div className="absolute bottom-8 right-8 w-12 h-12 border-2 border-white/20 rounded-full animate-pulse delay-1000"></div>
                        </div>
                        <div>
                            <h2 className="heading-xl text-primary-950 mb-8 leading-tight">
                                Telecom Communication Solutions
                            </h2>
                            <p className="body-lg text-primary-700 mb-8 leading-relaxed">
                                We provide end-to-end telecom solutions that enhance connectivity, optimize performance, and empower businesses to stay ahead in a connected world. Our expertise covers network solutions, optimization, and custom telecom support.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-soft">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="body-base text-primary-700 font-medium">Network optimization and performance solutions</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-soft">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="body-base text-primary-700 font-medium">Custom telecom communication strategies</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-soft">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="body-base text-primary-700 font-medium">Reliable and scalable connectivity support</span>
                                </li>
                            </ul>
                            <Link 
                                to="/services/telecom" 
                                className="btn-primary hover-glow group"
                            >
                                Learn More
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service 2: Automation Solutions (Reversed Layout) */}
            <section className="section-padding bg-background">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="lg:order-2">
                            <ImageUpload
                                currentImage={serviceImages.automation}
                                onImageChange={(imageUrl, file) => handleServiceImageChange('automation', imageUrl, file)}
                                className="w-full h-full"
                                containerClassName="w-full h-full"
                                fallbackGradient="from-secondary-400 to-accent-500"
                                shape="rectangle"
                                aspectRatio="aspect-[16/9]"
                                showUploadButton={false}
                                overlayContent={
                                    !serviceImages.automation && (
                                        <div className="flex justify-center">
                                            <svg className="w-48 h-48 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                    )
                                }
                                alt="Automation Solutions service image"
                            />
                            <div className="absolute top-8 right-8 w-16 h-16 border-2 border-white/20 rounded-full animate-pulse"></div>
                            <div className="absolute bottom-8 left-8 w-12 h-12 border-2 border-white/20 rounded-full animate-pulse delay-1000"></div>
                        </div>
                        <div className="lg:order-1">
                            <h2 className="heading-xl text-primary-950 mb-8 leading-tight">
                                Automation Solutions
                            </h2>
                            <p className="body-lg text-primary-700 mb-8 leading-relaxed">
                                We design and implement automation systems that simplify repetitive tasks, improve efficiency, and save time for businesses. From workflow automation to custom software tools, our solutions help you achieve more with less effort.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-gradient-to-br from-secondary-400 to-accent-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-soft">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="body-base text-primary-700 font-medium">Custom process automation</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-gradient-to-br from-secondary-400 to-accent-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-soft">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="body-base text-primary-700 font-medium">Data handling and reporting tools</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-gradient-to-br from-secondary-400 to-accent-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-soft">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="body-base text-primary-700 font-medium">Business workflow optimization</span>
                                </li>
                            </ul>
                            <Link 
                                to="/services/automation" 
                                className="btn-secondary hover-lift group"
                            >
                                Learn More
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service 3: Education & Internship Programs */}
            <section className="section-padding bg-surface">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <ImageUpload
                                currentImage={serviceImages.education}
                                onImageChange={(imageUrl, file) => handleServiceImageChange('education', imageUrl, file)}
                                className="w-full h-full"
                                containerClassName="w-full h-full"
                                fallbackGradient="from-accent-400 to-primary-500"
                                shape="rectangle"
                                aspectRatio="aspect-[16/9]"
                                showUploadButton={false}
                                overlayContent={
                                    !serviceImages.education && (
                                        <div className="flex justify-center">
                                            <svg className="w-48 h-48 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                    )
                                }
                                alt="Education & Internship Programs service image"
                            />
                            <div className="absolute top-8 left-8 w-16 h-16 border-2 border-white/20 rounded-full animate-pulse"></div>
                            <div className="absolute bottom-8 right-8 w-12 h-12 border-2 border-white/20 rounded-full animate-pulse delay-1000"></div>
                        </div>
                        <div>
                            <h2 className="heading-xl text-primary-950 mb-8 leading-tight">
                                Education & Internship Programs
                            </h2>
                            <p className="body-lg text-primary-700 mb-8 leading-relaxed">
                                We believe in empowering the next generation with practical knowledge. Our education and internship programs focus on real-world skills in telecom, automation, and IT, preparing students and professionals for a future-ready career.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-gradient-to-br from-accent-400 to-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-soft">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="body-base text-primary-700 font-medium">Hands-on internships in telecom and automation</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-gradient-to-br from-accent-400 to-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-soft">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="body-base text-primary-700 font-medium">Practical training with real projects</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-gradient-to-br from-accent-400 to-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-soft">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="body-base text-primary-700 font-medium">Industry-level mentorship</span>
                                </li>
                            </ul>
                            <div className="flex gap-4">
                                <Link 
                                    to="/services/education" 
                                    className="btn-primary hover-glow group"
                                >
                                    Learn More
                                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <Link 
                                    to="/courses" 
                                    className="btn-outline group"
                                >
                                    Explore Programs
                                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="section-padding bg-background">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="heading-xl text-primary-950 mb-6">
                            Why Choose RadioFusion Global?
                        </h2>
                        <p className="body-lg text-primary-700 max-w-3xl mx-auto">
                            We combine technical expertise with innovative solutions to deliver exceptional results for our clients.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="card p-8 text-center group hover:shadow-soft transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="heading-sm text-primary-950 mb-4">Proven Expertise</h3>
                            <p className="body-base text-primary-700">Years of experience in telecom and automation solutions</p>
                        </div>
                        <div className="card p-8 text-center group hover:shadow-soft transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="heading-sm text-primary-950 mb-4">Cutting-edge Technology</h3>
                            <p className="body-base text-primary-700">Latest tools and technologies for optimal performance</p>
                        </div>
                        <div className="card p-8 text-center group hover:shadow-soft transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="heading-sm text-primary-950 mb-4">Dedicated Support</h3>
                            <p className="body-base text-primary-700">24/7 customer support and maintenance services</p>
                        </div>
                        <div className="card p-8 text-center group hover:shadow-soft transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="heading-sm text-primary-950 mb-4">Cost-effective</h3>
                            <p className="body-base text-primary-700">Competitive pricing with maximum value delivery</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="section-padding bg-gradient-to-br from-primary-900 to-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 to-primary-950/90"></div>
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-20 left-20 w-32 h-32 border border-white/10 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/10 rounded-full animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white/10 rounded-full animate-pulse delay-500"></div>
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <h2 className="heading-xl text-white mb-6">
                            Ready to Transform Your Business?
                        </h2>
                        <p className="body-lg text-white/90 mb-10 leading-relaxed">
                            Let's discuss how our services can help you achieve your goals. Contact us today for a consultation and discover the RadioFusion Global difference.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                to="/contact" 
                                className="btn-accent hover-scale group"
                            >
                                Get Started Today
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <Link 
                                to="/about" 
                                className="btn-outline-white group"
                            >
                                Learn More About Us
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
