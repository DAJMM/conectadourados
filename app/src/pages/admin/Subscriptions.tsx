import { Download, SlidersHorizontal, Search, MoreVertical, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

export default function Subscriptions() {

    const professionals = [
        {
            id: 1,
            name: "Ricardo Mendes",
            role: "Eletricista Residencial",
            avatar: "https://i.pravatar.cc/150?u=1",
            plan: "PREMIUM",
            status: "Ativo",
            nextBilling: "15 Out, 2023",
            value: "R$ 149,90"
        },
        {
            id: 2,
            name: "Ana Paula Silva",
            role: "Designer de Interiores",
            avatar: "https://i.pravatar.cc/150?u=2",
            plan: "PRO",
            status: "Atrasado",
            nextBilling: "02 Out, 2023",
            value: "R$ 89,90"
        },
        {
            id: 3,
            name: "Marcos Oliveira",
            role: "Encanador",
            avatar: "https://i.pravatar.cc/150?u=3",
            plan: "BÁSICO",
            status: "Ativo",
            nextBilling: "18 Out, 2023",
            value: "R$ 49,90"
        },
        {
            id: 4,
            name: "Beatriz Souza",
            role: "Arquiteta",
            avatar: "https://i.pravatar.cc/150?u=4",
            plan: "PREMIUM",
            status: "Ativo",
            nextBilling: "22 Out, 2023",
            value: "R$ 149,90"
        }
    ];



    const getPlanStyle = (plan: string) => {
        switch (plan) {
            case 'PREMIUM': return 'bg-blue-100/50 text-primary border-blue-200';
            case 'PRO': return 'bg-purple-100/50 text-purple-600 border-purple-200';
            case 'BÁSICO': return 'bg-gray-100 text-gray-600 border-gray-200';
            default: return 'bg-gray-100 text-gray-600';
        }
    }

    return (
        <div className="flex flex-col gap-6 max-w-[1200px] mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-[10px] text-[#647587] font-bold uppercase tracking-wider">
                    <span>Admin</span>
                    <span>/</span>
                    <span>Gestão Financeira</span>
                </div>
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-[#111518]">Gestão de Assinaturas e Pagamentos</h1>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#dbe1e6] text-[#111518] text-sm font-bold rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                            <Download size={16} />
                            <span>Exportar CSV</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg shadow-sm hover:bg-primary-light transition-colors">
                            <SlidersHorizontal size={16} />
                            <span>Gerenciar Planos</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-[#f0f2f4] shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[#647587] text-sm font-medium mb-1">Total de Assinaturas Ativas</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold text-[#111518]">1.240</h3>
                            <span className="text-xs font-bold text-green-600">+5.2%</span>
                        </div>
                    </div>
                    <div className="size-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                        <CheckCircle size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-[#f0f2f4] shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[#647587] text-sm font-medium mb-1">Pendentes / Atrasadas</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold text-[#111518]">12</h3>
                            <span className="text-xs font-bold text-red-600">-2%</span>
                        </div>
                    </div>
                    <div className="size-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                        <AlertTriangle size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-[#f0f2f4] shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[#647587] text-sm font-medium mb-1">Faturamento Mensal</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold text-[#111518]">R$ 45.200,00</h3>
                            <span className="text-xs font-bold text-green-600">+12.4%</span>
                        </div>
                    </div>
                    <div className="size-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary">
                        <Clock size={24} />
                    </div>
                </div>
            </div>

            {/* Filter and Search */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={20} className="text-[#647587]" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border border-[#dbe1e6] rounded-lg leading-5 bg-white placeholder-[#647587] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                        placeholder="Buscar profissional por nome..."
                    />
                </div>
                <div className="md:col-span-2">
                    <select className="block w-full h-[46px] pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg border-[#dbe1e6] bg-white text-[#111518] font-medium">
                        <option>Todos os Planos</option>
                        <option>Premium</option>
                        <option>Pro</option>
                        <option>Básico</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <select className="block w-full h-[46px] pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg border-[#dbe1e6] bg-white text-[#111518] font-medium">
                        <option>Todos os Status</option>
                        <option>Ativo</option>
                        <option>Atrasado</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-[#f0f2f4] rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[#f0f2f4]">
                        <thead className="bg-[#f8f9fb]">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#647587] uppercase tracking-wider">Profissional</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#647587] uppercase tracking-wider">Tipo de Plano</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#647587] uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#647587] uppercase tracking-wider">Próximo Vencimento</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#647587] uppercase tracking-wider">Valor</th>
                                <th scope="col" className="relative px-6 py-4">
                                    <span className="sr-only">Ações</span>
                                    <span className="text-xs font-bold text-[#647587] uppercase tracking-wider">Ações</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-[#f0f2f4]">
                            {professionals.map((person) => (
                                <tr key={person.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-full object-cover" src={person.avatar} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-bold text-[#111518]">{person.name}</div>
                                                <div className="text-sm text-[#647587]">{person.role}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-[10px] leading-5 font-bold rounded-full border ${getPlanStyle(person.plan)}`}>
                                            {person.plan}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`flex items-center gap-1.5 text-sm font-bold ${person.status === 'Ativo' ? 'text-green-600' : 'text-red-500'}`}>
                                            <div className={`size-2 rounded-full ${person.status === 'Ativo' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                            {person.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#647587] font-medium">
                                        {person.nextBilling}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#111518]">
                                        {person.value}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-[#647587] hover:text-[#111518]">
                                            <MoreVertical size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-[#f0f2f4] sm:px-6">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-[#647587]">
                                Mostrando <span className="font-bold">4</span> de <span className="font-bold">1.240</span> profissionais
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-[#dbe1e6] bg-white text-sm font-medium text-[#647587] hover:bg-gray-50">
                                    <span className="sr-only">Anterior</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="#" aria-current="page" className="z-10 bg-primary/10 border-primary text-primary relative inline-flex items-center px-4 py-2 border text-sm font-bold">
                                    1
                                </a>
                                <a href="#" className="bg-white border-[#dbe1e6] text-[#647587] hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                    2
                                </a>
                                <a href="#" className="bg-white border-[#dbe1e6] text-[#647587] hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                    3
                                </a>
                                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-[#dbe1e6] bg-white text-sm font-medium text-[#647587] hover:bg-gray-50">
                                    <span className="sr-only">Próximo</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
