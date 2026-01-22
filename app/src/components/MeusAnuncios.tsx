import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Anuncio {
    id: string;
    titulo: string;
    preco: number;
}

export default function MeusAnuncios() {
    const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser();
            setUserId(user?.id || null);
        }
        getUser();
    }, []);

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
        return (
            <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-lg">
                Faça login para ver seus anúncios.
            </div>
        );
    }

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 dark:text-white text-[#111417]">Meus Anúncios</h2>
            <div className="space-y-4">
                {anuncios.length === 0 && <p className="text-gray-500 dark:text-gray-400">Nenhum anúncio encontrado.</p>}
                {anuncios.map(anuncio => (
                    <div key={anuncio.id} className="p-4 border rounded-xl shadow-sm bg-white dark:bg-[#1a2027] dark:border-gray-700 dark:text-white flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg">{anuncio.titulo}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">ID: {anuncio.id.slice(0, 8)}...</p>
                        </div>
                        <p className="text-green-600 dark:text-green-400 font-bold text-lg">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(anuncio.preco)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
