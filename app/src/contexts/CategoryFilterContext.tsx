import { createContext, useContext, useState, ReactNode } from 'react';

interface CategoryFilterContextType {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

const CategoryFilterContext = createContext<CategoryFilterContextType | undefined>(undefined);

export function CategoryFilterProvider({ children }: { children: ReactNode }) {
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    return (
        <CategoryFilterContext.Provider value={{ selectedCategory, setSelectedCategory }}>
            {children}
        </CategoryFilterContext.Provider>
    );
}

export function useCategoryFilter() {
    const context = useContext(CategoryFilterContext);
    if (context === undefined) {
        throw new Error('useCategoryFilter must be used within a CategoryFilterProvider');
    }
    return context;
}
