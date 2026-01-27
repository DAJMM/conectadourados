import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import {
    MessageCircle,
    FileText,
    Loader2,
    User,
    Share2,
    Calendar,
    MapPin,
    Award,
    Clock,
    ExternalLink,
    Instagram,
    Globe,
    CheckCircle,
    Image
} from 'lucide-react';

interface AnuncioProfile {
    id: string;
    usuario_id: string;
    titulo: string;
    descricao: string;
    preco: number;
    imagem_url?: string;
    nome_prestador: string;
    email_contato: string;
    telefone: string;
    categoria: string;
    anos_experiencia: number;
    areas_atendimento: string;
    instagram?: string;
    website?: string;
    preco_a_combinar: boolean;
    criado_em: string;
    avatar_url?: string;
    full_name?: string;
    status?: 'pending' | 'approved' | 'rejected';
}

export default function ProfessionalProfile() {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const userId = user?.id;
    const [profile, setProfile] = useState<AnuncioProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        fetchProfile();
    }, [id]);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError(null);

            // 1. Try to fetch as an announcement ID
            let { data, error: fetchError } = await supabase
                .from('anuncios')
                .select(`
                    *,
                    profiles:usuario_id (
                        avatar_url,
                        full_name
                    )
                `)
                .eq('id', id)
                .single();

            // 2. If not found or error, try to fetch as a profile ID
            if (fetchError || !data) {
                console.log('Not found as announcement, trying as profile ID...');

                // Fetch the first announcement for this user ID
                const { data: ads, error: adsError } = await supabase
                    .from('anuncios')
                    .select(`
                        *,
                        profiles:usuario_id (
                            avatar_url,
                            full_name
                        )
                    `)
                    .eq('usuario_id', id)
                    .order('criado_em', { ascending: false })
                    .limit(1);

                if (ads && ads.length > 0) {
                    data = ads[0];
                } else {
                    // 3. Last fallback: Fetch profile info and show a basic profile even without ads
                    const { data: profileData, error: profileError } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', id)
                        .single();

                    if (!profileError && profileData) {
                        data = {
                            id: profileData.id,
                            usuario_id: profileData.id,
                            nome_prestador: profileData.full_name || 'Profissional',
                            titulo: 'Perfil Conecta Dourados',
                            descricao: 'Este profissional ainda não cadastrou uma descrição detalhada.',
                            preco: 0,
                            categoria: 'Profissional',
                            anos_experiencia: 0,
                            areas_atendimento: 'Dourados, MS',
                            telefone: '', // Should ideally be in profile
                            email_contato: profileData.email || '',
                            criado_em: profileData.created_at,
                            preco_a_combinar: true,
                            profiles: {
                                avatar_url: profileData.avatar_url,
                                full_name: profileData.full_name
                            }
                        };
                    }
                }
            }

            if (!data) {
                setError('Profissional não encontrado.');
                return;
            }

            // Flatten data structure and handle profile data
            const profileData = (data as any).profiles;
            const flattened: AnuncioProfile = {
                ...data,
                // Prioritize ad-specific avatar_url, fallback to profile avatar_url
                avatar_url: data.avatar_url || profileData?.avatar_url,
                full_name: profileData?.full_name,
                // Use profile name if nome_prestador is missing or use both?
                // Usually nome_prestador is the business name, so it takes priority
                nome_prestador: data.nome_prestador || profileData?.full_name || 'Profissional'
            };
            if (flattened.status !== 'approved' && flattened.usuario_id !== userId) {
                setError('Este perfil está aguardando aprovação ou não está disponível publicamente.');
                return;
            }

            setProfile(flattened);

        } catch (err) {
            console.error('Erro inesperado:', err);
            setError('Ocorreu um erro ao carregar o perfil.');
        } finally {
            setLoading(false);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: profile ? `${profile.nome_prestador} - ${profile.titulo}` : 'Conecta Dourados',
                text: profile ? `Confira os serviços de ${profile.nome_prestador} no Conecta Dourados.` : '',
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copiado para a área de transferência!');
        }
    };

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
            'bg-pink-500', 'bg-teal-500', 'bg-indigo-500', 'bg-red-500',
        ];
        const index = name?.length ? name.charCodeAt(0) % colors.length : 0;
        return colors[index];
    };

    if (loading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="animate-spin text-primary size-12" />
                <p className="mt-4 text-gray-500 font-medium">Carregando perfil...</p>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] px-4">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm text-center max-w-md border border-gray-100 dark:border-gray-700">
                    <User className="size-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{error || 'Perfil não encontrado'}</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        O link pode estar quebrado ou o serviço não está mais disponível.
                    </p>
                    <Link to="/" className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-light transition-all">
                        Voltar para o Início
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col items-center bg-[#f6f7f8] dark:bg-background-dark min-h-screen">
            <main className="w-full max-w-4xl px-4 py-8 lg:py-12">
                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                    {profile.status === 'pending' && profile.usuario_id === userId && (
                        <div className="bg-yellow-50 border-b border-yellow-100 p-4 text-center">
                            <p className="text-yellow-800 text-sm font-bold">
                                Seu anúncio está em análise pela nossa equipe e em breve estará visível para todos.
                            </p>
                        </div>
                    )}
                    {profile.status === 'rejected' && profile.usuario_id === userId && (
                        <div className="bg-red-50 border-b border-red-100 p-4 text-center">
                            <p className="text-red-800 text-sm font-bold">
                                Seu anúncio foi recusado. Entre em contato com o suporte ou edite as informações.
                            </p>
                        </div>
                    )}

                    {/* Header Banner - Primary theme color based on category or default */}
                    <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary to-blue-600">
                        <div className="absolute top-6 right-6 z-10">
                            <button
                                onClick={handleShare}
                                className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all border border-white/30"
                            >
                                <Share2 size={24} />
                            </button>
                        </div>
                        {profile.imagem_url && (
                            <img
                                src={profile.imagem_url}
                                alt="Banner"
                                className="w-full h-full object-cover opacity-60"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>

                    {/* Profile Info Overlap */}
                    <div className="px-6 md:px-12 pb-12 relative">
                        <div className="flex flex-col items-center md:items-start -mt-20 md:-mt-24 mb-6">
                            <div className="relative">
                                {profile.avatar_url ? (
                                    <div className="size-40 md:size-48 rounded-full border-8 border-white dark:border-gray-900 shadow-2xl overflow-hidden bg-white">
                                        <img
                                            src={profile.avatar_url}
                                            alt={profile.nome_prestador}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className={`size-40 md:size-48 rounded-full border-8 border-white dark:border-gray-900 shadow-2xl flex items-center justify-center text-white text-5xl font-bold ${getAvatarColor(profile.nome_prestador)}`}>
                                        {getInitials(profile.nome_prestador)}
                                    </div>
                                )}
                                <div className="absolute bottom-2 right-2 bg-green-500 border-4 border-white dark:border-gray-900 size-10 rounded-full flex items-center justify-center shadow-lg">
                                    <CheckCircle className="text-white fill-current" size={20} />
                                </div>
                            </div>

                            <div className="mt-6 text-center md:text-left w-full flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                                <div>
                                    <div className="flex flex-col sm:flex-row items-center gap-2 mb-2">
                                        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
                                            {profile.nome_prestador}
                                        </h1>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                            Profissional Verificado
                                        </span>
                                    </div>
                                    <p className="text-primary text-2xl font-bold mb-2">{profile.titulo}</p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-500 dark:text-gray-400 font-medium">
                                        <div className="flex items-center gap-1.5">
                                            <Award size={18} className="text-primary" />
                                            <span>{profile.categoria}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={18} className="text-primary" />
                                            <span>{profile.areas_atendimento || 'Dourados, MS'}</span>
                                        </div>
                                        {profile.anos_experiencia > 0 && (
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={18} className="text-primary" />
                                                <span>{profile.anos_experiencia} anos de experiência</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col items-center md:items-end gap-2">
                                    <div className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Preço Sugerido</div>
                                    <div>
                                        {profile.preco_a_combinar || profile.preco <= 0 ? (
                                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary border-2 border-primary/20">
                                                <span className="text-base md:text-lg font-black uppercase tracking-tight whitespace-nowrap">A Combinar</span>
                                            </div>
                                        ) : (
                                            <div className="text-4xl font-black text-primary tracking-tighter">
                                                R$ {Number(profile.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid lg:grid-cols-3 gap-8 mt-12 pt-12 border-t border-gray-100 dark:border-gray-800">

                            {/* Left Column: Description */}
                            <div className="lg:col-span-2 space-y-10">
                                <section>
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                            <User size={18} />
                                        </div>
                                        Sobre o Serviço
                                    </h3>
                                    <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                                        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                                            {profile.descricao || "Nenhuma descrição detalhada disponível."}
                                        </p>
                                    </div>
                                </section>

                                {/* Quick Links Section from Image */}
                                <section className="space-y-6">
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                                        Links Rápidos
                                    </h3>
                                    <div className="flex flex-col gap-4">
                                        {/* Solicitar Orçamento */}
                                        <a
                                            href={`https://wa.me/${formatWhatsApp(profile.telefone)}?text=Olá ${profile.nome_prestador}! Vi seu anúncio "${profile.titulo}" no Conecta Dourados e gostaria de solicitar um orçamento grátis.`}
                                            target="_blank"
                                            className="group flex items-center justify-between w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 rounded-2xl hover:border-primary transition-all shadow-sm hover:shadow-md"
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className="size-14 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                                                    <FileText size={28} />
                                                </div>
                                                <span className="font-bold text-lg text-gray-900 dark:text-white">Solicitar Orçamento Grátis</span>
                                            </div>
                                            <span className="material-symbols-outlined text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_forward_ios</span>
                                        </a>

                                        {/* Agendar Consultoria */}
                                        <a
                                            href={`https://wa.me/${formatWhatsApp(profile.telefone)}?text=Olá ${profile.nome_prestador}! Gostaria de agendar uma consultoria sobre o serviço "${profile.titulo}".`}
                                            target="_blank"
                                            className="group flex items-center justify-between w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 rounded-2xl hover:border-primary transition-all shadow-sm hover:shadow-md"
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className="size-14 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                                                    <Calendar size={28} />
                                                </div>
                                                <span className="font-bold text-lg text-gray-900 dark:text-white">Agendar Consultoria</span>
                                            </div>
                                            <span className="material-symbols-outlined text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_forward_ios</span>
                                        </a>

                                        {/* Ver Portfólio */}
                                        {profile.instagram || profile.website ? (
                                            <a
                                                href={profile.website || (profile.instagram?.startsWith('http') ? profile.instagram : `https://instagram.com/${profile.instagram?.replace('@', '')}`)}
                                                target="_blank"
                                                className="group flex items-center justify-between w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 rounded-2xl hover:border-primary transition-all shadow-sm hover:shadow-md"
                                            >
                                                <div className="flex items-center gap-5">
                                                    <div className="size-14 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                                                        <Image size={28} />
                                                    </div>
                                                    <span className="font-bold text-lg text-gray-900 dark:text-white">Ver Portfólio de Projetos</span>
                                                </div>
                                                <span className="material-symbols-outlined text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_forward_ios</span>
                                            </a>
                                        ) : null}
                                    </div>
                                </section>

                                {/* Badges / Features */}
                                <section className="grid sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
                                        <div className="size-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                                            <Calendar size={24} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 dark:text-white">Facilidade</div>
                                            <div className="text-sm text-gray-500">Agendamento flexível</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
                                        <div className="size-12 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600">
                                            <Award size={24} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 dark:text-white">Qualidade</div>
                                            <div className="text-sm text-gray-500">Referência local</div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* Right Column: Sidebar Actions */}
                            <div className="space-y-6">
                                <div className="p-8 rounded-[2rem] bg-gray-900 text-white shadow-xl shadow-gray-200 dark:shadow-none space-y-6 sticky top-8">
                                    <div className="text-center">
                                        <h3 className="text-xl font-bold mb-1">Contatar Profissional</h3>
                                        <p className="text-gray-400 text-sm">Resposta média em 30 min</p>
                                    </div>

                                    <div className="space-y-3">
                                        <a
                                            href={`https://wa.me/${formatWhatsApp(profile.telefone)}?text=Olá ${profile.nome_prestador}! Vi seu anúncio "${profile.titulo}" no Conecta Dourados e gostaria de fazer um orçamento.`}
                                            target="_blank"
                                            className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#128C7E] text-white h-16 rounded-2xl font-black text-lg transition-all shadow-lg shadow-green-900/20 active:scale-95"
                                        >
                                            <MessageCircle size={24} />
                                            WhatsApp
                                        </a>

                                        <button className="flex items-center justify-center gap-3 w-full bg-white/10 hover:bg-white/20 text-white h-16 rounded-2xl font-black text-lg transition-all border border-white/10 active:scale-95">
                                            Enviar E-mail
                                        </button>
                                    </div>

                                    <div className="pt-6 border-t border-white/10 space-y-4">
                                        {profile.instagram && (
                                            <a href={profile.instagram.startsWith('http') ? profile.instagram : `https://instagram.com/${profile.instagram.replace('@', '')}`} target="_blank" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                                                <div className="size-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-all">
                                                    <Instagram size={20} />
                                                </div>
                                                <span className="font-bold underline">Instagram</span>
                                            </a>
                                        )}
                                        {profile.website && (
                                            <a href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`} target="_blank" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                                                <div className="size-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-all">
                                                    <Globe size={20} />
                                                </div>
                                                <span className="font-bold underline">Website</span>
                                            </a>
                                        )}
                                        <Link to={`/card/${profile.id}`} className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                                            <div className="size-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-all">
                                                <ExternalLink size={20} />
                                            </div>
                                            <span className="font-bold underline">Cartão Digital (QR)</span>
                                        </Link>
                                    </div>

                                    <div className="text-center pt-2">
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Selo Conecta Dourados 2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer Section */}
                <div className="mt-12 text-center opacity-40">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
                        Publicado em {new Date(profile.criado_em).toLocaleDateString('pt-BR')}
                    </p>
                </div>
            </main >
        </div >
    );
}
