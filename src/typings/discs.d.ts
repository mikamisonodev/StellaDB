export interface Disc {
    id: number;
    name: string;
    star: number;
    element: string;
    tag: string[];
    mainSkill: MainSkill;
    supportNote: Record<string, number>[];
    stat: Stat[];
    dupe: Dupe[];
    upgrade: Record<string, number>[];
}

export interface MainSkill {
    id: number;
    name: string;
    desc: string;
    effectType: string[];
    effectData: string[];
    params: string;
    icon: string;
    iconBg: string;
}

export interface Stat {
    HP: number;
    ATK: number;
}

export interface Dupe {
    ATK: number;
}
