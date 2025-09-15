import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedContent = ({ featuredPosts, onViewPost }) => {
  const handleViewPost = (postId) => {
    onViewPost(postId);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Star" size={20} className="text-warning" />
            <h3 className="font-semibold text-card-foreground">Featured Content</h3>
          </div>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {featuredPosts?.map((post, index) => (
          <div key={post?.id} className="p-4 hover:bg-muted/50 transition-smooth cursor-pointer">
            <div className="flex space-x-4">
              <div className="relative flex-shrink-0">
                <Image
                  src={post?.thumbnail}
                  alt={post?.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-warning rounded-full flex items-center justify-center">
                  <Icon name="Star" size={12} color="white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-card-foreground line-clamp-2 text-sm">
                    {post?.title}
                  </h4>
                  <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                    {post?.readTime}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={post?.author?.avatar}
                      alt={post?.author?.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="text-xs text-muted-foreground">{post?.author?.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{post?.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={12} />
                      <span>{post?.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageCircle" size={12} />
                      <span>{post?.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={12} />
                      <span>{post?.views}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {post?.category === 'review' && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} className="text-warning" />
                        <span className="text-xs font-medium text-warning">{post?.rating}</span>
                      </div>
                    )}
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      post?.category === 'review' ? 'bg-warning/10 text-warning' :
                      post?.category === 'tip' ? 'bg-success/10 text-success' :
                      post?.category === 'itinerary'? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
                    }`}>
                      {post?.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Badge */}
            {index === 0 && (
              <div className="mt-3 p-2 bg-gradient-to-r from-warning/10 to-accent/10 rounded-lg border border-warning/20">
                <div className="flex items-center space-x-2">
                  <Icon name="Trophy" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-warning">Editor's Choice</span>
                  <span className="text-xs text-muted-foreground">
                    Exceptional travel content curated by our community team
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* View More Button */}
      <div className="p-4 border-t border-border bg-muted/30">
        <Button 
          variant="outline" 
          fullWidth 
          iconName="ArrowRight" 
          iconPosition="right"
          onClick={() => handleViewPost('all')}
        >
          Explore More Featured Content
        </Button>
      </div>
    </div>
  );
};

export default FeaturedContent;