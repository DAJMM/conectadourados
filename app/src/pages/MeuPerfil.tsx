import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { User, Mail, Phone, Camera, Loader2, Save, ArrowLeft } from 'lucide-react';

interface ProfileData {
    full_name: string;
    email: string;
    avatar_url: string | null;
}

export default function MeuPerfil() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [profileData, setProfileData] = useState<ProfileData>({
        full_name: '',
        email: '',
        avatar_url: null
    });

    useEffect(() => {
        if (user) {
            loadProfile();
        }
    }, [user]);

    const loadProfile = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user?.id)
                .single();

            if (error) throw error;

            if (data) {
                setProfileData({
                    full_name: data.full_name || '',
                    email: data.email || user?.email || '',
                    avatar_url: data.avatar_url
                });
            }
        } catch (error) {
            console.error('Erro ao carregar perfil:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        setUploadingAvatar(true);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
            const filePath = `avatars/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            setProfileData(prev => ({ ...prev, avatar_url: data.publicUrl }));
        } catch (error: any) {
            alert('Erro ao fazer upload da foto: ' + error.message);
        } finally {
            setUploadingAvatar(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);

        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: profileData.full_name,
                    email: profileData.email,
                    avatar_url: profileData.avatar_url,
                    updated_at: new Date().toISOString()
                })
                .eq('id', user?.id);

            if (error) throw error;

            alert('Perfil atualizado com sucesso!');
        } catch (error: any) {
            alert('Erro ao salvar perfil: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background-dark">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-background-dark py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/area-do-cliente')}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary mb-4"
                    >
                        <ArrowLeft size={20} />
                        <span>Voltar</span>
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Meu Perfil</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Atualize suas informações pessoais</p>
                </div>

                {/* Avatar Section */}
                <div className="bg-white dark:bg-[#1a2027] rounded-2xl shadow-lg p-8 mb-6">
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                                {profileData.avatar_url ? (
                                    <img
                                        src={profileData.avatar_url}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-4xl font-bold">
                                        {profileData.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary-light transition-colors shadow-lg">
                                <Camera size={20} />
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    disabled={uploadingAvatar}
                                />
                            </label>
                        </div>
                        {uploadingAvatar && (
                            <p className="mt-4 text-sm text-gray-500">Enviando foto...</p>
                        )}
                    </div>
                </div>

                {/* Profile Form */}
                <div className="bg-white dark:bg-[#1a2027] rounded-2xl shadow-lg p-8">
                    <div className="space-y-6">
                        {/* Nome Completo */}
                        <div>
                            <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                                Nome Completo
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    value={profileData.full_name}
                                    onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                                    placeholder="Seu nome completo"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                                E-mail
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                                    placeholder="seu@email.com"
                                />
                            </div>
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-primary-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    <Save size={20} />
                                    Salvar Alterações
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
