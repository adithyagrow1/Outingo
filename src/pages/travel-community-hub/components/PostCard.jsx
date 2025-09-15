import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PostCard = ({ post, onLike, onComment, onShare }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    onLike(post?.id);
  };

  const handleComment = () => {
    if (newComment?.trim()) {
      onComment(post?.id, newComment);
      setNewComment('');
    }
  };

  const handleShare = () => {
    onShare(post);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft overflow-hidden">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={post?.author?.avatar}
              alt={post?.author?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {post?.author?.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={10} color="white" />
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-card-foreground">{post?.author?.name}</h4>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="MapPin" size={12} />
              <span>{post?.location}</span>
              <span>•</span>
              <span>{formatTimeAgo(post?.timestamp)}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <Icon name="MoreHorizontal" size={20} />
        </Button>
      </div>
      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-card-foreground mb-3">{post?.content}</p>
        {post?.tags && post?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post?.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      {/* Post Images */}
      {post?.images && post?.images?.length > 0 && (
        <div className="relative">
          {post?.images?.length === 1 ? (
            <Image
              src={post?.images?.[0]}
              alt="Travel photo"
              className="w-full h-64 object-cover"
            />
          ) : (
            <div className="grid grid-cols-2 gap-1">
              {post?.images?.slice(0, 4)?.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image}
                    alt={`Travel photo ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  {index === 3 && post?.images?.length > 4 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        +{post?.images?.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Post Actions */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-smooth ${
                post?.isLiked ? 'text-error' : 'text-muted-foreground hover:text-error'
              }`}
            >
              <Icon name={post?.isLiked ? "Heart" : "Heart"} size={20} />
              <span className="text-sm">{post?.likes}</span>
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name="MessageCircle" size={20} />
              <span className="text-sm">{post?.comments?.length}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name="Share2" size={20} />
              <span className="text-sm">Share</span>
            </button>
          </div>
          <Button variant="ghost" size="icon">
            <Icon name="Bookmark" size={20} />
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="space-y-3">
            {post?.comments?.map((comment) => (
              <div key={comment?.id} className="flex space-x-3">
                <Image
                  src={comment?.author?.avatar}
                  alt={comment?.author?.name}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="bg-muted rounded-lg p-3">
                    <h5 className="font-medium text-sm text-foreground">
                      {comment?.author?.name}
                    </h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      {comment?.content}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                    <span>{formatTimeAgo(comment?.timestamp)}</span>
                    <button className="hover:text-foreground">Like</button>
                    <button className="hover:text-foreground">Reply</button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add Comment */}
            <div className="flex space-x-3 pt-2">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="Your avatar"
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 flex space-x-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e?.target?.value)}
                  className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  onKeyPress={(e) => e?.key === 'Enter' && handleComment()}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleComment}
                  disabled={!newComment?.trim()}
                >
                  <Icon name="Send" size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;