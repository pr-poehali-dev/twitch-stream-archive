import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface VideoPlayerProps {
  selectedStream: {
    id: number;
    title: string;
    streamer: string;
    duration: string;
    durationSeconds: number;
    viewers: string;
    date: string;
    thumbnail: string;
    avatar: string;
    tags: string[];
  };
  videoCurrentTime: number;
  isPlaying: boolean;
  onBack: () => void;
  onPlayPause: () => void;
  onTimeChange: (time: number) => void;
}

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return hours > 0 
    ? `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}` 
    : `${minutes}:${secs.toString().padStart(2, '0')}`;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  selectedStream,
  videoCurrentTime,
  isPlaying,
  onBack,
  onPlayPause,
  onTimeChange
}) => {
  return (
    <div className="lg:col-span-3">
      <Button
        variant="outline"
        size="sm"
        className="mb-4"
        onClick={onBack}
      >
        <Icon name="ArrowLeft" size={16} className="mr-2" />
        Назад к архиву
      </Button>
      
      <div className="video-player mb-6 relative group aspect-video bg-black rounded-lg overflow-hidden border border-border">
        <img
          src={selectedStream.thumbnail}
          alt={selectedStream.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
          <Button 
            size="lg" 
            className="opacity-80 hover:opacity-100"
            onClick={onPlayPause}
          >
            <Icon name={isPlaying ? "Pause" : "Play"} size={32} />
          </Button>
        </div>
        <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm">
          {formatTime(videoCurrentTime)} / {selectedStream.duration}
        </div>
        <div className="absolute bottom-2 left-2 right-20 bg-black/80 rounded">
          <Slider
            value={[videoCurrentTime]}
            max={selectedStream.durationSeconds}
            step={1}
            onValueChange={(value) => onTimeChange(value[0])}
            className="w-full px-2 py-1"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">{selectedStream.title}</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={selectedStream.avatar}
              alt={selectedStream.streamer}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">{selectedStream.streamer}</p>
              <p className="text-sm text-muted-foreground">
                {selectedStream.viewers} зрителей • {selectedStream.date}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {selectedStream.tags.map(tag => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;