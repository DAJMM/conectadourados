import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Briefcase, Globe, HelpCircle, CheckCircle, ArrowRight } from 'lucide-react';

export default function Register() {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, validation and API call would go here
        navigate('/register/success');
    };

    return (
        <div className="bg-[#f0f2f4] dark:bg-background-dark min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-display text-[#111417] dark:text-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Form Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight mb-2">Cadastro de Novo Prestador</h1>
                            <p className="text-[#647587] dark:text-gray-400">
                                Seja bem-vindo. Preencha os dados abaixo para começar a receber orçamentos em Dourados e região.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Quem é você? */}
                            <div className="bg-white dark:bg-[#1a2027] rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-2 mb-6 text-primary">
                                    <User size={24} />
                                    <h2 className="text-xl font-bold">Quem é você?</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Nome Completo</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Ex: João da Silva"
                                                className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                                                required
                                            />
                                            <Briefcase className="absolute right-3 top-3.5 text-gray-400" size={18} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-2">E-mail</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                placeholder="seu@email.com"
                                                className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                                                required
                                            />
                                            <Mail className="absolute right-3 top-3.5 text-gray-400" size={18} />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold mb-2">WhatsApp</label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                placeholder="(67) 9 9999-9999"
                                                className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                                                required
                                            />
                                            <Phone className="absolute right-3 top-3.5 text-gray-400" size={18} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Seu Serviço */}
                            <div className="bg-white dark:bg-[#1a2027] rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-2 mb-6 text-primary">
                                    <Briefcase size={24} />
                                    <h2 className="text-xl font-bold">Seu Serviço</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Categoria</label>
                                        <select className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white appearance-none">
                                            <option value="">Selecione..</option>
                                            <option>Eletricista</option>
                                            <option>Encanador</option>
                                            <option>Pintor</option>
                                            <option>Diarista</option>
                                            <option>Pedreiro</option>
                                            <option>Outros</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Anos de Experiência</label>
                                        <input
                                            type="text"
                                            placeholder="Ex: 5"
                                            className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold mb-2">Bairros atendidos em Dourados</label>
                                        <textarea
                                            placeholder="Ex: Centro, Itahum, Vila Maxwell..."
                                            className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white h-24 resize-none"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Sua Presença Digital */}
                            <div className="bg-white dark:bg-[#1a2027] rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-2 mb-6 text-primary">
                                    <Globe size={24} />
                                    <h2 className="text-xl font-bold">Sua Presença Digital</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Instagram</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-3.5 text-gray-400">@</span>
                                            <input
                                                type="text"
                                                placeholder="usuario"
                                                className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Portfólio ou Site</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="https://meusite.com"
                                                className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                                            />
                                            <Globe className="absolute right-3 top-3.5 text-gray-400" size={18} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    className="w-full md:w-auto bg-primary text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-primary-light transition-all active:scale-[0.98]"
                                >
                                    Finalizar Meu Cadastro
                                </button>
                            </div>

                        </form>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Tips Box */}
                        <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-xl border border-yellow-100 dark:border-yellow-900/30">
                            <div className="flex items-center gap-2 mb-4 text-yellow-700 dark:text-yellow-500">
                                <span className="material-symbols-outlined">lightbulb</span>
                                <h3 className="font-bold">Dicas para um bom cadastro</h3>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <CheckCircle className="text-primary shrink-0" size={20} />
                                    <div>
                                        <p className="font-bold text-sm text-[#111417] dark:text-white">E-mail Profissional</p>
                                        <p className="text-xs text-[#647587] dark:text-gray-400">Use um e-mail que você acessa diariamente.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle className="text-primary shrink-0" size={20} />
                                    <div>
                                        <p className="font-bold text-sm text-[#111417] dark:text-white">Áreas de Atuação</p>
                                        <p className="text-xs text-[#647587] dark:text-gray-400">Seja específico sobre quais bairros você atende em Dourados.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle className="text-primary shrink-0" size={20} />
                                    <div>
                                        <p className="font-bold text-sm text-[#111417] dark:text-white">Portfólio</p>
                                        <p className="text-xs text-[#647587] dark:text-gray-400">Fotos de trabalhos anteriores aumentam suas chances em 70%.</p>
                                    </div>
                                </li>
                            </ul>

                            <div className="mt-6 pt-6 border-t border-yellow-200 dark:border-yellow-800/30">
                                <p className="text-xs font-bold mb-2 text-center text-yellow-800 dark:text-yellow-500">Dúvidas sobre o cadastro?</p>
                                <button className="w-full bg-white dark:bg-gray-800 py-3 rounded-lg font-bold text-sm shadow-sm hover:shadow transition-shadow flex items-center justify-center gap-2 text-[#111417] dark:text-white">
                                    <HelpCircle size={18} />
                                    Fale com o Suporte
                                </button>
                            </div>
                        </div>

                        {/* Highlight Box */}
                        <div className="bg-primary text-white p-6 rounded-xl relative overflow-hidden group">
                            <div className="relative z-10">
                                <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">Destaque</p>
                                <h3 className="text-xl font-bold leading-tight mb-4">Ganhe visibilidade no topo das buscas.</h3>
                                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold hover:underline">
                                    Saiba mais <ArrowRight size={16} />
                                </a>
                            </div>
                            {/* Decor */}
                            <div className="absolute -bottom-4 -right-4 text-white opacity-10 rotate-12 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[80px]">verified</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
