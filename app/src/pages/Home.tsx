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
    avatar_url?: string;
    profiles?: {
        avatar_url: string | null;
    };
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
                .select('*, profiles(avatar_url)')
                .eq('status', 'approved')
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
                        <div className="relative flex min-h-[420px] flex-col gap-6 overflow-hidden rounded-2xl items-center justify-center p-8">
                            {/* Background Image with Overlay */}
                            <div
                                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
                                style={{ backgroundImage: 'url("/hero-bg.jpg")' }}
                            >
                                <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                {/* Optional: Add a network pattern overlay via CSS or another div */}
                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                            </div>

                            <div className="flex flex-col gap-6 text-center z-10 px-4">
                                <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight max-w-4xl drop-shadow-2xl">
                                    Dourados Conectada: Sua Vitrine para o Sucesso Local.
                                </h1>
                                <p className="text-white/90 text-xl md:text-2xl font-medium max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
                                    Junte-se à plataforma que une empresas e clientes na nossa região.
                                    <br className="hidden md:block" />
                                    Dê destaque ao seu negócio e alcance quem realmente importa.
                                </p>
                            </div>

                            <div className="z-10 mt-4">
                                <Link
                                    to="/meus-anuncios"
                                    className="inline-flex items-center justify-center px-10 py-5 bg-primary hover:bg-primary-light text-white text-lg md:text-xl font-black rounded-2xl shadow-[0_10px_30px_rgba(25,102,179,0.3)] hover:shadow-[0_15px_40px_rgba(25,102,179,0.5)] hover:-translate-y-1 transition-all uppercase tracking-wider border border-white/20"
                                >
                                    ANUNCIE AGORA E CRESÇA CONOSCO!
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Bar Navigation */}
            <CategoryBar />

            {/* SectionHeader: Profissionais */}
            <div className="px-4 lg:px-40 flex justify-center mt-8 mb-4">
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
                                    {(anuncio.avatar_url || anuncio.profiles?.avatar_url) ? (
                                        <div className="size-24 md:size-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-sm bg-gray-100 dark:bg-gray-800">
                                            <img
                                                src={anuncio.avatar_url || anuncio.profiles?.avatar_url || ''}
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
                                    <div className="absolute bottom-1 right-1 bg-green-500 size-4 md:size-5 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"></div>
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
                                        <span className="text-gray-300">•</span>
                                        <span className="text-primary font-bold">
                                            {(anuncio as any).preco_a_combinar || anuncio.preco <= 0
                                                ? 'Preço a Combinar'
                                                : `R$ ${Number(anuncio.preco).toFixed(2)}`
                                            }
                                        </span>
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
