import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumbs = ({ customBreadcrumbs = null }) => {
  const location = useLocation();
  
  const routeLabels = {
    '/': 'Home',
    '/destination-discovery': 'Discover',
    '/trip-planning-workspace': 'Plan',
    '/travel-community-hub': 'Community',
    '/user-registration': 'Sign Up',
    '/user-login': 'Sign In',
    '/profile': 'Profile',
    '/settings': 'Settings'
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/' }];

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeLabels?.[currentPath] || segment?.replace(/-/g, ' ')?.replace(/\b\w/g, l => l?.toUpperCase());
      
      breadcrumbs?.push({
        label,
        path: currentPath,
        isLast: index === pathSegments?.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((breadcrumb, index) => (
          <li key={breadcrumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon name="ChevronRight" size={14} className="mx-2 text-muted-foreground/60" />
            )}
            {breadcrumb?.isLast ? (
              <span className="text-foreground font-medium" aria-current="page">
                {breadcrumb?.label}
              </span>
            ) : (
              <Link
                to={breadcrumb?.path}
                className="hover:text-foreground transition-smooth"
              >
                {breadcrumb?.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;