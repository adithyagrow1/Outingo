import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import TripPlanningWorkspace from './pages/trip-planning-workspace';
import UserLogin from './pages/user-login';
import TravelCommunityHub from './pages/travel-community-hub';
import UserRegistration from './pages/user-registration';
import DestinationDiscovery from './pages/destination-discovery';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DestinationDiscovery />} />
        <Route path="/trip-planning-workspace" element={<TripPlanningWorkspace />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/travel-community-hub" element={<TravelCommunityHub />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/destination-discovery" element={<DestinationDiscovery />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
