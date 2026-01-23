import { useState } from 'react';
import { Search, ChevronDown, Mail, MessageCircle } from 'lucide-react';

type Tab = 'seekers' | 'professionals';

export default function FAQ() {
    const [activeTab, setActiveTab] = useState<Tab>('seekers');

    const faqData = {
        seekers: [
            {
                question: "É gratuito para buscar profissionais?",
                answer: "Sim, para quem busca serviços a plataforma é totalmente gratuita. Você pode navegar pelas categorias, ver perfis completos, portfólios e entrar em contato direto com os profissionais sem pagar nenhuma taxa de intermediação."
            },
            {
                question: "Como avalio um profissional após o serviço?",
                answer: "Após o contato inicial, você poderá retornar ao perfil do profissional para deixar uma avaliação de 1 a 5 estrelas e um comentário sobre sua experiência. Isso ajuda outros usuários e mantém a qualidade da nossa comunidade."
            },
            {
                question: "O Conecta Dourados oferece garantia?",
                answer: "O Conecta Dourados funciona como uma vitrine de anúncios. A negociação e o pagamento são feitos diretamente entre você e o profissional. Recomendamos sempre solicitar nota fiscal e, para serviços maiores, formalizar um contrato simples de prestação de serviços."
            },
            {
                question: "Como entro em contato com um prestador?",
                answer: "No perfil de cada profissional, você encontrará botões de ação rápida, como WhatsApp, Telefone e E-mail. Basta clicar em um deles para iniciar uma conversa instantânea."
            }
        ],
        professionals: [
            {
                question: "Como faço para anunciar meus serviços?",
                answer: "Basta acessar a 'Área do Anunciante' no menu superior, fazer login ou criar uma conta, e preencher o formulário com os detalhes do seu serviço. Seu anúncio ficará visível imediatamente para clientes da região!"
            },
            {
                question: "Quanto custa para anunciar?",
                answer: "Oferecemos planos gratuitos e premiums. O plano gratuito permite visibilidade básica, enquanto os planos pagos oferecem destaque nas buscas, perfil personalizado e mais fotos no portfólio."
            },
            {
                question: "Posso atender outras cidades além de Dourados?",
                answer: "Nossa plataforma é focada na região de Dourados e cidades vizinhas. No seu perfil, você pode especificar exatamente quais bairros ou cidades você atende."
            }
        ]
    };

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-[#121417] dark:text-white transition-colors duration-200">

            {/* Hero Search Section */}
            <section className="bg-white dark:bg-[#1c2229] py-16 md:py-24 border-b border-[#e5e7eb] dark:border-[#2d3641]">
                <div className="max-w-[800px] mx-auto px-6 text-center">
                    <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Central de Ajuda</span>
                    <h1 className="text-[#121417] dark:text-white text-4xl md:text-5xl font-extrabold tracking-tight mb-8">Como podemos te ajudar?</h1>
                    <div className="relative group">
                        <label className="flex flex-col w-full">
                            <div className="flex w-full items-stretch rounded-xl h-14 bg-[#f1f2f4] dark:bg-[#2d3641] border-2 border-transparent focus-within:border-primary/30 transition-all shadow-sm">
                                <div className="text-[#677583] dark:text-[#9ca3af] flex items-center justify-center pl-5">
                                    <Search size={24} />
                                </div>
                                <input
                                    className="flex-1 bg-transparent border-none focus:ring-0 px-4 text-base font-medium placeholder:text-[#677583] dark:placeholder:text-[#9ca3af] text-[#121417] dark:text-white outline-none"
                                    placeholder="Pesquise por uma dúvida ou artigo..."
                                />
                                <div className="flex items-center pr-4">
                                    <span className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">ESC</span>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <span className="text-sm text-[#677583] dark:text-[#9ca3af]">Buscas populares:</span>
                        <a className="text-sm font-medium text-primary hover:underline cursor-pointer">Garantia</a>
                        <a className="text-sm font-medium text-primary hover:underline cursor-pointer">Pagamentos</a>
                        <a className="text-sm font-medium text-primary hover:underline cursor-pointer">Avaliações</a>
                    </div>
                </div>
            </section>

            {/* Tabs Section */}
            <section className="max-w-[960px] mx-auto w-full px-6 mt-12">
                <div className="border-b border-[#dde0e4] dark:border-[#2d3641]">
                    <div className="flex gap-10">
                        <button
                            onClick={() => setActiveTab('seekers')}
                            className={`relative flex flex-col items-center justify-center pb-4 pt-4 group ${activeTab === 'seekers' ? '' : 'opacity-60 hover:opacity-100'}`}
                        >
                            <p className={`text-base font-bold leading-normal tracking-tight ${activeTab === 'seekers' ? 'text-[#121417] dark:text-white' : 'text-[#677583] dark:text-[#9ca3af]'}`}>
                                Para quem busca serviços
                            </p>
                            <div className={`absolute bottom-0 left-0 h-[3px] bg-primary rounded-full transition-all duration-300 ${activeTab === 'seekers' ? 'w-full' : 'w-0 group-hover:w-full bg-primary/30'}`}></div>
                        </button>

                        <button
                            onClick={() => setActiveTab('professionals')}
                            className={`relative flex flex-col items-center justify-center pb-4 pt-4 group ${activeTab === 'professionals' ? '' : 'opacity-60 hover:opacity-100'}`}
                        >
                            <p className={`text-base font-bold leading-normal tracking-tight ${activeTab === 'professionals' ? 'text-[#121417] dark:text-white' : 'text-[#677583] dark:text-[#9ca3af]'}`}>
                                Para profissionais
                            </p>
                            <div className={`absolute bottom-0 left-0 h-[3px] bg-primary rounded-full transition-all duration-300 ${activeTab === 'professionals' ? 'w-full' : 'w-0 group-hover:w-full bg-primary/30'}`}></div>
                        </button>
                    </div>
                </div>

                {/* Accordion Section */}
                <div className="mt-8 space-y-4 mb-16 min-h-[300px]">
                    {faqData[activeTab].map((item, index) => (
                        <div key={index} className="bg-white dark:bg-[#1c2229] border border-[#e5e7eb] dark:border-[#2d3641] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <details className="group" open={index === 0}>
                                <summary className="flex cursor-pointer items-center justify-between gap-6 p-6 select-none list-none outline-none">
                                    <p className="text-[#121417] dark:text-white text-lg font-bold leading-normal">{item.question}</p>
                                    <ChevronDown className="text-primary group-open:rotate-180 transition-transform duration-300" />
                                </summary>
                                <div className="px-6 pb-6 pt-0">
                                    <p className="text-[#4b5563] dark:text-[#d1d5db] text-base leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            </details>
                        </div>
                    ))}
                </div>

                {/* Still have questions? Section */}
                <div className="bg-primary/5 dark:bg-primary/10 border-2 border-primary/20 rounded-2xl p-8 md:p-12 mb-20 text-center relative overflow-hidden group">
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors pointer-events-none"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl md:text-3xl font-extrabold text-[#121417] dark:text-white mb-4">Ainda tem dúvidas?</h3>
                        <p className="text-[#4b5563] dark:text-[#d1d5db] max-w-lg mx-auto mb-8 font-medium">
                            Nossa equipe de suporte está pronta para ajudar você com qualquer dificuldade ou dúvida sobre a plataforma.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="https://wa.me/5567999999999"
                                target="_blank"
                                className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-green-500/20 transition-all hover:scale-105 active:scale-95"
                            >
                                <MessageCircle size={20} />
                                Falar no WhatsApp
                            </a>
                            <a
                                href="mailto:suporte@conectadourados.com.br"
                                className="flex items-center gap-2 text-primary font-bold px-6 py-3.5 hover:bg-white dark:hover:bg-[#1c2229] rounded-xl transition-colors"
                            >
                                <Mail size={20} />
                                suporte@conectadourados.com.br
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
