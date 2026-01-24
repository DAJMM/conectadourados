import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { MessageCircle, Send, Loader2, ArrowLeft, User as UserIcon } from 'lucide-react';

interface Message {
    id: string;
    sender_id: string;
    receiver_id: string;
    message: string;
    read: boolean;
    created_at: string;
    sender_name?: string;
    receiver_name?: string;
}

interface Conversation {
    user_id: string;
    user_name: string;
    last_message: string;
    last_message_time: string;
    unread_count: number;
}

export default function Mensagens() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false);

    useEffect(() => {
        if (user) {
            loadConversations();
        }
    }, [user]);

    useEffect(() => {
        if (selectedConversation) {
            loadMessages(selectedConversation);
            markAsRead(selectedConversation);
        }
    }, [selectedConversation]);

    const loadConversations = async () => {
        try {
            // Get all messages where user is sender or receiver
            const { data: allMessages, error } = await supabase
                .from('messages')
                .select(`
                    *,
                    sender:sender_id(id, email),
                    receiver:receiver_id(id, email)
                `)
                .or(`sender_id.eq.${user?.id},receiver_id.eq.${user?.id}`)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Group by conversation partner
            const conversationsMap = new Map<string, Conversation>();

            allMessages?.forEach((msg: any) => {
                const partnerId = msg.sender_id === user?.id ? msg.receiver_id : msg.sender_id;
                const partnerName = msg.sender_id === user?.id
                    ? msg.receiver?.email?.split('@')[0]
                    : msg.sender?.email?.split('@')[0];

                if (!conversationsMap.has(partnerId)) {
                    conversationsMap.set(partnerId, {
                        user_id: partnerId,
                        user_name: partnerName || 'Usuário',
                        last_message: msg.message,
                        last_message_time: msg.created_at,
                        unread_count: 0
                    });
                }

                // Count unread messages
                if (!msg.read && msg.receiver_id === user?.id) {
                    const conv = conversationsMap.get(partnerId)!;
                    conv.unread_count++;
                }
            });

            setConversations(Array.from(conversationsMap.values()));
        } catch (error) {
            console.error('Erro ao carregar conversas:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadMessages = async (partnerId: string) => {
        try {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .or(`and(sender_id.eq.${user?.id},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${user?.id})`)
                .order('created_at', { ascending: true });

            if (error) throw error;
            setMessages(data || []);
        } catch (error) {
            console.error('Erro ao carregar mensagens:', error);
        }
    };

    const markAsRead = async (partnerId: string) => {
        try {
            await supabase
                .from('messages')
                .update({ read: true })
                .eq('receiver_id', user?.id)
                .eq('sender_id', partnerId);
        } catch (error) {
            console.error('Erro ao marcar como lido:', error);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim() || !selectedConversation) return;

        setSending(true);
        try {
            const { error } = await supabase
                .from('messages')
                .insert({
                    sender_id: user?.id,
                    receiver_id: selectedConversation,
                    message: newMessage.trim()
                });

            if (error) throw error;

            setNewMessage('');
            loadMessages(selectedConversation);
            loadConversations();
        } catch (error: any) {
            alert('Erro ao enviar mensagem: ' + error.message);
        } finally {
            setSending(false);
        }
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
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/area-do-cliente')}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary mb-4"
                    >
                        <ArrowLeft size={20} />
                        <span>Voltar</span>
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mensagens</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Converse com seus clientes</p>
                </div>

                {/* Messages Container */}
                <div className="bg-white dark:bg-[#1a2027] rounded-2xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
                        {/* Conversations List */}
                        <div className="border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
                            {conversations.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    <MessageCircle className="mx-auto mb-4" size={48} />
                                    <p>Nenhuma conversa ainda</p>
                                </div>
                            ) : (
                                conversations.map((conv) => (
                                    <div
                                        key={conv.user_id}
                                        onClick={() => setSelectedConversation(conv.user_id)}
                                        className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${selectedConversation === conv.user_id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                                {conv.user_name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-bold text-gray-900 dark:text-white truncate">
                                                        {conv.user_name}
                                                    </p>
                                                    {conv.unread_count > 0 && (
                                                        <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                                                            {conv.unread_count}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                    {conv.last_message}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Messages Area */}
                        <div className="col-span-2 flex flex-col">
                            {selectedConversation ? (
                                <>
                                    {/* Messages List */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                        {messages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-[70%] rounded-lg p-3 ${msg.sender_id === user?.id
                                                            ? 'bg-primary text-white'
                                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                                                        }`}
                                                >
                                                    <p>{msg.message}</p>
                                                    <p className="text-xs mt-1 opacity-70">
                                                        {new Date(msg.created_at).toLocaleTimeString('pt-BR', {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Message Input */}
                                    <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                                placeholder="Digite sua mensagem..."
                                                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                                            />
                                            <button
                                                onClick={sendMessage}
                                                disabled={sending || !newMessage.trim()}
                                                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {sending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex items-center justify-center text-gray-500">
                                    <div className="text-center">
                                        <MessageCircle className="mx-auto mb-4" size={64} />
                                        <p>Selecione uma conversa para começar</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
