import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
    Download,
    Share2,
    MapPin,
    CheckCircle,
    Briefcase,
    User,
    QrCode,
    Printer,
    Loader2
} from 'lucide-react';

interface AnuncioCard {
    id: string;
    titulo: string;
    nome_prestador: string;
    telefone: string;
    categoria: string;
    avatar_url?: string;
}

export default function DigitalCard() {
    const { id } = useParams<{ id: string }>();
    const [profile, setProfile] = useState<AnuncioCard | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        fetchProfile();
    }, [id]);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('anuncios')
                .select(`
                    id,
                    titulo,
                    nome_prestador,
                    telefone,
                    categoria,
                    profiles:usuario_id (
                        avatar_url,
                        full_name
                    )
                `)
                .eq('id', id)
                .single();

            if (error) throw error;
            if (data) {
                const profileData = (data as any).profiles;
                setProfile({
                    ...data,
                    avatar_url: profileData?.avatar_url,
                    nome_prestador: data.nome_prestador || profileData?.full_name || 'Profissional'
                });
            }
        } catch (err) {
            console.error('Erro ao buscar cartão:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `Cartão de ${profile?.nome_prestador}`,
                text: `Confira os serviços de ${profile?.nome_prestador} no Conecta Dourados.`,
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
            <div className="min-h-screen bg-[#f0f2f4] dark:bg-[#111921] flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-primary size-10" />
            </div>
        );
    }

    if (!profile) return (
        <div className="min-h-screen bg-[#f0f2f4] dark:bg-[#111921] flex flex-col items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl text-center">
                <h2 className="text-xl font-bold mb-4">Cartão não encontrado</h2>
                <Link to="/" className="text-primary font-bold underline">Voltar para o início</Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f0f2f4] dark:bg-[#111921] flex flex-col items-center justify-center p-4 font-display">

            {/* Top Bar */}
            <div className="w-full max-w-4xl flex justify-between items-center mb-8 px-4">
                <Link to="/" className="flex items-center gap-2 text-[#111417] dark:text-white">
                    <div className="size-6 text-primary">
                        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <span className="font-bold text-sm tracking-tight">Conecta Dourados</span>
                </Link>
                <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm">
                        <Download size={20} />
                    </button>
                    <button onClick={handleShare} className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm">
                        <Share2 size={20} />
                    </button>
                </div>
            </div>

            {/* The Digital Card */}
            <div className="bg-white dark:bg-[#1a2027] w-full max-w-[400px] rounded-[2rem] p-8 shadow-2xl border border-white/50 dark:border-gray-700 relative overflow-hidden">

                {/* Status Badge */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-green-400"></div>

                {/* Profile Section */}
                <div className="flex flex-col items-center text-center mt-4 mb-8">
                    <div className="relative mb-4">
                        {profile.avatar_url ? (
                            <div className="size-28 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden">
                                <img
                                    src={profile.avatar_url}
                                    alt={profile.nome_prestador}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className={`size-28 rounded-full border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center text-white text-3xl font-bold ${getAvatarColor(profile.nome_prestador)}`}>
                                {getInitials(profile.nome_prestador)}
                            </div>
                        )}
                        <div className="absolute bottom-1 right-1 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md">
                            <CheckCircle className="text-primary fill-current" size={24} />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-[#111417] dark:text-white mb-1">{profile.nome_prestador}</h1>
                    <p className="text-primary font-bold text-sm mb-1">{profile.titulo}</p>
                    <p className="text-[#647587] dark:text-gray-400 font-medium text-xs">{profile.categoria}</p>

                    <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider">
                        <span className="size-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        Profissional Verificado
                    </div>
                </div>

                {/* QR Code Section */}
                <div className="bg-[#f8fafc] dark:bg-gray-800/50 border-2 border-dashed border-[#e2e8f0] dark:border-gray-700 rounded-2xl p-6 mb-8 flex flex-col items-center justify-center group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="bg-white p-3 rounded-xl shadow-sm mb-3">
                        <QrCode size={100} className="text-[#111417]" />
                    </div>
                    <p className="text-[10px] text-center text-gray-400 font-medium group-hover:text-primary transition-colors">
                        Escaneie para ver o perfil completo<br />e avaliações de clientes.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <a
                        href={`https://wa.me/${formatWhatsApp(profile.telefone)}?text=Olá ${profile.nome_prestador}! Vi seu Cartão Digital no Conecta Dourados e gostaria de informações.`}
                        target="_blank"
                        className="w-full flex items-center justify-between px-6 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-bold shadow-lg shadow-green-200 dark:shadow-none transition-all active:scale-[0.98]"
                    >
                        <div className="flex items-center gap-3">
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
                            <span>WhatsApp</span>
                        </div>
                        <div className="bg-white/20 rounded-lg p-1">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                        </div>
                    </a>

                    <Link
                        to={`/profile/${profile.id}`}
                        className="w-full flex items-center justify-between px-6 py-4 bg-[#111921] dark:bg-white text-white dark:text-[#111921] rounded-xl font-bold shadow-lg hover:opacity-90 transition-all active:scale-[0.98]"
                    >
                        <div className="flex items-center gap-3">
                            <Briefcase size={20} />
                            <span>Ver Perfil Completo</span>
                        </div>
                        <div className="bg-white/20 dark:bg-black/10 rounded-lg p-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                        </div>
                    </Link>

                    <div className="w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-2 border-[#f0f2f4] dark:border-gray-700 rounded-xl font-bold text-[#647587] dark:text-gray-300">
                        <div className="flex items-center gap-3">
                            <MapPin size={20} className="text-primary" />
                            <span>Localização</span>
                        </div>
                        <span className="text-xs font-normal">Dourados, MS</span>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#f0f2f4] dark:border-gray-700 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    <div className="size-3 text-primary">
                        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    Selo de Qualidade Conecta Dourados
                </div>

            </div>

            {/* Footer Actions */}
            <div className="mt-8 flex gap-6 text-xs font-bold text-gray-500 dark:text-gray-400">
                <button className="flex items-center gap-2 hover:text-primary transition-colors">
                    <User size={16} />
                    Salvar Contato
                </button>
                <button className="flex items-center gap-2 hover:text-primary transition-colors" onClick={() => window.print()}>
                    <Printer size={16} />
                    Imprimir Cartão
                </button>
            </div>

        </div>
    );
}
