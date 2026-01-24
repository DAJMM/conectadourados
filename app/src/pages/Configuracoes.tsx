import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Settings as SettingsIcon, Loader2, ArrowLeft, Save, Bell, Mail, Smartphone, TrendingUp } from 'lucide-react';

interface UserSettings {
    email_notifications: boolean;
    sms_notifications: boolean;
    push_notifications: boolean;
    marketing_emails: boolean;
}

export default function Configuracoes() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState<UserSettings>({
        email_notifications: true,
        sms_notifications: false,
        push_notifications: true,
        marketing_emails: true
    });

    useEffect(() => {
        if (user) {
            loadSettings();
        }
    }, [user]);

    const loadSettings = async () => {
        try {
            const { data, error } = await supabase
                .from('user_settings')
                .select('*')
                .eq('id', user?.id)
                .single();

            if (error && error.code !== 'PGRST116') throw error;

            if (data) {
                setSettings({
                    email_notifications: data.email_notifications,
                    sms_notifications: data.sms_notifications,
                    push_notifications: data.push_notifications,
                    marketing_emails: data.marketing_emails
                });
            } else {
                // Create default settings
                await createDefaultSettings();
            }
        } catch (error) {
            console.error('Erro ao carregar configurações:', error);
        } finally {
            setLoading(false);
        }
    };

    const createDefaultSettings = async () => {
        try {
            const { error } = await supabase
                .from('user_settings')
                .insert({
                    id: user?.id,
                    ...settings
                });

            if (error) throw error;
        } catch (error) {
            console.error('Erro ao criar configurações padrão:', error);
        }
    };

    const handleSave = async () => {
        setSaving(true);

        try {
            const { error } = await supabase
                .from('user_settings')
                .upsert({
                    id: user?.id,
                    ...settings,
                    updated_at: new Date().toISOString()
                });

            if (error) throw error;

            alert('Configurações salvas com sucesso!');
        } catch (error: any) {
            alert('Erro ao salvar configurações: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    const toggleSetting = (key: keyof UserSettings) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
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
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Configurações</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Ajuste suas preferências de conta</p>
                </div>

                {/* Settings Sections */}
                <div className="space-y-6">
                    {/* Notifications Section */}
                    <div className="bg-white dark:bg-[#1a2027] rounded-2xl shadow-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Bell className="text-primary" size={24} />
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notificações</h2>
                        </div>

                        <div className="space-y-4">
                            {/* Email Notifications */}
                            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Mail className="text-gray-400" size={20} />
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            Notificações por E-mail
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Receba atualizações importantes por e-mail
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleSetting('email_notifications')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.email_notifications ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.email_notifications ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>

                            {/* SMS Notifications */}
                            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Smartphone className="text-gray-400" size={20} />
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            Notificações por SMS
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Receba mensagens importantes no celular
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleSetting('sms_notifications')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.sms_notifications ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.sms_notifications ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>

                            {/* Push Notifications */}
                            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Bell className="text-gray-400" size={20} />
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            Notificações Push
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Receba notificações no navegador
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleSetting('push_notifications')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.push_notifications ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.push_notifications ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Marketing Section */}
                    <div className="bg-white dark:bg-[#1a2027] rounded-2xl shadow-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingUp className="text-primary" size={24} />
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Marketing</h2>
                        </div>

                        <div className="space-y-4">
                            {/* Marketing Emails */}
                            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Mail className="text-gray-400" size={20} />
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            E-mails Promocionais
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Receba ofertas e novidades
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleSetting('marketing_emails')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.marketing_emails ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.marketing_emails ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
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
                                Salvar Configurações
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
