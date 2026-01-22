import CriarAnuncio from '../components/CriarAnuncio';
import MeusAnuncios from '../components/MeusAnuncios';

export default function MeusAnunciosPage() {
    return (
        <div className="bg-[#f0f2f4] dark:bg-background-dark min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-display">
            <div className="max-w-3xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-[#111417] dark:text-white mb-2">Área do Anunciante</h1>
                    <p className="text-[#647587] dark:text-gray-400">
                        Gerencie seus anúncios classificados aqui.
                    </p>
                </div>

                <CriarAnuncio />
                <MeusAnuncios />
            </div>
        </div>
    );
}
