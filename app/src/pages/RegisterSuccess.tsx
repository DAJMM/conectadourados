import { useNavigate } from 'react-router-dom';
import { Check, MessageCircle } from 'lucide-react';

export default function RegisterSuccess() {
    const navigate = useNavigate();

    return (
        <div className="bg-[#f0f2f4] dark:bg-background-dark min-h-screen flex items-center justify-center px-4 font-display">
            <div className="max-w-xl w-full">

                {/* Brand Header */}
                <div className="text-center mb-8 flex items-center justify-center gap-2">
                    <div className="size-8 text-primary">
                        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <h2 className="text-[#111518] dark:text-white text-xl font-bold">Conecta Dourados</h2>
                </div>

                <div className="bg-white dark:bg-[#1a2027] rounded-[2rem] p-8 md:p-12 shadow-xl text-center relative overflow-hidden">
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
                        Recebemos seu interesse!
                    </h1>

                    <p className="text-[#647587] dark:text-gray-400 text-lg mb-8 leading-relaxed">
                        Nossa equipe entrará em contato em até <span className="text-primary font-bold">24h via WhatsApp</span> para criar sua mini landing page.
                    </p>

                    {/* Summary Box */}
                    <div className="bg-[#f8fafc] dark:bg-gray-800 rounded-xl p-6 mb-8 text-left border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-primary">Resumo do Envio</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                            <span className="text-sm text-gray-500">Profissional</span>
                            <span className="text-sm font-bold text-[#111417] dark:text-white">João Silva</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-gray-500">Categoria</span>
                            <span className="text-sm font-bold text-[#111417] dark:text-white">Reformas e Pintura</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <a
                            href="https://wa.me/5567999999999"
                            target="_blank"
                            className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#128C7E] transition-all transform hover:-translate-y-1"
                        >
                            <MessageCircle size={24} />
                            Falar agora pelo WhatsApp
                        </a>

                        <button
                            onClick={() => navigate('/')}
                            className="w-full flex items-center justify-center gap-2 bg-[#f0f2f4] dark:bg-gray-700 text-[#111417] dark:text-white font-bold py-4 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            Voltar para o Início
                        </button>
                    </div>

                </div>

                <div className="flex justify-center gap-6 mt-8 text-xs text-gray-400">
                    <a href="#" className="hover:text-primary">Privacidade</a>
                    <a href="#" className="hover:text-primary">Termos</a>
                    <a href="#" className="hover:text-primary">Ajuda</a>
                </div>

            </div>
        </div>
    );
}
