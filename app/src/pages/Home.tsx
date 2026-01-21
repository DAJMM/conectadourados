import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="flex flex-col w-full">
            {/* HeroSection */}
            <div className="w-full flex justify-center py-6 px-4 lg:px-40">
                <div className="w-full max-w-[1200px]">
                    <div className="@container">
                        <div className="relative flex min-h-[420px] flex-col gap-6 overflow-hidden rounded-2xl items-center justify-center p-8 bg-[#f8fafc] dark:bg-[#252d35]">
                            {/* Decorative background elements */}
                            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                                <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary blur-3xl"></div>
                                <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-primary blur-3xl"></div>
                            </div>
                            <div className="flex flex-col gap-4 text-center z-10">
                                <h1 className="text-[#111518] dark:text-white text-4xl font-extrabold leading-tight tracking-tight max-w-2xl">
                                    Quem você precisa contratar hoje?
                                </h1>
                                <p className="text-[#617989] dark:text-gray-400 text-base font-medium text-xl">
                                    Encontre e agende os melhores profissionais locais em Dourados.
                                </p>
                            </div>
                            <label className="relative flex flex-col min-w-40 h-16 w-full max-w-[640px] z-10">
                                <div className="flex w-full flex-1 items-stretch rounded-xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1f262e]">
                                    <div className="text-[#617989] flex items-center justify-center pl-5">
                                        <span className="material-symbols-outlined">search</span>
                                    </div>
                                    <input className="flex w-full border-none focus:ring-0 bg-transparent text-[#111518] dark:text-white px-4 text-base placeholder:text-[#617989] outline-none" placeholder="Ex: Eletricista, Professor de Inglês, Diarista..." />
                                    <div className="flex items-center pr-2">
                                        <button className="flex h-12 px-8 cursor-pointer items-center justify-center rounded-lg bg-primary text-white text-base font-bold transition-all hover:bg-primary-light">
                                            Pesquisar
                                        </button>
                                    </div>
                                </div>
                            </label>
                            <div className="flex gap-4 mt-2 text-sm text-[#617989] dark:text-gray-400 font-medium">
                                <span>Popular:</span>
                                <a className="underline hover:text-primary" href="#">Diaristas</a>
                                <a className="underline hover:text-primary" href="#">Pintores</a>
                                <a className="underline hover:text-primary" href="#">Manicure</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SectionHeader: Categorias */}
            <div className="px-4 lg:px-40 flex justify-center py-2">
                <div className="max-w-[1200px] w-full">
                    <h2 className="text-[#111518] dark:text-white text-[22px] font-extrabold leading-tight tracking-tight px-4 pb-4">Navegue por Categorias</h2>
                </div>
            </div>

            {/* Tabs: Categories */}
            <div className="px-4 lg:px-40 flex justify-center pb-8">
                <div className="max-w-[1200px] w-full">
                    <div className="flex border-b border-[#dbe1e6] dark:border-[#2f3944] px-4 gap-12 overflow-x-auto no-scrollbar">
                        <a className="flex flex-col items-center justify-center border-b-[3px] border-primary text-primary gap-2 pb-4 pt-2 group" href="#">
                            <div className="p-3 rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                                <span className="material-symbols-outlined text-2xl">home_repair_service</span>
                            </div>
                            <p className="text-sm font-bold tracking-tight">Reformas</p>
                        </a>
                        <a className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-[#617989] gap-2 pb-4 pt-2 group hover:text-[#111518] dark:hover:text-white transition-all" href="#">
                            <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 transition-colors group-hover:bg-gray-200 dark:group-hover:bg-gray-700">
                                <span className="material-symbols-outlined text-2xl">celebration</span>
                            </div>
                            <p className="text-sm font-bold tracking-tight">Eventos</p>
                        </a>
                        <a className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-[#617989] gap-2 pb-4 pt-2 group hover:text-[#111518] dark:hover:text-white transition-all" href="#">
                            <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 transition-colors group-hover:bg-gray-200 dark:group-hover:bg-gray-700">
                                <span className="material-symbols-outlined text-2xl">favorite</span>
                            </div>
                            <p className="text-sm font-bold tracking-tight">Saúde</p>
                        </a>
                        <a className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-[#617989] gap-2 pb-4 pt-2 group hover:text-[#111518] dark:hover:text-white transition-all" href="#">
                            <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 transition-colors group-hover:bg-gray-200 dark:group-hover:bg-gray-700">
                                <span className="material-symbols-outlined text-2xl">school</span>
                            </div>
                            <p className="text-sm font-bold tracking-tight">Aulas</p>
                        </a>
                    </div>
                </div>
            </div>

            {/* SectionHeader: Profissionais */}
            <div className="px-4 lg:px-40 flex justify-center py-2">
                <div className="max-w-[1200px] w-full flex items-center justify-between px-4">
                    <h2 className="text-[#111518] dark:text-white text-[22px] font-extrabold leading-tight tracking-tight">Profissionais em Destaque</h2>
                    <a className="text-primary text-sm font-bold hover:underline" href="#">Ver todos</a>
                </div>
            </div>

            {/* Professional List */}
            <main className="px-4 lg:px-40 flex justify-center pb-20">
                <div className="max-w-[1200px] w-full flex flex-col gap-4 px-4">
                    {/* Card 1: Ricardo Silva -> Linked to Carlos (Standard Profile) for demo */}
                    <div className="card-shadow bg-white dark:bg-[#252d35] rounded-xl p-5 border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-6 items-center md:items-stretch transition-all hover:shadow-lg hover:-translate-y-1">
                        <div className="relative">
                            <div className="size-24 md:size-32 rounded-full bg-cover bg-center border-4 border-white dark:border-gray-800 shadow-sm" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCKR01IsH0baQLCVp8QzbDPQ8FF0fXdLMD3umTYfp41wFhEAKC2xlrQLQCBzBAPW-AX3DxrOoftSbdSE5fkjRZdxDS6UQKZAutecOWW06JU7s__i96u8txtyXjQic0Nds5dYcwzIzQmHfDcDDj0fBUxJMf9F5xoznMeA-ml6eQsxtme1GYSkmzio-U0KW6LrAGtjtZmj5tf01dmd2Lb7lXnkJe9hj0aq1UrqK43jvENsFFLUQ_VGWLUoUMcmBgtPG-mEqVe3Z6kjJ_D")' }}></div>
                            <div className="absolute bottom-1 right-1 bg-green-500 size-4 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"></div>
                        </div>
                        <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                                <h3 className="text-xl font-extrabold text-[#111518] dark:text-white">Ricardo Silva</h3>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 w-fit mx-auto md:mx-0">
                                    Disponível Agora
                                </span>
                            </div>
                            <p className="text-[#617989] dark:text-gray-400 font-semibold text-base mb-2">Eletricista Residencial & Industrial</p>
                            <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
                                <span className="material-symbols-outlined text-star-yellow text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="font-bold text-[#111518] dark:text-white text-base">4.9</span>
                                <span className="text-[#617989] dark:text-gray-400 text-sm">(124 avaliações)</span>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-[#617989] dark:text-gray-400 text-sm">Jardim Água Boa, Dourados</span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center gap-3 w-full md:w-auto min-w-[160px]">
                            {/* Linking to 'carlos' profile for demo of Standard layout */}
                            <Link to="/profile/carlos" className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-light transition-colors text-center inline-flex items-center justify-center">
                                Ver Perfil
                            </Link>
                            <button className="w-full bg-primary/10 text-primary font-bold py-3 px-6 rounded-lg hover:bg-primary/20 transition-colors">
                                Solicitar Orçamento
                            </button>
                        </div>
                    </div>
                    {/* Card 2: Maria -> Linked to Joao (Premium Profile) for demo */}
                    <div className="card-shadow bg-white dark:bg-[#252d35] rounded-xl p-5 border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-6 items-center md:items-stretch transition-all hover:shadow-lg hover:-translate-y-1">
                        <div className="relative">
                            <div className="size-24 md:size-32 rounded-full bg-cover bg-center border-4 border-white dark:border-gray-800 shadow-sm" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDd30sHjg1-d_y7tAVAetB_Zc7Et7oQmeF-J68FWDMZc94TUYjHSrboTY_MoEtgCH_YXnTKTDgzc2wssV-O5VI3UMxt228cRnkDx67onHsN52Ks35sgYFQs6dwOJZsFOs5aWlyH1m-c19SpfTwufD5Qvxcf8EZ-4l7NABNX79c8yZO3JVzi2zzMJV_HpZz7LFdjYmUc4tmB-m5kGeVO7-MkQWGKcqP9byEQ96M4F3rDMSd_QT7xhyHh8xag0pHkgyW8aQ0OL5zWFHOy")' }}></div>
                        </div>
                        <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                                <h3 className="text-xl font-extrabold text-[#111518] dark:text-white">Maria Eduarda Santos</h3>
                            </div>
                            <p className="text-[#617989] dark:text-gray-400 font-semibold text-base mb-2">Professora Particular de Inglês e Espanhol</p>
                            <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
                                <span className="material-symbols-outlined text-star-yellow text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="font-bold text-[#111518] dark:text-white text-base">5.0</span>
                                <span className="text-[#617989] dark:text-gray-400 text-sm">(89 avaliações)</span>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-[#617989] dark:text-gray-400 text-sm">Centro, Dourados</span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center gap-3 w-full md:w-auto min-w-[160px]">
                            {/* Linking to 'joao' profile for demo of Premium layout */}
                            <Link to="/profile/joao" className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-light transition-colors text-center inline-flex items-center justify-center">
                                Ver Perfil
                            </Link>
                            <button className="w-full bg-primary/10 text-primary font-bold py-3 px-6 rounded-lg hover:bg-primary/20 transition-colors">
                                Solicitar Orçamento
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
