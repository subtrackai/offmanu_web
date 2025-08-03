"use client";

import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { BsFillGridFill, BsList } from "react-icons/bs";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterControlsProps {
  categories: FilterOption[];
  sortOptions: FilterOption[];
  selectedCategory: string;
  selectedSort: string;
  viewMode: 'grid' | 'list';
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

interface CustomDropdownProps {
  options: FilterOption[];
  selected: string;
  onChange: (value: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(option => option.value === selected);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-xs bg-background border border-border-light rounded-apple pl-sm pr-xs py-xs text-body text-foreground hover:border-link-blue transition-all duration-300 cursor-pointer min-w-20 whitespace-nowrap shadow-sm hover:shadow-md"
      >
        <span>{selectedOption?.label}</span>
        <FiChevronDown className={`w-4 h-4 text-text-secondary transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-xs bg-white/80 dark:bg-black/80 backdrop-blur-md border border-border-light rounded-apple-lg z-20 min-w-full shadow-lg animate-fade-in">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-sm py-xs hover:bg-section-bg transition-all duration-200 first:rounded-t-apple-lg last:rounded-b-apple-lg font-medium ${
                  option.value === selected ? 'text-foreground bg-section-bg font-semibold' : 'text-text-secondary hover:text-foreground'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const FilterControls: React.FC<FilterControlsProps> = ({
  categories,
  sortOptions,
  selectedCategory,
  selectedSort,
  viewMode,
  onCategoryChange,
  onSortChange,
  onViewModeChange
}) => {
  return (
    <div className="flex items-center justify-between gap-base mb-xl">
      {/* Filters */}
      <div className="flex items-center gap-sm flex-shrink-0">
        {/* Category Filter */}
        <CustomDropdown
          options={categories}
          selected={selectedCategory}
          onChange={onCategoryChange}
        />

        {/* Sort Filter */}
        <CustomDropdown
          options={sortOptions}
          selected={selectedSort}
          onChange={onSortChange}
        />
      </div>

      {/* View Mode Toggle - Custom Icons */}
      <div className="flex items-center gap-xs flex-shrink-0">
        <button
          onClick={() => onViewModeChange('grid')}
          className={`p-xs transition-all duration-200 rounded-apple border border-transparent ${
            viewMode === 'grid' 
              ? 'text-foreground bg-section-bg border-border-light shadow-sm' 
              : 'text-text-secondary hover:text-foreground hover:bg-section-bg/50 hover:border-border-light'
          }`}
          title="网格视图"
        >
          <BsFillGridFill className="w-5 h-5" />
        </button>
        <button
          onClick={() => onViewModeChange('list')}
          className={`p-xs transition-all duration-200 rounded-apple border border-transparent ${
            viewMode === 'list' 
              ? 'text-foreground bg-section-bg border-border-light shadow-sm' 
              : 'text-text-secondary hover:text-foreground hover:bg-section-bg/50 hover:border-border-light'
          }`}
          title="列表视图"
        >
          <BsList className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FilterControls;