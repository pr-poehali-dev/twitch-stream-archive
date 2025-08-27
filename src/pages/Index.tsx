import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

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

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return hours > 0 ? `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}` : `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const currentChatMessages = selectedStream ? generateChatMessages(selectedStream.id, videoCurrentTime) : [];

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
            <Button variant="ghost" size="sm" onClick={() => setSelectedStream(null)}>
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
            {/* Video Player */}
            <div className="lg:col-span-3">
              <Button
                variant="outline"
                size="sm"
                className="mb-4"
                onClick={() => setSelectedStream(null)}
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад к архиву
              </Button>
              
              <div className="video-player mb-6 relative group aspect-video bg-black rounded-lg overflow-hidden">
                <img
                  src={selectedStream.thumbnail}
                  alt={selectedStream.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                  <Button 
                    size="lg" 
                    className="opacity-80 hover:opacity-100"
                    onClick={() => setIsPlaying(!isPlaying)}
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
                    onValueChange={(value) => setVideoCurrentTime(value[0])}
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

            {/* Synchronized Chat */}
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
          </div>
        </div>
      ) : (
        /* Archive List View */
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold mb-6">Последние записи</h2>
              
              {/* Videos List */}
              <div className="space-y-6">
                {paginatedStreams.map((stream) => (
                  <Card
                    key={stream.id}
                    className="stream-card cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedStream(stream)}
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
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    <Icon name="ChevronLeft" size={16} />
                  </Button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    <Icon name="ChevronRight" size={16} />
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar with Filters */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <h3 className="font-semibold">Поиск и фильтры</h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Search */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Поиск</label>
                    <div className="relative">
                      <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Название видео..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Категория</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Все категории" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все категории</SelectItem>
                        {categories.slice(1).map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Период</label>
                    <div className="space-y-2">
                      <Input
                        type="date"
                        value={dateFilter.from}
                        onChange={(e) => setDateFilter(prev => ({ ...prev, from: e.target.value }))}
                        placeholder="От"
                      />
                      <Input
                        type="date"
                        value={dateFilter.to}
                        onChange={(e) => setDateFilter(prev => ({ ...prev, to: e.target.value }))}
                        placeholder="До"
                      />
                    </div>
                  </div>

                  {/* Reset Filters */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setDateFilter({ from: '', to: '' });
                      setCurrentPage(1);
                    }}
                  >
                    <Icon name="RotateCcw" size={16} className="mr-2" />
                    Сбросить
                  </Button>

                  {/* Stream Info */}
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-medium">О стримере</h4>
                    <div className="flex items-center space-x-3">
                      <img
                        src="/img/c2e8d3aa-2ef9-4c82-96d7-52ab80f05cce.jpg"
                        alt="GamerPro"
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-medium">GamerPro</p>
                        <p className="text-sm text-muted-foreground">
                          {filteredStreams.length} записей
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;