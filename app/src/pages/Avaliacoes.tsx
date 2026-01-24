import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Star, Loader2, ArrowLeft, TrendingUp } from 'lucide-react';

interface Review {
    id: string;
    reviewer_id: string;
    rating: number;
    comment: string;
    created_at: string;
    reviewer_name?: string;
    anuncio_titulo?: string;
}

export default function Avaliacoes() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [averageRating, setAverageRating] = useState(0);
    const [ratingDistribution, setRatingDistribution] = useState<{ [key: number]: number }>({
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
    });

    useEffect(() => {
        if (user) {
            loadReviews();
        }
    }, [user]);

    const loadReviews = async () => {
        try {
            const { data, error } = await supabase
                .from('reviews')
                .select(`
                    *,
                    reviewer:reviewer_id(email),
                    anuncio:anuncio_id(titulo)
                `)
                .eq('professional_id', user?.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            const reviewsData = data?.map((review: any) => ({
                id: review.id,
                reviewer_id: review.reviewer_id,
                rating: review.rating,
                comment: review.comment,
                created_at: review.created_at,
                reviewer_name: review.reviewer?.email?.split('@')[0] || 'Anônimo',
                anuncio_titulo: review.anuncio?.titulo || 'Serviço'
            })) || [];

            setReviews(reviewsData);

            // Calculate average rating
            if (reviewsData.length > 0) {
                const sum = reviewsData.reduce((acc, review) => acc + review.rating, 0);
                setAverageRating(sum / reviewsData.length);

                // Calculate distribution
                const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
                reviewsData.forEach((review) => {
                    dist[review.rating as keyof typeof dist]++;
                });
                setRatingDistribution(dist);
            }
        } catch (error) {
            console.error('Erro ao carregar avaliações:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={20}
                        className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                ))}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background-dark">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-background-dark py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/area-do-cliente')}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary mb-4"
                    >
                        <ArrowLeft size={20} />
                        <span>Voltar</span>
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Avaliações</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Veja o feedback dos seus clientes</p>
                </div>

                {/* Stats Card */}
                <div className="bg-white dark:bg-[#1a2027] rounded-2xl shadow-lg p-8 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Average Rating */}
                        <div className="text-center">
                            <div className="text-5xl font-bold text-primary mb-2">
                                {averageRating.toFixed(1)}
                            </div>
                            <div className="flex justify-center mb-2">
                                {renderStars(Math.round(averageRating))}
                            </div>
                            <p className="text-gray-500 dark:text-gray-400">
                                {reviews.length} {reviews.length === 1 ? 'avaliação' : 'avaliações'}
                            </p>
                        </div>

                        {/* Rating Distribution */}
                        <div className="col-span-2">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Distribuição</h3>
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <div key={rating} className="flex items-center gap-3 mb-2">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-8">
                                        {rating} ★
                                    </span>
                                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-yellow-400 h-2 rounded-full transition-all"
                                            style={{
                                                width: `${reviews.length > 0 ? (ratingDistribution[rating] / reviews.length) * 100 : 0}%`
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                                        {ratingDistribution[rating]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                    {reviews.length === 0 ? (
                        <div className="bg-white dark:bg-[#1a2027] rounded-2xl shadow-lg p-12 text-center">
                            <Star className="mx-auto mb-4 text-gray-400" size={64} />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                Nenhuma avaliação ainda
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Quando você receber avaliações, elas aparecerão aqui
                            </p>
                        </div>
                    ) : (
                        reviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-white dark:bg-[#1a2027] rounded-2xl shadow-lg p-6"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                                {(review.reviewer_name || 'A').charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 dark:text-white">
                                                    {review.reviewer_name}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(review.created_at).toLocaleDateString('pt-BR')}
                                                </p>
                                            </div>
                                        </div>
                                        {renderStars(review.rating)}
                                    </div>
                                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full">
                                        {review.anuncio_titulo}
                                    </span>
                                </div>
                                {review.comment && (
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        "{review.comment}"
                                    </p>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
