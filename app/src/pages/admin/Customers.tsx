import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { supabase } from '../../lib/supabase';
import {
    Search,
    Edit,
    Trash2,
    CheckCircle,
    AlertCircle,
    Loader2,
    User,
    Calendar,
    PenLine
} from 'lucide-react';

interface Customer {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
}

export default function Customers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        full_name: '',
        avatar_url: '',
    });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setCustomers(data || []);
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
            const customerData = {
                full_name: formData.full_name,
                avatar_url: formData.avatar_url || null,
                updated_at: new Date().toISOString(),
            };

            if (editingCustomer) {
                // Update
                const { error } = await supabase
                    .from('profiles')
                    .update(customerData)
                    .eq('id', editingCustomer.id);

                if (error) throw error;
                setSuccess('Cliente atualizado com sucesso!');
            } else {
                // In Supabase, usually profiles are created via Auth triggers.
                // Creating a profile manually here might not create the Auth user.
                // For "Client Management", usually we edit existing users.
                // If we want to create, we should probably use an invite system or Admin API to create Auth User.
                // For this UI, I will allow creating a profile ROW, but warn it doesn't create a login.
                // actually, let's just allow editing for now to avoid confusion, or assume standard insert.

                const { error } = await supabase
                    .from('profiles')
                    .insert([customerData]); // This will likely fail if no matching auth.uid or if id is auto-generated but not linked to auth.

                if (error) throw error;
                setSuccess('Perfil de cliente criado com sucesso (Nota: Isso não cria um usuário de login)!');
            }

            setShowModal(false);
            resetForm();
            fetchCustomers();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido');
        }
    };

    const handleEdit = (customer: Customer) => {
        setEditingCustomer(customer);
        setFormData({
            full_name: customer.full_name || '',
            avatar_url: customer.avatar_url || '',
        });
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este cliente? Isso excluirá apenas o perfil, não a conta de usuário (login).')) return;

        try {
            const { error } = await supabase
                .from('profiles')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setSuccess('Cliente excluído com sucesso!');
            fetchCustomers();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido');
        }
    };

    const resetForm = () => {
        setFormData({
            full_name: '',
            avatar_url: '',
        });
        setEditingCustomer(null);
    };

    const filteredCustomers = customers.filter(c =>
        (c.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Gestão de Clientes</h1>
                    <p className="text-gray-600 mt-1">Gerencie os usuários cadastrados na plataforma</p>
                </div>
                {/* 
                Creating users manually without Auth is tricky. 
                I'll hide the "New Customer" button for now or make it clear.
                Actually users usually sign up themselves.
                */}
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
                    placeholder="Buscar por nome..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Customers List */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
            ) : filteredCustomers.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Nenhum cliente encontrado</p>
                </div>
            ) : (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Data de Cadastro</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredCustomers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0 text-gray-500">
                                                {customer.avatar_url ? (
                                                    <img src={customer.avatar_url} alt={customer.full_name || 'Avatar'} className="w-full h-full object-cover" />
                                                ) : (
                                                    <User size={20} />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">{customer.full_name || 'Nome não informado'}</div>
                                                <div className="text-xs text-gray-500 font-mono mt-0.5 truncate max-w-[200px]">{customer.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar size={16} className="text-gray-400" />
                                            {new Date(customer.created_at).toLocaleDateString('pt-BR')}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(customer)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Editar"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(customer.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Excluir"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {editingCustomer ? 'Editar Cliente' : 'Novo Cliente'}
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nome Completo
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
                                    Avatar URL (Opcional)
                                </label>
                                <input
                                    type="text"
                                    value={formData.avatar_url}
                                    onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
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
                                    {editingCustomer ? 'Atualizar' : 'Criar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
