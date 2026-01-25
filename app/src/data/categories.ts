export interface CategoryGroup {
    group: string;
    icon: string;
    items: string[];
}

export const serviceCategories: CategoryGroup[] = [
    {
        group: "Assistência Técnica",
        icon: "Wrench",
        items: [
            "Celular / Smartphone",
            "Computador / Notebook",
            "Eletrodomésticos",
            "Televisão",
            "Ar Condicionado",
            "Fogão / Micro-ondas",
            "Máquina de Lavar"
        ]
    },
    {
        group: "Aulas",
        icon: "GraduationCap",
        items: [
            "Professor Particular (Reforço)",
            "Idiomas",
            "Música / Instrumentos",
            "Informática",
            "Culinária",
            "Esportes",
            "Artes / Artesanato"
        ]
    },
    {
        group: "Autos",
        icon: "Car",
        items: [
            "Mecânica",
            "Funilaria / Pintura",
            "Elétrica Automotiva",
            "Lava-Jato / Estética",
            "Borracharia",
            "Guincho",
            "Insulfilm / Som"
        ]
    },
    {
        group: "Consultoria",
        icon: "Handshake",
        items: [
            "Advogado",
            "Contador",
            "Administração",
            "Finanças",
            "Recursos Humanos",
            "Tradução",
            "Consultoria de Imagem"
        ]
    },
    {
        group: "Design e Tecnologia",
        icon: "Code",
        items: [
            "Desenvolvimento Web",
            "Aplicativos Celular",
            "Design Gráfico",
            "Social Media",
            "Marketing Digital",
            "Edição de Vídeo",
            "SEO"
        ]
    },
    {
        group: "Eventos",
        icon: "PartyPopper",
        items: [
            "Churrasqueiro / Cozinheiro",
            "Garçom / Recepcionista",
            "Decoração",
            "Fotografia / Filmagem",
            "Som e Iluminação",
            "Buffet",
            "Animação / Mágico"
        ]
    },
    {
        group: "Moda e Beleza",
        icon: "Shirt",
        items: [
            "Manicure / Pedicure",
            "Cabeleireiro(a)",
            "Maquiadora",
            "Esteticista",
            "Depilação",
            "Massoterapeuta",
            "Costureira"
        ]
    },
    {
        group: "Reformas e Reparos",
        icon: "Hammer",
        items: [
            "Eletricista",
            "Encanador",
            "Pintor",
            "Pedreiro",
            "Marceneiro",
            "Serralheiro",
            "Gesseiro",
            "Montador de Móveis",
            "Vidraceiro"
        ]
    },
    {
        group: "Saúde",
        icon: "HeartPulse",
        items: [
            "Personal Trainer",
            "Fisioterapeuta",
            "Nutricionista",
            "Psicólogo",
            "Cuidador de Idosos",
            "Enfermagem",
            "Fonoaudiólogo"
        ]
    },
    {
        group: "Serviços Domésticos",
        icon: "Home",
        items: [
            "Diarista / Faxineira",
            "Passadeira",
            "Cozinheira",
            "Babá",
            "Jardineiro",
            "Piscineiro",
            "Passeador de Cães",
            "Personal Organizer"
        ]
    }
];

// Função para obter todas as categorias em um array simples
export const getAllCategories = (): string[] => {
    return serviceCategories.flatMap(group => group.items);
};

// Função para obter o grupo de uma categoria específica
export const getCategoryGroup = (category: string): string | undefined => {
    for (const group of serviceCategories) {
        if (group.items.includes(category)) {
            return group.group;
        }
    }
    return undefined;
};
