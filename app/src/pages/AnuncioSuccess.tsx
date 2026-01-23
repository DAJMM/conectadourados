import { useNavigate, useLocation } from 'react-router-dom';
import { Check, MessageCircle, Eye, TrendingUp, Users, Star } from 'lucide-react';

export default function AnuncioSuccess() {
    const navigate = useNavigate();
    const location = useLocation();

    // Get data passed from the CriarAnuncio component
    const { name, category, titulo, phone } = location.state || {
        name: 'Visitante',
        category: 'Não informada',
        titulo: 'Seu anúncio',
        phone: '5567999999999'
    };

    // Format phone for WhatsApp link
    const cleanPhone = phone.replace(/\D/g, '');
    const waPhone = cleanPhone.length > 0 ? (cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`) : '5567999999999';

    return (
        <div className="bg-[#f0f2f4] dark:bg-background-dark min-h-screen py-12 px-4 font-display">
            <div className="max-w-4xl mx-auto">

                {/* Brand Header */}
                <div className="text-center mb-8 flex items-center justify-center gap-2">
                    <div className="size-8 text-primary">
                        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V44Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <h2 className="text-[#111518] dark:text-white text-xl font-bold">Conecta Dourados</h2>
                </div>

                {/* Success Card */}
                <div className="bg-white dark:bg-[#1a2027] rounded-[2rem] p-8 md:p-12 shadow-xl text-center relative overflow-hidden mb-8">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="size-24 bg-primary/10 rounded-full flex items-center justify-center relative">
                            <div className="size-16 bg-primary rounded-full flex items-center justify-center animate-bounce-short">
                                <Check className="text-white" size={40} strokeWidth={4} />
                            </div>
                            {/* Ripple effect rings */}
                            <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping"></div>
                        </div>
                    </div>

                    <h1 className="text-3xl font-black text-[#111417] dark:text-white mb-4 tracking-tight">
                        Anúncio Publicado com Sucesso!
                    </h1>

                    <p className="text-[#647587] dark:text-gray-400 text-lg mb-8 leading-relaxed">
                        Seu anúncio já está <span className="text-primary font-bold">ativo e visível</span> para milhares de clientes em Dourados!
                    </p>

                    {/* Summary Box */}
                    <div className="bg-[#f8fafc] dark:bg-gray-800 rounded-xl p-6 mb-8 text-left border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-primary">Resumo do Anúncio</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                            <span className="text-sm text-gray-500">Título</span>
                            <span className="text-sm font-bold text-[#111417] dark:text-white">{titulo}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                            <span className="text-sm text-gray-500">Profissional</span>
                            <span className="text-sm font-bold text-[#111417] dark:text-white">{name}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-gray-500">Categoria</span>
                            <span className="text-sm font-bold text-[#111417] dark:text-white">{category}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/meus-anuncios')}
                            className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-primary-light transition-all transform hover:-translate-y-1"
                        >
                            <Eye size={24} />
                            Ver Meus Anúncios
                        </button>

                        <a
                            href={`https://wa.me/${waPhone}`}
                            target="_blank"
                            className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#128C7E] transition-all transform hover:-translate-y-1"
                        >
                            <MessageCircle size={24} />
                            Compartilhar no WhatsApp
                        </a>

                        <button
                            onClick={() => navigate('/')}
                            className="w-full flex items-center justify-center gap-2 bg-[#f0f2f4] dark:bg-gray-700 text-[#111417] dark:text-white font-bold py-4 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            Voltar para o Início
                        </button>
                    </div>
                </div>

                {/* Stats Section - Como funciona */}
                <div className="bg-white dark:bg-[#1a2027] rounded-2xl p-8 shadow-lg mb-8">
                    <h3 className="text-xl font-bold text-center text-[#111417] dark:text-white mb-6">
                        O que acontece agora?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4">
                            <div className="size-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="text-primary" size={28} />
                            </div>
                            <h4 className="font-bold text-[#111417] dark:text-white mb-2">Clientes Veem Você</h4>
                            <p className="text-sm text-gray-500">Seu anúncio aparece na busca de profissionais da região.</p>
                        </div>
                        <div className="text-center p-4">
                            <div className="size-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="text-green-600" size={28} />
                            </div>
                            <h4 className="font-bold text-[#111417] dark:text-white mb-2">Receba Contatos</h4>
                            <p className="text-sm text-gray-500">Interessados entram em contato diretamente pelo WhatsApp.</p>
                        </div>
                        <div className="text-center p-4">
                            <div className="size-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <TrendingUp className="text-yellow-600" size={28} />
                            </div>
                            <h4 className="font-bold text-[#111417] dark:text-white mb-2">Cresça seu Negócio</h4>
                            <p className="text-sm text-gray-500">Aumente sua visibilidade e conquiste novos clientes.</p>
                        </div>
                    </div>
                </div>

                {/* Tip Box */}
                <div className="bg-gradient-to-r from-primary/10 to-blue-50 dark:from-primary/20 dark:to-gray-800 rounded-2xl p-6 flex items-start gap-4">
                    <div className="size-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Star className="text-white" size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-[#111417] dark:text-white mb-1">Dica para mais resultados</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Mantenha seu perfil atualizado e responda rapidamente às mensagens.
                            Profissionais com respostas rápidas recebem <strong>45% mais contatos</strong>!
                        </p>
                    </div>
                </div>

                <div className="flex justify-center gap-6 mt-8 text-xs text-gray-400">
                    <a href="/privacy" className="hover:text-primary">Privacidade</a>
                    <a href="/faq" className="hover:text-primary">Ajuda</a>
                </div>

            </div>
        </div>
    );
}
