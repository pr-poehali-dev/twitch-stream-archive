import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStream, setSelectedStream] = useState(null);

  const mockStreams = [
    {
      id: 1,
      title: 'Невероятные моменты в Dota 2 | Топ игра',
      streamer: 'ProGamer123',
      category: 'Dota 2',
      duration: '3:24:15',
      viewers: '12,547',
      date: '2024-08-25',
      thumbnail: '/img/003ce5d2-43a4-4904-a672-dac6f1939002.jpg',
      avatar: '/img/acc3cfba-7b24-42f7-b310-efe6d291a9ee.jpg',
      tags: ['Highlight', 'Pro Play', 'Tournament']
    },
    {
      id: 2,
      title: 'Counter-Strike 2 Ranked Climb',
      streamer: 'CS_Master',
      category: 'Counter-Strike 2',
      duration: '2:15:30',
      viewers: '8,932',
      date: '2024-08-24',
      thumbnail: '/img/003ce5d2-43a4-4904-a672-dac6f1939002.jpg',
      avatar: '/img/acc3cfba-7b24-42f7-b310-efe6d291a9ee.jpg',
      tags: ['Competitive', 'Educational']
    },
    {
      id: 3,
      title: 'Ретро стримы: Играем в классику',
      streamer: 'RetroGaming',
      category: 'Retro Games',
      duration: '4:12:45',
      viewers: '5,421',
      date: '2024-08-23',
      thumbnail: '/img/003ce5d2-43a4-4904-a672-dac6f1939002.jpg',
      avatar: '/img/acc3cfba-7b24-42f7-b310-efe6d291a9ee.jpg',
      tags: ['Nostalgia', 'Chill']
    }
  ];

  const mockChatMessages = [
    { user: 'Viewer123', message: 'Невероятная игра!', timestamp: '15:23' },
    { user: 'ProFan', message: 'Как ты это сделал?!', timestamp: '15:24' },
    { user: 'GameMaster', message: 'Топовое исполнение 🔥', timestamp: '15:25' },
    { user: 'StreamLover', message: 'Лучший стример!', timestamp: '15:26' },
    { user: 'SkillHunter', message: 'Покажи еще раз этот момент', timestamp: '15:27' }
  ];

  const filteredStreams = mockStreams.filter(stream => {
    const matchesSearch = stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stream.streamer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || stream.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(mockStreams.map(stream => stream.category))];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">STREAM ARCHIVE</h1>
              <Badge variant="secondary" className="text-xs">BETA</Badge>
            </div>
            <nav className="flex items-center space-x-6">
              <Button variant="ghost" size="sm">
                <Icon name="Home" size={18} className="mr-2" />
                Главная
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Search" size={18} className="mr-2" />
                Поиск
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Bookmark" size={18} className="mr-2" />
                Избранное
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {selectedStream ? (
          /* Video Player View */
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
              
              <div className="video-player mb-6 relative group">
                <img
                  src={selectedStream.thumbnail}
                  alt={selectedStream.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                  <Button size="lg" className="opacity-80 hover:opacity-100">
                    <Icon name="Play" size={32} />
                  </Button>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm">
                  {selectedStream.duration}
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

            {/* Chat Replay */}
            <div className="lg:col-span-1">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Чат стрима</h3>
                    <Icon name="MessageCircle" size={20} className="text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto space-y-2 scrollbar-thin">
                  {mockChatMessages.map((msg, index) => (
                    <div key={index} className="chat-bubble">
                      <div className="flex items-start justify-between mb-1">
                        <span className="font-medium text-primary text-xs">{msg.user}</span>
                        <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Archive Grid View */
          <>
            {/* Search and Filters */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Поиск по названию или стримеру..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Категория" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все категории</SelectItem>
                      {categories.slice(1).map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Icon name="Filter" size={16} className="mr-2" />
                    Фильтры
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="Video" size={24} className="mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-sm text-muted-foreground">Всего записей</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="Users" size={24} className="mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-sm text-muted-foreground">Стримеров</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="Clock" size={24} className="mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">2,456</p>
                  <p className="text-sm text-muted-foreground">Часов контента</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="TrendingUp" size={24} className="mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">156K</p>
                  <p className="text-sm text-muted-foreground">Просмотров</p>
                </CardContent>
              </Card>
            </div>

            {/* Stream Archive Grid */}
            <Tabs defaultValue="grid" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="grid" className="flex items-center">
                  <Icon name="Grid3X3" size={16} className="mr-2" />
                  Сетка
                </TabsTrigger>
                <TabsTrigger value="list" className="flex items-center">
                  <Icon name="List" size={16} className="mr-2" />
                  Список
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="grid">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStreams.map((stream) => (
                    <Card
                      key={stream.id}
                      className="stream-card cursor-pointer"
                      onClick={() => setSelectedStream(stream)}
                    >
                      <div className="relative aspect-video">
                        <img
                          src={stream.thumbnail}
                          alt={stream.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                          {stream.duration}
                        </div>
                        <div className="absolute top-2 left-2">
                          <Badge className="text-xs">{stream.category}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2">{stream.title}</h3>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <img
                              src={stream.avatar}
                              alt={stream.streamer}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="text-sm font-medium">{stream.streamer}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            <Icon name="Eye" size={14} />
                            <span className="text-xs">{stream.viewers}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{stream.date}</span>
                          <div className="flex gap-1">
                            {stream.tags.slice(0, 2).map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="list">
                <div className="space-y-4">
                  {filteredStreams.map((stream) => (
                    <Card
                      key={stream.id}
                      className="stream-card cursor-pointer"
                      onClick={() => setSelectedStream(stream)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative w-32 aspect-video flex-shrink-0">
                            <img
                              src={stream.thumbnail}
                              alt={stream.title}
                              className="w-full h-full object-cover rounded"
                            />
                            <div className="absolute bottom-1 right-1 bg-black/80 text-white px-1 py-0.5 rounded text-xs">
                              {stream.duration}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold mb-1 truncate">{stream.title}</h3>
                            <div className="flex items-center space-x-2 mb-2">
                              <img
                                src={stream.avatar}
                                alt={stream.streamer}
                                className="w-6 h-6 rounded-full"
                              />
                              <span className="text-sm font-medium">{stream.streamer}</span>
                              <Badge variant="outline" className="text-xs">{stream.category}</Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <Icon name="Eye" size={14} />
                                  <span>{stream.viewers} зрителей</span>
                                </div>
                                <span>{stream.date}</span>
                              </div>
                              <div className="flex gap-1">
                                {stream.tags.map(tag => (
                                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;