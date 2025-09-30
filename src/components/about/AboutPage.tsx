import React from 'react';
import { Navbar } from '../layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Users, Target, Lightbulb, Heart } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useLanguage } from '../i18n/LanguageContext';

export function AboutPage() {
  const { t } = useLanguage();
  
  const values = [
    {
      icon: Target,
      title: t('about.values.innovation'),
      description: t('about.values.innovationDesc')
    },
    {
      icon: Users,
      title: t('about.values.accessibility'),
      description: t('about.values.accessibilityDesc')
    },
    {
      icon: Lightbulb,
      title: t('about.values.excellence'),
      description: t('about.values.excellenceDesc')
    },
    {
      icon: Heart,
      title: "Impact",
      description: "Creating meaningful impact in education through personalized learning experiences."
    }
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
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-purple-500/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                {t('about.title')}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('about.description')}
              </p>
              <p className="text-lg text-gray-600">
                Founded by educators and technologists, we understand the challenges faced 
                in modern classrooms and have designed our platform to address them with 
                innovative AI-powered solutions.
              </p>
            </div>
            
            <div className="relative">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80"
                alt="Educational technology and AI"
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl mb-4">{t('about.mission.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t('about.mission.description')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl mb-4">{t('about.vision.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t('about.vision.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('about.values.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Sahayak AI.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl mb-2">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
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
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 mx-auto mb-4">
                    <ImageWithFallback 
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Have questions about Sahayak AI? We'd love to hear from you.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-primary-foreground">
            <div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p>hello@sahayakai.com</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <p>+91 9876543210</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Address</h3>
              <p>Bangalore, India</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}