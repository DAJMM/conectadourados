import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { supabase } from '../../lib/supabase';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    Star,
    Phone,
    Mail,
    MapPin,
    Briefcase,
    DollarSign,
    AlertCircle,
    Loader2
} from 'lucide-react';

interface Professional {
    id: string;
    full_name: string;
    email: string;
    phone: string | null;
    profession: string;
    specialties: string[] | null;
    description: string | null;
    experience_years: number | null;
    hourly_rate: number | null;
    avatar_url: string | null;
    address_city: string | null;
    is_active: boolean;
    is_verified: boolean;
    rating: number | null;
    total_reviews: number | null;
    created_at: string;
}

export default function Professionals() {
    const [professionals, setProfessionals] = useState<Professional[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingProfessional, setEditingProfessional] = useState<Professional | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        profession: '',
        specialties: '',
        description: '',
        experience_years: '',
        hourly_rate: '',
        address_city: 'Dourados',
        is_active: true,
        is_verified: false,
    });

    useEffect(() => {
        fetchProfessionals();
    }, []);

    const fetchProfessionals = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('professionals')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProfessionals(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const professionalData = {
                full_name: formData.full_name,
                email: formData.email,
                phone: formData.phone || null,
                profession: formData.profession,
                specialties: formData.specialties ? formData.specialties.split(',').map(s => s.trim()) : null,
                description: formData.description || null,
                experience_years: formData.experience_years ? parseInt(formData.experience_years) : null,
                hourly_rate: formData.hourly_rate ? parseFloat(formData.hourly_rate) : null,
                address_city: formData.address_city,
                is_active: formData.is_active,
                is_verified: formData.is_verified,
            };

            if (editingProfessional) {
                // Update
                const { error } = await supabase
                    .from('professionals')
                    .update(professionalData)
                    .eq('id', editingProfessional.id);

                if (error) throw error;
                setSuccess('Profissional atualizado com sucesso!');
            } else {
                // Insert
                const { error } = await supabase
                    .from('professionals')
                    .insert([professionalData]);

                if (error) throw error;
                setSuccess('Profissional cadastrado com sucesso!');
            }

            setShowModal(false);
            resetForm();
            fetchProfessionals();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido');
        }
    };

    const handleEdit = (professional: Professional) => {
        setEditingProfessional(professional);
        setFormData({
            full_name: professional.full_name,
            email: professional.email,
            phone: professional.phone || '',
            profession: professional.profession,
            specialties: professional.specialties?.join(', ') || '',
            description: professional.description || '',
            experience_years: professional.experience_years?.toString() || '',
            hourly_rate: professional.hourly_rate?.toString() || '',
            address_city: professional.address_city || 'Dourados',
            is_active: professional.is_active,
            is_verified: professional.is_verified,
        });
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este profissional?')) return;

        try {
            const { error } = await supabase
                .from('professionals')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setSuccess('Profissional excluído com sucesso!');
            fetchProfessionals();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido');
        }
    };

    const toggleStatus = async (professional: Professional) => {
        try {
            const { error } = await supabase
                .from('professionals')
                .update({ is_active: !professional.is_active })
                .eq('id', professional.id);

            if (error) throw error;
            setSuccess(`Profissional ${!professional.is_active ? 'ativado' : 'desativado'} com sucesso!`);
            fetchProfessionals();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido');
        }
    };

    const resetForm = () => {
        setFormData({
            full_name: '',
            email: '',
            phone: '',
            profession: '',
            specialties: '',
            description: '',
            experience_years: '',
            hourly_rate: '',
            address_city: 'Dourados',
            is_active: true,
            is_verified: false,
        });
        setEditingProfessional(null);
    };

    const filteredProfessionals = professionals.filter(p =>
        p.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.profession.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Gestão de Profissionais</h1>
                    <p className="text-gray-600 mt-1">Gerencie os profissionais cadastrados na plataforma</p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
                >
                    <Plus className="w-5 h-5" />
                    Novo Profissional
                </button>
            </div>

            {/* Success/Error Messages */}
            {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-green-800">{success}</p>
                </div>
            )}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{error}</p>
                </div>
            )}

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar por nome, e-mail ou profissão..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Professionals List */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
            ) : filteredProfessionals.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Nenhum profissional encontrado</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredProfessionals.map((professional) => (
                        <div
                            key={professional.id}
                            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex flex-col lg:flex-row justify-between gap-4">
                                {/* Info */}
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{professional.full_name}</h3>
                                            <p className="text-blue-600 font-medium">{professional.profession}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            {professional.is_verified && (
                                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Verificado
                                                </span>
                                            )}
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${professional.is_active
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {professional.is_active ? 'Ativo' : 'Inativo'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            {professional.email}
                                        </div>
                                        {professional.phone && (
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                                {professional.phone}
                                            </div>
                                        )}
                                        {professional.address_city && (
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-gray-400" />
                                                {professional.address_city}
                                            </div>
                                        )}
                                        {professional.hourly_rate && (
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-4 h-4 text-gray-400" />
                                                R$ {professional.hourly_rate.toFixed(2)}/hora
                                            </div>
                                        )}
                                    </div>

                                    {professional.specialties && professional.specialties.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {professional.specialties.map((specialty, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">
                                                    {specialty}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {professional.rating && professional.rating > 0 && (
                                        <div className="flex items-center gap-2">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <span className="font-medium">{professional.rating.toFixed(1)}</span>
                                            <span className="text-gray-500 text-sm">({professional.total_reviews} avaliações)</span>
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex lg:flex-col gap-2">
                                    <button
                                        onClick={() => handleEdit(professional)}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                        <span className="hidden sm:inline">Editar</span>
                                    </button>
                                    <button
                                        onClick={() => toggleStatus(professional)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${professional.is_active
                                            ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                                            }`}
                                    >
                                        {professional.is_active ? (
                                            <>
                                                <XCircle className="w-4 h-4" />
                                                <span className="hidden sm:inline">Desativar</span>
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="w-4 h-4" />
                                                <span className="hidden sm:inline">Ativar</span>
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(professional.id)}
                                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span className="hidden sm:inline">Excluir</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {editingProfessional ? 'Editar Profissional' : 'Novo Profissional'}
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nome Completo *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.full_name}
                                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        E-mail *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Telefone
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="(67) 99999-9999"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Profissão *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.profession}
                                        onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                                        placeholder="Ex: Eletricista"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Cidade
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.address_city}
                                        onChange={(e) => setFormData({ ...formData, address_city: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Especialidades (separadas por vírgula)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.specialties}
                                        onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                                        placeholder="Ex: Instalação Elétrica, Manutenção"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Anos de Experiência
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.experience_years}
                                        onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Valor por Hora (R$)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.hourly_rate}
                                        onChange={(e) => setFormData({ ...formData, hourly_rate: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Descrição
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.is_active}
                                            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                        />
                                        <span className="text-sm font-medium text-gray-700">Ativo</span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.is_verified}
                                            onChange={(e) => setFormData({ ...formData, is_verified: e.target.checked })}
                                            className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                                        />
                                        <span className="text-sm font-medium text-gray-700">Verificado</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        resetForm();
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
                                >
                                    {editingProfessional ? 'Atualizar' : 'Cadastrar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
