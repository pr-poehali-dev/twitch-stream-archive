import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Stream {
  id: number;
  title: string;
  streamer: string;
  category: string;
  duration: string;
  durationSeconds: number;
  viewers: string;
  date: string;
  timestamp: number;
  thumbnail: string;
  avatar: string;
  tags: string[];
}

interface VideoListProps {
  paginatedStreams: Stream[];
  totalPages: number;
  currentPage: number;
  onStreamSelect: (stream: Stream) => void;
  onPageChange: (page: number) => void;
}

const VideoList: React.FC<VideoListProps> = ({
  paginatedStreams,
  totalPages,
  currentPage,
  onStreamSelect,
  onPageChange
}) => {
  return (
    <div className="lg:col-span-3">
      <h2 className="text-2xl font-bold mb-6">Последние записи</h2>
      
      {/* Videos List */}
      <div className="space-y-6">
        {paginatedStreams.map((stream) => (
          <Card
            key={stream.id}
            className="stream-card cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onStreamSelect(stream)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="relative w-48 aspect-video flex-shrink-0">
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                    {stream.duration}
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className="text-xs">{stream.category}</Badge>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{stream.title}</h3>
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={stream.avatar}
                      alt={stream.streamer}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-medium text-primary">{stream.streamer}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="Eye" size={14} />
                        <span>{stream.viewers} зрителей</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} />
                        <span>{stream.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {stream.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoList;