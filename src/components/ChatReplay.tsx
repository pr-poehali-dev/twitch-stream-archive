import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ChatMessage {
  user: string;
  message: string;
  timeSeconds: number;
  timestamp: string;
}

interface ChatReplayProps {
  currentChatMessages: ChatMessage[];
  videoCurrentTime: number;
  onTimestampClick: (timeSeconds: number) => void;
}

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return hours > 0 
    ? `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}` 
    : `${minutes}:${secs.toString().padStart(2, '0')}`;
};

const getRandomUserColor = (username: string) => {
  const colors = [
    '#FF0000', '#0000FF', '#00FF00', '#B22222', '#FF7F50',
    '#9ACD32', '#FF4500', '#2E8B57', '#DAA520', '#D2691E',
    '#5F9EA0', '#1E90FF', '#FF69B4', '#8A2BE2', '#00FF7F'
  ];
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const ChatReplay: React.FC<ChatReplayProps> = ({
  currentChatMessages,
  videoCurrentTime,
  onTimestampClick
}) => {
  const handleTimestampClick = (timeSeconds: number) => {
    const seekTime = Math.max(0, timeSeconds - 3);
    onTimestampClick(seekTime);
  };

  return (
    <div className="lg:col-span-1">
      <div className="twitch-chat h-[600px] flex flex-col">
        <CardHeader className="pb-3 px-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="MessageCircle" size={16} className="text-primary" />
              <h3 className="font-semibold text-sm">СТРИМ ЧАТ</h3>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground font-mono">
                {formatTime(videoCurrentTime)}
              </span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-0">
          <div className="space-y-0">
            {currentChatMessages.map((msg, index) => (
              <div 
                key={index} 
                className="twitch-chat-message group"
              >
                <div className="flex items-start space-x-2">
                  <button
                    onClick={() => handleTimestampClick(msg.timeSeconds)}
                    className="twitch-chat-timestamp mt-0.5 opacity-0 group-hover:opacity-100"
                    title={`Перейти к ${msg.timestamp}`}
                  >
                    {msg.timestamp}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <span 
                      className="twitch-chat-username mr-2"
                      style={{ color: getRandomUserColor(msg.user) }}
                    >
                      {msg.user}:
                    </span>
                    <span className="twitch-chat-message-text text-foreground">
                      {msg.message}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {currentChatMessages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <Icon name="MessageSquare" size={48} className="text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground text-sm font-medium mb-2">
                  Чат пока пустой
                </p>
                <p className="text-xs text-muted-foreground/70">
                  Сообщения появятся при воспроизведении видео
                </p>
              </div>
            )}
          </div>
        </CardContent>
        
        <div className="border-t border-border p-3">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={12} />
              <span>{currentChatMessages.length > 0 ? `${currentChatMessages.length} активных` : 'Нет активных'}</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>Синхронизированный</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatReplay;