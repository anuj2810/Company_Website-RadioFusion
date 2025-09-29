import { Link } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import usePageTitle from "../hooks/usePageTitle";
import ImageUpload from "../components/ImageUpload";
import OptimizedImage from "../components/OptimizedImage";

// Image paths for WebP optimization
const bannerImage = "/assets/images/home/banner.webp";
const banner1 = "/assets/images/home/banner1.webp";
const ctaImage = "/assets/images/home/cta.webp";
const aboutImg = "/assets/images/home/about.webp";
const telecom = "/assets/images/home/telecom.webp";
const automation = "/assets/images/home/automation.webp";
const course = "/assets/images/home/course.webp";
const innovationImg = "/assets/images/home/Innovation.webp";
const collaborationImg = "/assets/images/home/Collaboration.webp";
const commitmentImg = "/assets/images/home/Commitment.webp";
const growthImg = "/assets/images/home/Growth.webp";

export default function Home() {
    usePageTitle("Home");
    
    const [openAccordion, setOpenAccordion] = useState(null);
    const [heroImage, setHeroImage] = useState(bannerImage);
    const [serviceImages, setServiceImages] = useState({
        telecom: telecom,
        automation: automation,
        education: course
    });
    const [aboutImage, setAboutImage] = useState(aboutImg);

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    const handleHeroImageChange = (imageUrl, file) => {
        setHeroImage(imageUrl);
    };

    const handleServiceImageChange = (service, imageUrl, file) => {
        setServiceImages(prev => ({
            ...prev,
            [service]: imageUrl
        }));
    };

    const [coreValueImages, setCoreValueImages] = useState({
        innovation: innovationImg,
        collaboration: collaborationImg,
        commitment: commitmentImg,
        growth: growthImg
    });

    const handleCoreValueImageChange = (valueType, imageUrl, file) => {
        setCoreValueImages(prev => ({
            ...prev,
            [valueType]: imageUrl
        }));
    };

     const handleAboutImageChange = (imageUrl, file) => {
         setAboutImage(imageUrl);
     };

     return (
         <>
             <Helmet>
                 <title>RadioFusion Global - Innovative Technology Solutions & Training</title>
                 <meta name="description" content="RadioFusion Global provides cutting-edge technology solutions, telecommunications services, automation systems, and comprehensive training programs to empower businesses and individuals." />
                 <meta name="keywords" content="technology solutions, telecommunications, automation, training programs, RadioFusion Global, innovation, business solutions" />
                 <link rel="canonical" href="https://mycompany.com/" />
                 
                 {/* Open Graph Tags */}
                 <meta property="og:title" content="RadioFusion Global - Innovative Technology Solutions & Training" />
                 <meta property="og:description" content="RadioFusion Global provides cutting-edge technology solutions, telecommunications services, automation systems, and comprehensive training programs to empower businesses and individuals." />
                 <meta property="og:image" content="https://mycompany.com/assets/images/home/banner.webp" />
                 <meta property="og:url" content="https://mycompany.com/" />
                 <meta property="og:type" content="website" />
                 
                 {/* Twitter Card Tags */}
                 <meta name="twitter:card" content="summary_large_image" />
                 <meta name="twitter:title" content="RadioFusion Global - Innovative Technology Solutions & Training" />
                 <meta name="twitter:description" content="RadioFusion Global provides cutting-edge technology solutions, telecommunications services, automation systems, and comprehensive training programs to empower businesses and individuals." />
                 <meta name="twitter:image" content="https://mycompany.com/assets/images/home/banner.webp" />
             </Helmet>
             <main className="min-h-screen">
            <section className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: '100vh' }}>
                {/* Hero Background Image Container */}
                <div className="absolute inset-0 w-full h-full">
                    <ImageUpload
                        currentImage={heroImage}
                        onImageChange={handleHeroImageChange}
                        mobileImage={banner1}
                        className="w-full h-full object-cover object-center"
                        containerClassName="w-full h-full"
                        fallbackGradient="from-primary-950 via-primary-800 to-secondary-800"
                        shape="rectangle"
                        aspectRatio="h-full"
                        showUploadButton={false}
                        overlayContent={
                            <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/10"></div>
                        }
                        alt="Hero background image"
                    />
                </div>
                
                {/* Subtle Background Pattern with Muted Colors */}
                <div className="absolute inset-0 opacity-8 z-10">
                    <div className="absolute top-20 left-20 w-32 h-32 border border-primary-500/20 rounded-full animate-pulse hidden md:block"></div>
                    <div className="absolute top-40 right-32 w-24 h-24 border border-primary-500/20 rounded-full animate-pulse delay-1000 hidden md:block"></div>
                    <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-primary-500/20 rounded-full animate-pulse delay-2000 hidden sm:block"></div>
                    <div className="absolute bottom-20 right-20 w-20 h-20 border border-primary-500/20 rounded-full animate-pulse delay-500 hidden sm:block"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-primary-600/20 rounded-full hidden lg:block"></div>
                </div>
                
                {/* Hero Action Buttons - Positioned at Bottom Right */}
                <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-20">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <Link 
                            to="/services" 
                            className="btn-primary hover-glow px-4 py-2 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold whitespace-nowrap"
                        >
                            Explore Services →
                        </Link>
                        <Link 
                            to="/contact" 
                            className="btn-white px-4 py-2 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold whitespace-nowrap"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Preview Section with Soft Styling */}
            <section className="section-padding bg-surface">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="heading-xl text-primary-950 mb-8">
                                Who We Are
                            </h2>
                            <p className="body-lg text-primary-700 mb-10 leading-relaxed">
                                Founded in 2025, we are a startup with a clear vision – to collaborate, innovate, and grow with our partners. Our journey has just begun, and we're excited to create an impact together.
                            </p>
                            <Link 
                                to="/about" 
                                className="btn-primary hover-glow px-10 py-5 text-lg font-semibold inline-flex items-center"
                            >
                                Read More →
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="h-64 sm:h-80 md:h-96">
                                <ImageUpload
                                    currentImage={aboutImage}
                                    onImageChange={handleAboutImageChange}
                                    className="w-full h-full rounded-xl sm:rounded-2xl"
                                    containerClassName="w-full h-full"
                                    fallbackGradient="from-neutral-100 to-neutral-200"
                                    shape="rectangle"
                                    aspectRatio="h-full"
                                    showUploadButton={false}
                                    overlayContent={
                                        !aboutImage && (
                                            <div className="text-center px-4">
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-soft">
                                                    <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary-950 mb-2">Collaboration</h3>
                                                <p className="text-sm sm:text-base text-primary-600">Building together</p>
                                            </div>
                                        )
                                    }
                                    alt="About us - team collaboration image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section with Professional Design */}
            <section className="section-padding bg-neutral-50">
                <div className="container-custom">
                    {/* Section Heading */}
                    <div className="text-center mb-16">
                        <h2 className="heading-xl text-primary-950 mb-6">
                            Our Services
                        </h2>
                    </div>

                    {/* Top Row - 3 Service Cards */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {/* Telecom Solutions Card */}
                        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-6 sm:mb-8">
                                <ImageUpload
                                    currentImage={serviceImages.telecom}
                                    onImageChange={(imageUrl, file) => handleServiceImageChange('telecom', imageUrl, file)}
                                    className="w-full h-full"
                                    containerClassName="w-full h-full"
                                    fallbackGradient="from-blue-500 to-blue-600"
                                    shape="circle"
                                    aspectRatio="aspect-square"
                                    showUploadButton={false}
                                    overlayContent={
                                        !serviceImages.telecom && (
                                            <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                                            </svg>
                                        )
                                    }
                                    alt="Telecom Solutions icon"
                                />
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary-950 mb-4">Telecom Solutions</h3>
                            <p className="text-sm sm:text-base text-primary-600 text-center">Network optimization, testing, deployment</p>
                        </div>

                        {/* Automation Software Solutions Card */}
                        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-6 sm:mb-8">
                                <ImageUpload
                                    currentImage={serviceImages.automation}
                                    onImageChange={(imageUrl, file) => handleServiceImageChange('automation', imageUrl, file)}
                                    className="w-full h-full"
                                    containerClassName="w-full h-full"
                                    fallbackGradient="from-purple-500 to-purple-600"
                                    shape="circle"
                                    aspectRatio="aspect-square"
                                    showUploadButton={false}
                                    overlayContent={
                                        !serviceImages.automation && (
                                            <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        )
                                    }
                                    alt="Automation Software Solutions icon"
                                />
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary-950 mb-4">Automation Software Solutions</h3>
                            <p className="text-sm sm:text-base text-primary-600 text-center">Custom automation pipelines & tools</p>
                        </div>

                        {/* Educational Empowerment & Training Card */}
                        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-6 sm:mb-8">
                                <ImageUpload
                                    currentImage={serviceImages.education}
                                    onImageChange={(imageUrl, file) => handleServiceImageChange('education', imageUrl, file)}
                                    className="w-full h-full"
                                    containerClassName="w-full h-full"
                                    fallbackGradient="from-green-500 to-green-600"
                                    shape="circle"
                                    aspectRatio="aspect-square"
                                    showUploadButton={false}
                                    overlayContent={
                                        !serviceImages.education && (
                                            <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        )
                                    }
                                    alt="Educational Empowerment & Training icon"
                                />
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary-950 mb-4">Educational Empowerment & Training</h3>
                            <p className="text-sm sm:text-base text-primary-600 text-center">Training & internship support in telecom & IT automation</p>
                        </div>
                    </div>

                    {/* Explore Services Heading */}
                    <div className="mb-8">
                        <h3 className="heading-lg text-primary-950">Explore Services</h3>
                    </div>

                    {/* Accordion Layout */}
                    <div className="space-y-4 mb-16">
                        {/* Telecom Solutions Accordion */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden accordion-item">
                            <button 
                                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-neutral-50 transition-colors duration-200 accordion-trigger"
                                onClick={(e) => {
                                    const content = e.target.closest('.accordion-item').querySelector('.accordion-content');
                                    const icon = e.target.closest('.accordion-item').querySelector('.accordion-icon');
                                    content.classList.toggle('hidden');
                                    icon.classList.toggle('rotate-180');
                                }}
                            >
                                <span className="heading-md text-primary-950">Telecom Solutions</span>
                                <svg className="w-6 h-6 text-primary-600 transition-transform duration-200 accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="accordion-content hidden px-8 pb-6">
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-semibold text-primary-950 mb-1">Network Planning & Optimization</h4>
                                            <p className="body-sm text-primary-600">Ensuring seamless connectivity, improved coverage, and reduced downtime.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-semibold text-primary-950 mb-1">Deployment & Integration</h4>
                                            <p className="body-sm text-primary-600">Helping enterprises adopt the latest telecom technologies smoothly.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-semibold text-primary-950 mb-1">Testing & Monitoring</h4>
                                            <p className="body-sm text-primary-600">Advanced tools for efficiency, reliability, and performance.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-semibold text-primary-950 mb-1">Consulting & Support</h4>
                                            <p className="body-sm text-primary-600">Expert advice & 24/7 assistance.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Automation Software Solutions Accordion */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden accordion-item">
                            <button 
                                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-neutral-50 transition-colors duration-200 accordion-trigger"
                                onClick={(e) => {
                                    const content = e.target.closest('.accordion-item').querySelector('.accordion-content');
                                    const icon = e.target.closest('.accordion-item').querySelector('.accordion-icon');
                                    content.classList.toggle('hidden');
                                    icon.classList.toggle('rotate-180');
                                }}
                            >
                                <span className="heading-md text-primary-950">Automation Software Solutions</span>
                                <svg className="w-6 h-6 text-primary-600 transition-transform duration-200 accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="accordion-content hidden px-8 pb-6">
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-semibold text-primary-950 mb-1">Custom Pipeline Development</h4>
                                            <p className="body-sm text-primary-600">Tailored automation workflows to streamline your business processes.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-semibold text-primary-950 mb-1">Process Optimization Tools</h4>
                                            <p className="body-sm text-primary-600">Smart solutions to eliminate manual tasks and increase efficiency.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-semibold text-primary-950 mb-1">Integration & API Development</h4>
                                            <p className="body-sm text-primary-600">Seamless connectivity between systems and platforms.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-semibold text-primary-950 mb-1">Maintenance & Support</h4>
                                            <p className="body-sm text-primary-600">Ongoing support to ensure your automation tools run smoothly.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Educational Empowerment & Training Accordion */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden accordion-item">
                            <button 
                                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-neutral-50 transition-colors duration-200 accordion-trigger"
                                onClick={(e) => {
                                    const content = e.target.closest('.accordion-item').querySelector('.accordion-content');
                                    const icon = e.target.closest('.accordion-item').querySelector('.accordion-icon');
                                    content.classList.toggle('hidden');
                                    icon.classList.toggle('rotate-180');
                                }}
                            >
                                <span className="heading-md text-primary-950">Educational Empowerment & Training</span>
                                <svg className="w-6 h-6 text-primary-600 transition-transform duration-200 accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="accordion-content hidden px-8 pb-6">
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-semibold text-primary-950 mb-1">Telecom Training Programs</h4>
                                            <p className="body-sm text-primary-600">Comprehensive courses covering network technologies and industry best practices.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-semibold text-primary-950 mb-1">IT Automation Workshops</h4>
                                            <p className="body-sm text-primary-600">Hands-on training in automation tools and programming languages.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-semibold text-primary-950 mb-1">Internship Programs</h4>
                                            <p className="body-sm text-primary-600">Real-world experience opportunities with mentorship and career guidance.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-semibold text-primary-950 mb-1">Certification Support</h4>
                                            <p className="body-sm text-primary-600">Preparation and guidance for industry-recognized certifications.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* View All Services Button */}
                    <div className="text-center">
                        <Link 
                            to="/services" 
                            className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-soft hover:shadow-corporate hover:from-primary-700 hover:to-primary-800 transition-all duration-300 hover:-translate-y-1 text-lg"
                        >
                            View All Services
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
                        
            {/* Core Values Section with Muted Styling */}
            <section className="section-padding bg-surface">
                <div className="container-custom">
                    <div className="text-center mb-20">
                        <h2 className="heading-xl text-primary-950 mb-6">
                            Our Core Values
                        </h2>
                        <p className="body-xl text-primary-600 max-w-3xl mx-auto">
                            The principles that drive our mission and define our culture
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                        <div className="text-center group">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-4 sm:mb-6 md:mb-8">
                                <ImageUpload
                                    currentImage={coreValueImages.innovation}
                                    onImageChange={(imageUrl, file) => handleCoreValueImageChange('innovation', imageUrl, file)}
                                    className="w-full h-full"
                                    containerClassName="w-full h-full"
                                    fallbackGradient="from-primary-500 to-accent-500"
                                    shape="circle"
                                    aspectRatio="aspect-square"
                                    showUploadButton={false}
                                    overlayContent={
                                        !coreValueImages.innovation && (
                                            <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        )
                                    }
                                    alt="Innovation core value icon"
                                />
                            </div>
                            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-primary-950 mb-2 sm:mb-3 md:mb-4">Innovation</h3>
                            <p className="text-xs sm:text-sm md:text-base text-primary-600">Fresh ideas for real challenges.</p>
                        </div>
                        
                        <div className="text-center group">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-4 sm:mb-6 md:mb-8">
                                <ImageUpload
                                    currentImage={coreValueImages.collaboration}
                                    onImageChange={(imageUrl, file) => handleCoreValueImageChange('collaboration', imageUrl, file)}
                                    className="w-full h-full"
                                    containerClassName="w-full h-full"
                                    fallbackGradient="from-primary-600 to-primary-700"
                                    shape="circle"
                                    aspectRatio="aspect-square"
                                    showUploadButton={false}
                                    overlayContent={
                                        !coreValueImages.collaboration && (
                                            <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        )
                                    }
                                    alt="Collaboration core value icon"
                                />
                            </div>
                            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-primary-950 mb-2 sm:mb-3 md:mb-4">Collaboration</h3>
                            <p className="text-xs sm:text-sm md:text-base text-primary-600">Growth through teamwork.</p>
                        </div>
                        
                        <div className="text-center group">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-4 sm:mb-6 md:mb-8">
                                <ImageUpload
                                    currentImage={coreValueImages.commitment}
                                    onImageChange={(imageUrl, file) => handleCoreValueImageChange('commitment', imageUrl, file)}
                                    className="w-full h-full"
                                    containerClassName="w-full h-full"
                                    fallbackGradient="from-secondary-600 to-secondary-700"
                                    shape="circle"
                                    aspectRatio="aspect-square"
                                    showUploadButton={false}
                                    overlayContent={
                                        !coreValueImages.commitment && (
                                            <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )
                                    }
                                    alt="Commitment core value icon"
                                />
                            </div>
                            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-primary-950 mb-2 sm:mb-3 md:mb-4">Commitment</h3>
                            <p className="text-xs sm:text-sm md:text-base text-primary-600">Quality in everything we do.</p>
                        </div>
                        
                        <div className="text-center group">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-4 sm:mb-6 md:mb-8">
                                <ImageUpload
                                    currentImage={coreValueImages.growth}
                                    onImageChange={(imageUrl, file) => handleCoreValueImageChange('growth', imageUrl, file)}
                                    className="w-full h-full"
                                    containerClassName="w-full h-full"
                                    fallbackGradient="from-accent-500 to-accent-600"
                                    shape="circle"
                                    aspectRatio="aspect-square"
                                    showUploadButton={false}
                                    overlayContent={
                                        !coreValueImages.growth && (
                                            <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                        )
                                    }
                                    alt="Growth core value icon"
                                />
                            </div>
                            <h3 className="heading-sm text-primary-950 mb-4">Growth</h3>
                            <p className="body-md text-primary-600">Helping our partners succeed.</p>
                        </div>
                    </div>
                    <div className="text-center mt-20">
                        <Link 
                            to="/about" 
                            className="btn-primary hover-glow px-12 py-5 text-lg font-semibold inline-flex items-center"
                        >
                            Know More →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section with Background Image */}
            <section className="section-padding relative overflow-hidden rounded-b-hero">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img 
                        src={ctaImage} 
                        alt="Call to action background" 
                        className="w-full h-full object-cover"
                    />
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/50"></div>
                </div>
                
                <div className="relative z-20 h-full flex items-center justify-end p-8">
                    <Link 
                        to="/#" 
                        className="btn-transparent px-14 py-6 text-lg font-bold inline-flex items-center"
                    >
                        
                    </Link>
                </div>
            </section>

            {/* Contact Teaser Section with Rounded Elements */}
            <section className="py-24 bg-background">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h3 className="heading-lg text-primary-950 mb-12">Get In Touch</h3>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
                        <div className="card flex items-center gap-4 px-8 py-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="body-lg text-primary-950">info@radiofusionglobal.com</span>
                        </div>
                        <div className="card flex items-center gap-4 px-8 py-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <span className="body-lg text-primary-950">+91 9258090909</span>
                        </div>
                    </div>
                    <Link 
                        to="/contact" 
                        className="btn-secondary hover-lift px-10 py-5 font-semibold inline-flex items-center"
                    >
                        Go to Contact Page
                    </Link>
                </div>
            </section>
        </main>
        </>
    );
}
