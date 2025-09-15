import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const CollaborationPanel = ({ 
  collaborators, 
  comments, 
  onInviteCollaborator, 
  onAddComment,
  onApproveItem,
  onRejectItem 
}) => {
  const [newComment, setNewComment] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [activeTab, setActiveTab] = useState('collaborators');

  const mockCollaborators = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      role: "Editor",
      status: "online",
      lastActive: "2 minutes ago",
      permissions: ["edit", "comment", "approve"]
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      role: "Viewer",
      status: "offline",
      lastActive: "1 hour ago",
      permissions: ["comment"]
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.w@email.com",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      role: "Editor",
      status: "online",
      lastActive: "5 minutes ago",
      permissions: ["edit", "comment", "approve"]
    }
  ];

  const mockComments = [
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      content: "I think we should add more time at the Louvre. 3 hours might not be enough to see everything we want.",
      timestamp: new Date(Date.now() - 1800000),
      itemId: "louvre-visit",
      itemName: "Louvre Museum Visit",
      replies: [
        {
          id: 11,
          author: "You",
          content: "Good point! I'll extend it to 4 hours. We can always leave earlier if needed.",
          timestamp: new Date(Date.now() - 1200000)
        }
      ]
    },
    {
      id: 2,
      author: "Mike Chen",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      content: "The hotel looks great, but it's a bit over our budget. Should we look for alternatives?",
      timestamp: new Date(Date.now() - 3600000),
      itemId: "hotel-booking",
      itemName: "Hotel des Grands Boulevards",
      replies: []
    },
    {
      id: 3,
      author: "Emma Wilson",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      content: "Love the Seine cruise idea! Perfect for sunset timing.",
      timestamp: new Date(Date.now() - 7200000),
      itemId: "seine-cruise",
      itemName: "Seine River Cruise",
      replies: []
    }
  ];

  const mockPendingApprovals = [
    {
      id: 1,
      type: "activity",
      name: "Montmartre Walking Tour",
      proposedBy: "Sarah Johnson",
      cost: 25.00,
      date: "Day 2",
      time: "10:00 AM",
      reason: "Added based on group interest in local art scene"
    },
    {
      id: 2,
      type: "restaurant",
      name: "Le Comptoir du Relais",
      proposedBy: "Emma Wilson",
      cost: 45.00,
      date: "Day 1",
      time: "7:30 PM",
      reason: "Highly rated traditional French bistro"
    }
  ];

  const handleAddComment = () => {
    if (newComment?.trim()) {
      onAddComment({
        content: newComment,
        timestamp: new Date()
      });
      setNewComment('');
    }
  };

  const handleInviteCollaborator = () => {
    if (inviteEmail?.trim()) {
      onInviteCollaborator(inviteEmail);
      setInviteEmail('');
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getStatusColor = (status) => {
    return status === 'online' ? 'bg-success' : 'bg-muted-foreground';
  };

  const tabs = [
    { id: 'collaborators', label: 'Team', icon: 'Users', count: mockCollaborators?.length },
    { id: 'comments', label: 'Comments', icon: 'MessageCircle', count: mockComments?.length },
    { id: 'approvals', label: 'Approvals', icon: 'CheckCircle', count: mockPendingApprovals?.length }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Users" size={24} className="text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-foreground">Collaboration</h2>
            <p className="text-sm text-muted-foreground">Work together on your trip</p>
          </div>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
              {tab?.count > 0 && (
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-6">
        {/* Collaborators Tab */}
        {activeTab === 'collaborators' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter email address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e?.target?.value)}
              />
              <Button
                variant="default"
                size="sm"
                iconName="UserPlus"
                iconPosition="left"
                onClick={handleInviteCollaborator}
                disabled={!inviteEmail?.trim()}
                fullWidth
              >
                Invite Collaborator
              </Button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {mockCollaborators?.map((collaborator) => (
                <div
                  key={collaborator?.id}
                  className="flex items-center space-x-3 p-3 border border-border rounded-lg"
                >
                  <div className="relative">
                    <Image
                      src={collaborator?.avatar}
                      alt={collaborator?.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(collaborator?.status)}`}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-foreground truncate">
                        {collaborator?.name}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        collaborator?.role === 'Editor' ?'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
                      }`}>
                        {collaborator?.role}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {collaborator?.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {collaborator?.status === 'online' ? 'Online' : `Last active ${collaborator?.lastActive}`}
                    </p>
                  </div>

                  <Button variant="ghost" size="icon">
                    <Icon name="MoreVertical" size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e?.target?.value)}
                className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
              <Button
                variant="default"
                size="sm"
                iconName="Send"
                iconPosition="left"
                onClick={handleAddComment}
                disabled={!newComment?.trim()}
              >
                Add Comment
              </Button>
            </div>

            <div className="space-y-4 max-h-64 overflow-y-auto">
              {mockComments?.map((comment) => (
                <div key={comment?.id} className="space-y-3">
                  <div className="flex space-x-3">
                    <Image
                      src={comment?.avatar}
                      alt={comment?.author}
                      className="w-8 h-8 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-foreground text-sm">
                            {comment?.author}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(comment?.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-foreground">{comment?.content}</p>
                        {comment?.itemName && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            <Icon name="MapPin" size={12} className="inline mr-1" />
                            Re: {comment?.itemName}
                          </div>
                        )}
                      </div>
                      
                      {comment?.replies?.map((reply) => (
                        <div key={reply?.id} className="flex space-x-3 mt-2 ml-4">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-primary-foreground font-medium">
                              {reply?.author === 'You' ? 'Y' : reply?.author?.[0]}
                            </span>
                          </div>
                          <div className="bg-muted rounded-lg p-2 flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-foreground text-xs">
                                {reply?.author}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatTimeAgo(reply?.timestamp)}
                              </span>
                            </div>
                            <p className="text-xs text-foreground">{reply?.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Approvals Tab */}
        {activeTab === 'approvals' && (
          <div className="space-y-4">
            {mockPendingApprovals?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="CheckCircle" size={32} className="mx-auto mb-2 opacity-50" />
                <p>No pending approvals</p>
                <p className="text-sm mt-1">All changes have been approved</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {mockPendingApprovals?.map((item) => (
                  <div
                    key={item?.id}
                    className="p-4 border border-border rounded-lg space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Icon 
                            name={item?.type === 'activity' ? 'MapPin' : 'Utensils'} 
                            size={16} 
                            className="text-primary" 
                          />
                          <h4 className="font-medium text-foreground">{item?.name}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Proposed by {item?.proposedBy}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{item?.date} at {item?.time}</span>
                          <span>${item?.cost?.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 italic">
                          "{item?.reason}"
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="default"
                        size="sm"
                        iconName="Check"
                        iconPosition="left"
                        onClick={() => onApproveItem(item?.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="X"
                        iconPosition="left"
                        onClick={() => onRejectItem(item?.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborationPanel;