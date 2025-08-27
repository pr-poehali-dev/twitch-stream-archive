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
}

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return hours > 0 
    ? `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}` 
    : `${minutes}:${secs.toString().padStart(2, '0')}`;
};

const ChatReplay: React.FC<ChatReplayProps> = ({
  currentChatMessages,
  videoCurrentTime
}) => {
  return (
    <div className="lg:col-span-1">
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Чат стрима</h3>
            <div className="flex items-center space-x-2">
              <Icon name="MessageCircle" size={16} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{formatTime(videoCurrentTime)}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-2 scrollbar-thin">
          {currentChatMessages.map((msg, index) => (
            <div key={index} className="chat-bubble p-2 rounded bg-card/50">
              <div className="flex items-start justify-between mb-1">
                <span className="font-medium text-primary text-xs">{msg.user}</span>
                <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
              </div>
              <p className="text-sm">{msg.message}</p>
            </div>
          ))}
          {currentChatMessages.length === 0 && (
            <p className="text-center text-muted-foreground text-sm mt-4">
              Сообщения появятся по мере воспроизведения
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatReplay;