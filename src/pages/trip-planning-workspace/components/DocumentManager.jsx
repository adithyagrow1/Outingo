import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DocumentManager = ({ documents, onUploadDocument, onDeleteDocument, onDownloadDocument }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dragOver, setDragOver] = useState(false);

  const mockDocuments = [
    {
      id: 1,
      name: "Flight Confirmation - Air France",
      type: "flight",
      category: "transportation",
      fileType: "pdf",
      size: "245 KB",
      uploadDate: "2025-09-15",
      url: "#",
      status: "confirmed",
      details: {
        flightNumber: "AF 1234",
        departure: "JFK - 10:30 AM",
        arrival: "CDG - 11:45 PM",
        date: "2025-09-20"
      }
    },
    {
      id: 2,
      name: "Hotel Reservation - Grand Boulevards",
      type: "accommodation",
      category: "accommodation",
      fileType: "pdf",
      size: "189 KB",
      uploadDate: "2025-09-14",
      url: "#",
      status: "confirmed",
      details: {
        checkIn: "2025-09-20",
        checkOut: "2025-09-24",
        rooms: "1 Double Room",
        confirmation: "HB123456"
      }
    },
    {
      id: 3,
      name: "Travel Insurance Policy",
      type: "insurance",
      category: "documents",
      fileType: "pdf",
      size: "512 KB",
      uploadDate: "2025-09-12",
      url: "#",
      status: "active",
      details: {
        provider: "TravelGuard",
        policyNumber: "TG789012",
        coverage: "$100,000",
        validUntil: "2025-12-31"
      }
    },
    {
      id: 4,
      name: "Passport Copy",
      type: "passport",
      category: "documents",
      fileType: "jpg",
      size: "1.2 MB",
      uploadDate: "2025-09-10",
      url: "#",
      status: "valid",
      details: {
        passportNumber: "P123456789",
        expiryDate: "2030-05-15",
        issuedBy: "US Department of State"
      }
    },
    {
      id: 5,
      name: "Eiffel Tower Tickets",
      type: "ticket",
      category: "activities",
      fileType: "pdf",
      size: "156 KB",
      uploadDate: "2025-09-13",
      url: "#",
      status: "confirmed",
      details: {
        date: "2025-09-21",
        time: "2:00 PM",
        tickets: "2 Adult Tickets",
        reference: "ET456789"
      }
    },
    {
      id: 6,
      name: "Travel Itinerary",
      type: "itinerary",
      category: "planning",
      fileType: "docx",
      size: "89 KB",
      uploadDate: "2025-09-16",
      url: "#",
      status: "draft",
      details: {
        days: "4 Days",
        destinations: "Paris",
        lastModified: "2025-09-16"
      }
    }
  ];

  const categories = [
    { value: 'all', label: 'All Documents', icon: 'FileText' },
    { value: 'transportation', label: 'Transportation', icon: 'Car' },
    { value: 'accommodation', label: 'Accommodation', icon: 'Bed' },
    { value: 'activities', label: 'Activities', icon: 'MapPin' },
    { value: 'documents', label: 'Documents', icon: 'FileText' },
    { value: 'planning', label: 'Planning', icon: 'Calendar' }
  ];

  const filteredDocuments = mockDocuments?.filter(doc => {
    const matchesSearch = doc?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFileIcon = (fileType) => {
    const iconMap = {
      'pdf': 'FileText',
      'docx': 'FileText',
      'doc': 'FileText',
      'jpg': 'Image',
      'jpeg': 'Image',
      'png': 'Image',
      'gif': 'Image',
      'zip': 'Archive',
      'rar': 'Archive'
    };
    return iconMap?.[fileType] || 'File';
  };

  const getStatusColor = (status) => {
    const colorMap = {
      'confirmed': 'bg-success/10 text-success',
      'active': 'bg-primary/10 text-primary',
      'valid': 'bg-success/10 text-success',
      'draft': 'bg-warning/10 text-warning',
      'expired': 'bg-error/10 text-error',
      'pending': 'bg-muted text-muted-foreground'
    };
    return colorMap?.[status] || 'bg-muted text-muted-foreground';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    files?.forEach(file => {
      console.log('Uploading file:', file?.name);
      // onUploadDocument(file);
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e?.target?.files);
    files?.forEach(file => {
      console.log('Uploading file:', file?.name);
      // onUploadDocument(file);
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="FolderOpen" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">Travel Documents</h2>
              <p className="text-sm text-muted-foreground">
                {mockDocuments?.length} documents • Keep everything organized
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              id="file-upload"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.zip,.rar"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              size="sm"
              iconName="Upload"
              iconPosition="left"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              Upload
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={() => console.log('Create new document')}
            >
              New Document
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {categories?.map((category) => (
              <Button
                key={category?.value}
                variant={selectedCategory === category?.value ? 'default' : 'outline'}
                size="sm"
                iconName={category?.icon}
                iconPosition="left"
                onClick={() => setSelectedCategory(category?.value)}
                className="whitespace-nowrap"
              >
                {category?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Drag and Drop Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            dragOver 
              ? 'border-primary bg-primary/5' :'border-border bg-muted/30 hover:border-primary/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Icon name="Upload" size={32} className="mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground mb-1">
            Drag and drop files here, or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Supports PDF, DOC, DOCX, JPG, PNG, ZIP files up to 10MB
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            Choose Files
          </Button>
        </div>

        {/* Documents List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">
              {filteredDocuments?.length} documents found
            </h3>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" iconName="Grid3X3">
                Grid
              </Button>
              <Button variant="ghost" size="sm" iconName="List">
                List
              </Button>
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredDocuments?.map((document) => (
              <div
                key={document?.id}
                className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:shadow-soft transition-all duration-200"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={getFileIcon(document?.fileType)} size={24} className="text-primary" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground truncate">
                        {document?.name}
                      </h4>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                        <span>{document?.fileType?.toUpperCase()}</span>
                        <span>{document?.size}</span>
                        <span>Uploaded {new Date(document.uploadDate)?.toLocaleDateString()}</span>
                      </div>
                      
                      {document?.details && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          {document?.type === 'flight' && (
                            <span>{document?.details?.flightNumber} • {document?.details?.departure} → {document?.details?.arrival}</span>
                          )}
                          {document?.type === 'accommodation' && (
                            <span>{document?.details?.checkIn} - {document?.details?.checkOut} • {document?.details?.rooms}</span>
                          )}
                          {document?.type === 'ticket' && (
                            <span>{document?.details?.date} at {document?.details?.time} • {document?.details?.tickets}</span>
                          )}
                          {document?.type === 'insurance' && (
                            <span>{document?.details?.provider} • {document?.details?.coverage} coverage</span>
                          )}
                          {document?.type === 'passport' && (
                            <span>Expires {document?.details?.expiryDate}</span>
                          )}
                          {document?.type === 'itinerary' && (
                            <span>{document?.details?.days} • {document?.details?.destinations}</span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document?.status)}`}>
                        {document?.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8"
                    onClick={() => onDownloadDocument(document?.id)}
                    title="Download"
                  >
                    <Icon name="Download" size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8"
                    onClick={() => console.log('Share document')}
                    title="Share"
                  >
                    <Icon name="Share2" size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-destructive hover:text-destructive"
                    onClick={() => onDeleteDocument(document?.id)}
                    title="Delete"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              </div>
            ))}

            {filteredDocuments?.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="FileText" size={32} className="mx-auto mb-2 opacity-50" />
                <p>No documents found</p>
                <p className="text-sm mt-1">
                  {searchQuery ? 'Try adjusting your search terms' : 'Upload your first document to get started'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={() => console.log('Download all documents')}
          >
            Download All
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Share2"
            iconPosition="left"
            onClick={() => console.log('Share document folder')}
          >
            Share Folder
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Archive"
            iconPosition="left"
            onClick={() => console.log('Create backup')}
          >
            Create Backup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentManager;