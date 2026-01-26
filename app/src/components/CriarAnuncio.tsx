import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { User, Mail, Phone, Briefcase, Globe, Loader2, Tag, Camera, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { serviceCategories } from '../data/categories';

export default function CriarAnuncio() {
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(false);
    const userId = user?.id;

    // Image upload state
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);

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
        website: '',
        preco_a_combinar: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImageFile(null);
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
            setImagePreview(null);
        }
    };

    const uploadImage = async (file: File): Promise<string | null> => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${userId}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('ad-photos')
                .upload(filePath, file);

            if (uploadError) {
                console.error('Error uploading image:', uploadError);
                throw uploadError;
            }

            const { data } = supabase.storage
                .from('ad-photos')
                .getPublicUrl(filePath);

            return data.publicUrl;
        } catch (error) {
            console.error('Error in uploadImage:', error);
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!userId) {
                alert('Você precisa estar logado para anunciar.');
                setLoading(false);
                return;
            }

            let imageUrl = null;
            if (imageFile) {
                setUploadingImage(true);
                imageUrl = await uploadImage(imageFile);
                setUploadingImage(false);

                if (!imageUrl) {
                    throw new Error('Falha ao fazer upload da imagem.');
                }
            }

            const { error } = await supabase
                .from('anuncios')
                .insert([
                    {
                        usuario_id: userId,
                        titulo: formData.titulo,
                        preco: formData.preco_a_combinar ? 0 : (parseFloat(formData.preco) || 0),
                        nome_prestador: formData.full_name,
                        email_contato: formData.email,
                        telefone: formData.phone,
                        categoria: formData.category,
                        anos_experiencia: parseInt(formData.experience) || 0,
                        areas_atendimento: formData.service_area,
                        descricao: formData.description,
                        instagram: formData.instagram,
                        website: formData.website,
                        imagem_url: imageUrl,
                        preco_a_combinar: formData.preco_a_combinar
                    }
                ]);

            if (error) throw error;

            navigate('/anuncio-success', {
                state: {
                    name: formData.full_name,
                    category: formData.category,
                    titulo: formData.titulo,
                    phone: formData.phone
                }
            });

        } catch (error: any) {
            alert('Erro ao anunciar: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="animate-spin text-primary" size={32} />
            </div>
        );
    }

    if (!userId) return null;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
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
                    <div className="flex flex-col gap-4">
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
                                    disabled={formData.preco_a_combinar}
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white ${formData.preco_a_combinar ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-900' : ''}`}
                                    required={!formData.preco_a_combinar}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="preco_a_combinar"
                                name="preco_a_combinar"
                                checked={formData.preco_a_combinar}
                                onChange={handleChange}
                                className="size-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                            />
                            <label htmlFor="preco_a_combinar" className="text-sm font-bold cursor-pointer select-none">
                                Preço a Combinar
                            </label>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-bold mb-2">Foto do Anúncio (Opcional)</label>
                    <div className="mt-2">
                        {!imagePreview ? (
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Camera className="w-8 h-8 mb-2 text-gray-400" />
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Clique para enviar</span> ou arraste a foto
                                    </p>
                                    <p className="text-xs text-gray-400">PNG, JPG ou JPEG</p>
                                </div>
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                            </label>
                        ) : (
                            <div className="relative w-full md:w-1/2 h-48 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                <button type="button" onClick={removeImage} className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-all">
                                    <X size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-[#1a2027] rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-6 text-primary">
                    <User size={24} />
                    <h2 className="text-xl font-bold">Quem é você?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold mb-2">Nome Completo</label>
                        <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Ex: João da Silva" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white" required />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">E-mail</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white" required />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold mb-2">WhatsApp</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(67) 9 9999-9999" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white" required />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-[#1a2027] rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-6 text-primary">
                    <Briefcase size={24} />
                    <h2 className="text-xl font-bold">Detalhes do Serviço</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold mb-2">Categoria de Serviço</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white appearance-none h-[52px]" required>
                            <option value="">Selecione uma categoria principal...</option>
                            {serviceCategories.map((group) => (
                                <optgroup key={group.group} label={group.group}>
                                    {group.items.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Anos de Experiência</label>
                        <input type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder="Ex: 5" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Bairros atendidos</label>
                        <input type="text" name="service_area" value={formData.service_area} onChange={handleChange} placeholder="Ex: Centro, Água Boa..." className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold mb-2">Descrição Detalhada</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descreva detalhadamente o que você faz..." className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white h-32 resize-none" required></textarea>
                    </div>
                </div>
            </div>

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
                            <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="usuario" className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Portfólio ou Site</label>
                        <input type="text" name="website" value={formData.website} onChange={handleChange} placeholder="https://meusite.com" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white" />
                    </div>
                </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-primary text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-primary-light transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? (
                    <>
                        <Loader2 size={24} className="animate-spin" />
                        {uploadingImage ? 'Enviando imagem...' : 'Publicando...'}
                    </>
                ) : (
                    'Publicar Anúncio'
                )}
            </button>
        </form>
    );
}
