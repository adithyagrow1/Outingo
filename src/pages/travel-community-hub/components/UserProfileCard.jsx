import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UserProfileCard = ({ user, onFollow, onMessage, isFollowing = false }) => {
  const handleFollow = () => {
    onFollow(user?.id);
  };

  const handleMessage = () => {
    onMessage(user?.id);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-4">
      {/* Profile Header */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <Image
            src={user?.avatar}
            alt={user?.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {user?.isOnline && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-success border-2 border-card rounded-full"></div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-card-foreground">{user?.name}</h3>
            {user?.isVerified && (
              <Icon name="BadgeCheck" size={16} className="text-primary" />
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-2">{user?.bio}</p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={12} />
              <span>{user?.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={12} />
              <span>Joined {user?.joinedDate}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Travel Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-muted rounded-lg">
        <div className="text-center">
          <div className="font-semibold text-card-foreground">{user?.stats?.countries}</div>
          <div className="text-xs text-muted-foreground">Countries</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-card-foreground">{user?.stats?.trips}</div>
          <div className="text-xs text-muted-foreground">Trips</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-card-foreground">{user?.stats?.followers}</div>
          <div className="text-xs text-muted-foreground">Followers</div>
        </div>
      </div>
      {/* Travel Badges */}
      {user?.badges && user?.badges?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-card-foreground mb-2">Travel Badges</h4>
          <div className="flex flex-wrap gap-2">
            {user?.badges?.slice(0, 3)?.map((badge, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                <Icon name={badge?.icon} size={12} />
                <span>{badge?.name}</span>
              </div>
            ))}
            {user?.badges?.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                +{user?.badges?.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
      {/* Recent Adventures */}
      {user?.recentAdventures && user?.recentAdventures?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-card-foreground mb-2">Recent Adventures</h4>
          <div className="grid grid-cols-3 gap-2">
            {user?.recentAdventures?.slice(0, 3)?.map((adventure, index) => (
              <div key={index} className="relative group cursor-pointer">
                <Image
                  src={adventure?.image}
                  alt={adventure?.location}
                  className="w-full h-16 object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-smooth rounded-md flex items-center justify-center">
                  <span className="text-white text-xs font-medium text-center px-1">
                    {adventure?.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button
          variant={isFollowing ? "outline" : "default"}
          size="sm"
          onClick={handleFollow}
          className="flex-1"
          iconName={isFollowing ? "UserMinus" : "UserPlus"}
          iconPosition="left"
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleMessage}
          iconName="MessageCircle"
          iconPosition="left"
        >
          Message
        </Button>
      </div>
      {/* Mutual Connections */}
      {user?.mutualConnections && user?.mutualConnections?.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {user?.mutualConnections?.slice(0, 3)?.map((connection, index) => (
                <Image
                  key={index}
                  src={connection?.avatar}
                  alt={connection?.name}
                  className="w-6 h-6 rounded-full border-2 border-card object-cover"
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {user?.mutualConnections?.length} mutual connection{user?.mutualConnections?.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileCard;