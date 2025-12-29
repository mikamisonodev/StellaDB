export interface Disc {
    id: number;
    name: string;
    star: number;
    element: string;
    tag: string[];
    mainSkill: Skill;
    supportNote: Record<string, number>[];
    stat: Record<string, number | string>[];
    dupe: Record<string, number>[];
    upgrade: Record<string, number>[];
    secondarySkill1?: Skill;
    secondarySkill2?: Skill;
}

export interface Skill {
    id: number;
    name: string;
    desc: string;
    effectType: string[];
    effectData: string[];
    buffIcon: string[];
    params: string;
    requirements?: Record<string, number>[];
    icon: string;
    iconBg: string;
}
