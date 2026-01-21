export interface Review {
    id: number;
    author: string;
    avatar: string; // URL for the avatar image
    rating: number; // 1-5
    text: string;
}

export interface Professional {
    id: string; // e.g., 'carlos', 'joao'
    name: string;
    role: string;
    location: string;
    phone: string;
    avatar: string;
    heroImage?: string; // Optional hero background image
    verified: boolean;
    rating: number;
    reviewCount: number;
    type: 'standard' | 'premium'; // To differentiate layouts

    // Specific fields
    bio?: string;
    experience?: string; // e.g. "10+ anos"

    // Premium specific
    promoBanner?: {
        title: string;
        description: string;
        discountText: string;
        image: string;
    };

    instagramImages?: string[];

    reviews: Review[];

    stats?: {
        label: string;
        icon: string;
        value: string;
    }[];
}

export const professionalsData: Professional[] = [
    {
        id: 'carlos',
        name: 'Carlos Silva',
        role: 'Eletricista Residencial e Industrial',
        location: 'Dourados, MS',
        phone: '(67) 99654-3210',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-jWa7aaFF8uVBitRJe5Bh9ULHKORLDGRTd_rB6Gs3AKb3WiRbuU9jYahUVUtI3CZu9UyESVxoP0IXlYIWz6i789xQbzJ56HTtSUKLNd_dXqthSiGMvUh5s7FAFIL-XiN9G5K71UigqZG6hqlwWNeU64WiYWM6GYhJj7oZlAQztzfge0Yj3EvU5f2aQxeLIHaO8H3M-n4vOcZSKI4k-QfEtOGqOChwu-hEMhkhkxD7gFWhxgfMLnR7c5PJSPjv6KeF4_F-1RuJLiJj',
        heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyG86Ga6yCGV6TQ_v5IJC-wAFp2JtduoeSNXczXQIacoA1e2iFrQBya1VrYZosdUaX8F9uJhS_UeMebzhZbbVHEUlisoFAPCwpIvA5Zq06O-srAO78NSLrcNWJLiwYFkToIWskfsJH406ur0nWTCr8uOabi1VxDBR8IWmqJyw4mmIOtdVm9bruMqFF4a2ztb9f9sNNGDZAN8mzvcsTaZjZTDh7oeE1Yqb8SBFgWkdngYn2XVK6DbE8Gc3lCcuIiLREnnnUhD8on_Yx',
        verified: true,
        rating: 4.9,
        reviewCount: 48,
        type: 'standard', // Based on the "Carlos Silva" design which is slightly different
        stats: [
            { label: 'Dourados, MS', icon: 'location_on', value: 'Dourados, MS' },
            { label: 'Experiência', icon: 'bolt', value: '10+ anos de exp.' },
            { label: 'Orçamento', icon: 'content_paste_search', value: 'Orçamento Gratuito' }
        ],
        reviews: [
            {
                id: 1,
                author: 'Maria Souza',
                rating: 5,
                text: 'Excelente profissional, pontual e muito técnico. Resolveu o problema da fiação da minha casa rapidamente.',
                avatar: '' // Placeholder handling
            },
            {
                id: 2,
                author: 'Ricardo Mendes',
                rating: 5,
                text: 'Trabalho impecável na instalação industrial da nossa oficina. Transmite muita confiança e segurança.',
                avatar: ''
            }
        ]
    },
    {
        id: 'joao',
        name: 'João Silva',
        role: 'Especialista em Consultoria Residencial',
        location: 'Dourados, MS',
        phone: '(67) 99988-7766',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVunG832rsFpCw3gb5iyPTbsprh9612ApXCzvs_gb_6pk9L6A3WBpj0xy51HDjaofKm1T-Z5LS6tRLAZ4khBzQfTQ7wqu4R2Vxkr5M9BV7m7QbGom8I6GC3Lq8uonIkHY90-AQds9SwdVj6MXVmcTjdDzPFm7aul3GKN8JZ6as2VJk12VgywoNxyBhCf2nNHSzE0eTR65Po9Mg7eqKGQxpQz-8tyXgeSdEwDqrBReMjMb1s81fETgnbVzviCppvFD93g-gYGEzFN5o',
        verified: true,
        rating: 5.0,
        reviewCount: 124,
        type: 'premium',
        bio: 'Profissional especializado em serviços residenciais na região de Dourados, focado em entregar qualidade, confiança e soluções personalizadas para o seu lar. Com mais de 10 anos de experiência, ajudo famílias a transformarem seus espaços com eficiência e bom gosto.',
        promoBanner: {
            title: 'Promoção de Verão - 10% OFF',
            description: 'Aproveite 10% de desconto em todos os serviços este mês!',
            discountText: 'Oferta Exclusiva',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChClFcIBXUsjMviN0tMdb_-iT0RZ3krS146gdH8iqITRUmEOq5oxzyN7P3WlBt6j6dQwTlJMzAiYVjdeRI8pYSAG06sDdSybfy_0-BJQm4GX8E0Q49OLHtqgecklTkQ8s2J36Pt37FxVRDcpNofZ6I9doSXA0EaMyQ2l8_WbTcY11m5R8fsFXORgS9BDfQF56WfI8plMZ-O9nfvERwpmgB6MJgygNsW_WbLQ0DJLCXSrkriMSixtHuadcr9W3evdCfS24QoydB0s0z'
        },
        instagramImages: [
            'https://source.unsplash.com/random/300x300?sig=1',
            'https://source.unsplash.com/random/300x300?sig=2',
            'https://source.unsplash.com/random/300x300?sig=3',
            'https://source.unsplash.com/random/300x300?sig=4',
            'https://source.unsplash.com/random/300x300?sig=5',
            'https://source.unsplash.com/random/300x300?sig=6'
        ],
        reviews: [
            {
                id: 1,
                author: 'Ana Silva',
                rating: 5,
                text: 'Serviço impecável! O João foi super profissional e entregou tudo antes do prazo. Recomendo muito!',
                avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaY_WbZVbID3g1IuR17gCX94S7Lom8VnrEb4kIHzctYND2Bfs8WwjQd3DI7xJvykBSy_i6bg98QC0GSYW5VC9DYM3yCtNBPukCJndB6LEGeoROzluq9Mqyqc48TMNuCnVzMfVVMcwIHGp_AnC3-W24nqIaJAX4e5dJVMHxxJlh1EFx6zw15w6jHal81KslPy-V26dTSVGhLAo1bTuzHD81cDMlU2L6zKlhRJ99u1NyFU_o-2iahoOfd_pnZvqoGnAq74CCOgYtOk0h'
            },
            {
                id: 2,
                author: 'Carlos Souza',
                rating: 5,
                text: 'Consultoria de alto nível. Conseguiu resolver problemas que outros profissionais não identificaram.',
                avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzI29uWvZGCcI9KNo54FP5nb8yleezIzjqo5UELMOm90bKdtSrMnyOGgXyO_MSOw4kMK_rLkTGewLCH8AVGjamCmgByBgv5x4PrmuqhKehywQsdWfv5Eq_HNKxW_GHbUNlG2VSieyEctvFrMUiOd4cVZBgXKSeQkxEN9aS7-uaRjTe5CTD-A_FEDGT1ce8vPGU1MEAGXrUVbXYexK3Jog4YUSn6tULXcF61Ck_NHwD87zgaM3td-kvn2426rVGtz86BVPLM4AA_Ytz'
            }
        ]
    }
];
