import { ChevronRight, CheckCircle, FileText, Sparkles, Languages, MapPin, AlertTriangle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Privacy() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased min-h-screen">
            <main className="max-w-5xl mx-auto px-6 py-12">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 mb-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <Link to="/" className="hover:text-primary">Dourados, MS</Link>
                    <ChevronRight size={16} />
                    <span className="text-slate-900 dark:text-slate-100">Políticas de Privacidade</span>
                </nav>

                {/* Page Heading */}
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
                        Transparência é o nosso compromisso.
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                        Criamos este guia simplificado para que você entenda exatamente como cuidamos dos seus dados em Dourados, sem letras miúdas ou juridiquês excessivo.
                    </p>
                </div>

                {/* Action Panel: Executive Summary */}
                <div className="bg-[#f8fafc] dark:bg-[#242c3d] rounded-xl border border-primary/20 p-8 mb-16 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-4 text-primary dark:text-blue-400">
                                <Sparkles size={20} />
                                <span className="font-bold uppercase tracking-wider text-xs">Resumo para facilitar</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-[#121417] dark:text-white">O que você realmente precisa saber:</h3>
                            <ul className="grid md:grid-cols-2 gap-4">
                                <li className="flex gap-3">
                                    <div className="mt-0.5">
                                        <CheckCircle size={20} className="text-green-500" />
                                    </div>
                                    <span className="text-slate-700 dark:text-slate-300">Coletamos apenas o básico para conectar você a profissionais locais.</span>
                                </li>
                                <li className="flex gap-3">
                                    <div className="mt-0.5">
                                        <CheckCircle size={20} className="text-green-500" />
                                    </div>
                                    <span className="text-slate-700 dark:text-slate-300">Seus dados estão protegidos pela LGPD e nunca são vendidos.</span>
                                </li>
                                <li className="flex gap-3">
                                    <div className="mt-0.5">
                                        <CheckCircle size={20} className="text-green-500" />
                                    </div>
                                    <span className="text-slate-700 dark:text-slate-300">Você tem controle total sobre seu perfil e histórico de serviços.</span>
                                </li>
                                <li className="flex gap-3">
                                    <div className="mt-0.5">
                                        <CheckCircle size={20} className="text-green-500" />
                                    </div>
                                    <span className="text-slate-700 dark:text-slate-300">Profissionais são verificados para garantir segurança em Dourados.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="shrink-0 w-full md:w-auto">
                            <a href="#" className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform">
                                <FileText size={20} />
                                Versão Completa (PDF)
                            </a>
                            <p className="text-xs text-center mt-3 text-slate-500">Atualizado em 15 de Outubro de 2023</p>
                        </div>
                    </div>
                </div>

                {/* Section Tabs */}
                <div className="border-b border-slate-200 dark:border-slate-800 mb-12 sticky top-20 bg-background-light dark:bg-background-dark py-2 z-40">
                    <div className="flex gap-8 overflow-x-auto no-scrollbar">
                        <a href="#lgpd" className="pb-4 text-sm font-bold border-b-2 border-primary text-primary whitespace-nowrap">Proteção de Dados (LGPD)</a>
                        <a href="#cookies" className="pb-4 text-sm font-bold border-b-2 border-transparent text-slate-500 hover:text-primary whitespace-nowrap">Cookies e Navegação</a>
                        <a href="#profissionais" className="pb-4 text-sm font-bold border-b-2 border-transparent text-slate-500 hover:text-primary whitespace-nowrap">Termos para Profissionais</a>
                    </div>
                </div>

                {/* Split Content Modules */}
                <div className="space-y-24 mb-24">

                    {/* LGPD Section */}
                    <section id="lgpd" className="grid md:grid-cols-2 gap-12 items-start scroll-mt-36">
                        <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-2xl border border-primary/10">
                            <div className="flex items-center gap-2 mb-6 text-primary dark:text-blue-400">
                                <Languages size={20} />
                                <span className="font-bold text-sm">Entenda em 1 minuto</span>
                            </div>
                            <h4 className="text-2xl font-bold mb-4 text-[#121417] dark:text-white">Como usamos seus dados</h4>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                                Para que o encanador ou eletricista chegue na sua casa em Dourados, precisamos do seu nome, endereço e telefone. Guardamos seu histórico para que você possa reclamar ou recontratar se precisar.
                            </p>
                            <div className="space-y-4">
                                <div className="flex gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                                    <MapPin className="text-primary shrink-0" size={24} />
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Sua localização exata só é revelada após você aceitar um orçamento.</p>
                                </div>
                            </div>
                        </div>
                        <div className="pt-4">
                            <div className="flex items-center gap-2 mb-6 text-slate-400">
                                <FileText size={20} />
                                <span className="font-bold text-sm">Texto Jurídico Formal</span>
                            </div>
                            <h4 className="text-xl font-bold mb-4 text-[#121417] dark:text-white">Seção 1.1 - Coleta e Tratamento</h4>
                            <div className="legal-text text-slate-500 dark:text-slate-400 text-sm space-y-4 leading-[1.7]">
                                <p>Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), a Conecta Dourados atua como controladora dos dados pessoais fornecidos voluntariamente pelo usuário no ato do cadastro e durante a utilização da plataforma.</p>
                                <p>O tratamento de dados pessoais de natureza identificável (nome, CPF, endereço geolocalizado) possui a finalidade estrita de execução contratual e intermediação de serviços prestados por terceiros.</p>
                            </div>
                        </div>
                    </section>

                    {/* Cookies Section */}
                    <section id="cookies" className="grid md:grid-cols-2 gap-12 items-start scroll-mt-36">
                        <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-2xl border border-primary/10">
                            <div className="flex items-center gap-2 mb-6 text-primary dark:text-blue-400">
                                <Languages size={20} />
                                <span className="font-bold text-sm">Entenda em 1 minuto</span>
                            </div>
                            <h4 className="text-2xl font-bold mb-4 text-[#121417] dark:text-white">Cookies e Lembranças</h4>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                Usamos pequenos arquivos para lembrar que você já está logado e quais serviços você mais procura. Isso evita que você tenha que digitar sua senha toda vez que abrir o site no celular.
                            </p>
                        </div>
                        <div className="pt-4">
                            <div className="flex items-center gap-2 mb-6 text-slate-400">
                                <FileText size={20} />
                                <span className="font-bold text-sm">Texto Jurídico Formal</span>
                            </div>
                            <h4 className="text-xl font-bold mb-4 text-[#121417] dark:text-white">Seção 2.4 - Identificadores Digitais</h4>
                            <div className="legal-text text-slate-500 dark:text-slate-400 text-sm space-y-4 leading-[1.7]">
                                <p>A plataforma utiliza cookies persistentes e de sessão para fins de autenticação, segurança e análise de desempenho. Cookies de terceiros podem ser utilizados para mensuração de tráfego e eficácia de marketing regional.</p>
                                <p>O usuário poderá, a qualquer tempo, gerir as preferências de cookies através das configurações do navegador, ciente de que a desativação pode impactar a funcionalidade total da plataforma.</p>
                            </div>
                        </div>
                    </section>

                    {/* Professionals Section */}
                    <section id="profissionais" className="grid md:grid-cols-2 gap-12 items-start scroll-mt-36">
                        <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-2xl border border-primary/10">
                            <div className="flex items-center gap-2 mb-6 text-primary dark:text-blue-400">
                                <Languages size={20} />
                                <span className="font-bold text-sm">Entenda em 1 minuto</span>
                            </div>
                            <h4 className="text-2xl font-bold mb-4 text-[#121417] dark:text-white">Regras para Profissionais</h4>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                                Se você presta serviços, deve ser honesto sobre seus preços e prazos. Nossa comunidade em Dourados se baseia na confiança. Avaliações ruins repetidas podem levar à suspensão da sua conta.
                            </p>
                            <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-lg flex items-start gap-3">
                                <AlertTriangle className="text-amber-500 shrink-0" size={24} />
                                <p className="text-xs text-slate-700 dark:text-slate-300">O profissional é o único responsável técnico pelo serviço executado, respondendo civilmente por danos.</p>
                            </div>
                        </div>
                        <div className="pt-4">
                            <div className="flex items-center gap-2 mb-6 text-slate-400">
                                <FileText size={20} />
                                <span className="font-bold text-sm">Texto Jurídico Formal</span>
                            </div>
                            <h4 className="text-xl font-bold mb-4 text-[#121417] dark:text-white">Seção 3.0 - Termos de Adesão do Prestador</h4>
                            <div className="legal-text text-slate-500 dark:text-slate-400 text-sm space-y-4 leading-[1.7]">
                                <p>O prestador de serviços reconhece que a Conecta Dourados atua como mera plataforma de aproximação (marketplace), não configurando vínculo empregatício ou responsabilidade solidária técnica pela execução das tarefas.</p>
                                <p>É dever do profissional manter a regularidade fiscal e técnica perante os órgãos municipais de Dourados, MS, incluindo o recolhimento de tributos pertinentes como o ISSQN.</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Contact Footer Panel */}
                <footer className="border-t border-slate-200 dark:border-slate-800 pt-12 pb-24">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div>
                            <h5 className="text-lg font-bold mb-2 text-[#121417] dark:text-white">Ainda tem dúvidas jurídicas?</h5>
                            <p className="text-slate-500 dark:text-slate-400">Nossa equipe de compliance está pronta para ajudar.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <a
                                href="mailto:juridico@conectadourados.com.br"
                                className="flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all"
                            >
                                <Mail size={20} />
                                juridico@conectadourados.com.br
                            </a>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between gap-4 text-xs text-slate-400">
                        <p>© 2024 Conecta Dourados - Todos os direitos reservados. Rua Joaquim Teixeira Alves, Dourados - MS.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-primary">Termos de Uso</a>
                            <a href="#" className="hover:text-primary">Ajuda</a>
                            <a href="#" className="hover:text-primary">Trabalhe Conosco</a>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
