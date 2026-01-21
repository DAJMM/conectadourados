import { useParams } from 'react-router-dom';
import { professionalsData } from '../data/professionals';

export default function ProfessionalProfile() {
    const { id } = useParams<{ id: string }>();
    // Default to 'joao' if no ID or ID not found, just for demo purposes
    const profile = professionalsData.find(p => p.id === id) || professionalsData[1];
    const isPremium = profile.type === 'premium';

    if (!profile) return <div>Profissional não encontrado</div>;

    return (
        <div className="font-display w-full flex flex-col items-center bg-[#f6f7f8] dark:bg-background-dark min-h-screen">
            <main className="flex-1 flex flex-col items-center w-full px-4 py-8">
                <div className={`w-full ${isPremium ? 'max-w-[680px]' : 'max-w-[800px] bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden'}`}>

                    {/* Standard Profile Layout (Carlos Silva style) */}
                    {!isPremium && (
                        <>
                            {/* Hero Banner */}
                            <div className="relative h-48 md:h-64 overflow-hidden">
                                <div className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform hover:scale-105 duration-700" style={{ backgroundImage: `url("${profile.heroImage}")` }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </div>

                            {/* Profile Header Overlap */}
                            <div className="px-6 pb-6 relative">
                                <div className="flex flex-col items-center -mt-16">
                                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl border-4 border-white dark:border-gray-900 shadow-lg min-h-32 w-32 md:min-h-40 md:w-40" style={{ backgroundImage: `url("${profile.avatar}")` }}></div>
                                    <div className="mt-4 flex flex-col items-center text-center">
                                        <h1 className="text-[#121617] dark:text-white text-3xl font-extrabold leading-tight tracking-tight">{profile.name}</h1>
                                        <p className="text-primary font-semibold text-lg">{profile.role}</p>

                                        {/* Stats Grid */}
                                        <div className="mt-4 flex flex-wrap justify-center gap-y-2 gap-x-4 text-[#677f83] dark:text-gray-400 text-sm font-medium">
                                            {profile.stats?.map((stat, idx) => (
                                                <div key={idx} className="flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-primary text-[18px]">{stat.icon}</span>
                                                    {stat.value}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button className="flex items-center justify-center gap-2 rounded-xl h-14 px-6 bg-primary text-white text-base font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                                        <span className="material-symbols-outlined">description</span>
                                        <span>Solicitar Orçamento</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-2 rounded-xl h-14 px-6 bg-[#f0f3f4] dark:bg-gray-800 text-primary dark:text-primary text-base font-bold border border-primary/20 hover:bg-primary/5 transition-colors">
                                        <span className="material-symbols-outlined">grid_view</span>
                                        <span>Ver Portfólio</span>
                                    </button>
                                </div>

                                {/* Social Bar */}
                                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                                    <div className="flex justify-center gap-8">
                                        <a href="#" className="flex flex-col items-center gap-2 group">
                                            <div className="size-12 rounded-full bg-[#f0f3f4] dark:bg-gray-800 flex items-center justify-center text-[#121617] dark:text-white group-hover:bg-primary group-hover:text-white transition-all">
                                                <span className="material-symbols-outlined">photo_camera</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-[#677f83] tracking-widest">INSTAGRAM</span>
                                        </a>
                                        <a href="#" className="flex flex-col items-center gap-2 group">
                                            <div className="size-12 rounded-full bg-[#f0f3f4] dark:bg-gray-800 flex items-center justify-center text-[#121617] dark:text-white group-hover:bg-primary group-hover:text-white transition-all">
                                                <span className="material-symbols-outlined">work</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-[#677f83] tracking-widest">LINKEDIN</span>
                                        </a>
                                        <a href="#" className="flex flex-col items-center gap-2 group">
                                            <div className="size-12 rounded-full bg-[#f0f3f4] dark:bg-gray-800 flex items-center justify-center text-[#121617] dark:text-white group-hover:bg-primary group-hover:text-white transition-all">
                                                <span className="material-symbols-outlined">language</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-[#677f83] tracking-widest">WEBSITE</span>
                                        </a>
                                    </div>
                                </div>

                                {/* Reviews Section */}
                                <div className="mt-12">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-[#121617] dark:text-white text-xl font-bold leading-tight">Avaliações dos Clientes</h2>
                                        <div className="flex items-center gap-1 text-primary">
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="font-bold">{profile.rating}</span>
                                            <span className="text-sm text-[#677f83] dark:text-gray-400 font-normal">({profile.reviewCount} reviews)</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {profile.reviews.map(review => (
                                            <div key={review.id} className="p-5 rounded-xl bg-[#f8fafc] dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                                                <div className="flex items-center gap-1 mb-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i} className={`material-symbols-outlined text-sm ${i < review.rating ? 'text-primary' : 'text-gray-300'}`} style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    ))}
                                                </div>
                                                <p className="text-[#121617] dark:text-gray-200 text-sm italic leading-relaxed">"{review.text}"</p>
                                                <p className="mt-4 text-[#677f83] dark:text-gray-400 text-xs font-bold">— {review.author}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <footer className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
                                    <p className="text-[#677f83] text-[10px] font-bold uppercase tracking-widest">Plataforma Conecta Dourados © 2024</p>
                                </footer>
                            </div>
                        </>
                    )}

                    {/* Premium Profile Layout (João Silva / Link-in-bio style) */}
                    {isPremium && (
                        <div className="flex flex-col gap-8">
                            {/* Header */}
                            <div className="flex flex-col items-center text-center gap-4 transition-all duration-700 ease-out">
                                <div className="relative">
                                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 ring-4 ring-primary/10" style={{ backgroundImage: `url("${profile.avatar}")` }}>
                                    </div>
                                    {profile.verified && (
                                        <div className="absolute bottom-1 right-1 bg-green-500 border-2 border-white dark:border-background-dark w-6 h-6 rounded-full flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white text-[12px]">check</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col items-center">
                                    <h1 className="text-2xl font-bold leading-tight tracking-[-0.015em] text-[#111417] dark:text-white">{profile.name}</h1>
                                    <p className="text-primary font-medium">{profile.role}</p>
                                    <div className="flex items-center gap-1 mt-1 text-[#647587] dark:text-[#a0aab6] text-sm">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        <span>{profile.location}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Promo Banner */}
                            {profile.promoBanner && (
                                <div className="p-0.5 rounded-xl bg-gradient-to-br from-primary to-blue-400">
                                    <div className="flex flex-col items-stretch justify-start rounded-xl overflow-hidden bg-white dark:bg-[#1a1f24] shadow-lg">
                                        <div className="w-full bg-center bg-no-repeat aspect-[21/9] bg-cover" style={{ backgroundImage: `url("${profile.promoBanner.image}")` }}>
                                        </div>
                                        <div className="flex w-full grow flex-col gap-3 p-6">
                                            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
                                                <span className="material-symbols-outlined text-sm">campaign</span>
                                                <span>{profile.promoBanner.discountText}</span>
                                            </div>
                                            <h3 className="text-xl font-bold leading-tight tracking-tight text-[#111417] dark:text-white">{profile.promoBanner.title}</h3>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                                                <p className="text-[#647587] dark:text-[#a0aab6] text-base leading-relaxed max-w-[360px]">{profile.promoBanner.description}</p>
                                                <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold shadow-md hover:bg-primary/90 transition-all">
                                                    <span className="truncate">Resgatar Agora</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Bio Section */}
                            <div className="bg-white dark:bg-[#2a2f36] rounded-xl p-8 border border-[#f0f2f4] dark:border-[#3a3f45]">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-[#111417] dark:text-white">
                                    <span className="material-symbols-outlined text-primary">person</span>
                                    Sobre mim
                                </h3>
                                <p className="text-[#111417] dark:text-[#e1e4e8] text-base leading-relaxed text-left">
                                    {profile.bio}
                                </p>
                            </div>

                            {/* Links/Buttons */}
                            <div className="flex flex-col gap-3">
                                <h3 className="text-lg font-bold mb-1 px-1 text-[#111417] dark:text-white">Links Rápidos</h3>
                                <a href="#" className="group flex items-center justify-between w-full bg-white dark:bg-[#1a1f24] border border-[#f0f2f4] dark:border-[#3a3f45] p-5 rounded-xl hover:border-primary/50 transition-all shadow-sm hover:shadow-md">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-primary/10 text-primary p-2.5 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined">description</span>
                                        </div>
                                        <span className="font-bold text-base text-[#111417] dark:text-white">Solicitar Orçamento Grátis</span>
                                    </div>
                                    <span className="material-symbols-outlined text-[#647587] group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
                                </a>
                                <a href="#" className="group flex items-center justify-between w-full bg-white dark:bg-[#1a1f24] border border-[#f0f2f4] dark:border-[#3a3f45] p-5 rounded-xl hover:border-primary/50 transition-all shadow-sm hover:shadow-md">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-primary/10 text-primary p-2.5 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined">event_available</span>
                                        </div>
                                        <span className="font-bold text-base text-[#111417] dark:text-white">Agendar Consultoria</span>
                                    </div>
                                    <span className="material-symbols-outlined text-[#647587] group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
                                </a>
                                <a href="#" className="group flex items-center justify-between w-full bg-white dark:bg-[#1a1f24] border border-[#f0f2f4] dark:border-[#3a3f45] p-5 rounded-xl hover:border-primary/50 transition-all shadow-sm hover:shadow-md">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-primary/10 text-primary p-2.5 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined">imagesmode</span>
                                        </div>
                                        <span className="font-bold text-base text-[#111417] dark:text-white">Ver Portfólio de Projetos</span>
                                    </div>
                                    <span className="material-symbols-outlined text-[#647587] group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
                                </a>
                            </div>

                            {/* Testimonials Slider */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-lg font-bold px-1 text-[#111417] dark:text-white">O que dizem os clientes</h3>
                                <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
                                    {profile.reviews.map(review => (
                                        <div key={review.id} className="min-w-[300px] flex-shrink-0 snap-center bg-white dark:bg-[#1a1f24] border border-[#f0f2f4] dark:border-[#3a3f45] p-6 rounded-xl shadow-sm">
                                            <div className="flex items-center gap-3 mb-4">
                                                {review.avatar && <div className="size-12 rounded-full bg-center bg-cover" style={{ backgroundImage: `url('${review.avatar}')` }}></div>}
                                                <div>
                                                    <p className="font-bold text-sm text-[#111417] dark:text-white">{review.author}</p>
                                                    <div className="flex text-yellow-400 text-xs">
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i} className={`material-symbols-outlined text-[14px] ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-[#647587] dark:text-[#a0aab6] italic">"{review.text}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Instagram Grid */}
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between px-1">
                                    <h3 className="text-lg font-bold text-[#111417] dark:text-white">Galeria Instagram</h3>
                                    <a className="text-sm font-semibold text-primary" href="#">@joaosilva_servicos</a>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {profile.instagramImages?.map((img, i) => (
                                        <div key={i} className="aspect-square rounded-lg bg-center bg-cover shadow-sm hover:opacity-90 cursor-pointer" style={{ backgroundImage: `url('${img}')` }}></div>
                                    ))}
                                </div>
                            </div>

                            <footer className="mt-8 text-center border-t border-[#f0f2f4] dark:border-[#3a3f45] pt-10 pb-8">
                                <div className="flex flex-col items-center gap-2">
                                    <p className="text-sm text-[#647587] dark:text-[#a0aab6] mb-2">Parte da rede oficial Conecta Dourados</p>
                                    <div className="flex justify-center gap-6 mb-4">
                                        <span className="material-symbols-outlined text-[#647587] text-2xl">public</span>
                                        <span className="material-symbols-outlined text-[#647587] text-2xl">photo_camera</span>
                                        <span className="material-symbols-outlined text-[#647587] text-2xl">mail</span>
                                    </div>
                                    <p className="text-xs uppercase font-bold tracking-widest text-[#647587]">2024 Conecta Dourados</p>
                                </div>
                            </footer>
                        </div>
                    )}
                </div>
            </main>

            {/* Floating WhatsApp Action Button */}
            <a href="https://wa.me/5567000000000" target="_blank" className="fixed bottom-8 right-8 z-[100] group">
                <div className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform active:scale-95">
                    <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.628 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
                    </svg>
                </div>
                <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs font-bold py-2 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Falar com {profile.name.split(' ')[0]} no WhatsApp</span>
            </a>
        </div>
    );
}
