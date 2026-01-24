import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCategoryFilter } from '../contexts/CategoryFilterContext';
import { LogOut, User, Filter, X } from 'lucide-react';
import { serviceCategories } from '../data/categories';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, role, signOut } = useAuth();
    const { selectedCategory, setSelectedCategory } = useCategoryFilter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLoginClick = () => {
        if (user) {
            // Redirect based on role
            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/area-do-cliente');
            }
        } else {
            navigate('/login');
        }
    };

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/');
        } catch (error) {
            console.error('[Header] Logout error:', error);
            navigate('/');
        }
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setIsDropdownOpen(false);
        // Navigate to home if not already there
        if (location.pathname !== '/') {
            navigate('/');
        }
    };

    const handleClearFilter = () => {
        setSelectedCategory('');
        setIsDropdownOpen(false);
    };

    const isActive = (path: string) => {
        const baseClasses = "px-3 py-2 rounded-lg transition-all font-medium";
        return location.pathname === path
            ? `${baseClasses} bg-primary text-white hover:bg-primary-light`
            : `${baseClasses} bg-gray-100 text-gray-700 hover:bg-gray-200`;
    }

    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-4 lg:px-40 py-3 bg-white sticky top-0 z-50">
            <Link to="/" className="flex items-center gap-3 text-primary">
                <div className="size-8 text-primary">
                    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor"></path>
                    </svg>
                </div>
                <h2 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em]">Conecta Dourados</h2>
            </Link>

            <div className="flex flex-1 justify-end gap-2 md:gap-8 items-center">
                <nav className="hidden md:flex items-center gap-2 lg:gap-4 text-sm">
                    <Link className={isActive("/")} to="/">Início</Link>

                    {/* Category Filter Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${selectedCategory
                                ? 'bg-primary text-white hover:bg-primary-light'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <Filter size={16} />
                            <span className="font-medium">
                                {selectedCategory || 'Categorias'}
                            </span>
                            {selectedCategory && (
                                <X
                                    size={16}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClearFilter();
                                    }}
                                    className="hover:bg-white/20 rounded-full"
                                />
                            )}
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-[#1a2027] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-[500px] overflow-y-auto overflow-x-hidden">
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-bold text-gray-900 dark:text-white">Filtrar por Categoria</h3>
                                        {selectedCategory && (
                                            <button
                                                onClick={handleClearFilter}
                                                className="text-xs text-primary hover:underline font-medium"
                                            >
                                                Limpar filtro
                                            </button>
                                        )}
                                    </div>

                                    {serviceCategories.map((group) => (
                                        <div key={group.group} className="mb-4 last:mb-0">
                                            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                                {group.group}
                                            </h4>
                                            <div className="flex flex-col space-y-1">
                                                {group.items.map((category) => (
                                                    <button
                                                        key={category}
                                                        onClick={() => handleCategorySelect(category)}
                                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all whitespace-normal break-words ${selectedCategory === category
                                                            ? 'bg-primary text-white font-medium'
                                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                            }`}
                                                    >
                                                        {category}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <Link className={isActive("/testimonials")} to="/testimonials">Profissionais</Link>
                    <Link className={isActive("/about")} to="/about">Sobre Nós</Link>
                    <Link
                        className={`px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-light transition-all shadow-sm hover:shadow-md font-bold ${location.pathname === "/meus-anuncios" ? "ring-2 ring-primary ring-offset-2" : ""}`}
                        to="/meus-anuncios"
                    >
                        Área do Anunciante
                    </Link>
                </nav>

                <div className="flex gap-2 items-center">
                    {user ? (
                        <>
                            <button
                                onClick={handleLoginClick}
                                className="flex items-center gap-2 px-3.5 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                title={role === 'admin' ? 'Ir para Admin' : 'Ir para Área do Cliente'}
                            >
                                <User className="w-5 h-5 text-primary" />
                                <span className="hidden sm:inline text-sm font-medium text-gray-700">
                                    {role === 'admin' ? '👑 Admin' : user.email?.split('@')[0]}
                                </span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                title="Sair"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="hidden sm:inline text-sm font-medium">Sair</span>
                            </button>
                        </>
                    ) : null}
                </div>
            </div>
        </header>
    );
}
