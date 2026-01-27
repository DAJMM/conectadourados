import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
    CheckCircle,
    XCircle,
    Loader2,
    Megaphone,
    AlertCircle,
    Eye,
    MessageCircle,
    Trash2,
    Search
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Anuncio {
    id: string;
    titulo: string;
    nome_prestador: string;
    categoria: string;
    telefone: string;
    areas_atendimento: string;
    anos_experiencia: number;
    descricao: string;
    preco: number;
    criado_em: string;
    imagem_url?: string;
    status: 'pending' | 'approved' | 'rejected';
    email_contato: string;
    preco_a_combinar?: boolean;
    edit_history?: { date: string; description: string }[];
}

export default function AdApprovals() {
    const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [selectedAd, setSelectedAd] = useState<Anuncio | null>(null);

    useEffect(() => {
        fetchPendingAds();
    }, []);

    const fetchPendingAds = async () => {
        try {
            setLoading(true);
            const { data, error: adsError } = await supabase
                .from('anuncios')
                .select('*')
                .eq('status', 'pending')
                .order('criado_em', { ascending: false });

            if (adsError) throw adsError;
            setAnuncios(data || []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string) => {
        try {
            const { error: updateError } = await supabase
                .from('anuncios')
                .update({ status: 'approved' })
                .eq('id', id);

            if (updateError) throw updateError;

            setSuccess('Anúncio aprovado com sucesso!');
            setAnuncios(prev => prev.filter(ad => ad.id !== id));
            setSelectedAd(null);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleReject = async (id: string) => {
        if (!confirm('Tem certeza que deseja recusar este anúncio?')) return;

        try {
            const { error: updateError } = await supabase
                .from('anuncios')
                .update({ status: 'rejected' })
                .eq('id', id);

            if (updateError) throw updateError;

            setSuccess('Anúncio recusado.');
            setAnuncios(prev => prev.filter(ad => ad.id !== id));
            setSelectedAd(null);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Esta ação excluirá permanentemente o anúncio. Continuar?')) return;

        try {
            const { error: deleteError } = await supabase
                .from('anuncios')
                .delete()
                .eq('id', id);

            if (deleteError) throw deleteError;

            setSuccess('Anúncio excluído permanentemente.');
            setAnuncios(prev => prev.filter(ad => ad.id !== id));
        } catch (err: any) {
            setError(err.message);
        }
    };

    const filteredAds = anuncios.filter(ad =>
        ad.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.nome_prestador.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Aprovação de Anúncios</h1>
                    <p className="text-gray-600 mt-1">Revise e gerencie novas solicitações de anúncios</p>
                </div>
            </div>

            {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
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

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar por título, prestador ou categoria..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white shadow-sm"
                />
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-24">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
            ) : filteredAds.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium text-lg">Nenhuma solicitação pendente no momento</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredAds.map((ad) => (
                        <div
                            key={ad.id}
                            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all group"
                        >
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Preview Image/Avatar */}
                                <div className="w-full lg:w-48 h-48 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                                    {ad.imagem_url ? (
                                        <img src={ad.imagem_url} alt={ad.titulo} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <Megaphone className="w-12 h-12" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{ad.titulo}</h3>
                                            <p className="text-primary font-semibold">{ad.nome_prestador} • {ad.categoria}</p>
                                        </div>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">
                                            {formatDistanceToNow(new Date(ad.criado_em), { addSuffix: true, locale: ptBR })}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <MessageCircle className="w-4 h-4" />
                                            {ad.telefone}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4 text-gray-400" />
                                            {ad.anos_experiencia} anos de exp.
                                        </div>
                                        <div className="flex items-center gap-2 font-bold text-gray-900">
                                            {ad.preco_a_combinar ? 'A combinar' : `R$ ${ad.preco.toFixed(2)}`}
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-500 line-clamp-2 italic">
                                        "{ad.descricao}"
                                    </p>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        <button
                                            onClick={() => handleApprove(ad.id)}
                                            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold shadow-sm"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Aprovar
                                        </button>
                                        <button
                                            onClick={() => handleReject(ad.id)}
                                            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-semibold"
                                        >
                                            <XCircle className="w-4 h-4" />
                                            Recusar
                                        </button>
                                        <button
                                            onClick={() => setSelectedAd(ad)}
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold ml-auto"
                                        >
                                            <Eye className="w-4 h-4" />
                                            Detalhes
                                        </button>
                                        <button
                                            onClick={() => handleDelete(ad.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                            title="Excluir Permanentemente"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal de Detalhes (Simples) */}
            {selectedAd && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl">
                        <div className="aspect-video w-full bg-gray-100 relative">
                            {selectedAd.imagem_url ? (
                                <img src={selectedAd.imagem_url} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary/5">
                                    <Megaphone size={64} className="text-primary/20" />
                                </div>
                            )}
                            <button
                                onClick={() => setSelectedAd(null)}
                                className="absolute top-4 right-4 size-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                            >
                                <XCircle size={24} className="text-gray-900" />
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedAd.titulo}</h2>
                                    <p className="text-primary font-bold">{selectedAd.categoria}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-gray-400 uppercase">Preço</p>
                                    <p className="text-2xl font-black text-gray-900">
                                        {selectedAd.preco_a_combinar ? 'A combinar' : `R$ ${selectedAd.preco.toFixed(2)}`}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Descrição</h4>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedAd.descricao}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl">
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Prestador</h4>
                                        <p className="text-gray-900 font-bold">{selectedAd.nome_prestador}</p>
                                        <p className="text-sm text-gray-600">{selectedAd.email_contato}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Contato</h4>
                                        <p className="text-gray-900 font-bold">{selectedAd.telefone}</p>
                                        <p className="text-sm text-gray-600">{selectedAd.areas_atendimento}</p>
                                    </div>
                                </div>

                                {selectedAd.edit_history && selectedAd.edit_history.length > 0 && (
                                    <div className="border-t border-gray-100 pt-6">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                                            <Megaphone size={14} className="text-primary" />
                                            O que foi alterado nesta versão
                                        </h4>
                                        <div className="space-y-3">
                                            {selectedAd.edit_history.map((entry, idx) => (
                                                <div key={idx} className="bg-blue-50/50 border border-blue-100/50 rounded-xl p-4">
                                                    <p className="text-sm text-blue-900 leading-relaxed font-medium">
                                                        {entry.description}
                                                    </p>
                                                    <p className="text-[10px] text-blue-400 mt-2 font-bold uppercase tracking-wider">
                                                        {new Date(entry.date).toLocaleString('pt-BR')}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={() => handleApprove(selectedAd.id)}
                                        className="flex-1 py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-green-200"
                                    >
                                        Aprovar Anúncio
                                    </button>
                                    <button
                                        onClick={() => handleReject(selectedAd.id)}
                                        className="flex-1 py-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all"
                                    >
                                        Recusar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
