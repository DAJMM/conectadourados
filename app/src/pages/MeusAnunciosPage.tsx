import { useState, useRef } from 'react';
import CriarAnuncio from '../components/CriarAnuncio';
import MeusAnuncios from '../components/MeusAnuncios';

export default function MeusAnunciosPage() {
    const [anuncioParaEditar, setAnuncioParaEditar] = useState<any>(null);
    const formRef = useRef<HTMLDivElement>(null);

    const handleEditar = (anuncio: any) => {
        setAnuncioParaEditar(anuncio);
        // Scroll smoothly to the form
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleFinalizarEdicao = () => {
        setAnuncioParaEditar(null);
    };

    return (
        <div className="bg-[#f0f2f4] dark:bg-background-dark min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-display">
            <div className="max-w-3xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-[#111417] dark:text-white mb-2">Área do Anunciante</h1>
                    <p className="text-[#647587] dark:text-gray-400">
                        Gerencie seus anúncios classificados aqui.
                    </p>
                </div>

                <div ref={formRef}>
                    <CriarAnuncio
                        anuncioParaEditar={anuncioParaEditar}
                        onFinalizarEdicao={handleFinalizarEdicao}
                    />
                </div>

                <MeusAnuncios onEditar={handleEditar} />
            </div>
        </div>
    );
}
