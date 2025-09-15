import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const CreatePostModal = ({ isOpen, onClose, onCreatePost }) => {
  const [postContent, setPostContent] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [postType, setPostType] = useState('general');
  const [privacy, setPrivacy] = useState('public');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const postTypes = [
    { id: 'general', label: 'General Post', icon: 'FileText' },
    { id: 'photo', label: 'Photo Story', icon: 'Camera' },
    { id: 'review', label: 'Place Review', icon: 'Star' },
    { id: 'tip', label: 'Travel Tip', icon: 'Lightbulb' },
    { id: 'itinerary', label: 'Itinerary', icon: 'Map' }
  ];

  const privacyOptions = [
    { id: 'public', label: 'Public', icon: 'Globe', description: 'Anyone can see this post' },
    { id: 'followers', label: 'Followers', icon: 'Users', description: 'Only your followers can see this' },
    { id: 'private', label: 'Private', icon: 'Lock', description: 'Only you can see this post' }
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e?.target?.files);
    const imageUrls = files?.map(file => URL.createObjectURL(file));
    setSelectedImages(prev => [...prev, ...imageUrls]);
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev?.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (newTag?.trim() && !tags?.includes(newTag?.trim())) {
      setTags(prev => [...prev, newTag?.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(prev => prev?.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    if (!postContent?.trim()) return;

    setIsSubmitting(true);
    
    const newPost = {
      id: Date.now(),
      content: postContent,
      images: selectedImages,
      location,
      tags,
      type: postType,
      privacy,
      timestamp: new Date(),
      author: {
        id: 'current-user',
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        isVerified: false
      },
      likes: 0,
      comments: [],
      isLiked: false
    };

    // Simulate API call
    setTimeout(() => {
      onCreatePost(newPost);
      resetForm();
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const resetForm = () => {
    setPostContent('');
    setSelectedImages([]);
    setLocation('');
    setTags([]);
    setNewTag('');
    setPostType('general');
    setPrivacy('public');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevated w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-card-foreground">Create Post</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Post Type Selection */}
          <div className="mb-4">
            <label className="text-sm font-medium text-card-foreground mb-2 block">Post Type</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {postTypes?.map((type) => (
                <button
                  key={type?.id}
                  onClick={() => setPostType(type?.id)}
                  className={`flex items-center space-x-2 p-3 rounded-lg border transition-smooth ${
                    postType === type?.id
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:bg-muted'
                  }`}
                >
                  <Icon name={type?.icon} size={16} />
                  <span className="text-sm font-medium">{type?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Input */}
          <div className="mb-4">
            <textarea
              placeholder="What's on your mind? Share your travel experience..."
              value={postContent}
              onChange={(e) => setPostContent(e?.target?.value)}
              className="w-full h-32 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary text-card-foreground bg-background"
            />
          </div>

          {/* Location Input */}
          <div className="mb-4">
            <Input
              label="Location"
              type="text"
              placeholder="Where are you posting from?"
              value={location}
              onChange={(e) => setLocation(e?.target?.value)}
              className="mb-0"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="text-sm font-medium text-card-foreground mb-2 block">Photos</label>
            <div className="border-2 border-dashed border-border rounded-lg p-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Icon name="Upload" size={24} className="text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">Click to upload photos</span>
              </label>
            </div>

            {/* Selected Images Preview */}
            {selectedImages?.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {selectedImages?.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground rounded-full flex items-center justify-center"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="mb-4">
            <label className="text-sm font-medium text-card-foreground mb-2 block">Tags</label>
            <div className="flex space-x-2 mb-2">
              <Input
                type="text"
                placeholder="Add a tag..."
                value={newTag}
                onChange={(e) => setNewTag(e?.target?.value)}
                onKeyPress={(e) => e?.key === 'Enter' && addTag()}
                className="flex-1 mb-0"
              />
              <Button variant="outline" onClick={addTag} disabled={!newTag?.trim()}>
                Add
              </Button>
            </div>
            {tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded-full"
                  >
                    <span>#{tag}</span>
                    <button onClick={() => removeTag(tag)}>
                      <Icon name="X" size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Privacy Settings */}
          <div className="mb-6">
            <label className="text-sm font-medium text-card-foreground mb-2 block">Privacy</label>
            <div className="space-y-2">
              {privacyOptions?.map((option) => (
                <label key={option?.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="privacy"
                    value={option?.id}
                    checked={privacy === option?.id}
                    onChange={(e) => setPrivacy(e?.target?.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <div className="flex items-center space-x-2">
                    <Icon name={option?.icon} size={16} className="text-muted-foreground" />
                    <div>
                      <span className="text-sm font-medium text-card-foreground">{option?.label}</span>
                      <p className="text-xs text-muted-foreground">{option?.description}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>{postContent?.length}/2000</span>
            {selectedImages?.length > 0 && (
              <span>{selectedImages?.length} photo{selectedImages?.length !== 1 ? 's' : ''}</span>
            )}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSubmit}
              disabled={!postContent?.trim() || isSubmitting}
              loading={isSubmitting}
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;