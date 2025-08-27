import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface DateFilter {
  from: string;
  to: string;
}

interface FilterSidebarProps {
  searchQuery: string;
  selectedCategory: string;
  dateFilter: DateFilter;
  categories: string[];
  filteredStreamsCount: number;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onDateFilterChange: (dateFilter: DateFilter) => void;
  onResetFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  searchQuery,
  selectedCategory,
  dateFilter,
  categories,
  filteredStreamsCount,
  onSearchChange,
  onCategoryChange,
  onDateFilterChange,
  onResetFilters
}) => {
  return (
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
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Категория</label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
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
                onChange={(e) => onDateFilterChange({ ...dateFilter, from: e.target.value })}
                placeholder="От"
              />
              <Input
                type="date"
                value={dateFilter.to}
                onChange={(e) => onDateFilterChange({ ...dateFilter, to: e.target.value })}
                placeholder="До"
              />
            </div>
          </div>

          {/* Reset Filters */}
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={onResetFilters}
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
                  {filteredStreamsCount} записей
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterSidebar;