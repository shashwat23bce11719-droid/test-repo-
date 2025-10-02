import React, { useState } from 'react';
import { Navbar } from '../layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useLanguage } from '../i18n/LanguageContext';

export function AboutPage() {
  const { t } = useLanguage();
  const [currentImage, setCurrentImage] = useState(0);

  // Using public folder paths
  const storyImages = [
    '/story/scene1.jpg',
    '/story/scene2.jpg',
    '/story/scene3.jpg',
    '/story/scene4.jpg'
  ];

  const team = [
    {
      name: "Dr. Priya Sharma",
      role: "Founder & CEO",
      description: "Former educator with 15+ years experience in educational technology.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Rahul Verma",
      role: "CTO",
      description: "AI specialist with expertise in machine learning and educational platforms.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Anjali Gupta",
      role: "Head of Product",
      description: "Product designer focused on creating intuitive educational experiences.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Arjun Patel",
      role: "Lead Developer",
      description: "Full-stack developer specializing in scalable educational applications.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Kavya Reddy",
      role: "Education Specialist",
      description: "Curriculum designer with expertise in AI-enhanced learning methodologies.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? storyImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev === storyImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-purple-500/5 slide-in-left">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground animate-gradient-text">
                {t('about.title')}
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed font-medium">
                {t('about.description')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded by educators and technologists, we understand the challenges faced
                in modern classrooms and have designed our platform to address them with
                innovative AI-powered solutions.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80"
                alt="Educational technology and AI"
                className="rounded-2xl shadow-2xl w-full h-auto relative z-10 border-4 border-white hover-lift card-tilt"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 scale-in">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8 glass-effect border-2 border-primary/20 shadow-2xl hover-lift card-tilt transition-all">
              <CardHeader>
                <div className="h-16 w-16 gradient-bg-blue rounded-2xl flex items-center justify-center mb-4 shadow-lg btn-3d">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl mb-4 animate-gradient-text">{t('about.mission.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  {t('about.mission.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 glass-effect border-2 border-primary/20 shadow-2xl hover-lift card-tilt transition-all">
              <CardHeader>
                <div className="h-16 w-16 gradient-bg-purple rounded-2xl flex items-center justify-center mb-4 shadow-lg btn-3d">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl mb-4 animate-gradient-text">{t('about.vision.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  {t('about.vision.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story with 3D Rotating Pictures */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/30 to-primary/5 slide-in-right">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 animate-gradient-text">
              Our Story
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              The journey that led us to transform education with AI.
            </p>
          </div>
          
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-4xl" style={{ perspective: '1000px' }}>
              <div className="relative h-96 flex items-center justify-center">
                <button
                  onClick={handlePrevImage}
                  className="absolute left-0 z-10 bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:bg-primary/90 transition-all"
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="relative w-full max-w-2xl h-full flex items-center justify-center">
                  <img
                    key={currentImage}
                    src={storyImages[currentImage]}
                    alt={`Story scene ${currentImage + 1}`}
                    className="w-full h-full object-contain rounded-2xl shadow-2xl transition-all duration-700 ease-in-out border-4 border-white"
                    style={{
                      animation: 'rotate3d 0.7s ease-in-out'
                    }}
                    onError={(e) => {
                      console.error('Image failed to load:', storyImages[currentImage]);
                      e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                    }}
                  />
                </div>
                
                <button
                  onClick={handleNextImage}
                  className="absolute right-0 z-10 bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:bg-primary/90 transition-all"
                  aria-label="Next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <div className="flex justify-center mt-8 gap-2">
                {storyImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentImage === index ? 'bg-primary w-8' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate educators and technologists working together to transform education.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center glass-effect border-2 border-primary/20 shadow-xl hover-lift card-tilt transition-all magnetic-hover">
                <CardHeader className="pb-4">
                  <div className="w-28 h-28 mx-auto mb-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full animate-pulse-color"></div>
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover ring-4 ring-primary/30 shadow-lg relative z-10"
                    />
                  </div>
                  <CardTitle className="text-lg animate-gradient-text">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-semibold">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-bg morphing-bg pattern-dots relative overflow-hidden fade-in">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-bounce-gentle"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6 neon-glow">
            Get in Touch
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 font-medium">
            Have questions about Sahayak AI? We'd love to hear from you.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-primary-foreground">
            <div className="glass-effect border-2 border-white/30 rounded-2xl p-6 hover-lift card-tilt shadow-2xl">
              <div className="h-14 w-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2 text-lg">Email</h3>
              <p className="font-medium">hello@sahayakai.com</p>
            </div>
            <div className="glass-effect border-2 border-white/30 rounded-2xl p-6 hover-lift card-tilt shadow-2xl">
              <div className="h-14 w-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2 text-lg">Phone</h3>
              <p className="font-medium">+91 9876543210</p>
            </div>
            <div className="glass-effect border-2 border-white/30 rounded-2xl p-6 hover-lift card-tilt shadow-2xl">
              <div className="h-14 w-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2 text-lg">Address</h3>
              <p className="font-medium">Bangalore, India</p>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes rotate3d {
          0% {
            transform: rotateY(-90deg);
            opacity: 0;
          }
          100% {
            transform: rotateY(0deg);
            opacity: 1;
          }
        }
      `}} />
    </div>
  );
}