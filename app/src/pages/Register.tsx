import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { User, Mail, Phone, Briefcase, Globe, HelpCircle, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        category: '',
        experience: '',
        service_area: '',
        description: '',
        instagram: '',
        website: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Iniciando submissão do formulário...");
        // alert("Iniciando envio..."); // Debug alert
        setLoading(true);

        try {
            console.log("Dados do formulário:", formData);

            // Save to Supabase (professionals table)
            const { data, error } = await supabase
                .from('professionals')
                .insert([
                    {
                        full_name: formData.full_name,
                        email: formData.email,
                        phone: formData.phone,
                        profession: formData.category,
                        description: formData.description,
                        experience_years: parseInt(formData.experience) || 0,
                        service_areas: formData.service_area,
                        address_city: 'Dourados', // Default city
                        is_active: true
                    }
                ])
                .select();

            if (error) {
                console.error("Erro retornado pelo Supabase:", error);
                throw error;
            }

            console.log("Cadastro realizado com sucesso:", data);

            // Success: Pass data to success page
            navigate('/register/success', {
                state: {
                    name: formData.full_name,
                    category: formData.category,
                    phone: formData.phone
                }
            });
        } catch (error: any) {
            console.error('Erro detalhado ao cadastrar:', error);
            const msg = error.message || error.error_description || 'Erro desconhecido';
            alert(`Falha no cadastro: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f0f2f4] dark:bg-background-dark min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-display text-[#111417] dark:text-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Form Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight mb-2">Cadastro de Novo Prestador</h1>
                            <p className="text-[#647587] dark:text-gray-400">
                                Seja bem-vindo. Preencha os dados abaixo para começar a receber orçamentos em Dourados e região.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Quem é você? */}
                            <div className="bg-white dark:bg-[#1a2027] rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-2 mb-6 text-primary">
                                    <User size={24} />
                                    <h2 className="text-xl font-bold">Quem é você?</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Nome Completo</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="full_name"
                                                value={formData.full_name}
                                                onChange={handleChange}
                                                placeholder="Ex: João da Silva"
                                                className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                                                required
                                            />
                                            <Briefcase className="absolute right-3 top-3.5 text-gray-400" size={18} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-2">E-mail</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="seu@email.com"
                                                className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                                                required
                                            />
                                            <Mail className="absolute right-3 top-3.5 text-gray-400" size={18} />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold mb-2">WhatsApp</label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="(67) 9 9999-9999"
                                                className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                                                required
                                            />
                                            <Phone className="absolute right-3 top-3.5 text-gray-400" size={18} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Seu Serviço */}
                            <div className="bg-white dark:bg-[#1a2027] rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-2 mb-6 text-primary">
                                    <Briefcase size={24} />
                                    <h2 className="text-xl font-bold">Seu Serviço</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold mb-2">Categoria de Serviço</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white appearance-none h-[52px]"
                                            required
                                        >
                                            <option value="">Selecione uma categoria principal...</option>
                                            <optgroup label="Reformas e Reparos">
                                                <option>Eletricista</option>
                                                <option>Encanador (Bombeiro Hidráulico)</option>
                                                <option>Pintor Residencial/Comercial</option>
                                                <option>Pedreiro / Mestre de Obras</option>
                                                <option>Marceneiro</option>
                                                <option>Serralheiro</option>
                                                <option>Gesseiro</option>
                                                <option>Montador de Móveis</option>
                                                <option>Técnico em Ar Condicionado</option>
                                                <option>Vidraceiro</option>
                                            </optgroup>
                                            <optgroup label="Serviços Domésticos">
                                                <option>Diarista / Faxineira</option>
                                                <option>Passadeira</option>
                                                <option>Cozinheira</option>
                                                <option>Babá / Cuidador Infantil</option>
                                                <option>Cuidador de Idosos</option>
                                                <option>Jardineiro / Piscineiro</option>
                                                <option>Passeador de Cães (Dog Walker)</option>
                                            </optgroup>
                                            <optgroup label="Saúde e Bem-Estar">
                                                <option>Personal Trainer</option>
                                                <option>Fisioterapeuta</option>
                                                <option>Nutricionista</option>
                                                <option>Psicólogo</option>
                                                <option>Manicure / Pedicure</option>
                                                <option>Cabeleireiro(a)</option>
                                                <option>Esteticista / Maquiadora</option>
                                                <option>Massoterapeuta</option>
                                            </optgroup>
                                            <optgroup label="Educação e Aulas">
                                                <option>Professor Particular (Reforço)</option>
                                                <option>Professor de Idiomas</option>
                                                <option>Professor de Música</option>
                                                <option>Instrutor de Informática</option>
                                                <option>Aulas de Culinária</option>
                                            </optgroup>
                                            <optgroup label="Tecnologia e Digital">
                                                <option>Suporte Técnico / Formatação</option>
                                                <option>Desenvolvedor / Programador</option>
                                                <option>Designer Gráfico</option>
                                                <option>Social Media</option>
                                                <option>Fotógrafo / Videomaker</option>
                                                <option>Marketing Digital</option>
                                            </optgroup>
                                            <optgroup label="Eventos e Outros">
                                                <option>Churrasqueiro / Garçom</option>
                                                <option>Decoração de Festas</option>
                                                <option>Segurança Particular</option>
                                                <option>Fretes e Mudanças</option>
                                                <option>Outros Serviços Especializados</option>
                                            </optgroup>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Anos de Experiência</label>
                                        <input
                                            type="text"
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            placeholder="Ex: 5"
                                            className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Bairros atendidos em Dourados</label>
                                        <input
                                            type="text"
                                            name="service_area"
                                            value={formData.service_area}
                                            onChange={handleChange}
                                            placeholder="Ex: Centro, Jardim Água Boa..."
                                            className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold mb-2">Descrição dos Serviços Oferecidos</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Descreva detalhadamente o que você faz, suas especialidades, ferramentas que utiliza e diferenciais do seu atendimento..."
                                            className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white h-32 resize-none"
                                            required
                                        ></textarea>
                                        <p className="mt-2 text-xs text-[#647587] dark:text-gray-400">Uma boa descrição aumenta suas chances de ser contratado em até 3x.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Sua Presença Digital */}
                            <div className="bg-white dark:bg-[#1a2027] rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-2 mb-6 text-primary">
                                    <Globe size={24} />
                                    <h2 className="text-xl font-bold">Sua Presença Digital</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Instagram</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-3.5 text-gray-400">@</span>
                                            <input
                                                type="text"
                                                name="instagram"
                                                value={formData.instagram}
                                                onChange={handleChange}
                                                placeholder="usuario"
                                                className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Portfólio ou Site</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="website"
                                                value={formData.website}
                                                onChange={handleChange}
                                                placeholder="https://meusite.com"
                                                className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                                            />
                                            <Globe className="absolute right-3 top-3.5 text-gray-400" size={18} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full md:w-auto bg-primary text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-primary-light transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={24} className="animate-spin" />
                                            Enviando...
                                        </>
                                    ) : (
                                        'Finalizar Meu Cadastro'
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Tips Box */}
                        <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-xl border border-yellow-100 dark:border-yellow-900/30">
                            <div className="flex items-center gap-2 mb-4 text-yellow-700 dark:text-yellow-500">
                                <span className="material-symbols-outlined">lightbulb</span>
                                <h3 className="font-bold">Dicas para um bom cadastro</h3>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <CheckCircle className="text-primary shrink-0" size={20} />
                                    <div>
                                        <p className="font-bold text-sm text-[#111417] dark:text-white">E-mail Profissional</p>
                                        <p className="text-xs text-[#647587] dark:text-gray-400">Use um e-mail que você acessa diariamente.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle className="text-primary shrink-0" size={20} />
                                    <div>
                                        <p className="font-bold text-sm text-[#111417] dark:text-white">Áreas de Atuação</p>
                                        <p className="text-xs text-[#647587] dark:text-gray-400">Seja específico sobre quais bairros você atende em Dourados.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle className="text-primary shrink-0" size={20} />
                                    <div>
                                        <p className="font-bold text-sm text-[#111417] dark:text-white">Portfólio</p>
                                        <p className="text-xs text-[#647587] dark:text-gray-400">Fotos de trabalhos anteriores aumentam suas chances em 70%.</p>
                                    </div>
                                </li>
                            </ul>

                            <div className="mt-6 pt-6 border-t border-yellow-200 dark:border-yellow-800/30">
                                <p className="text-xs font-bold mb-2 text-center text-yellow-800 dark:text-yellow-500">Dúvidas sobre o cadastro?</p>
                                <button className="w-full bg-white dark:bg-gray-800 py-3 rounded-lg font-bold text-sm shadow-sm hover:shadow transition-shadow flex items-center justify-center gap-2 text-[#111417] dark:text-white">
                                    <HelpCircle size={18} />
                                    Fale com o Suporte
                                </button>
                            </div>
                        </div>

                        {/* Highlight Box */}
                        <div className="bg-primary text-white p-6 rounded-xl relative overflow-hidden group">
                            <div className="relative z-10">
                                <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">Destaque</p>
                                <h3 className="text-xl font-bold leading-tight mb-4">Ganhe visibilidade no topo das buscas.</h3>
                                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold hover:underline">
                                    Saiba mais <ArrowRight size={16} />
                                </a>
                            </div>
                            {/* Decor */}
                            <div className="absolute -bottom-4 -right-4 text-white opacity-10 rotate-12 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[80px]">verified</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div >
        </div >
    );
}
