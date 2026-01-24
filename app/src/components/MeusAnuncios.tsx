import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Anuncio {
    id: string;
    titulo: string;
    preco: number;
    imagem_url?: string;
}

export default function MeusAnuncios() {
    const { user } = useAuth();
    const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
    const userId = user?.id;

    useEffect(() => {
        async function carregarAnuncios() {
            if (!userId) return;

            const { data } = await supabase
                .from('anuncios')
                .select('*')
                .eq('usuario_id', userId);

            if (data) setAnuncios(data);
        }
        carregarAnuncios();
    }, [userId]);

    if (!userId) {
        return null;
    }

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 dark:text-white text-[#111417]">Meus Anúncios</h2>
            <div className="space-y-4">
                {anuncios.length === 0 && <p className="text-gray-500 dark:text-gray-400">Nenhum anúncio encontrado.</p>}
                {anuncios.map(anuncio => (
                    <div key={anuncio.id} className="p-4 border rounded-xl shadow-sm bg-white dark:bg-[#1a2027] dark:border-gray-700 dark:text-white flex justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            {anuncio.imagem_url ? (
                                <img src={anuncio.imagem_url} alt={anuncio.titulo} className="w-16 h-16 object-cover rounded-lg bg-gray-100 dark:bg-gray-800" />
                            ) : (
                                <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                                    <span className="material-symbols-outlined">image_not_supported</span>
                                </div>
                            )}
                            <div>
                                <h3 className="font-bold text-lg">{anuncio.titulo}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">ID: {anuncio.id.slice(0, 8)}...</p>
                            </div>
                        </div>
                        <p className="text-green-600 dark:text-green-400 font-bold text-lg whitespace-nowrap">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(anuncio.preco)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
