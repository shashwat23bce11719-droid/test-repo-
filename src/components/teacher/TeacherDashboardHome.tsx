import React, { useState, useEffect } from 'react';
import { AuthContext } from '../../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Plus, Users, FileText, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { teacherAPI } from '../../services/api';

export function TeacherDashboardHome() {
  const { user } = React.useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    setAnimationClass('fade-in');
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await teacherAPI.getDashboardData();
      setDashboardData(response.data);
    } catch (error) {
      console.log('API not available, using demo data');
      // Use existing demo data
    } finally {
      setIsLoading(false);
    }
  };

  const classes = [
    {
      id: 1,
      name: 'Grade 5 Mathematics',
      students: 28,
      subject: 'Mathematics',
      schedule: 'Mon, Wed, Fri - 10:00 AM'
    },
    {
      id: 2,
      name: 'Grade 6 Mathematics',
      students: 25,
      subject: 'Mathematics', 
      schedule: 'Tue, Thu - 11:30 AM'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Generated worksheet for Algebra basics',
      time: '2 hours ago',
      type: 'worksheet'
    },
    {
      id: 2,
      action: 'Alex Johnson submitted doubt about fractions',
      time: '4 hours ago',
      type: 'doubt'
    },
    {
      id: 3,
      action: 'Performance report generated for Grade 5',
      time: '1 day ago',
      type: 'report'
    },
    {
      id: 4,
      action: 'Enhanced content for geometry lesson',
      time: '2 days ago',
      type: 'content'
    }
  ];

  const stats = [
    {
      title: 'Total Students',
      value: '53',
      icon: Users,
      color: 'gradient-bg-blue shadow-lg',
      glowClass: 'hover-glow'
    },
    {
      title: 'Worksheets Created',
      value: '127',
      icon: FileText,
      color: 'gradient-bg-green shadow-lg',
      glowClass: 'success-glow'
    },
    {
      title: 'Avg Performance',
      value: '85%',
      icon: TrendingUp,
      color: 'gradient-bg-purple shadow-lg',
      glowClass: 'hover-glow'
    },
    {
      title: 'Pending Doubts',
      value: '3',
      icon: Clock,
      color: 'gradient-bg-orange shadow-lg',
      glowClass: 'warning-glow'
    }
  ];

  return (
    <div className={`space-y-6 ${animationClass}`}>
      {/* Teacher Profile Section */}
      <div className="flex items-center justify-between">
        <Link 
          to="/teacher/profile" 
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-all duration-300 cursor-pointer glass-effect hover-lift magnetic-hover"
        >
          <Avatar className="h-12 w-12 animate-breathe">
            <AvatarImage src={user?.profilePhoto} alt={user?.name} />
            <AvatarFallback>
              {user?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-medium animate-gradient-text">{user?.name}</h2>
            <p className="text-sm text-muted-foreground">Mathematics Teacher</p>
          </div>
        </Link>
      </div>

      {/* Stats Cards - Smaller */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 scale-in">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index} 
              className={`p-4 glass-effect hover-lift card-tilt transition-all duration-500 border-2 border-primary/20 ${stat.glowClass} magnetic-hover`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="flex items-center justify-between p-0">
                <div>
                  <p className="text-sm font-bold animate-gradient-text">{stat.title}</p>
                  <p className="text-2xl font-black animate-gradient-text animate-breathe">{stat.value}</p>
                </div>
                <div className={`h-12 w-12 ${stat.color} rounded-2xl flex items-center justify-center shadow-xl btn-3d animate-bounce-gentle`}>
                  <Icon className="h-6 w-6 text-white drop-shadow-lg animate-breathe" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* My Classes - Google Classroom Style Cards */}
      <div className="slide-in-left">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold animate-gradient-text">My Classes</h2>
            <p className="text-muted-foreground mt-1">Manage your current classes and students</p>
          </div>
          <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10 btn-3d glass-effect hover-glow shadow-md">
            <Plus className="h-4 w-4 mr-2" />
            Add Class
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem, index) => (
            <Link key={classItem.id} to={`/teacher/class/${classItem.id}`}>
              <Card className="overflow-hidden glass-effect border-2 border-primary/20 card-tilt hover-lift transition-all duration-300 cursor-pointer group shadow-xl magnetic-hover h-full">
                <div
                  className="h-28 relative bg-gradient-to-br from-primary via-purple-500 to-pink-500 overflow-hidden"
                  style={{
                    backgroundImage: index % 2 === 0
                      ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)'
                      : 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #6366f1 100%)'
                  }}
                >
                  <div className="absolute inset-0 pattern-dots opacity-20"></div>
                  <div className="absolute top-4 right-4">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:animate-gradient-text transition-all">
                    {classItem.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {classItem.subject}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium">{classItem.students} students</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="font-medium">{classItem.schedule}</span>
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 pb-6">
                  <Button
                    variant="outline"
                    className="w-full btn-3d glass-effect hover-glow group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all"
                  >
                    Open Class
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 slide-in-left mt-6">
        {/* Empty card to maintain 3-column structure if needed */}
        <div className="lg:col-span-2"></div>

        {/* Recent Activities */}
        <Card className="glass-effect card-tilt hover-lift">
          <CardHeader>
            <CardTitle className="animate-gradient-text">Recent Activities</CardTitle>
            <CardDescription>
              Your latest actions and updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 hover-scale transition-all duration-300">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 animate-pulse-color"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-effect card-tilt hover-lift slide-in-right">
        <CardHeader>
          <CardTitle className="animate-gradient-text">Quick Actions</CardTitle>
          <CardDescription>
            Common tasks you can perform right now
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/teacher/worksheet-generator">
              <Card className="hover:shadow-md transition-all duration-300 cursor-pointer glass-effect hover-lift card-tilt magnetic-hover">
                <CardContent className="flex items-center gap-3 p-6">
                  <FileText className="h-8 w-8 text-primary animate-breathe" />
                  <div>
                    <h3 className="font-medium">Generate Worksheet</h3>
                    <p className="text-sm text-muted-foreground">Create custom worksheets</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/teacher/performance-tracker">
              <Card className="hover:shadow-md transition-all duration-300 cursor-pointer glass-effect hover-lift card-tilt magnetic-hover">
                <CardContent className="flex items-center gap-3 p-6">
                  <TrendingUp className="h-8 w-8 text-primary animate-breathe" />
                  <div>
                    <h3 className="font-medium">View Performance</h3>
                    <p className="text-sm text-muted-foreground">Track student progress</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/teacher/doubt-solver">
              <Card className="hover:shadow-md transition-all duration-300 cursor-pointer glass-effect hover-lift card-tilt magnetic-hover">
                <CardContent className="flex items-center gap-3 p-6">
                  <Clock className="h-8 w-8 text-primary animate-breathe" />
                  <div>
                    <h3 className="font-medium">Pending Doubts</h3>
                    <p className="text-sm text-muted-foreground">Answer student questions</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}