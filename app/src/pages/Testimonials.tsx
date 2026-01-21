import { Star, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const testimonials = [
    {
        name: "João da Silva",
        location: "Jardim Água Boa",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxdkaRA_f-mqaqUPFj7ILmJKjjV1PSaQCweMyMPN_0HoN0ttAVnDORnnkjXrvRXznJQ2EbtYNC5MTAk1F6LRltvohJVqBiQz6hVG37fvlfjWbl3e1cNSjgXqDAw26TsLDVXuOgjaOCrqZ4fWZR4M17uX7CTjgWnpEIeiwpGaI_lsd6Myli0_XQMFny2c_UaaMGuNPARxNCwmO-qcUvQfJH0yjtSfsC2yCilqg96Dy0Vt6uUVqHM3e9M6XdLMD-IGKYgFD-OtWlNemj",
        stars: 5,
        text: "O Carlos resolveu meu problema elétrico em minutos. Eu estava sem energia em metade da casa e ele foi super atencioso e técnico. Recomendo demais para quem mora aqui na região!",
        hired: "Carlos Eletricista"
    },
    {
        name: "Maria Oliveira",
        location: "Vila Planalto",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgGmFwhjKsnYUIER7QObTgqGqMfMCxs0otaCBfxBYoqzQ1VGW6-PhOhirMqup7t2H-OCgjc60J5fOf7WJxIskehSCSYb6ODIrOobUqKgXRSDZC9oMMxU029A1ljWEvT880WzBqyAC-a9j_HBvPRIQ5VttfYmpg8NeVzXbfG1TIv78kOgT1K0hAh_H29HrbKbYYoEqTkw8h_tPu3nNxtvsXK063CrCbbvC8qi59gmREQHt_3vVQKy0DwEZ7ZQVpHy6SvKvPkatEM3kP",
        stars: 5,
        text: "Excelente plataforma para achar profissionais de confiança na nossa cidade. Já usei três vezes e em todas fui muito bem atendida. A segurança de saber que o profissional é avaliado faz toda a diferença.",
        hired: "Ana Limpeza"
    },
    {
        name: "Pedro Santos",
        location: "BNH 3º Plano",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWS-kIoZomX7hQVMcl7k_m4Qr66xPQtPM5rB0KvHO8Bpx7-Cmja6kiBNHAexQkNG_vv13pocplPURgCkW6P8n1K4ckcGgp366uHH8asWy1Ue9RGTcwRN59qU6lRui8F0gdlpDutiAi9cK06_HSyvnXYanhc-9w_KrDXW76H11NKjg29oc_ya7bECwzj5fweHKGQcnRv1Yicpm5ofeVofHhSpR8lLCKz05BRxKtjG5ILYoLFwN5UXaUGy0LTSYugPBbI_G6MiPR8sAv",
        stars: 5,
        text: "Encontrei um pintor caprichoso e com preço justo. Muito fácil de usar, em 10 minutos já estava conversando com o Marcos pelo WhatsApp. O serviço ficou impecável.",
        hired: "Marcos Pintor"
    },
    {
        name: "Ana Paula",
        location: "Centro",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ4rPmyPKcLrj-AkK3nsI239zjy807YTP_E6VXHGryqZwbSdNLX1ZKcCPMCd47LAMo3d-AP5-kRFdEfZzYMROthtEBAw1AahY8PHcZzo2vjFD8tQY8RaylYPFHg_qx2FECxNu5EuisL2JHa36Jh1wB0NFAu8REv1-Yt78OLRNDd5knCG4o5wpEDzMTIvIp-RdkFraGOg4f-ERZ_Jy_s5E761nHP8Ee9GuKVUI5Jzcfff_PgX-mz42fn8TuGRp0JaLxPmFuzmCr4UpX",
        stars: 5,
        text: "O sistema de avaliação ajuda muito a escolher. Eu precisava de uma limpeza pesada pós-obra e a equipe que encontrei aqui foi excepcional. Pontuais e muito organizados.",
        hired: "Limpa Mais"
    },
    {
        name: "Ricardo Lima",
        location: "Jardim Pantanal",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvmJj-88dzr_F37lgKwt0TGVP9lN6aLJjOvZQZRu0PbbiLrZHevswaQ0cau3-A2Nhz6T5FEkwiY8YUU02-TTGINFACjRtuAHPpcQahRty_P0S4yEC30SvRpwiPydlEWtqva1RxTtM8u7P4R-iyNQCT37kk34RVLQaUGKhd562FwLqpCfIQiayikFwEXgE6F-vGvS_TBSePN-a30RaWioaTSbwam6XJZOVIYp4a21ot6N1Tx1mqxEMwr1d-PLJJf5LPeYbZMTcs_hwo",
        stars: 5,
        text: "Contratei um encanador que chegou exatamente no horário marcado e foi super profissional. O valor foi justo e ele explicou tudo o que estava fazendo. Dourados precisava de um app assim.",
        hired: "José Encanador"
    },
    {
        name: "Claudia Souza",
        location: "Parque Alvorada",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEaB1NfAbz8QEzU-q97z2zYi61dsqf5pTh6HH_SdemRuC_d2jAg--Uhhmg9tCJ_O-wuFfQ9BRuzUiSWGWoHECd_e96H8_grGB1rD49G0pyZmuqV0o8ydHYYx3Pgb2UAlFl2T0hvgN2yonBYhm1nKIvcG_nH44W_rSmjaelTBGu2jfq-6VQzvIRNjs_Fe3z52GKy0ZBVBb3pIauZ7UtEOYgLErkQWqgCO7LNv2sU3c3SPNNDRiU-P4PsgjtKU_kCkZNOK4Pjuuoy5YR",
        stars: 5,
        text: "A melhor forma de contratar prestadores em Dourados sem dor de cabeça. A Bia fez a reforma do meu banheiro e ficou perfeito. A plataforma facilita muito o filtro por especialidade.",
        hired: "Bia Reformas"
    }
];

export default function Testimonials() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#111417] dark:text-white transition-colors duration-300 min-h-screen">
            <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 lg:px-10 py-12">
                {/* Hero Heading */}
                <div className="mb-16 text-center lg:text-left">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-[#111417] dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">
                            O que os Douradenses estão dizendo
                        </h1>
                        <p className="text-[#647587] dark:text-gray-400 text-lg max-w-2xl leading-relaxed">
                            Construímos uma comunidade baseada em confiança. Confira as experiências reais de quem já transformou sua casa e rotina com os melhores profissionais de Dourados, MS.
                        </p>
                    </div>
                </div>

                {/* Testimonials Masonry Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="break-inside-avoid bg-white dark:bg-gray-800 p-6 rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#f0f2f4] dark:border-gray-700">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="size-12 rounded-full overflow-hidden bg-gray-200 border-2 border-primary/10">
                                    <img
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover"
                                        src={testimonial.image}
                                    />
                                </div>
                                <div>
                                    <p className="font-bold text-[#111417] dark:text-white">{testimonial.name}</p>
                                    <p className="text-xs text-[#647587] dark:text-gray-400">{testimonial.location}</p>
                                </div>
                            </div>
                            <div className="flex gap-0.5 mb-3 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" strokeWidth={0} className={i < testimonial.stars ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"} />
                                ))}
                            </div>
                            <p className="text-[#111417] dark:text-gray-200 leading-relaxed mb-4">
                                "{testimonial.text}"
                            </p>
                            <div className="flex items-center gap-2 py-2 px-3 bg-primary/5 dark:bg-primary/10 rounded-lg">
                                <BadgeCheck size={16} className="text-primary" />
                                <p className="text-xs font-bold text-primary">Contratou: {testimonial.hired}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Social Proof Statistics */}
                <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-y border-[#f0f2f4] dark:border-gray-800">
                    <div className="text-center">
                        <p className="text-3xl font-black text-primary mb-1">2.5k+</p>
                        <p className="text-sm text-[#647587] dark:text-gray-400">Serviços Realizados</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-black text-primary mb-1">4.9</p>
                        <p className="text-sm text-[#647587] dark:text-gray-400">Média de Avaliação</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-black text-primary mb-1">150+</p>
                        <p className="text-sm text-[#647587] dark:text-gray-400">Profissionais Verificados</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-black text-primary mb-1">100%</p>
                        <p className="text-sm text-[#647587] dark:text-gray-400">Foco em Dourados</p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-20 bg-primary rounded-[2rem] p-8 md:p-16 text-center text-white overflow-hidden relative group">
                    {/* Abstract background pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white"></path>
                        </svg>
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
                            Encontre você também o profissional ideal
                        </h2>
                        <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                            Junte-se a milhares de douradenses que já usam e aprovam nossa plataforma. Rapidez, confiança e qualidade em um só lugar.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/register" className="bg-white text-primary hover:bg-gray-100 px-10 py-4 rounded-xl font-black text-lg shadow-xl transition-all hover:-translate-y-1 inline-block">
                                Começar agora
                            </Link>
                            <Link to="/#categories" className="bg-primary/20 border-2 border-white/30 backdrop-blur-sm text-white hover:bg-white/10 px-10 py-4 rounded-xl font-bold text-lg transition-all inline-block">
                                Ver serviços
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
