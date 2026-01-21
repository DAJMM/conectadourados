import { TrendingUp, MonitorSmartphone, MessageSquareText, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Advertise() {
    return (
        <div className="font-display w-full flex flex-col items-center bg-white dark:bg-background-dark text-[#111417] dark:text-white">

            <main className="w-full">
                {/* Hero Section */}
                <section className="relative pt-10 pb-16 md:pt-16 md:pb-24">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="flex flex-col gap-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    </span>
                                    Junte-se a +100 profissionais locais
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em] text-[#111417] dark:text-white">
                                    Destaque seu serviço em <span className="text-primary">Dourados</span>
                                </h1>
                                <p className="text-lg md:text-xl text-[#647587] dark:text-gray-400 font-normal leading-relaxed max-w-lg">
                                    Seja visto por milhares de clientes locais e aumente seu faturamento com uma presença digital profissional e otimizada.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                    <Link to="/register" className="flex items-center justify-center bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all">
                                        Quero me cadastrar
                                    </Link>
                                    <a href="#" className="flex items-center justify-center border border-[#dce0e5] dark:border-[#3a3f44] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-[#111417] dark:text-gray-200">
                                        Ver exemplo de perfil
                                    </a>
                                </div>
                            </div>
                            <div className="relative hidden md:block">
                                <div className="aspect-square rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center overflow-hidden">
                                    <div className="w-full h-full bg-cover bg-center opacity-90" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9rrmcMhTxJy7mN5MjtYhdxd_w-kZW7xzjADXW4de7uSdWRdWjU7c8LKzk_sXdixxHfMvl_AWcyJURnLHRCyWLUKjqbnmQGLNGUdhAkkl2cAiqliJ2CS4sD0mFTz1zcn1rtRUHj4BYxqCAaktZ8wBSuFJ5nALsDTLo_jfdR8SqUY4I90_ZpuKlub18Rnh56LLeMGo9YffadqGYjjvSCmcrEFc_F1BGAlVx8_SfOMWxQZQ0aF9k5XE9V3E3v_t_vfHe4k68Mxv0QBUd')" }}></div>
                                </div>
                                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-[240px]">
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="size-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                            <TrendingUp size={24} />
                                        </div>
                                        <span className="font-bold text-2xl dark:text-white">+45%</span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Aumento médio de orçamentos mensais para nossos parceiros.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="bg-[#fafbfc] dark:bg-[#1a1e22] py-20">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#111417] dark:text-white mb-4">Por que anunciar conosco?</h2>
                            <p className="text-[#647587] dark:text-gray-400 max-w-2xl mx-auto">Nossa plataforma foi desenhada para conectar quem precisa com quem sabe fazer, sem burocracia e com foco total em resultados locais.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Card 1 */}
                            <div className="flex flex-col gap-5 bg-white dark:bg-background-dark p-8 rounded-lg border border-[#dce0e5] dark:border-[#3a3f44] hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                                    <TrendingUp size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-[#111417] dark:text-white">Maior Visibilidade</h3>
                                    <p className="text-[#647587] dark:text-gray-400 leading-relaxed">
                                        Apareça no topo das buscas para quem procura serviços especificamente na região de Dourados e cidades vizinhas.
                                    </p>
                                </div>
                            </div>
                            {/* Card 2 */}
                            <div className="flex flex-col gap-5 bg-white dark:bg-background-dark p-8 rounded-lg border border-[#dce0e5] dark:border-[#3a3f44] hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                                    <MonitorSmartphone size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-[#111417] dark:text-white">Mini Landing Page</h3>
                                    <p className="text-[#647587] dark:text-gray-400 leading-relaxed">
                                        Tenha uma página exclusiva com suas fotos de trabalhos realizados, descrição detalhada e avaliações reais de clientes.
                                    </p>
                                </div>
                            </div>
                            {/* Card 3 */}
                            <div className="flex flex-col gap-5 bg-white dark:bg-background-dark p-8 rounded-lg border border-[#dce0e5] dark:border-[#3a3f44] hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                                    <MessageSquareText size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-[#111417] dark:text-white">Contato Direto</h3>
                                    <p className="text-[#647587] dark:text-gray-400 leading-relaxed">
                                        Receba orçamentos diretamente no seu WhatsApp. Sem intermediários, sem comissões e sem taxas ocultas por lead.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action Section (Replaces the inline form) */}
                <section className="py-24 bg-white dark:bg-background-dark" id="form">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="bg-primary rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none">
                                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white"></path>
                                    <path d="M100 0 C 80 100 50 100 0 0 Z" fill="white" opacity="0.5"></path>
                                </svg>
                            </div>

                            <div className="flex-1 p-12 md:p-20 flex flex-col justify-center relative z-10 text-white">
                                <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Pronto para começar?</h2>
                                <p className="text-white/90 mb-10 text-lg max-w-xl leading-relaxed">
                                    Junte-se aos melhores profissionais de Dourados. O cadastro é completo, seguro e leva menos de 5 minutos.
                                </p>
                                <ul className="space-y-4 mb-10">
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="text-green-300 shrink-0" size={24} />
                                        <span className="font-medium text-lg">Página exclusiva de vendas</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="text-green-300 shrink-0" size={24} />
                                        <span className="font-medium text-lg">Suporte humanizado via WhatsApp</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="text-green-300 shrink-0" size={24} />
                                        <span className="font-medium text-lg">Sem taxas escondidas</span>
                                    </li>
                                </ul>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link to="/register" className="bg-white text-primary px-10 py-5 rounded-xl font-black text-xl hover:bg-gray-100 shadow-xl transition-all hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                                        Fazer Cadastro Completo
                                        <ArrowRight size={24} />
                                    </Link>
                                </div>
                            </div>

                            <div className="hidden md:block w-1/3 bg-black/10 relative">
                                <img
                                    src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop"
                                    alt="Profissional Dourados"
                                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Floating WhatsApp */}
            <a className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-50 flex items-center justify-center" href="https://wa.me/5567999999999" target="_blank">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                </svg>
            </a>
        </div>
    );
}
