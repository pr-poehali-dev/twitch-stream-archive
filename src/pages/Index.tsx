import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import VideoPlayer from '@/components/VideoPlayer';
import ChatReplay from '@/components/ChatReplay';
import VideoList from '@/components/VideoList';
import FilterSidebar from '@/components/FilterSidebar';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStream, setSelectedStream] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const itemsPerPage = 5;

  const mockStreams = [
    {
      id: 1,
      title: 'Невероятные моменты в Dota 2 | Топ игра',
      streamer: 'GamerPro',
      category: 'Dota 2',
      duration: '3:24:15',
      durationSeconds: 12255,
      viewers: '12,547',
      date: '2024-08-25',
      timestamp: new Date('2024-08-25').getTime(),
      thumbnail: '/img/003ce5d2-43a4-4904-a672-dac6f1939002.jpg',
      avatar: '/img/c2e8d3aa-2ef9-4c82-96d7-52ab80f05cce.jpg',
      tags: ['Highlight', 'Pro Play']
    },
    {
      id: 2,
      title: 'Counter-Strike 2 Ranked Climb',
      streamer: 'GamerPro',
      category: 'Counter-Strike 2',
      duration: '2:15:30',
      durationSeconds: 8130,
      viewers: '8,932',
      date: '2024-08-24',
      timestamp: new Date('2024-08-24').getTime(),
      thumbnail: '/img/003ce5d2-43a4-4904-a672-dac6f1939002.jpg',
      avatar: '/img/c2e8d3aa-2ef9-4c82-96d7-52ab80f05cce.jpg',
      tags: ['Competitive', 'Educational']
    },
    {
      id: 3,
      title: 'Ретро стримы: Играем в классику',
      streamer: 'GamerPro',
      category: 'Retro Games',
      duration: '4:12:45',
      durationSeconds: 15165,
      viewers: '5,421',
      date: '2024-08-23',
      timestamp: new Date('2024-08-23').getTime(),
      thumbnail: '/img/003ce5d2-43a4-4904-a672-dac6f1939002.jpg',
      avatar: '/img/c2e8d3aa-2ef9-4c82-96d7-52ab80f05cce.jpg',
      tags: ['Nostalgia', 'Chill']
    },
    {
      id: 4,
      title: 'Вечерний стрим с подписчиками',
      streamer: 'GamerPro',
      category: 'Just Chatting',
      duration: '1:45:20',
      durationSeconds: 6320,
      viewers: '3,254',
      date: '2024-08-22',
      timestamp: new Date('2024-08-22').getTime(),
      thumbnail: '/img/003ce5d2-43a4-4904-a672-dac6f1939002.jpg',
      avatar: '/img/c2e8d3aa-2ef9-4c82-96d7-52ab80f05cce.jpg',
      tags: ['Chill', 'Community']
    },
    {
      id: 5,
      title: 'Турнир по Valorant',
      streamer: 'GamerPro',
      category: 'Valorant',
      duration: '5:30:12',
      durationSeconds: 19812,
      viewers: '18,921',
      date: '2024-08-21',
      timestamp: new Date('2024-08-21').getTime(),
      thumbnail: '/img/003ce5d2-43a4-4904-a672-dac6f1939002.jpg',
      avatar: '/img/c2e8d3aa-2ef9-4c82-96d7-52ab80f05cce.jpg',
      tags: ['Tournament', 'Pro Play']
    },
    {
      id: 6,
      title: 'Обзор новых игр',
      streamer: 'GamerPro',
      category: 'Variety',
      duration: '2:30:45',
      durationSeconds: 9045,
      viewers: '7,832',
      date: '2024-08-20',
      timestamp: new Date('2024-08-20').getTime(),
      thumbnail: '/img/003ce5d2-43a4-4904-a672-dac6f1939002.jpg',
      avatar: '/img/c2e8d3aa-2ef9-4c82-96d7-52ab80f05cce.jpg',
      tags: ['Review', 'New Games']
    },
    {
      id: 7,
      title: 'Speedrun попытки в Dark Souls',
      streamer: 'GamerPro',
      category: 'Dark Souls',
      duration: '6:15:30',
      durationSeconds: 22530,
      viewers: '9,145',
      date: '2024-08-19',
      timestamp: new Date('2024-08-19').getTime(),
      thumbnail: '/img/003ce5d2-43a4-4904-a672-dac6f1939002.jpg',
      avatar: '/img/c2e8d3aa-2ef9-4c82-96d7-52ab80f05cce.jpg',
      tags: ['Speedrun', 'Challenge']
    },
    {
      id: 8,
      title: 'Minecraft строительство замка',
      streamer: 'GamerPro',
      category: 'Minecraft',
      duration: '3:45:22',
      durationSeconds: 13522,
      viewers: '6,543',
      date: '2024-08-18',
      timestamp: new Date('2024-08-18').getTime(),
      thumbnail: '/img/003ce5d2-43a4-4904-a672-dac6f1939002.jpg',
      avatar: '/img/c2e8d3aa-2ef9-4c82-96d7-52ab80f05cce.jpg',
      tags: ['Creative', 'Building']
    }
  ];

  const generateChatMessages = (streamId, currentTimeSeconds) => {
    const allMessages = {
      1: [
        { user: 'Viewer123', message: 'Невероятная игра!', timeSeconds: 300, timestamp: '5:00' },
        { user: 'ProFan', message: 'Как ты это сделал?!', timeSeconds: 450, timestamp: '7:30' },
        { user: 'GameMaster', message: 'Топовое исполнение 🔥', timeSeconds: 600, timestamp: '10:00' },
        { user: 'StreamLover', message: 'Лучший стример!', timeSeconds: 750, timestamp: '12:30' },
        { user: 'SkillHunter', message: 'Покажи еще раз этот момент', timeSeconds: 900, timestamp: '15:00' },
        { user: 'ChatMaster', message: 'Это мой любимый момент!', timeSeconds: 1050, timestamp: '17:30' },
        { user: 'ProGaming', message: 'Учи меня играть!', timeSeconds: 1200, timestamp: '20:00' }
      ],
      2: [
        { user: 'CS_Fan', message: 'Отличный aim!', timeSeconds: 180, timestamp: '3:00' },
        { user: 'TacticMaster', message: 'Хорошая стратегия', timeSeconds: 360, timestamp: '6:00' },
        { user: 'ShootingStar', message: 'Как же круто!', timeSeconds: 540, timestamp: '9:00' }
      ],
      3: [
        { user: 'RetroLover', message: 'Ностальгия берет свое', timeSeconds: 240, timestamp: '4:00' },
        { user: 'OldSchool', message: 'Эх, времена...', timeSeconds: 480, timestamp: '8:00' },
        { user: 'PixelArt', message: 'Какая графика была!', timeSeconds: 720, timestamp: '12:00' }
      ]
    };
    
    const messages = allMessages[streamId] || allMessages[1];
    return messages.filter(msg => msg.timeSeconds <= currentTimeSeconds + 30);
  };

  const filteredStreams = mockStreams.filter(stream => {
    const matchesSearch = stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stream.streamer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || stream.category === selectedCategory;
    
    let matchesDate = true;
    if (dateFilter.from || dateFilter.to) {
      const streamDate = new Date(stream.date).getTime();
      const fromDate = dateFilter.from ? new Date(dateFilter.from).getTime() : 0;
      const toDate = dateFilter.to ? new Date(dateFilter.to).getTime() : Date.now();
      matchesDate = streamDate >= fromDate && streamDate <= toDate;
    }
    
    return matchesSearch && matchesCategory && matchesDate;
  });

  const totalPages = Math.ceil(filteredStreams.length / itemsPerPage);
  const paginatedStreams = filteredStreams.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const categories = ['all', ...new Set(mockStreams.map(stream => stream.category))];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setVideoCurrentTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const currentChatMessages = selectedStream ? generateChatMessages(selectedStream.id, videoCurrentTime) : [];

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setDateFilter({ from: '', to: '' });
    setCurrentPage(1);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeChange = (time) => {
    setVideoCurrentTime(time);
  };

  const handleBackToArchive = () => {
    setSelectedStream(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">STREAM ARCHIVE</h1>
              <Badge variant="secondary" className="text-xs">GamerPro</Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={handleBackToArchive}>
              <Icon name="Home" size={18} className="mr-2" />
              Главная
            </Button>
          </div>
        </div>
      </header>

      {selectedStream ? (
        /* Video Player View */
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <VideoPlayer
              selectedStream={selectedStream}
              videoCurrentTime={videoCurrentTime}
              isPlaying={isPlaying}
              onBack={handleBackToArchive}
              onPlayPause={handlePlayPause}
              onTimeChange={handleTimeChange}
            />
            <ChatReplay
              currentChatMessages={currentChatMessages}
              videoCurrentTime={videoCurrentTime}
              onTimestampClick={handleTimeChange}
            />
          </div>
        </div>
      ) : (
        /* Archive List View */
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <VideoList
              paginatedStreams={paginatedStreams}
              totalPages={totalPages}
              currentPage={currentPage}
              onStreamSelect={setSelectedStream}
              onPageChange={setCurrentPage}
            />
            <FilterSidebar
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              dateFilter={dateFilter}
              categories={categories}
              filteredStreamsCount={filteredStreams.length}
              onSearchChange={setSearchQuery}
              onCategoryChange={setSelectedCategory}
              onDateFilterChange={setDateFilter}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;