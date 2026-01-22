import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { User, Mail, Phone, Briefcase, Globe, HelpCircle, CheckCircle, ArrowRight, Loader2, DollarSign, Tag } from 'lucide-react';

export default function CriarAnuncio() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        titulo: '',
        preco: '',
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
        setLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                alert('Você precisa estar logado para anunciar.');
                setLoading(false);
                return;
            }

            const { error } = await supabase
                .from('anuncios')
                .insert([
                    {
                        usuario_id: user.id,
                        titulo: formData.titulo,
                        preco: parseFloat(formData.preco) || 0,
                        nome_prestador: formData.full_name,
                        email_contato: formData.email,
                        telefone: formData.phone,
                        categoria: formData.category,
                        anos_experiencia: parseInt(formData.experience) || 0,
                        areas_atendimento: formData.service_area,
                        descricao: formData.description,
                        instagram: formData.instagram,
                        website: formData.website
                    }
                ]);

            if (error) throw error;

            alert('Anúncio publicado com sucesso!');
            // Reset form or redirect? I'll just reset for now as per previous behavior
            setFormData({
                titulo: '',
                preco: '',
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

        } catch (error: any) {
            alert('Erro ao anunciar: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* Detalhes do Anúncio (Novo) */}
            <div className="bg-white dark:bg-[#1a2027] rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-6 text-primary">
                    <Tag size={24} />
                    <h2 className="text-xl font-bold">Detalhes do Anúncio</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold mb-2">Título do Anúncio</label>
                        <input
                            type="text"
                            name="titulo"
                            placeholder="Ex: Encanador 24h Especializado"
                            value={formData.titulo}
                            onChange={handleChange}
                            className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Preço Base (R$)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-3.5 text-gray-400">R$</span>
                            <input
                                type="number"
                                name="preco"
                                placeholder="0.00"
                                step="0.01"
                                value={formData.preco}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quem é você? (Cópia do Register) */}
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

            {/* Seu Serviço (Cópia do Register) */}
            <div className="bg-white dark:bg-[#1a2027] rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-6 text-primary">
                    <Briefcase size={24} />
                    <h2 className="text-xl font-bold">Detalhes do Serviço</h2>
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
                        <label className="block text-sm font-bold mb-2">Bairros atendidos</label>
                        <input
                            type="text"
                            name="service_area"
                            value={formData.service_area}
                            onChange={handleChange}
                            placeholder="Ex: Centro, Água Boa..."
                            className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold mb-2">Descrição Detalhada</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Descreva detalhadamente o que você faz..."
                            className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white h-32 resize-none"
                            required
                        ></textarea>
                    </div>
                </div>
            </div>

            {/* Sua Presença Digital (Cópia do Register) */}
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

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-primary-light transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <Loader2 size={24} className="animate-spin" />
                        Publicando...
                    </>
                ) : (
                    'Publicar Anúncio'
                )}
            </button>
        </form>
    );
}
