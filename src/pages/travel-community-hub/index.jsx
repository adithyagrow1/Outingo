import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import PostCard from './components/PostCard';
import UserProfileCard from './components/UserProfileCard';
import ActivityFilter from './components/ActivityFilter';
import FeaturedContent from './components/FeaturedContent';
import CommunitySearch from './components/CommunitySearch';
import CreatePostModal from './components/CreatePostModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TravelCommunityHub = () => {
  const [posts, setPosts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [followingUsers, setFollowingUsers] = useState(new Set());

  // Mock data
  const mockPosts = [
    {
      id: 1,
      author: {
        id: 'user1',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        isVerified: true
      },
      content: `Just returned from an incredible 2-week backpacking adventure through Southeast Asia! 🎒✨\n\nThe temples of Angkor Wat at sunrise were absolutely breathtaking, and the street food in Bangkok exceeded all expectations. Met so many amazing fellow travelers along the way.\n\nSwipe to see some highlights from the journey!`,
      images: [
        'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=600&h=400&fit=crop'
      ],
      location: 'Siem Reap, Cambodia',
      tags: ['backpacking', 'southeast-asia', 'temples', 'street-food'],
      timestamp: new Date(Date.now() - 3600000),
      likes: 127,
      comments: [
        {
          id: 1,
          author: {
            name: 'Mike Rodriguez',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
          },
          content: 'Amazing photos! How was the weather during your visit?',
          timestamp: new Date(Date.now() - 1800000)
        },
        {
          id: 2,
          author: {
            name: 'Emma Thompson',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
          },
          content: 'This is giving me serious wanderlust! Adding Cambodia to my bucket list 🙌',
          timestamp: new Date(Date.now() - 900000)
        }
      ],
      isLiked: false
    },
    {
      id: 2,
      author: {
        id: 'user2',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        isVerified: false
      },
      content: `Pro tip for budget travelers: Always carry a reusable water bottle! 💧\n\nNot only is it environmentally friendly, but it can save you hundreds of dollars during long trips. Most airports and many public places have free water refill stations.\n\nWhat's your favorite money-saving travel hack?`,
      images: [],
      location: 'Global',
      tags: ['budget-travel', 'tips', 'sustainability'],
      timestamp: new Date(Date.now() - 7200000),
      likes: 89,
      comments: [
        {
          id: 3,
          author: {
            name: 'Lisa Park',avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
          },
          content: 'Great tip! I also always pack snacks to avoid overpriced airport food.',
          timestamp: new Date(Date.now() - 3600000)
        }
      ],
      isLiked: true
    },
    {
      id: 3,
      author: {
        id: 'user3',name: 'Maria Garcia',avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
        isVerified: true
      },
      content: `Review: Hostel Luna in Barcelona ⭐⭐⭐⭐⭐\n\nLocation: Perfect! 5 minutes walk to Las Ramblas\nCleanliness: Spotless rooms and bathrooms\nStaff: Super friendly and helpful with recommendations\nPrice: €25/night for a dorm bed\n\nHighly recommend for solo travelers and backpackers!`,
      images: [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop'
      ],
      location: 'Barcelona, Spain',
      tags: ['hostel-review', 'barcelona', 'budget-accommodation'],
      timestamp: new Date(Date.now() - 10800000),
      likes: 156,
      comments: [
        {
          id: 4,
          author: {
            name: 'David Kim',avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
          },
          content: 'Thanks for the review! Booking this for my Barcelona trip next month.',
          timestamp: new Date(Date.now() - 5400000)
        }
      ],
      isLiked: false
    }
  ];

  const mockUsers = [
    {
      id: 'user4',
      name: 'Jennifer Wu',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      bio: 'Digital nomad exploring the world one city at a time',
      location: 'Currently in Tokyo, Japan',
      joinedDate: 'Mar 2023',
      isOnline: true,
      isVerified: true,
      stats: {
        countries: 23,
        trips: 47,
        followers: '8.2K'
      },
      badges: [
        { name: 'Explorer', icon: 'Compass' },
        { name: 'Photographer', icon: 'Camera' },
        { name: 'Foodie', icon: 'UtensilsCrossed' }
      ],
      recentAdventures: [
        {
          location: 'Tokyo',
          image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=200&h=200&fit=crop'
        },
        {
          location: 'Kyoto',
          image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200&h=200&fit=crop'
        },
        {
          location: 'Osaka',
          image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=200&h=200&fit=crop'
        }
      ],
      mutualConnections: [
        {
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
        }
      ]
    },
    {
      id: 'user5',
      name: 'Tom Anderson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      bio: 'Adventure photographer & mountain climber',
      location: 'Denver, Colorado',
      joinedDate: 'Jan 2022',
      isOnline: false,
      isVerified: false,
      stats: {
        countries: 15,
        trips: 32,
        followers: '3.1K'
      },
      badges: [
        { name: 'Mountaineer', icon: 'Mountain' },
        { name: 'Photographer', icon: 'Camera' }
      ],
      recentAdventures: [
        {
          location: 'Rocky Mountains',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop'
        },
        {
          location: 'Yosemite',
          image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=200&fit=crop'
        }
      ],
      mutualConnections: []
    }
  ];

  const mockFeaturedPosts = [
    {
      id: 'featured1',
      title: 'The Ultimate Guide to Solo Female Travel in Southeast Asia',
      thumbnail: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=200&h=200&fit=crop',
      author: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      location: 'Southeast Asia',
      category: 'guide',
      likes: 1247,
      comments: 89,
      views: '12.5K',
      readTime: '8 min read',
      rating: null
    },
    {
      id: 'featured2',
      title: 'Hidden Gems of Iceland: 10 Places Tourists Never Visit',
      thumbnail: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=200&h=200&fit=crop',
      author: {
        name: 'Erik Larsson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      location: 'Iceland',
      category: 'destination',
      likes: 892,
      comments: 156,
      views: '8.9K',
      readTime: '12 min read',
      rating: null
    },
    {
      id: 'featured3',
      title: 'Blue Lagoon Spa Review: Is It Worth the Hype?',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop',
      author: {
        name: 'Anna Schmidt',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      },
      location: 'Reykjavik, Iceland',
      category: 'review',
      likes: 567,
      comments: 78,
      views: '5.2K',
      readTime: '6 min read',
      rating: 4.2
    }
  ];

  const filterCounts = {
    all: 156,
    following: 23,
    photos: 89,
    reviews: 34,
    tips: 45,
    itineraries: 12
  };

  const recentSearches = [
    'Solo travel tips',
    'Best hostels in Europe',
    'Budget backpacking Asia',
    'Sarah Chen'
  ];

  const suggestedUsers = [
    {
      id: 'suggested1',
      name: 'Chris Taylor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      mutualConnections: 3
    },
    {
      id: 'suggested2',
      name: 'Nina Patel',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      mutualConnections: 7
    }
  ];

  useEffect(() => {
    // Simulate loading posts
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLike = (postId) => {
    setPosts(prevPosts =>
      prevPosts?.map(post =>
        post?.id === postId
          ? {
              ...post,
              isLiked: !post?.isLiked,
              likes: post?.isLiked ? post?.likes - 1 : post?.likes + 1
            }
          : post
      )
    );
  };

  const handleComment = (postId, commentText) => {
    const newComment = {
      id: Date.now(),
      author: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      content: commentText,
      timestamp: new Date()
    };

    setPosts(prevPosts =>
      prevPosts?.map(post =>
        post?.id === postId
          ? {
              ...post,
              comments: [...post?.comments, newComment]
            }
          : post
      )
    );
  };

  const handleShare = (post) => {
    // Simulate sharing functionality
    console.log('Sharing post:', post);
    // In a real app, this would open a share dialog or copy link to clipboard
  };

  const handleFollow = (userId) => {
    setFollowingUsers(prev => {
      const newSet = new Set(prev);
      if (newSet?.has(userId)) {
        newSet?.delete(userId);
      } else {
        newSet?.add(userId);
      }
      return newSet;
    });
  };

  const handleMessage = (userId) => {
    console.log('Opening message dialog for user:', userId);
    // In a real app, this would open a messaging interface
  };

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    // In a real app, this would filter the posts based on the selected filter
  };

  const handleSearch = (searchResult) => {
    console.log('Search result selected:', searchResult);
    // In a real app, this would navigate to the selected result
  };

  const handleViewPost = (postId) => {
    console.log('Viewing post:', postId);
    // In a real app, this would navigate to the post detail page
  };

  const handleCreatePost = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const filteredPosts = posts?.filter(post => {
    switch (activeFilter) {
      case 'following':
        return followingUsers?.has(post?.author?.id);
      case 'photos':
        return post?.images && post?.images?.length > 0;
      case 'reviews':
        return post?.tags?.some(tag => tag?.includes('review'));
      case 'tips':
        return post?.tags?.some(tag => tag?.includes('tip'));
      case 'itineraries':
        return post?.tags?.some(tag => tag?.includes('itinerary'));
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Travel Community Hub - OUTINGO</title>
        <meta name="description" content="Connect with fellow travelers, share experiences, and discover amazing destinations through our vibrant travel community." />
      </Helmet>
      <Header />
      <main className="container mx-auto px-6 lg:px-8 py-8">
        <Breadcrumbs />
        
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Travel Community Hub</h1>
            <p className="text-muted-foreground">
              Connect with fellow travelers, share experiences, and discover amazing destinations
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setIsCreatePostOpen(true)}
            >
              Create Post
            </Button>
            <Button variant="outline" iconName="Users" iconPosition="left">
              Find Friends
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Filters & Search */}
          <div className="lg:col-span-1 space-y-6">
            <CommunitySearch
              onSearch={handleSearch}
              recentSearches={recentSearches}
              suggestedUsers={suggestedUsers}
            />
            <ActivityFilter
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
              filters={filterCounts}
            />
          </div>

          {/* Main Content - Posts Feed */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3]?.map((i) => (
                  <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-muted rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-32"></div>
                        <div className="h-3 bg-muted rounded w-24"></div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </div>
                    <div className="h-48 bg-muted rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPosts?.length > 0 ? (
                  filteredPosts?.map((post) => (
                    <PostCard
                      key={post?.id}
                      post={post}
                      onLike={handleLike}
                      onComment={handleComment}
                      onShare={handleShare}
                    />
                  ))
                ) : (
                  <div className="bg-card border border-border rounded-lg p-12 text-center">
                    <Icon name="Users" size={48} className="text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      No posts found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Try changing your filter or follow more travelers to see their posts.
                    </p>
                    <Button
                      variant="outline"
                      iconName="Plus"
                      iconPosition="left"
                      onClick={() => setIsCreatePostOpen(true)}
                    >
                      Create Your First Post
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Sidebar - Featured Content & Users */}
          <div className="lg:col-span-1 space-y-6">
            <FeaturedContent
              featuredPosts={mockFeaturedPosts}
              onViewPost={handleViewPost}
            />
            
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Suggested Travelers</h3>
              {mockUsers?.map((user) => (
                <UserProfileCard
                  key={user?.id}
                  user={user}
                  onFollow={handleFollow}
                  onMessage={handleMessage}
                  isFollowing={followingUsers?.has(user?.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onCreatePost={handleCreatePost}
      />
      {/* Quick Action Toolbar */}
      <QuickActionToolbar isFloating={true} position="bottom-right" />
    </div>
  );
};

export default TravelCommunityHub;