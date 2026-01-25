import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { MessageCircle, Loader2, User } from 'lucide-react';
import { useCategoryFilter } from '../contexts/CategoryFilterContext';
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

export default function Home() {
    const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
    const [loading, setLoading] = useState(true);
    const { selectedCategory, setSelectedCategory } = useCategoryFilter();

    useEffect(() => {
        fetchAnuncios();
    }, [selectedCategory]); // Re-fetch when category changes

    const fetchAnuncios = async () => {
        try {
            setLoading(true);
            let query = supabase
                .from('anuncios')
                .select('*')
                .order('criado_em', { ascending: false });

            // Apply category filter if selected
            if (selectedCategory) {
                query = query.eq('categoria', selectedCategory);
            } else {
                query = query.limit(6);
            }

            const { data, error } = await query;

            if (error) throw error;
            setAnuncios(data || []);
        } catch (error) {
            console.error('Erro ao buscar anúncios:', error);
        } finally {
            setLoading(false);
        }
    };

    // Format phone for WhatsApp
    const formatWhatsApp = (phone: string) => {
        const clean = phone?.replace(/\D/g, '') || '';
        return clean.startsWith('55') ? clean : `55${clean}`;
    };

    // Generate initials for avatar placeholder
    const getInitials = (name: string) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    // Generate a consistent color based on the name
    const getAvatarColor = (name: string) => {
        const colors = [
            'bg-blue-500',
            'bg-green-500',
            'bg-purple-500',
            'bg-orange-500',
            'bg-pink-500',
            'bg-teal-500',
            'bg-indigo-500',
            'bg-red-500',
        ];
        const index = name?.length ? name.charCodeAt(0) % colors.length : 0;
        return colors[index];
    };

    return (
        <div className="flex flex-col w-full">
            {/* HeroSection */}
            <div className="w-full flex justify-center py-6 px-4 lg:px-40">
                <div className="w-full max-w-[1200px]">
                    <div className="@container">
                        <div className="relative flex min-h-[420px] flex-col gap-6 overflow-hidden rounded-2xl items-center justify-center p-8 bg-[#f8fafc] dark:bg-[#252d35]">
                            {/* Decorative background elements */}
                            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                                <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary blur-3xl"></div>
                                <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-primary blur-3xl"></div>
                            </div>
                            <div className="flex flex-col gap-4 text-center z-10">
                                <h1 className="text-[#111518] dark:text-white text-4xl font-extrabold leading-tight tracking-tight max-w-2xl">
                                    Quem você precisa contratar hoje?
                                </h1>
                                <p className="text-[#617989] dark:text-gray-400 text-base font-medium text-xl">
                                    Encontre e agende os melhores profissionais locais em Dourados.
                                </p>
                            </div>
                            <label className="relative flex flex-col min-w-40 h-16 w-full max-w-[640px] z-10">
                                <div className="flex w-full flex-1 items-stretch rounded-xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1f262e]">
                                    <div className="text-[#617989] flex items-center justify-center pl-5">
                                        <span className="material-symbols-outlined">search</span>
                                    </div>
                                    <input className="flex w-full border-none focus:ring-0 bg-transparent text-[#111518] dark:text-white px-4 text-base placeholder:text-[#617989] outline-none" placeholder="Ex: Eletricista, Professor de Inglês, Diarista..." />
                                    <div className="flex items-center pr-2">
                                        <button className="flex h-12 px-8 cursor-pointer items-center justify-center rounded-lg bg-primary text-white text-base font-bold transition-all hover:bg-primary-light">
                                            Pesquisar
                                        </button>
                                    </div>
                                </div>
                            </label>
                            <div className="flex gap-4 mt-2 text-sm text-[#617989] dark:text-gray-400 font-medium">
                                <span>Popular:</span>
                                <button onClick={() => setSelectedCategory('Diarista / Faxineira')} className="underline hover:text-primary">Diaristas</button>
                                <button onClick={() => setSelectedCategory('Pintor')} className="underline hover:text-primary">Pintores</button>
                                <button onClick={() => setSelectedCategory('Manicure / Pedicure')} className="underline hover:text-primary">Manicure</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Bar Navigation */}
            <CategoryBar />

            {/* SectionHeader: Profissionais */}
            <div className="px-4 lg:px-40 flex justify-center py-2">
                <div className="max-w-[1200px] w-full flex items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-[#111518] dark:text-white text-[22px] font-extrabold leading-tight tracking-tight">
                            Profissionais em Destaque
                        </h2>
                        {selectedCategory && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                                Filtro: {selectedCategory}
                            </span>
                        )}
                    </div>
                    <Link className="text-primary text-sm font-bold hover:underline" to="/profissionais">Ver todos</Link>
                </div>
            </div>

            {/* Professional List - Dynamic from Supabase */}
            <main className="px-4 lg:px-40 flex justify-center pb-20">
                <div className="max-w-[1200px] w-full flex flex-col gap-4 px-4">
                    {loading ? (
                        <div className="flex justify-center items-center py-16">
                            <Loader2 className="animate-spin text-primary" size={48} />
                        </div>
                    ) : anuncios.length === 0 ? (
                        <div className="bg-white dark:bg-[#252d35] rounded-xl p-12 text-center border border-gray-100 dark:border-gray-700">
                            <div className="size-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <User className="text-gray-400" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-[#111518] dark:text-white mb-2">Nenhum profissional cadastrado ainda</h3>
                            <p className="text-[#617989] dark:text-gray-400 mb-6">Seja o primeiro a anunciar seus serviços!</p>
                            <Link
                                to="/meus-anuncios"
                                className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-light transition-all"
                            >
                                Cadastrar meu Serviço
                            </Link>
                        </div>
                    ) : (
                        anuncios.map((anuncio) => (
                            <div
                                key={anuncio.id}
                                className="card-shadow bg-white dark:bg-[#252d35] rounded-xl p-5 border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-6 items-center md:items-stretch transition-all hover:shadow-lg hover:-translate-y-1"
                            >
                                {/* Avatar or Image */}
                                <div className="relative shrink-0">
                                    {anuncio.imagem_url ? (
                                        <div className="size-24 md:size-32 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                                            <img
                                                src={anuncio.imagem_url}
                                                alt={anuncio.nome_prestador}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className={`size-24 md:size-32 rounded-full ${getAvatarColor(anuncio.nome_prestador)} flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-sm text-white text-2xl md:text-3xl font-bold`}
                                        >
                                            {getInitials(anuncio.nome_prestador)}
                                        </div>
                                    )}
                                    {!anuncio.imagem_url && (
                                        <div className="absolute bottom-1 right-1 bg-green-500 size-4 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"></div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                                        <h3 className="text-xl font-extrabold text-[#111518] dark:text-white">{anuncio.nome_prestador}</h3>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 w-fit mx-auto md:mx-0">
                                            Disponível
                                        </span>
                                    </div>
                                    <p className="text-primary font-bold text-lg mb-1">{anuncio.titulo}</p>
                                    <p className="text-[#617989] dark:text-gray-400 font-semibold text-base mb-2">{anuncio.categoria}</p>
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3 text-sm">
                                        {anuncio.anos_experiencia > 0 && (
                                            <>
                                                <span className="text-[#617989] dark:text-gray-400">
                                                    <strong className="text-[#111518] dark:text-white">{anuncio.anos_experiencia}</strong> anos de experiência
                                                </span>
                                                <span className="text-gray-300">•</span>
                                            </>
                                        )}
                                        <span className="text-[#617989] dark:text-gray-400">{anuncio.areas_atendimento || 'Dourados, MS'}</span>
                                        {anuncio.preco > 0 && (
                                            <>
                                                <span className="text-gray-300">•</span>
                                                <span className="text-primary font-bold">R$ {Number(anuncio.preco).toFixed(2)}</span>
                                            </>
                                        )}
                                    </div>
                                    {anuncio.descricao && (
                                        <p className="text-[#617989] dark:text-gray-400 text-sm line-clamp-2">{anuncio.descricao}</p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col justify-center gap-3 w-full md:w-auto min-w-[180px]">
                                    <a
                                        href={`https://wa.me/${formatWhatsApp(anuncio.telefone)}?text=Olá! Vi seu anúncio "${anuncio.titulo}" no Conecta Dourados e gostaria de mais informações.`}
                                        target="_blank"
                                        className="w-full bg-[#25D366] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#128C7E] transition-colors text-center inline-flex items-center justify-center gap-2"
                                    >
                                        <MessageCircle size={20} />
                                        WhatsApp
                                    </a>
                                    <Link
                                        to={`/profile/${anuncio.id}`}
                                        className="w-full bg-primary/10 text-primary font-bold py-3 px-6 rounded-lg hover:bg-primary/20 transition-colors text-center"
                                    >
                                        Ver Perfil
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
