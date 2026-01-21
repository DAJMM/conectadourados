import { Search, SearchX, ChevronLeft, ChevronRight, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Redirect to home or search page
        navigate('/');
    };

    const categories = [
        { name: 'Diarista', count: 12, icon: 'cleaning_services' },
        { name: 'Eletricista', count: 8, icon: 'electrical_services' },
        { name: 'Encanador', count: 5, icon: 'plumbing' },
        { name: 'Pintor Residencial', count: 15, icon: 'format_paint' },
        { name: 'Jardineiro', count: 7, icon: 'yard' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-[#111417] dark:text-white transition-colors duration-200">

            <main className="flex-1 flex flex-col items-center">
                <div className="w-full max-w-[960px] px-6 py-10">

                    {/* Search Bar - Adapted for 404 to help user find content */}
                    <div className="mb-16">
                        <form onSubmit={handleSearch} className="group relative block h-14 w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-[#647587]">
                                <Search size={24} />
                            </div>
                            <input
                                className="w-full h-full pl-12 pr-4 rounded-xl border-2 border-[#f0f2f4] dark:border-[#27272a] bg-[#f0f2f4]/50 dark:bg-[#1f1f23] text-lg outline-none focus:border-primary focus:ring-0 transition-all placeholder:text-[#647587] dark:text-white"
                                placeholder="Tente buscar por um serviço em Dourados, MS..."
                                type="text"
                            />
                            <div className="absolute inset-y-0 right-3 flex items-center">
                                <button type="submit" className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold shadow-sm hover:shadow-md transition-all">Buscar</button>
                            </div>
                        </form>
                    </div>

                    {/* 404 Content */}
                    <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="relative">
                            <div className="bg-primary/5 dark:bg-primary/10 rounded-full p-12 mb-4">
                                <SearchX size={72} className="text-primary" strokeWidth={1} />
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 size-8 bg-yellow-400 rounded-full blur-2xl opacity-20"></div>
                            <div className="absolute -bottom-2 -left-2 size-12 bg-primary rounded-full blur-3xl opacity-10"></div>
                        </div>

                        <div className="max-w-[600px] space-y-4">
                            <h1 className="text-3xl font-extrabold tracking-tight text-[#111417] dark:text-white sm:text-4xl">
                                Página não encontrada
                            </h1>
                            <p className="text-lg text-[#647587] dark:text-[#a1a1aa] leading-relaxed">
                                Ops! A página que você está procurando não existe ou foi movida. Que tal explorar serviços similares ou voltar para o início?
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => navigate('/')} className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                <UserPlus size={20} />
                                Voltar para o Início
                            </button>
                            <button onClick={() => navigate('/#categories')} className="flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-transparent border-2 border-[#f0f2f4] dark:border-[#27272a] rounded-xl font-bold hover:bg-[#f0f2f4] dark:hover:bg-[#27272a] transition-all dark:text-white">
                                Explorar Categorias
                            </button>
                        </div>
                    </div>

                    {/* Suggestions Carousel Section */}
                    <div className="mt-24">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-[#111417] dark:text-white">Categorias populares próximas a você</h3>
                            <div className="flex gap-2">
                                <button className="size-10 flex items-center justify-center rounded-full border border-[#f0f2f4] dark:border-[#27272a] text-[#647587] hover:bg-primary/10 hover:text-primary transition-all">
                                    <ChevronLeft size={24} />
                                </button>
                                <button className="size-10 flex items-center justify-center rounded-full border border-[#f0f2f4] dark:border-[#27272a] text-[#647587] hover:bg-primary/10 hover:text-primary transition-all">
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>

                        <div className="flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x">
                            {categories.map((cat, idx) => (
                                <div key={idx} className="flex-none w-44 group cursor-pointer snap-start" onClick={() => navigate('/#categories')}>
                                    <div className="relative overflow-hidden aspect-square rounded-2xl mb-4 bg-[#f8fafc] dark:bg-[#1f1f23] flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                                        {/* Note: Using material symbols outlined font class if available or lucide icons fallback */}
                                        <span className="material-symbols-outlined text-4xl text-[#647587] group-hover:text-primary group-hover:scale-110 transition-all duration-300">
                                            {cat.icon}
                                        </span>
                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                    </div>
                                    <h4 className="font-bold text-center group-hover:text-primary transition-colors dark:text-white">{cat.name}</h4>
                                    <p className="text-xs text-[#647587] text-center mt-1">{cat.count} profissionais</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
