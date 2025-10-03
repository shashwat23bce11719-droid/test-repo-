import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { AuthContext } from '../../App';
import { LogOut, User } from 'lucide-react';
import { LanguageSelector } from '../i18n/LanguageSelector';
import { useLanguage } from '../i18n/LanguageContext';
import { authAPI } from '../../services/api';
import { toast } from 'sonner';

export function Navbar() {
  const { isAuthenticated, user, logout } = React.useContext(AuthContext);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authAPI.logout();
      logout();
      toast.success(t('auth.logout.success') || 'Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      logout(); // Force logout even if API call fails
      navigate('/');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className={`bg-white border-b border-border sticky top-0 z-50 transition-all duration-200 ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center transition-all duration-200 group-hover:bg-primary/90">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
                {t('app.title')}
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground hover:bg-muted px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/about"
                className="text-muted-foreground hover:text-foreground hover:bg-muted px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                {t('nav.about')}
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSelector />
            {isAuthenticated ? (
              <div className="flex items-center space-x-3 bg-muted/50 px-3 py-2 rounded-lg border border-border">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{user?.name}</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-md font-medium">
                    {user?.type}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center space-x-1 h-8"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{isLoggingOut ? t('common.loading') : t('nav.logout')}</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="h-9">{t('nav.login')}</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="h-9">{t('nav.register')}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}