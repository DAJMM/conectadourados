import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User, Mail, Phone, Briefcase, Globe, Loader2, Tag, Camera, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { serviceCategories } from '../data/categories';

interface CriarAnuncioProps {
    anuncioParaEditar?: any;
    onFinalizarEdicao?: () => void;
}

export default function CriarAnuncio({ anuncioParaEditar, onFinalizarEdicao }: CriarAnuncioProps) {
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(false);
    const userId = user?.id;
    const isEditing = !!anuncioParaEditar;

    // Banner upload state
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [uploadingBanner, setUploadingBanner] = useState(false);

    // Avatar upload state
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);

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

    // Populate form if editing
    useEffect(() => {
        if (anuncioParaEditar) {
            setFormData({
                titulo: anuncioParaEditar.titulo || '',
                preco: anuncioParaEditar.preco?.toString() || '',
                full_name: anuncioParaEditar.nome_prestador || '',
                email: anuncioParaEditar.email_contato || '',
                phone: anuncioParaEditar.telefone || '',
                category: anuncioParaEditar.categoria || '',
                experience: anuncioParaEditar.anos_experiencia?.toString() || '',
                service_area: anuncioParaEditar.areas_atendimento || '',
                description: anuncioParaEditar.descricao || '',
                instagram: anuncioParaEditar.instagram || '',
                website: anuncioParaEditar.website || '',
                preco_a_combinar: !!anuncioParaEditar.preco_a_combinar
            });
            setBannerPreview(anuncioParaEditar.imagem_url || null);
            setAvatarPreview(anuncioParaEditar.avatar_url || null); // Load ad-specific avatar
            setBannerFile(null); // Reset file inputs
            setAvatarFile(null);

            // If ad doesn't have an avatar, fallback to profile
            if (!anuncioParaEditar.avatar_url) {
                fetchProfileAvatar();
            }
        } else {
            // Reset form if editing is finished/cancelled
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
                website: '',
                preco_a_combinar: false
            });
            setBannerPreview(null);
            setBannerFile(null);
            fetchProfileAvatar();
        }
    }, [anuncioParaEditar, userId]);

    const fetchProfileAvatar = async () => {
        if (!userId) return;
        const { data } = await supabase.from('profiles').select('avatar_url').eq('id', userId).single();
        if (data?.avatar_url) {
            setAvatarPreview(data.avatar_url);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setBannerFile(file);
            setBannerPreview(URL.createObjectURL(file));
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const removeBanner = () => {
        setBannerFile(null);
        if (bannerPreview && !anuncioParaEditar?.imagem_url) {
            URL.revokeObjectURL(bannerPreview);
            setBannerPreview(null);
        } else {
            setBannerPreview(anuncioParaEditar?.imagem_url || null);
        }
    };

    const removeAvatar = () => {
        setAvatarFile(null);
        // We don't really "remove" the avatar preview easily if it's from the profile
        // but we can hide the newly selected one
    };

    const uploadFile = async (file: File, bucket: string): Promise<string | null> => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${userId}-${Math.random()}.${fileExt}`;
            const filePath = `${userId}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) {
                console.error(`Error uploading to ${bucket}:`, uploadError);
                throw uploadError;
            }

            const { data } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            return data.publicUrl;
        } catch (error) {
            console.error('Error in uploadFile:', error);
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

            let bannerUrl = bannerPreview;
            if (bannerFile) {
                setUploadingBanner(true);
                bannerUrl = await uploadFile(bannerFile, 'ad-photos');
                setUploadingBanner(false);
            }

            let finalAvatarUrl = avatarPreview;
            if (avatarFile) {
                setUploadingAvatar(true);
                finalAvatarUrl = await uploadFile(avatarFile, 'avatars');
                setUploadingAvatar(false);
            }

            const anuncioData = {
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
                imagem_url: bannerUrl,
                avatar_url: finalAvatarUrl,
                preco_a_combinar: formData.preco_a_combinar,
                status: 'pending', // Envia para aprovação novamente após edição
                edit_history: anuncioParaEditar?.edit_history || []
            };

            if (isEditing) {
                // Calculate changes for history
                const changes: string[] = [];
                if (anuncioParaEditar.titulo !== anuncioData.titulo) changes.push(`Título: "${anuncioParaEditar.titulo}" -> "${anuncioData.titulo}"`);
                if (anuncioParaEditar.nome_prestador !== anuncioData.nome_prestador) changes.push(`Prestador: "${anuncioParaEditar.nome_prestador}" -> "${anuncioData.nome_prestador}"`);
                if (anuncioParaEditar.categoria !== anuncioData.categoria) changes.push(`Categoria: "${anuncioParaEditar.categoria}" -> "${anuncioData.categoria}"`);
                if (anuncioParaEditar.descricao !== anuncioData.descricao) changes.push(`Descrição alterada`);
                if (Number(anuncioParaEditar.preco) !== Number(anuncioData.preco)) changes.push(`Preço: R$${anuncioParaEditar.preco} -> R$${anuncioData.preco}`);
                if (anuncioParaEditar.imagem_url !== anuncioData.imagem_url) changes.push(`Banner/Imagem atualizada`);
                if (anuncioParaEditar.avatar_url !== anuncioData.avatar_url) changes.push(`Foto de perfil atualizada`);

                if (changes.length > 0) {
                    const newEntry = {
                        date: new Date().toISOString(),
                        description: `Editado pelo usuário: ${changes.join('; ')}`
                    };
                    anuncioData.edit_history = [newEntry, ...(anuncioParaEditar.edit_history || [])];
                }

                const { error } = await supabase
                    .from('anuncios')
                    .update(anuncioData)
                    .eq('id', anuncioParaEditar.id)
                    .eq('usuario_id', userId);

                if (error) throw error;
                alert('Anúncio atualizado com sucesso!');
                onFinalizarEdicao?.();

                // Refresh the page or the list? 
                // Since it's in a shared page state, it might need a way to tell the list to reload.
                // For now, let's just navigate to clear state or use window.location.reload()
                window.location.reload();
            } else {
                const { error } = await supabase
                    .from('anuncios')
                    .insert([anuncioData]);

                if (error) throw error;

                navigate('/anuncio-success', {
                    state: {
                        name: formData.full_name,
                        category: formData.category,
                        titulo: formData.titulo,
                        phone: formData.phone
                    }
                });
            }

        } catch (error: any) {
            alert('Erro ao processar anúncio: ' + error.message);
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
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-primary">
                        <Tag size={24} />
                        <h2 className="text-xl font-bold">
                            {isEditing ? 'Editar Anúncio' : 'Detalhes do Anúncio'}
                        </h2>
                    </div>
                    {isEditing && (
                        <button
                            type="button"
                            onClick={onFinalizarEdicao}
                            className="text-sm font-bold text-gray-500 hover:text-red-500 transition-colors"
                        >
                            Cancelar Edição
                        </button>
                    )}
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

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Avatar Upload */}
                    <div>
                        <label className="block text-sm font-bold mb-2">Foto de Perfil</label>
                        <div className="mt-2 flex items-center gap-4">
                            <div className="relative size-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100 dark:bg-gray-800 shrink-0">
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <User size={32} />
                                    </div>
                                )}
                                {uploadingAvatar && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <Loader2 className="animate-spin text-white" size={20} />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <label className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm">
                                    <Camera className="w-4 h-4 mr-2" />
                                    <span>Alterar Foto</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                                </label>
                                <p className="text-[10px] text-gray-400 mt-2">Esta foto aparecerá circular no seu perfil.</p>
                            </div>
                        </div>
                    </div>

                    {/* Banner Upload */}
                    <div>
                        <label className="block text-sm font-bold mb-2">Banner do Perfil</label>
                        <div className="mt-2">
                            {!bannerPreview ? (
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Camera className="w-8 h-8 mb-2 text-gray-400" />
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center px-4">
                                            <span className="font-semibold">Banner Retangular</span><br />Clique para enviar a foto de capa
                                        </p>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleBannerChange} />
                                </label>
                            ) : (
                                <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-inner group">
                                    <img src={bannerPreview} alt="Banner Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <label className="p-2 bg-white text-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 transition-all scale-75 group-hover:scale-100 duration-200">
                                            <Camera size={20} />
                                            <input type="file" className="hidden" accept="image/*" onChange={handleBannerChange} />
                                        </label>
                                        <button type="button" onClick={removeBanner} className="ml-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all scale-75 group-hover:scale-100 duration-200">
                                            <X size={20} />
                                        </button>
                                    </div>
                                    {uploadingBanner && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                            <Loader2 className="animate-spin text-white" size={24} />
                                        </div>
                                    )}
                                </div>
                            )}
                            <p className="text-[10px] text-gray-400 mt-2 text-right">Esta foto ficará como fundo retangular no topo.</p>
                        </div>
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
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            disabled={isEditing}
                            className={`w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white appearance-none h-[52px] ${isEditing ? 'opacity-60 cursor-not-allowed bg-gray-50' : ''}`}
                            required
                        >
                            <option value="">Selecione uma categoria principal...</option>
                            {serviceCategories.map((group) => (
                                <optgroup key={group.group} label={group.group}>
                                    {group.items.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                        {isEditing && (
                            <p className="text-xs text-gray-400 mt-1 italic">
                                Para alterar a categoria, crie um novo anúncio.
                            </p>
                        )}
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
                        {uploadingBanner || uploadingAvatar ? 'Enviando imagens...' : (isEditing ? 'Salvando alterações...' : 'Publicando...')}
                    </>
                ) : (
                    isEditing ? 'Salvar Alterações' : 'Publicar Anúncio'
                )}
            </button>
        </form>
    );
}
