import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-[#f0f3f4] dark:bg-[#151a20] px-4 lg:px-40 py-12">
            <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 text-[#111518] dark:text-white mb-4">
                        <span className="material-symbols-outlined text-primary text-2xl">handyman</span>
                        <h2 className="text-lg font-extrabold">Conecta Dourados</h2>
                    </div>
                    <p className="text-[#617989] dark:text-gray-400 text-sm leading-relaxed">
                        Conectando talentos locais com quem precisa de serviços de qualidade em Dourados, MS.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-[#111518] dark:text-white mb-4">Plataforma</h4>
                    <ul className="flex flex-col gap-2 text-sm text-[#617989] dark:text-gray-400">
                        <li><Link className="hover:text-primary transition-colors" to="/about">Sobre Nós</Link></li>
                        <li><Link className="hover:text-primary transition-colors" to="/#categories">Categorias</Link></li>
                        <li><Link className="hover:text-primary transition-colors" to="/meus-anuncios">Área do Anunciante</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-[#111518] dark:text-white mb-4">Suporte</h4>
                    <ul className="flex flex-col gap-2 text-sm text-[#617989] dark:text-gray-400">
                        <li><Link className="hover:text-primary transition-colors" to="/faq">Central de Ajuda</Link></li>
                        <li><Link className="hover:text-primary transition-colors" to="/faq">Perguntas Frequentes</Link></li>
                        <li><Link className="hover:text-primary transition-colors" to="/privacy">Termos de Uso</Link></li>
                        <li><Link className="hover:text-primary transition-colors" to="/privacy">Privacidade</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-[#111518] dark:text-white mb-4">Localização</h4>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-start gap-2 text-sm text-[#617989] dark:text-gray-400">
                            <span className="material-symbols-outlined text-xs mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                            <span>Dourados, Mato Grosso do Sul, Brasil</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-[1200px] w-full mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[#617989] dark:text-gray-500 text-xs font-medium">
                <p>© 2024 Conecta Dourados. Todos os direitos reservados.</p>
                <div className="flex gap-6">
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                        Feito com paixão em Dourados, MS
                    </span>
                </div>
            </div>
        </footer>
    );
}
