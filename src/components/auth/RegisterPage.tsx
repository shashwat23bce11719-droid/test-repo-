import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { AuthContext } from '../../App';
import { toast } from 'sonner';
import { User, Mail, Lock, Phone, GraduationCap, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useLanguage } from '../i18n/LanguageContext';
import { authAPI } from '../../services/api';

export function RegisterPage() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState('teacher');
  const [animationClass, setAnimationClass] = useState('');
  
  // Common fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Teacher-specific fields
  const [classInfo, setClassInfo] = useState('');
  
  // Student-specific fields
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [grade, setGrade] = useState('');
  
  const { login } = React.useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimationClass('fade-in');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password) {
      toast.error(t('auth.register.fillRequiredFields'));
      return;
    }

    if (userType === 'teacher' && !classInfo) {
      toast.error(t('auth.register.provideClassInfo'));
      return;
    }

    if (userType === 'student' && (!parentPhone || !parentEmail || !grade)) {
      toast.error(t('auth.register.fillStudentDetails'));
      return;
    }

    setIsLoading(true);

    try {
      const registrationData = {
        name,
        email,
        password,
        type: userType,
        ...(userType === 'teacher' && { classInfo }),
        ...(userType === 'student' && { grade, parentEmail, parentPhone })
      };

      try {
        const response = await authAPI.register(registrationData);
        const userData = response.data.user;
        login(userData);
      } catch (apiError) {
        // Fallback to demo mode
        console.log('API not available, using demo mode');
        const userData = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          email,
          type: userType,
          ...(userType === 'teacher' && {
            classInfo,
            subjects: classInfo.includes('Math') ? ['Mathematics'] : ['English']
          }),
          ...(userType === 'student' && {
            grade,
            parentEmail,
            parentPhone
          })
        };
        login(userData);
      }
      
      toast.success(`${t('auth.register.welcomeMessage')}, ${name}!`);
      
      // Redirect based on user type
      if (userType === 'teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(t('auth.register.error') || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    
    // Demo login with sample data
    setTimeout(() => {
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        type: userType,
        ...(userType === 'teacher' && {
          classInfo,
          subjects: classInfo.includes('Math') ? ['Mathematics'] : ['English']
        }),
        ...(userType === 'student' && {
          grade,
          parentEmail,
          parentPhone
        })
      };
      
      login(userData);
      toast.success(`${t('auth.register.welcomeMessage')}, ${name}!`);
      
      // Redirect based on user type
      if (userType === 'teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/student/dashboard');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const grades = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10',
    'Grade 11', 'Grade 12'
  ];

  return (
    <div className={`min-h-screen morphing-bg pattern-dots flex items-center justify-center p-4 ${animationClass}`}>
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Image */}
        <div className="hidden lg:block slide-in-left">
          <div className="relative card-tilt">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80"
              alt="Education and learning"
              className="rounded-3xl shadow-2xl w-full h-auto hover-lift"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent rounded-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30 animate-float"></div>
          </div>
        </div>

        {/* Right side - Registration Form */}
        <div className="w-full max-w-md mx-auto slide-in-right">
          <div className="mb-8 text-center">
            <Link to="/" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 mb-6 hover-scale magnetic-hover">
              <ArrowLeft className="h-4 w-4" />
              <span>{t('auth.register.backToHome')}</span>
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2 animate-gradient-text">{t('auth.register.joinSahayak')}</h1>
            <p className="text-gray-600">{t('auth.register.createAccountDesc')}</p>
          </div>

          <Card className="shadow-xl glass-effect card-tilt hover-lift">
            <CardHeader>
              <CardTitle className="animate-gradient-text">{t('auth.register.title')}</CardTitle>
              <CardDescription>
                {t('auth.register.chooseAccountType')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={userType} onValueChange={setUserType} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 glass-effect">
                  <TabsTrigger value="teacher" className="flex items-center space-x-2 btn-3d">
                    <span>Teacher</span>
                  </TabsTrigger>
                  <TabsTrigger value="student" className="flex items-center space-x-2 btn-3d">
                    <span>Student</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="teacher">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="teacher-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 animate-breathe" />
                        <Input
                          id="teacher-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10 glass-effect transition-all duration-300 focus:shadow-lg focus:shadow-primary/20"
                          placeholder="Dr. Sarah Wilson"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="teacher-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 animate-breathe" />
                        <Input
                          id="teacher-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 glass-effect transition-all duration-300 focus:shadow-lg focus:shadow-primary/20"
                          placeholder="teacher@school.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="teacher-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 animate-breathe" />
                        <Input
                          id="teacher-password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 glass-effect transition-all duration-300 focus:shadow-lg focus:shadow-primary/20"
                          placeholder="Create a strong password"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="class-info">Class Information</Label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-400 animate-breathe" />
                        <Input
                          id="class-info"
                          type="text"
                          value={classInfo}
                          onChange={(e) => setClassInfo(e.target.value)}
                          className="pl-10 glass-effect transition-all duration-300 focus:shadow-lg focus:shadow-primary/20"
                          placeholder="e.g., Grade 5 Mathematics"
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full btn-3d gradient-bg hover-glow ripple-effect" 
                      disabled={isLoading}
                    >
                      {isLoading ? t('auth.register.creating') : t('auth.register.createTeacherAccount')}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="student">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 animate-breathe" />
                        <Input
                          id="student-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10 glass-effect transition-all duration-300 focus:shadow-lg focus:shadow-primary/20"
                          placeholder="Alex Johnson"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 animate-breathe" />
                        <Input
                          id="student-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 glass-effect transition-all duration-300 focus:shadow-lg focus:shadow-primary/20"
                          placeholder="student@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 animate-breathe" />
                        <Input
                          id="student-password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 glass-effect transition-all duration-300 focus:shadow-lg focus:shadow-primary/20"
                          placeholder="Create a strong password"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade</Label>
                      <Select value={grade} onValueChange={setGrade}>
                        <SelectTrigger className="glass-effect transition-all duration-300 focus:shadow-lg focus:shadow-primary/20">
                          <SelectValue placeholder="Select your grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {grades.map((gradeOption) => (
                            <SelectItem key={gradeOption} value={gradeOption}>
                              {gradeOption}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="parent-email">Parent's Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 animate-breathe" />
                        <Input
                          id="parent-email"
                          type="email"
                          value={parentEmail}
                          onChange={(e) => setParentEmail(e.target.value)}
                          className="pl-10 glass-effect transition-all duration-300 focus:shadow-lg focus:shadow-primary/20"
                          placeholder="parent@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="parent-phone">Parent's Mobile Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400 animate-breathe" />
                        <Input
                          id="parent-phone"
                          type="tel"
                          value={parentPhone}
                          onChange={(e) => setParentPhone(e.target.value)}
                          className="pl-10 glass-effect transition-all duration-300 focus:shadow-lg focus:shadow-primary/20"
                          placeholder="+91 9876543210"
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full btn-3d gradient-bg hover-glow ripple-effect" 
                      disabled={isLoading}
                    >
                      {isLoading ? t('auth.register.creating') : t('auth.register.createStudentAccount')}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center text-sm">
                <span className="text-gray-600">Already have an account? </span>
                <Link to="/login" className="text-primary hover:underline hover-scale magnetic-hover">
                  Sign in here
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}