import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../layout/Navbar';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { BookOpen, Users, Target, Zap, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useLanguage } from '../i18n/LanguageContext';

export function HomePage() {
  const { t } = useLanguage();
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    setAnimationClass('fade-in');
  }, []);
  
  const features = [
    {
      icon: BookOpen,
      title: t('home.features.aiPowered'),
      description: t('home.features.aiPoweredDesc')
    },
    {
      icon: Users,
      title: t('home.features.personalized'),
      description: t('home.features.personalizedDesc')
    },
    {
      icon: Target,
      title: t('home.features.comprehensive'),
      description: t('home.features.comprehensiveDesc')
    },
    {
      icon: Zap,
      title: t('home.features.accessible'),
      description: t('home.features.accessibleDesc')
    }
  ];

  return (
    <div className={`min-h-screen morphing-bg pattern-dots ${animationClass}`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-purple-500/10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8 slide-in-left">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight animate-float">
                  <span className="animate-gradient-text neon-glow">
                    {t('home.hero.title')}
                  </span>
                </h1>
                <h2 className="text-2xl lg:text-3xl font-semibold text-foreground/90 mb-4 animate-breathe">
                  {t('home.hero.subtitle')}
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl font-medium">
                  {t('home.hero.description')}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto gradient-bg text-white btn-3d ripple-effect shadow-xl hover-glow magnetic-hover">
                    {t('home.hero.getStarted')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-primary/30 text-primary hover:bg-primary/10 btn-3d glass-effect">
                    {t('home.hero.learnMore')}
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative slide-in-right">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
              <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl p-8 card-tilt relative z-10 border-4 border-white shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                  alt="Students learning with AI technology"
                  className="rounded-2xl shadow-2xl w-full h-auto hover-lift"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-primary to-purple-500 rounded-full opacity-20 animate-pulse-color shadow-lg"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30 animate-bounce-gentle shadow-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background/80 to-muted/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 scale-in">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 animate-float">
              <span className="animate-gradient-text">
                {t('home.features.title')}
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed">
              {t('home.features.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className={`text-center glass-effect hover-lift card-tilt transition-all duration-500 border-2 border-primary/20 hover-glow magnetic-hover shadow-xl ${index % 2 === 0 ? 'pattern-dots' : ''}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className={`w-20 h-20 ${index === 0 ? 'gradient-bg-purple' : index === 1 ? 'gradient-bg-blue' : index === 2 ? 'gradient-bg-green' : 'gradient-bg-orange'} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce-gentle btn-3d ring-4 ring-primary/10`}>
                      <Icon className="h-10 w-10 text-white drop-shadow-lg animate-breathe" />
                    </div>
                    <CardTitle className="text-xl mb-3 animate-gradient-text font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-base text-gray-700 font-medium leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-bg relative overflow-hidden morphing-bg">
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-bounce-gentle"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 animate-bounce-gentle neon-glow">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8 font-medium">
            {t('home.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto btn-3d ripple-effect hover-lift">
                {t('home.cta.startTrial')}
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary btn-3d glass-effect">
                {t('home.cta.signIn')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}