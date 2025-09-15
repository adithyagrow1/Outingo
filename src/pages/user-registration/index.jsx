import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import SocialRegistration from './components/SocialRegistration';
import RegistrationForm from './components/RegistrationForm';
import TravelPreferences from './components/TravelPreferences';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const UserRegistration = () => {
  const [showPreferences, setShowPreferences] = useState(false);
  const [userPreferences, setUserPreferences] = useState(null);

  const handlePreferencesChange = (preferences) => {
    setUserPreferences(preferences);
  };

  const togglePreferences = () => {
    setShowPreferences(!showPreferences);
  };

  const customBreadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Sign Up', path: '/user-registration', isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Create Account - OUTINGO | Start Your Adventure</title>
        <meta name="description" content="Join OUTINGO and start planning your next adventure. Create your account to access personalized travel recommendations, trip planning tools, and connect with fellow travelers." />
        <meta name="keywords" content="travel registration, create account, travel planning, adventure travel, OUTINGO signup" />
      </Helmet>
      <Header />
      <main className="container mx-auto px-6 lg:px-8 py-8">
        <Breadcrumbs customBreadcrumbs={customBreadcrumbs} />

        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full shadow-soft">
                <Icon name="UserPlus" size={32} color="white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Start Your Adventure Journey
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of travelers who trust OUTINGO to plan their perfect adventures. 
              Create your account and unlock personalized recommendations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Registration Form */}
            <div className="space-y-8">
              <div className="bg-card border border-border rounded-xl shadow-soft p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    Create Your Account
                  </h2>
                  <p className="text-muted-foreground">
                    Get started with your travel planning journey
                  </p>
                </div>

                {/* Social Registration */}
                <SocialRegistration />

                {/* Registration Form */}
                <RegistrationForm />
              </div>

              {/* Travel Preferences Toggle */}
              <div className="bg-card border border-border rounded-xl shadow-soft p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Travel Preferences
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Optional: Help us personalize your experience
                    </p>
                  </div>
                  <button
                    onClick={togglePreferences}
                    className="p-2 hover:bg-muted rounded-md transition-colors"
                  >
                    <Icon 
                      name={showPreferences ? "ChevronUp" : "ChevronDown"} 
                      size={20} 
                      className="text-muted-foreground"
                    />
                  </button>
                </div>

                {showPreferences && (
                  <div className="border-t border-border pt-6">
                    <TravelPreferences onPreferencesChange={handlePreferencesChange} />
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Benefits & Features */}
            <div className="space-y-8">
              {/* Hero Image */}
              <div className="relative overflow-hidden rounded-xl shadow-soft">
                <Image
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop"
                  alt="Adventure travelers exploring mountain landscape"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">
                    Discover Amazing Places
                  </h3>
                  <p className="text-white/90">
                    Explore hidden gems and popular destinations
                  </p>
                </div>
              </div>

              {/* Benefits List */}
              <div className="bg-card border border-border rounded-xl shadow-soft p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Why Join OUTINGO?
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                      <Icon name="MapPin" size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">
                        Personalized Recommendations
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Get destination suggestions tailored to your adventure level and interests
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
                      <Icon name="Users" size={20} className="text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">
                        Travel Community
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Connect with fellow adventurers and share your experiences
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
                      <Icon name="Calendar" size={20} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">
                        Smart Trip Planning
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Create detailed itineraries with budget tracking and collaboration tools
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
                      <Icon name="Shield" size={20} className="text-success" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">
                        Safety First
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Real-time travel advisories and safety information for your destinations
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-card border border-border rounded-xl shadow-soft p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Join Our Growing Community
                </h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                    <div className="text-sm text-muted-foreground">Active Travelers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary mb-2">200+</div>
                    <div className="text-sm text-muted-foreground">Destinations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-2">10K+</div>
                    <div className="text-sm text-muted-foreground">Trip Plans</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-success mb-2">4.8★</div>
                    <div className="text-sm text-muted-foreground">User Rating</div>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-card border border-border rounded-xl shadow-soft p-8">
                <div className="flex items-start space-x-4">
                  <Image
                    src="https://randomuser.me/api/portraits/women/32.jpg"
                    alt="Sarah Johnson testimonial"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <blockquote className="text-foreground mb-3">
                      "OUTINGO helped me discover incredible hidden gems in Southeast Asia. 
                      The personalized recommendations were spot-on!"
                    </blockquote>
                    <div className="text-sm">
                      <div className="font-medium text-foreground">Sarah Johnson</div>
                      <div className="text-muted-foreground">Adventure Photographer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-16">
        <div className="container mx-auto px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              © {new Date()?.getFullYear()} OUTINGO. All rights reserved. 
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserRegistration;