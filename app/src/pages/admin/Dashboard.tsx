import { Bell, Download, Monitor, UserPlus, TrendingUp, TrendingDown, CheckCircle, Star } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-8 max-w-[1200px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#111518]">Dashboard Geral</h1>
                    <p className="text-[#647587] text-sm">Visão consolidada do mercado de Dourados, MS</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 bg-white rounded-full text-[#647587] hover:text-[#111518] border border-[#f0f2f4] shadow-sm relative">
                        <Bell size={20} />
                        <span className="absolute top-0 right-0 size-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg shadow-sm hover:bg-primary-light transition-colors">
                        <Download size={16} />
                        <span>Exportar Relatório</span>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border border-[#f0f2f4] shadow-sm flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                        <div className="p-3 bg-blue-50 text-primary rounded-lg">
                            <Monitor size={20} />
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">+12%</span>
                    </div>
                    <div>
                        <p className="text-[#647587] text-xs font-bold uppercase tracking-wider mb-1">Total de Profissionais</p>
                        <h3 className="text-3xl font-bold text-[#111518]">1,240</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-[#f0f2f4] shadow-sm flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                        <div className="p-3 bg-blue-50 text-primary rounded-lg">
                            <span className="font-bold text-lg">$</span>
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">+8%</span>
                    </div>
                    <div>
                        <p className="text-[#647587] text-xs font-bold uppercase tracking-wider mb-1">Receita Mensal</p>
                        <h3 className="text-3xl font-bold text-[#111518]">R$ 45.200</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-[#f0f2f4] shadow-sm flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                        <div className="p-3 bg-blue-50 text-primary rounded-lg">
                            <UserPlus size={20} />
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">+15%</span>
                    </div>
                    <div>
                        <p className="text-[#647587] text-xs font-bold uppercase tracking-wider mb-1">Novos Assinantes</p>
                        <h3 className="text-3xl font-bold text-[#111518]">85</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-[#f0f2f4] shadow-sm flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                        <div className="p-3 bg-red-50 text-red-500 rounded-lg">
                            <TrendingDown size={20} />
                        </div>
                        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">-0.5%</span>
                    </div>
                    <div>
                        <p className="text-[#647587] text-xs font-bold uppercase tracking-wider mb-1">Taxa de Churn</p>
                        <h3 className="text-3xl font-bold text-[#111518]">2.4%</h3>
                    </div>
                </div>
            </div>

            {/* Main Content Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Growth Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-[#f0f2f4] shadow-sm flex flex-col h-[400px]">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-[#111518]">Crescimento de Receita</h3>
                            <p className="text-[#647587] text-sm">Relatório semestral de assinaturas premium</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                            <div className="size-2.5 rounded-full bg-primary"></div>
                            Total em R$
                        </div>
                    </div>
                    {/* Mock Chart Visualization */}
                    <div className="flex-1 flex items-end justify-between gap-2 px-4 pb-2 relative">
                        {/* This is a CSS-only visual approximation of a line chart */}
                        <svg className="absolute bottom-10 left-0 w-full h-[80%] overflow-visible" preserveAspectRatio="none">
                            <path d="M0,250 C50,230 100,220 150,225 C200,230 250,180 300,150 C350,120 400,150 450,130 C500,110 550,80 600,85 C650,90 700,50 750,55" fill="none" stroke="#1966b3" strokeWidth="4" strokeLinecap="round" />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#1966b3" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#1966b3" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d="M0,250 C50,230 100,220 150,225 C200,230 250,180 300,150 C350,120 400,150 450,130 C500,110 550,80 600,85 C650,90 700,50 750,55 V300 H0 Z" fill="url(#gradient)" stroke="none" />
                        </svg>

                        {/* X Axis Labels */}
                        <div className="w-full absolute bottom-0 flex justify-between text-xs text-[#647587] font-medium pt-4 border-t border-dashed border-gray-200">
                            <span>Jan</span>
                            <span>Fev</span>
                            <span>Mar</span>
                            <span>Abr</span>
                            <span>Mai</span>
                            <span>Jun</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-end mt-4 pt-4 border-t border-[#f0f2f4]">
                        <div>
                            <p className="text-[#647587] text-xs font-bold uppercase tracking-wider mb-1">Receita Acumulada</p>
                            <h3 className="text-2xl font-bold text-[#111518]">R$ 258.400</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-[#647587] text-xs font-bold uppercase tracking-wider mb-1">Projeção Julho</p>
                            <h3 className="text-2xl font-bold text-green-600">R$ 52.000</h3>
                        </div>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white p-0 rounded-xl border border-[#f0f2f4] shadow-sm flex flex-col h-[400px]">
                    <div className="p-6 border-b border-[#f0f2f4] flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold text-[#111518]">Atividades Recentes</h3>
                        </div>
                        <button className="text-primary text-xs font-bold uppercase hover:underline">Ver Tudo</button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                        <div className="flex gap-4 items-start p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="size-10 rounded-full bg-blue-100 text-primary flex items-center justify-center shrink-0">
                                <UserPlus size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-[#111518]">Novo Profissional</p>
                                <p className="text-xs text-[#647587] leading-relaxed">João Silva (Encanador) completou o cadastro.</p>
                                <p className="text-[10px] text-[#9aaebd] font-bold mt-1 uppercase">Agora mesmo</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="size-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                                <CheckCircle size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-[#111518]">Pagamento Confirmado</p>
                                <p className="text-xs text-[#647587] leading-relaxed">Maria Oliveira (Premium) renovou a assinatura.</p>
                                <p className="text-[10px] text-[#9aaebd] font-bold mt-1 uppercase">2 horas atrás</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="size-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                                <CheckCircle size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-[#111518]">Nova Inscrição</p>
                                <p className="text-xs text-[#647587] leading-relaxed">Carlos Santos criou uma conta de cliente.</p>
                                <p className="text-[10px] text-[#9aaebd] font-bold mt-1 uppercase">5 horas atrás</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="size-10 rounded-full bg-blue-50 text-blue-400 flex items-center justify-center shrink-0">
                                <Star size={18} fill="currentColor" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-[#111518]">Nova Avaliação</p>
                                <p className="text-xs text-[#647587] leading-relaxed">5 estrelas para "Eletricista Rápido".</p>
                                <p className="text-[10px] text-[#9aaebd] font-bold mt-1 uppercase">Ontem</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm flex items-center justify-between">
                    <div className="max-w-[240px]">
                        <h3 className="text-lg font-bold text-primary mb-2">Plano de Expansão</h3>
                        <p className="text-primary/70 text-sm leading-relaxed">
                            Estamos atingindo a meta de 1.500 profissionais em Dourados. Faltam apenas 260 profissionais para desbloquear novas ferramentas de marketing.
                        </p>
                    </div>
                    <div className="relative size-24 flex items-center justify-center">
                        <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                            <path className="text-blue-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                            <path className="text-primary" strokeDasharray="80, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                        </svg>
                        <span className="absolute text-xl font-bold text-primary">80%</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-[#f0f2f4] shadow-sm flex items-center gap-6">
                    <div className="size-24 rounded-lg bg-gray-100 border border-gray-200 bg-cover bg-center shrink-0" style={{ backgroundImage: 'url("https://www.google.com/maps/d/thumbnail?mid=1yD-gN0p2T8K8G-4Z9Z9Z9Z9Z9Z9&hl=en")' }}></div>
                    <div>
                        <p className="text-[#647587] text-xs font-bold uppercase tracking-wider mb-1">Foco Geográfico</p>
                        <h3 className="text-lg font-bold text-[#111518]">Região Central</h3>
                        <p className="text-[#647587] text-sm mb-2">Maior densidade de serviços (45%).</p>
                        <a href="#" className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
                            Ver mapa de calor
                            <TrendingUp size={12} />
                        </a>
                    </div>
                </div>
            </div>

            <footer className="mt-8 text-center text-xs text-[#9aaebd]">
                <div className="flex justify-between items-center border-t border-[#f0f2f4] pt-8">
                    <p>© 2024 Conecta Dourados. Todos os direitos reservados.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-primary">Suporte</a>
                        <a href="#" className="hover:text-primary">Políticas</a>
                        <a href="#" className="hover:text-primary">Ajuda</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
