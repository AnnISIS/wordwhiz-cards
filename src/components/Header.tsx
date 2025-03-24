
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, Settings, List, Home, Layers, BookOpen } from 'lucide-react';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { title: 'Home', path: '/', icon: Home },
    { title: 'Word Lists', path: '/word-lists', icon: List },
    { title: 'Review', path: '/review', icon: Layers },
    { title: 'Dictionary', path: '/dictionary', icon: BookOpen },
    { title: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass dark:glass-dark border-b border-border/40 backdrop-blur-lg">
        <div className="container px-4 mx-auto">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <NavLink to="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold bg-clip-text text-primary">WordWhiz</span>
              </NavLink>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <span className="flex items-center space-x-1">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </span>
                </NavLink>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="glass dark:glass-dark md:hidden absolute w-full animate-slide-in">
          <div className="container px-4 py-3 mx-auto space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center space-x-2 px-3 py-3 rounded-md text-sm font-medium w-full transition-colors",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
