import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { MessageCircle, Loader2, User, Search, Filter as FilterIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCategoryFilter } from '../contexts/CategoryFilterContext';
import { serviceCategories } from '../data/categories';
import CategoryBar from '../components/CategoryBar';

interface Anuncio {
    id: string;
    titulo: string;
    nome_prestador: string;
    categoria: string;
    telefone: string;
    areas_atendimento: string;
    anos_experiencia: number;
    descricao: string;
    preco: number;
    criado_em: string;
    imagem_url?: string;
}

export default function Professionals() {
    const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { selectedCategory, setSelectedCategory } = useCategoryFilter();

    useEffect(() => {
        fetchAnuncios();
    }, [selectedCategory]);

    const fetchAnuncios = async () => {
        try {
            setLoading(true);
            let query = supabase
                .from('anuncios')
                .select('*')
                .order('criado_em', { ascending: false });

            if (selectedCategory) {
                query = query.eq('categoria', selectedCategory);
            }

            const { data, error } = await query;
            if (error) throw error;
            setAnuncios(data || []);
        } catch (error) {
            console.error('Erro ao buscar profissionais:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredAnuncios = anuncios.filter(anuncio =>
        anuncio.nome_prestador.toLowerCase().includes(searchTerm.toLowerCase()) ||
        anuncio.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        anuncio.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
        anuncio.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatWhatsApp = (phone: string) => {
        const clean = phone?.replace(/\D/g, '') || '';
        return clean.startsWith('55') ? clean : `55${clean}`;
    };

    const getInitials = (name: string) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const getAvatarColor = (name: string) => {
        const colors = [
            'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500',
            'bg-pink-500', 'bg-teal-500', 'bg-indigo-500', 'bg-red-500'
        ];
        const index = name?.length ? name.charCodeAt(0) % colors.length : 0;
        return colors[index];
    };

    return (
        <div className="bg-[#f8fafc] dark:bg-[#111518] min-h-screen pb-20">
            {/* Header / Hero */}
            <div className="bg-white dark:bg-[#1a2027] border-b border-gray-200 dark:border-gray-800 pt-10 pb-16">
                <div className="max-w-[1200px] mx-auto px-4 lg:px-10">
                    <h1 className="text-3xl md:text-5xl font-black text-[#111518] dark:text-white mb-4">
                        Profissionais em Dourados
                    </h1>
                    <p className="text-[#647587] dark:text-gray-400 text-lg max-w-2xl mb-8">
                        Encontre os melhores prestadores de serviço da cidade. Profissionais verificados e recomendados pela comunidade.
                    </p>

                    {/* Search Bar */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar por nome, serviço ou palavra-chave..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#252d35] dark:text-white outline-none focus:ring-2 focus:ring-primary shadow-sm transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Icon Category Bar */}
            <CategoryBar />

            {/* Results Grid */}
            <main className="max-w-[1200px] mx-auto px-4 lg:px-10 -mt-8">
                {/* Active Filter Display removed as it's now in CategoryBar */}

                {loading ? (
                    <div className="flex flex-col justify-center items-center py-20">
                        <Loader2 className="animate-spin text-primary mb-4" size={48} />
                        <p className="text-gray-500 font-medium">Carregando profissionais...</p>
                    </div>
                ) : filteredAnuncios.length === 0 ? (
                    <div className="bg-white dark:bg-[#1a2027] rounded-3xl p-16 text-center border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="size-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <User className="text-gray-300" size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-[#111518] dark:text-white mb-2">
                            Nenhum profissional encontrado
                        </h3>
                        <p className="text-[#647587] dark:text-gray-400 mb-8 max-w-md mx-auto">
                            Não encontramos nenhum profissional para "{searchTerm || selectedCategory}". Tente outros termos ou remova os filtros.
                        </p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedCategory(''); }}
                            className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-light transition-all"
                        >
                            Limpar todos os filtros
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAnuncios.map((anuncio) => (
                            <div
                                key={anuncio.id}
                                className="group bg-white dark:bg-[#1a2027] rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/30 transition-all hover:shadow-2xl hover:-translate-y-2 flex flex-col"
                            >
                                {/* Professional Head */}
                                <div className="p-6 pb-0 flex items-center gap-4">
                                    {anuncio.imagem_url ? (
                                        <div className="size-16 rounded-2xl overflow-hidden shadow-sm">
                                            <img src={anuncio.imagem_url} alt={anuncio.nome_prestador} className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className={`size-16 rounded-2xl ${getAvatarColor(anuncio.nome_prestador)} flex items-center justify-center text-white text-xl font-black shadow-sm`}>
                                            {getInitials(anuncio.nome_prestador)}
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-black text-[#111518] dark:text-white truncate group-hover:text-primary transition-colors">
                                            {anuncio.nome_prestador}
                                        </h3>
                                        <p className="text-xs font-bold text-primary uppercase tracking-widest truncate">
                                            {anuncio.categoria}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <h4 className="text-lg font-bold text-[#111518] dark:text-white mb-3 line-clamp-1">
                                        {anuncio.titulo}
                                    </h4>
                                    <p className="text-sm text-[#647587] dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed flex-1">
                                        {anuncio.descricao}
                                    </p>

                                    <div className="flex items-center justify-between mb-6 pt-6 border-t border-gray-50 dark:border-gray-800">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Experiência</p>
                                            <p className="text-sm font-bold text-[#111518] dark:text-white">{anuncio.anos_experiencia} anos</p>
                                        </div>
                                        {anuncio.preco > 0 && (
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">A partir de</p>
                                                <p className="text-sm font-black text-primary">R$ {anuncio.preco}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-3">
                                        <a
                                            href={`https://wa.me/${formatWhatsApp(anuncio.telefone)}`}
                                            target="_blank"
                                            className="flex-1 bg-[#25D366] text-white py-3 rounded-2xl font-black text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                                        >
                                            <MessageCircle size={18} />
                                            WhatsApp
                                        </a>
                                        <Link
                                            to={`/profile/${anuncio.id}`}
                                            className="px-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white py-3 rounded-2xl font-bold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center"
                                        >
                                            Perfil
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
