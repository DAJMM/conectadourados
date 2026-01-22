import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function CriarAnuncio() {
    const [titulo, setTitulo] = useState('');
    const [preco, setPreco] = useState('');
    const [loading, setLoading] = useState(false);

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
                        titulo,
                        preco: parseFloat(preco),
                        usuario_id: user.id
                    }
                ]);

            if (error) throw error;

            alert('Anúncio publicado com sucesso!');
            setTitulo('');
            setPreco('');
        } catch (error: any) {
            alert('Erro ao anunciar: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 border rounded-xl shadow-sm bg-white dark:bg-[#1a2027] dark:border-gray-700">
            <h2 className="text-lg font-bold mb-4 dark:text-white text-[#111417]">Novo Anúncio</h2>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2 dark:text-gray-300">Título</label>
                <input
                    type="text"
                    placeholder="Ex: Encanador 24h"
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                    className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                    required
                />
            </div>
            <div className="mb-6">
                <label className="block text-sm font-bold mb-2 dark:text-gray-300">Preço (R$)</label>
                <input
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    value={preco}
                    onChange={e => setPreco(e.target.value)}
                    className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white font-bold p-3 rounded-xl w-full hover:bg-primary-light disabled:opacity-50 transition-colors"
            >
                {loading ? 'Publicando...' : 'Publicar Anúncio'}
            </button>
        </form>
    );
}
