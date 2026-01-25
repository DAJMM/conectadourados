import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, role, signOut } = useAuth();
    const handleLoginClick = () => {
        if (user) {
            // Redirect based on role
            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/area-do-cliente');
            }
        } else {
            navigate('/login');
        }
    };

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/');
        } catch (error) {
            console.error('[Header] Logout error:', error);
            navigate('/');
        }
    };

    const isActive = (path: string) => {
        const baseClasses = "px-3 py-2 rounded-lg transition-all font-medium";
        return location.pathname === path
            ? `${baseClasses} bg-primary text-white hover:bg-primary-light`
            : `${baseClasses} bg-gray-100 text-gray-700 hover:bg-gray-200`;
    }

    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-4 lg:px-40 py-3 bg-white sticky top-0 z-50">
            <Link to="/" className="flex items-center gap-3 text-primary">
                <div className="size-8 text-primary">
                    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor"></path>
                    </svg>
                </div>
                <h2 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em]">Conecta Dourados</h2>
            </Link>

            <div className="flex flex-1 justify-end gap-2 md:gap-8 items-center">
                <nav className="hidden md:flex items-center gap-2 lg:gap-4 text-sm">
                    <Link className={isActive("/")} to="/">Início</Link>
                    <Link className={isActive("/profissionais")} to="/profissionais">Profissionais</Link>
                    <Link className={isActive("/about")} to="/about">Sobre Nós</Link>
                    <Link
                        className={`px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-light transition-all shadow-sm hover:shadow-md font-bold ${location.pathname === "/meus-anuncios" ? "ring-2 ring-primary ring-offset-2" : ""}`}
                        to="/meus-anuncios"
                    >
                        Área do Anunciante
                    </Link>
                </nav>

                <div className="flex gap-2 items-center">
                    {user ? (
                        <>
                            <button
                                onClick={handleLoginClick}
                                className="flex items-center gap-2 px-3.5 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                title={role === 'admin' ? 'Ir para Admin' : 'Ir para Área do Cliente'}
                            >
                                <User className="w-5 h-5 text-primary" />
                                <span className="hidden sm:inline text-sm font-medium text-gray-700">
                                    {role === 'admin' ? '👑 Admin' : user.email?.split('@')[0]}
                                </span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                title="Sair"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="hidden sm:inline text-sm font-medium">Sair</span>
                            </button>
                        </>
                    ) : null}
                </div>
            </div>
        </header>
    );
}
