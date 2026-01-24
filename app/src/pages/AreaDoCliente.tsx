import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import {
    Megaphone,
    MessageCircle,
    User,
    Settings,
    FileText,
    LogOut,
    Star,
    Bell,
    ChevronRight
} from 'lucide-react';

export default function AreaDoCliente() {
    const { user, role, loading, signOut } = useAuth();
    const navigate = useNavigate();

    console.log('[AreaDoCliente] Render - loading:', loading, 'user:', user?.email, 'role:', role);

    useEffect(() => {
        console.log('[AreaDoCliente] useEffect - loading:', loading, 'user:', user?.email, 'role:', role);

        if (!loading && !user) {
            console.log('[AreaDoCliente] No user, redirecting to login');
            navigate('/login');
        }
        // Redirect admin to admin area
        if (!loading && role === 'admin') {
            console.log('[AreaDoCliente] Admin user, redirecting to /admin');
            navigate('/admin');
        }
    }, [user, role, loading, navigate]);

    const handleLogout = async () => {
        try {
            console.log('[AreaDoCliente] Initiating logout');
            await signOut();
            console.log('[AreaDoCliente] Logout successful, navigating to home');
            navigate('/');
        } catch (error) {
            console.error('[AreaDoCliente] Error during logout:', error);
            // Fallback: force navigation even if error
            navigate('/');
        }
    };

    if (loading) {
        console.log('[AreaDoCliente] Showing loading spinner');
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background-dark">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    console.log('[AreaDoCliente] Rendering main content');

    const menuItems = [
        {
            icon: Megaphone,
            title: 'Meus Anúncios',
            description: 'Gerencie e crie novos anúncios de serviços',
            href: '/meus-anuncios',
            color: 'bg-blue-500'
        },
        {
            icon: User,
            title: 'Meu Perfil',
            description: 'Atualize suas informações pessoais',
            href: '/meu-perfil',
            color: 'bg-green-500'
        },
        {
            icon: MessageCircle,
            title: 'Mensagens',
            description: 'Veja suas conversas com clientes',
            href: '#',
            color: 'bg-purple-500',
            badge: 'Em breve'
        },
        {
            icon: Star,
            title: 'Avaliações',
            description: 'Confira o feedback dos seus clientes',
            href: '#',
            color: 'bg-yellow-500',
            badge: 'Em breve'
        },
        {
            icon: Bell,
            title: 'Notificações',
            description: 'Configure alertas e preferências',
            href: '#',
            color: 'bg-red-500',
            badge: 'Em breve'
        },
        {
            icon: Settings,
            title: 'Configurações',
            description: 'Ajuste suas preferências de conta',
            href: '#',
            color: 'bg-gray-500',
            badge: 'Em breve'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-background-dark py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white dark:bg-[#1a2027] rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-center sm:text-left flex-1">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Olá, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}!
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                                Conta Ativa
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
                        >
                            <LogOut size={20} />
                            <span className="font-medium">Sair</span>
                        </button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white dark:bg-[#1a2027] rounded-xl p-5 shadow">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <Megaphone className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Anúncios Ativos</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#1a2027] rounded-xl p-5 shadow">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <MessageCircle className="text-green-600" size={24} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Mensagens</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#1a2027] rounded-xl p-5 shadow">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                                <Star className="text-yellow-600" size={24} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">-</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Avaliação Média</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.href}
                            className="bg-white dark:bg-[#1a2027] rounded-xl p-5 shadow hover:shadow-lg transition-all hover:-translate-y-1 group"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 ${item.color} rounded-xl text-white`}>
                                    <item.icon size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                                        {item.badge && (
                                            <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                                </div>
                                <ChevronRight className="text-gray-400 group-hover:text-primary transition-colors" size={20} />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Help Section */}
                <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <FileText size={32} />
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <h3 className="text-xl font-bold">Precisa de ajuda?</h3>
                            <p className="text-white/80">Entre em contato com nosso suporte via WhatsApp</p>
                        </div>
                        <a
                            href="https://wa.me/5567999999999"
                            target="_blank"
                            className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all"
                        >
                            Falar com Suporte
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
