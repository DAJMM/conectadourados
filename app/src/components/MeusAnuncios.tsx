import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Anuncio {
    id: string;
    titulo: string;
    preco: number;
    imagem_url?: string;
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
            <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-yellow-800 dark:text-yellow-500">
                    <span className="material-symbols-outlined text-2xl">lock</span>
                    <div>
                        <p className="font-bold">Faça login para ver seus anúncios</p>
                        <p className="text-sm opacity-80">Você precisa estar conectado para gerenciar suas publicações.</p>
                    </div>
                </div>
                <Link to="/login" className="bg-white dark:bg-gray-800 text-yellow-800 dark:text-yellow-500 font-bold px-6 py-2 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap">
                    Fazer Login
                </Link>
            </div>
        );
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
