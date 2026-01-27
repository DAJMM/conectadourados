import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, UserCircle, CreditCard, Settings, LogOut, Megaphone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const { signOut } = useAuth();

    const handleLogout = async () => {
        await signOut();
        navigate('/');
    };

    const isActive = (path: string) => {
        return location.pathname === path ? 'bg-[#eef4ff] text-primary' : 'text-[#647587] hover:bg-gray-50 hover:text-[#111417]';
    };

    return (
        <div className="min-h-screen bg-[#f8f9fb] flex font-display">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-[#f0f2f4] flex flex-col fixed h-full z-20">
                <div className="p-6 flex flex-col gap-1 border-b border-[#f0f2f4]">
                    <div className="flex items-center gap-3 text-[#111518]">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            <LayoutDashboard size={20} />
                        </div>
                        <div>
                            <h1 className="text-sm font-extrabold leading-tight">Conecta Dourados</h1>
                            <p className="text-[10px] text-[#647587] font-bold tracking-wider">MARKETPLACE ADMIN</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
                    <Link to="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${isActive('/admin')}`}>
                        <LayoutDashboard size={20} />
                        <span>Geral</span>
                    </Link>
                    <Link to="/admin/professionals" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${isActive('/admin/professionals')}`}>
                        <Users size={20} />
                        <span>Profissionais</span>
                    </Link>
                    <Link to="/admin/customers" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${isActive('/admin/customers')}`}>
                        <UserCircle size={20} />
                        <span>Clientes</span>
                    </Link>
                    <Link to="/admin/subscriptions" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${isActive('/admin/subscriptions')}`}>
                        <CreditCard size={20} />
                        <span>Assinaturas</span>
                    </Link>
                    <Link to="/admin/approvals" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${isActive('/admin/approvals')}`}>
                        <Megaphone size={20} />
                        <span>Aprovações</span>
                    </Link>

                    <div className="mt-auto pt-4 border-t border-[#f0f2f4]">
                        <Link to="/admin/settings" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${isActive('/admin/settings')}`}>
                            <Settings size={20} />
                            <span>Configurações</span>
                        </Link>
                    </div>
                </nav>

                <div className="p-4 border-t border-[#f0f2f4]">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-[#fff0f0] text-red-600 cursor-pointer hover:bg-[#ffe5e5] transition-colors"
                    >
                        <LogOut size={18} />
                        <span className="text-sm font-bold">Sair</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
                {children}
            </main>
        </div>
    );
}
