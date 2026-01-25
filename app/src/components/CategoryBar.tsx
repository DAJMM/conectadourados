import { useState, useRef, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { serviceCategories, CategoryGroup } from '../data/categories';
import { useCategoryFilter } from '../contexts/CategoryFilterContext';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function CategoryBar() {
    const { selectedCategory, setSelectedCategory } = useCategoryFilter();
    const [activeGroup, setActiveGroup] = useState<CategoryGroup | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    // Sync activeGroup with selectedCategory on mount/change
    useEffect(() => {
        if (selectedCategory) {
            const group = serviceCategories.find(g => g.items.includes(selectedCategory));
            if (group) setActiveGroup(group);
        }
    }, [selectedCategory]);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleGroupClick = (group: CategoryGroup) => {
        if (activeGroup?.group === group.group) {
            setActiveGroup(null);
        } else {
            setActiveGroup(group);
        }
    };

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        // Scroll to the results if needed or just keep the bar
    };

    const clearFilter = () => {
        setSelectedCategory('');
        setActiveGroup(null);
    };

    const IconComponent = ({ name, size = 24, className = "" }: { name: string, size?: number, className?: string }) => {
        const Icon = (LucideIcons as any)[name];
        return Icon ? <Icon size={size} className={className} /> : <LucideIcons.HelpCircle size={size} className={className} />;
    };

    return (
        <div className="w-full bg-white dark:bg-[#1a2027] border-b border-gray-100 dark:border-gray-800 sticky top-[64px] z-40 transition-all duration-300 shadow-sm">
            <div className="max-w-[1200px] mx-auto relative px-4 lg:px-10">
                {/* Left Arrow */}
                {showLeftArrow && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-white dark:bg-[#1a2027] rounded-full border border-gray-200 dark:border-gray-700 shadow-md hover:scale-110 transition-transform hidden md:flex"
                    >
                        <ChevronLeft size={20} />
                    </button>
                )}

                {/* Categories Scroll Area */}
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex items-center gap-8 overflow-x-auto hide-scrollbar py-4 px-2"
                >
                    {serviceCategories.map((group) => {
                        const isGroupActive = activeGroup?.group === group.group;
                        const hasSelectedInCategory = group.items.includes(selectedCategory);

                        return (
                            <button
                                key={group.group}
                                onClick={() => handleGroupClick(group)}
                                className={`flex flex-col items-center gap-2 min-w-fit transition-all group relative pb-2`}
                            >
                                <div className={`p-3 rounded-2xl transition-all duration-300 ${isGroupActive || hasSelectedInCategory
                                    ? 'bg-primary text-white scale-110 shadow-lg'
                                    : 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-gray-700 group-hover:text-primary group-hover:-translate-y-1'
                                    }`}>
                                    <IconComponent name={group.icon} />
                                </div>
                                <span className={`text-[11px] font-bold tracking-tight uppercase transition-colors whitespace-nowrap ${isGroupActive || hasSelectedInCategory
                                    ? 'text-primary'
                                    : 'text-gray-500 dark:text-gray-400'
                                    }`}>
                                    {group.group}
                                </span>
                                {(isGroupActive || hasSelectedInCategory) && (
                                    <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Right Arrow */}
                {showRightArrow && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-white dark:bg-[#1a2027] rounded-full border border-gray-200 dark:border-gray-700 shadow-md hover:scale-110 transition-transform hidden md:flex"
                    >
                        <ChevronRight size={20} />
                    </button>
                )}
            </div>

            {/* Subcategories Dropdown Area */}
            {activeGroup && (
                <div className="w-full bg-gray-50 dark:bg-[#1e252d] border-t border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="max-w-[1200px] mx-auto px-6 py-6 lg:px-12 relative">
                        <button
                            onClick={() => setActiveGroup(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-extrabold text-[#111518] dark:text-white uppercase tracking-wider flex items-center gap-2">
                                    <IconComponent name={activeGroup.icon} size={18} className="text-primary" />
                                    {activeGroup.group}
                                </h3>
                                {selectedCategory && (
                                    <button
                                        onClick={clearFilter}
                                        className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                                    >
                                        Limpar Filtro
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                {activeGroup.items.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryClick(category)}
                                        className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${selectedCategory === category
                                            ? 'bg-primary text-white shadow-md ring-2 ring-primary ring-offset-2 dark:ring-offset-[#1e252d]'
                                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-primary border border-transparent hover:shadow-sm'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
