import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export type UserRole = 'admin' | 'user' | null;

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    role: UserRole;
    signUp: (email: string, password: string, metadata?: any) => Promise<{ error: AuthError | null }>;
    signIn: (email: string, password: string) => Promise<{ error: AuthError | null; role?: UserRole }>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
    fetchUserRole: (userId: string) => Promise<UserRole>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState<UserRole>(null);

    const fetchUserRole = async (userId: string): Promise<UserRole> => {
        try {
            console.log('[AuthContext] Fetching role for user:', userId);

            const { data, error } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('[AuthContext] Error fetching user role:', error);
                // Se o perfil não existir, retornar 'user' como padrão
                if (error.code === 'PGRST116') {
                    console.warn('[AuthContext] Profile not found, defaulting to user role');
                }
                return 'user';
            }

            const userRole = (data?.role as UserRole) || 'user';
            console.log('[AuthContext] User role fetched:', userRole);
            return userRole;
        } catch (error) {
            console.error('[AuthContext] Exception fetching user role:', error);
            return 'user';
        }
    };

    useEffect(() => {
        console.log('[AuthContext] Initializing auth state');

        // Get initial session
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            console.log('[AuthContext] Initial session:', session ? 'exists' : 'null');
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                console.log('[AuthContext] Fetching role for initial session');
                const userRole = await fetchUserRole(session.user.id);
                setRole(userRole);
            }

            console.log('[AuthContext] Setting loading to false');
            setLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
            console.log('[AuthContext] Auth state changed:', _event, session ? 'session exists' : 'no session');
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                console.log('[AuthContext] Fetching role after auth change');
                const userRole = await fetchUserRole(session.user.id);
                setRole(userRole);
            } else {
                setRole(null);
            }

            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signUp = async (email: string, password: string, metadata?: any) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata,
            },
        });
        return { error };
    };

    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return { error };
        }

        // Fetch user role after successful login
        if (data.user) {
            const userRole = await fetchUserRole(data.user.id);
            setRole(userRole);
            return { error: null, role: userRole };
        }

        return { error: null, role: 'user' as UserRole };
    };

    const signOut = async () => {
        try {
            await supabase.auth.signOut();
        } finally {
            setRole(null);
            setUser(null);
            setSession(null);
        }
    };

    const resetPassword = async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        return { error };
    };

    const value = {
        user,
        session,
        loading,
        role,
        signUp,
        signIn,
        signOut,
        resetPassword,
        fetchUserRole,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
