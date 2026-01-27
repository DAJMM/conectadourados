import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Anuncio {
    id: string;
    titulo: string;
    preco: number;
    preco_a_combinar?: boolean;
    imagem_url?: string;
    // Adicionando outros campos para preencher o formulário de edição
    nome_prestador?: string;
    email_contato?: string;
    telefone?: string;
    categoria?: string;
    anos_experiencia?: number;
    areas_atendimento?: string;
    descricao?: string;
    instagram?: string;
    website?: string;
    status?: 'pending' | 'approved' | 'rejected';
    avatar_url?: string;
    profiles?: {
        avatar_url: string | null;
    };
}

interface MeusAnunciosProps {
    onEditar?: (anuncio: Anuncio) => void;
}

export default function MeusAnuncios({ onEditar }: MeusAnunciosProps) {
    const { user } = useAuth();
    const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
    const userId = user?.id;

    const carregarAnuncios = async () => {
        if (!userId) {
            console.log('[MeusAnuncios] No userId, skipping fetch');
            return;
        }

        try {
            console.log('[MeusAnuncios] Fetching ads for user:', userId);
            const { data, error } = await supabase
                .from('anuncios')
                .select('*, profiles(avatar_url)')
                .eq('usuario_id', userId)
                .order('criado_em', { ascending: false });

            if (error) {
                console.error('[MeusAnuncios] Error fetching ads:', error);
                return;
            }

            console.log('[MeusAnuncios] Ads fetched:', data?.length || 0);
            if (data) setAnuncios(data);
        } catch (error) {
            console.error('[MeusAnuncios] Unexpected error:', error);
        }
    };

    useEffect(() => {
        carregarAnuncios();
    }, [userId]);

    const handleExcluir = async (id: string, titulo: string) => {
        if (!window.confirm(`Tem certeza que deseja excluir o anúncio "${titulo}"?`)) {
            return;
        }

        try {
            const { error } = await supabase
                .from('anuncios')
                .delete()
                .eq('id', id)
                .eq('usuario_id', userId); // Security check

            if (error) {
                alert('Erro ao excluir anúncio: ' + error.message);
                return;
            }

            // Update local state
            setAnuncios(prev => prev.filter(a => a.id !== id));
            alert('Anúncio excluído com sucesso!');
        } catch (error: any) {
            alert('Erro inesperado: ' + error.message);
        }
    };

    if (!userId) {
        return null;
    }

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 dark:text-white text-[#111417]">Meus Anúncios</h2>
            <div className="space-y-4">
                {anuncios.length === 0 && <p className="text-gray-500 dark:text-gray-400">Nenhum anúncio encontrado.</p>}
                {anuncios.map(anuncio => (
                    <div key={anuncio.id} className="p-4 border rounded-xl shadow-sm bg-white dark:bg-[#1a2027] dark:border-gray-700 dark:text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:shadow-md">
                        <div className="flex items-center gap-4">
                            {(anuncio.avatar_url || anuncio.profiles?.avatar_url) ? (
                                <img src={anuncio.avatar_url || anuncio.profiles?.avatar_url || ''} alt={anuncio.titulo} className="w-16 h-16 object-cover rounded-full border-2 border-primary/10 bg-gray-100 dark:bg-gray-800" />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined">person</span>
                                </div>
                            )}
                            <div>
                                <h3 className="font-bold text-lg">{anuncio.titulo}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">ID: {anuncio.id.slice(0, 8)}...</p>
                                    {anuncio.status === 'pending' && (
                                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded-full uppercase tracking-wider border border-yellow-200">
                                            Aguardando Aprovação
                                        </span>
                                    )}
                                    {anuncio.status === 'approved' && (
                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wider border border-green-200">
                                            Ativo
                                        </span>
                                    )}
                                    {anuncio.status === 'rejected' && (
                                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded-full uppercase tracking-wider border border-red-200">
                                            Recusado
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                            <p className="text-green-600 dark:text-green-400 font-bold text-lg whitespace-nowrap">
                                {anuncio.preco_a_combinar || anuncio.preco <= 0
                                    ? 'A Combinar'
                                    : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(anuncio.preco)
                                }
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onEditar?.(anuncio)}
                                    className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                    title="Editar Anúncio"
                                >
                                    <span className="material-symbols-outlined">edit</span>
                                </button>
                                <button
                                    onClick={() => handleExcluir(anuncio.id, anuncio.titulo)}
                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    title="Excluir Anúncio"
                                >
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
