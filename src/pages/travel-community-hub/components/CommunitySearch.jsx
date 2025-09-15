import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const CommunitySearch = ({ onSearch, recentSearches, suggestedUsers }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const searchTabs = [
    { id: 'all', label: 'All', icon: 'Search' },
    { id: 'users', label: 'People', icon: 'Users' },
    { id: 'destinations', label: 'Places', icon: 'MapPin' },
    { id: 'posts', label: 'Posts', icon: 'FileText' }
  ];

  const handleSearch = async (query) => {
    if (!query?.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    // Simulate search API call
    setTimeout(() => {
      const mockResults = [
        {
          type: 'user',
          id: 1,
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
          bio: 'Adventure photographer & travel blogger',
          followers: '12.5K',
          isVerified: true
        },
        {
          type: 'destination',
          id: 2,
          name: 'Santorini, Greece',
          image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=300&h=200&fit=crop',
          posts: 1247,
          rating: 4.8
        },
        {
          type: 'post',
          id: 3,
          title: 'Ultimate Guide to Backpacking Southeast Asia',
          author: 'Mike Rodriguez',
          thumbnail: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=100&h=100&fit=crop',
          likes: 342,
          category: 'guide'
        }
      ];
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 500);
  };

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleResultClick = (result) => {
    onSearch(result);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      {/* Search Header */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search people, places, or experiences..."
            value={searchQuery}
            onChange={handleInputChange}
            className="pl-10 pr-10"
          />
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={18} />
            </button>
          )}
        </div>
      </div>
      {/* Search Tabs */}
      <div className="px-4 py-2 border-b border-border">
        <div className="flex space-x-1">
          {searchTabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Search Results */}
      {searchQuery && (
        <div className="max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-8 text-center">
              <Icon name="Loader2" size={24} className="animate-spin text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Searching...</p>
            </div>
          ) : searchResults?.length > 0 ? (
            <div className="divide-y divide-border">
              {searchResults?.map((result) => (
                <div
                  key={`${result?.type}-${result?.id}`}
                  onClick={() => handleResultClick(result)}
                  className="p-4 hover:bg-muted/50 cursor-pointer transition-smooth"
                >
                  {result?.type === 'user' && (
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Image
                          src={result?.avatar}
                          alt={result?.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {result?.isVerified && (
                          <Icon name="BadgeCheck" size={14} className="absolute -bottom-1 -right-1 text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-card-foreground">{result?.name}</h4>
                        <p className="text-sm text-muted-foreground">{result?.bio}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Icon name="Users" size={12} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{result?.followers} followers</span>
                        </div>
                      </div>
                      <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                    </div>
                  )}

                  {result?.type === 'destination' && (
                    <div className="flex items-center space-x-3">
                      <Image
                        src={result?.image}
                        alt={result?.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-card-foreground">{result?.name}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1">
                            <Icon name="FileText" size={12} className="text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{result?.posts} posts</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Star" size={12} className="text-warning" />
                            <span className="text-xs text-muted-foreground">{result?.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                    </div>
                  )}

                  {result?.type === 'post' && (
                    <div className="flex items-center space-x-3">
                      <Image
                        src={result?.thumbnail}
                        alt={result?.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-card-foreground text-sm line-clamp-1">{result?.title}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-muted-foreground">by {result?.author}</span>
                          <div className="flex items-center space-x-1">
                            <Icon name="Heart" size={12} className="text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{result?.likes}</span>
                          </div>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {result?.category}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Icon name="Search" size={48} className="text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">No results found for "{searchQuery}"</p>
              <p className="text-xs text-muted-foreground mt-1">Try different keywords or browse suggested content below</p>
            </div>
          )}
        </div>
      )}
      {/* Recent Searches & Suggestions */}
      {!searchQuery && (
        <div className="p-4">
          {recentSearches && recentSearches?.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-card-foreground mb-3">Recent Searches</h4>
              <div className="space-y-2">
                {recentSearches?.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search)}
                    className="flex items-center space-x-3 w-full p-2 hover:bg-muted rounded-lg transition-smooth"
                  >
                    <Icon name="Clock" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-card-foreground">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {suggestedUsers && suggestedUsers?.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-card-foreground mb-3">Suggested People</h4>
              <div className="space-y-3">
                {suggestedUsers?.map((user) => (
                  <div key={user?.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <h5 className="text-sm font-medium text-card-foreground">{user?.name}</h5>
                        <p className="text-xs text-muted-foreground">{user?.mutualConnections} mutual</p>
                      </div>
                    </div>
                    <Button variant="outline" size="xs">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunitySearch;