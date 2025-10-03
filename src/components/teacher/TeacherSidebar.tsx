import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '../ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Hop as Home, FileText, Sparkles, ChartBar as BarChart3, Circle as HelpCircle, Calendar, LogOut } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export function TeacherSidebar() {
  const { user, logout } = React.useContext(AuthContext);
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    {
      title: t('teacher.sidebar.dashboard'),
      url: '/teacher/dashboard',
      icon: Home,
    },
    {
      title: t('teacher.sidebar.worksheets'),
      url: '/teacher/worksheet-generator',
      icon: FileText,
    },
    {
      title: t('teacher.sidebar.contentEnhancer'),
      url: '/teacher/content-enhancer',
      icon: Sparkles,
    },
    {
      title: t('teacher.sidebar.schedule'),
      url: '/teacher/scheduled-content',
      icon: Calendar,
    },
    {
      title: t('teacher.sidebar.performance'),
      url: '/teacher/performance-tracker',
      icon: BarChart3,
    },
    {
      title: t('teacher.sidebar.doubts'),
      url: '/teacher/doubt-solver',
      icon: HelpCircle,
    },
  ];

  return (
    <Sidebar className="sidebar-gradient">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-5">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <div className="grid flex-1 text-left leading-tight">
            <span className="truncate font-semibold text-base text-sidebar-foreground">{t('app.title')}</span>
            <span className="truncate text-xs text-muted-foreground">{t('teacher.dashboard.title')}</span>
          </div>
          <SidebarTrigger className="-mr-1" />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.url;
            
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive}
                  className="w-full"
                >
                  <Link to={item.url} className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src="" alt={user?.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user?.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.classInfo || 'Teacher'}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start h-9"
        >
          <LogOut className="h-4 w-4 mr-2" />
          {t('nav.logout')}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}