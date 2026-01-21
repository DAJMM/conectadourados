import { Store, Handshake, TrendingUp, CheckCircle, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
    return (
        <div className="flex flex-col w-full bg-[#f6f7f8] dark:bg-background-dark">
            {/* Hero Section */}
            <section className="relative w-full">
                <div className="max-w-[1280px] mx-auto px-4 lg:px-10 py-8 lg:py-12">
                    {/* Note: In a real app, you might want to host this image or put it in public folder */}
                    <div className="relative min-h-[520px] rounded-2xl overflow-hidden flex items-center justify-center text-center p-8 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBvSebyMzev4AW24jXILSvVCIXdlQ3G507YMNiXpJpnjO7Q5kNZHLg15E2eTaXFf4jjXs0UYI38wEUWFJAuEVqxGvoPXeiHylNsrmbKvUUXDunOrGT8B1I7PdVBZJiUQip3IZjBRul0_v7cjk64e-owoXv6LQ-k_Uug6oKg_J0ScCSxAZ-s3NCFpSsJS6O7Qkdbi0E6s4YT3O9lWxqVmBMAAISGxuBy8ixvRi7l2BSaEwRXUjpVdPG6DEL7DQSE2T0qjZqPdTsfiB7T")' }}>
                        <div className="max-w-3xl space-y-6">
                            <h1 className="text-white text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                                Conectando Dourados ao que a cidade tem de melhor
                            </h1>
                            <p className="text-white/90 text-lg lg:text-xl font-medium">
                                Nossa missão é fortalecer o comércio local e simplificar a busca por profissionais qualificados em nossa região.
                            </p>
                            <div className="pt-4">
                                <Link to="/#categories" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg transition-transform hover:scale-105 inline-block">
                                    Conhecer Profissionais
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="max-w-[1280px] mx-auto px-4 lg:px-10 py-16">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="text-primary font-bold tracking-widest uppercase text-xs">Nossa Missão</span>
                            <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight text-[#121517] dark:text-white">Trabalhamos para transformar a maneira como os douradenses encontram serviços.</h2>
                            <p className="text-[#657886] dark:text-gray-400 text-lg leading-relaxed">
                                A Conecta Dourados nasceu da vontade de unir a tradição do "boca a boca" local com a agilidade da tecnologia. Acreditamos que o crescimento de Dourados passa pelo apoio direto a quem produz e trabalha aqui.
                            </p>
                        </div>
                        <div className="grid gap-6">
                            <div className="flex gap-4 p-5 rounded-xl border border-[#dce1e5] dark:border-gray-800 bg-white dark:bg-background-dark">
                                <div className="flex-shrink-0 size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                    <Store size={28} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-[#121517] dark:text-white">Apoio ao Comércio</h3>
                                    <p className="text-[#657886] dark:text-gray-400">Valorizamos as famílias e empreendedores da nossa terra, dando visibilidade real ao talento regional.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-5 rounded-xl border border-[#dce1e5] dark:border-gray-800 bg-white dark:bg-background-dark">
                                <div className="flex-shrink-0 size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                    <Handshake size={28} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-[#121517] dark:text-white">Confiança Local</h3>
                                    <p className="text-[#657886] dark:text-gray-400">Fomentamos conexões reais entre vizinhos e profissionais, criando uma rede de segurança e qualidade.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-xl group-hover:bg-primary/30 transition-all"></div>
                        <img alt="Equipe trabalhando" className="relative rounded-2xl w-full h-[500px] object-cover shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMbpiYoGlXozW92LXnphWg5Q4FxMRP1oDTaktk-_EwU_Azddy6NHWIfc41-tyL_aPr_Gv7aNFfF5wWz9SRPfOqnDuwor4XvIzh1UxJO5LeIvT7zKNGrRO8O3z4dJikgsH8fRNXJJWc1-cZFUZmnbs1kE8XBhjX7jsfun5SEdyc1gV-sORLGymEWj6F1EU4ewLYJgRaTAPcEBORKsoV9oKruPpCiT5SEPXP-Uv0BS-dCRalFphJBbqYQ76JlLlu-VAZKFiKx3JZGSwr" />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-primary/5 dark:bg-gray-800/20 py-20">
                <div className="max-w-[1280px] mx-auto px-4 lg:px-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div className="space-y-2">
                            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#121517] dark:text-white">Impacto Local</h2>
                            <p className="text-[#657886] dark:text-gray-400 text-lg">Resultados reais para a nossa comunidade em Mato Grosso do Sul.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col gap-4 rounded-2xl p-8 bg-white dark:bg-background-dark border border-[#dce1e5] dark:border-gray-800 shadow-sm transition-transform hover:-translate-y-1">
                            <div className="size-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <TrendingUp size={24} />
                            </div>
                            <p className="text-[#657886] dark:text-gray-400 text-base font-semibold">Profissionais cadastrados</p>
                            <p className="text-4xl font-black tracking-tight text-[#121517] dark:text-white">+500</p>
                            <div className="flex items-center gap-1 text-[#078838] font-bold">
                                <TrendingUp size={16} />
                                <span>15% esse mês</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 rounded-2xl p-8 bg-white dark:bg-background-dark border border-[#dce1e5] dark:border-gray-800 shadow-sm transition-transform hover:-translate-y-1">
                            <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <CheckCircle size={24} />
                            </div>
                            <p className="text-[#657886] dark:text-gray-400 text-base font-semibold">Serviços realizados</p>
                            <p className="text-4xl font-black tracking-tight text-[#121517] dark:text-white">+2.000</p>
                            <div className="flex items-center gap-1 text-[#078838] font-bold">
                                <TrendingUp size={16} />
                                <span>22% esse mês</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 rounded-2xl p-8 bg-white dark:bg-background-dark border border-[#dce1e5] dark:border-gray-800 shadow-sm transition-transform hover:-translate-y-1">
                            <div className="size-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                <MapPin size={24} />
                            </div>
                            <p className="text-[#657886] dark:text-gray-400 text-base font-semibold">Foco Regional</p>
                            <p className="text-4xl font-black tracking-tight text-[#121517] dark:text-white">100%</p>
                            <div className="text-[#657886] dark:text-gray-400 font-bold uppercase tracking-widest text-xs">
                                Dourados & Região, MS
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="max-w-[1280px] mx-auto px-4 lg:px-10 py-24">
                <div className="bg-primary rounded-[2.5rem] p-8 lg:p-20 text-center space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 size-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 size-64 bg-black/10 rounded-full blur-3xl"></div>
                    <h2 className="text-white text-3xl lg:text-5xl font-black leading-tight relative z-10">
                        Faça parte da maior rede de <br className="hidden md:block" /> serviços de Dourados
                    </h2>
                    <p className="text-white/80 text-lg lg:text-xl max-w-2xl mx-auto relative z-10">
                        Seja você um profissional autônomo ou uma empresa local, estamos aqui para ajudar você a crescer.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <Link to="/advertise" className="bg-white text-primary px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:bg-gray-100 transition-all inline-block">
                            Cadastrar meu Serviço
                        </Link>
                        <a href="https://wa.me/5567999999999" target="_blank" className="bg-primary/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-all inline-block">
                            Falar com Consultor
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
