// Categorias de serviços disponíveis no Conecta Dourados
export const serviceCategories = [
    {
        group: "Reformas e Reparos",
        items: [
            "Eletricista",
            "Encanador (Bombeiro Hidráulico)",
            "Pintor Residencial/Comercial",
            "Pedreiro / Mestre de Obras",
            "Marceneiro",
            "Serralheiro",
            "Gesseiro",
            "Montador de Móveis",
            "Técnico em Ar Condicionado",
            "Vidraceiro"
        ]
    },
    {
        group: "Serviços Domésticos",
        items: [
            "Diarista / Faxineira",
            "Passadeira",
            "Cozinheira",
            "Babá / Cuidador Infantil",
            "Cuidador de Idosos",
            "Jardineiro / Piscineiro",
            "Passeador de Cães (Dog Walker)"
        ]
    },
    {
        group: "Saúde e Bem-Estar",
        items: [
            "Personal Trainer",
            "Fisioterapeuta",
            "Nutricionista",
            "Psicólogo",
            "Manicure / Pedicure",
            "Cabeleireiro(a)",
            "Esteticista / Maquiadora",
            "Massoterapeuta"
        ]
    },
    {
        group: "Educação e Aulas",
        items: [
            "Professor Particular (Reforço)",
            "Professor de Idiomas",
            "Professor de Música",
            "Instrutor de Informática",
            "Aulas de Culinária"
        ]
    },
    {
        group: "Tecnologia e Digital",
        items: [
            "Suporte Técnico / Formatação",
            "Desenvolvedor / Programador",
            "Designer Gráfico",
            "Social Media",
            "Fotógrafo / Videomaker",
            "Marketing Digital"
        ]
    },
    {
        group: "Eventos e Outros",
        items: [
            "Churrasqueiro / Garçom",
            "Decoração de Festas",
            "Segurança Particular",
            "Fretes e Mudanças",
            "Outros Serviços Especializados"
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
