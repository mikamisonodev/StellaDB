export interface Trekker {
    id: number;
    name: string;
    desc: string;
    star: number;
    element: string;
    class: string;
    attackType: string;
    style: string;
    force: string;
    tag: string[];
    cnCv: string;
    jpCv: string;
    birthday: string;
    loveGift: string[];
    hateGift: any[];
    date: DatingEvent[];
    normalAtk: Skill;
    skill: Skill;
    supportSkill: Skill;
    ultimate: Skill;
    potential: Potential;
    talent: Talent[];
    stat: Stat[];
    upgrade: Record<string, number>[];
    skillUpgrade: Record<string, number>[];
}

export interface DatingEvent {
    id: number;
    name: string;
    clue: string;
    secondChoice: string;
}

export interface Skill {
    id: number;
    name: string;
    cooldown?: string;
    energy?: number;
    briefDesc: string;
    desc: string;
    damageType: string[];
    effectType: string[];
    addAttrType: string[];
    params: (string | number)[];
    icon: string;
}

export interface Potential {
    mainCore: MainCore[];
    mainNormal: MainNormal[];
    common: Common[];
    supportCore: SupportCore[];
    supportNormal: SupportNormal[];
}

export interface MainCore {
    id: number;
    name: string;
    briefDesc: string;
    desc: string;
    damageType: string[];
    effectType: string[];
    addAttrType: string[];
    params: string[];
    icon: string;
    rarity: string;
}

export interface MainNormal {
    id: number;
    name: string;
    briefDesc: string;
    desc: string;
    damageType: any[];
    effectType: string[];
    addAttrType: string[];
    params: any[];
    icon: string;
    corner: string;
    rarity: string;
}

export interface Common {
    id: number;
    name: string;
    briefDesc: string;
    desc: string;
    damageType: any[];
    effectType: string[];
    addAttrType: string[];
    params: any[];
    icon: string;
    corner: string;
    rarity: string;
}

export interface SupportCore {
    id: number;
    name: string;
    briefDesc: string;
    desc: string;
    damageType: string[];
    effectType: any[];
    addAttrType: any[];
    params: string[];
    icon: string;
    rarity: string;
}

export interface SupportNormal {
    id: number;
    name: string;
    briefDesc: string;
    desc: string;
    damageType: any[];
    effectType: string[];
    addAttrType: string[];
    params: any[];
    icon: string;
    corner: string;
    rarity: string;
}

export interface Talent {
    name: string;
    boost: Boost[];
}

export interface Boost {
    name: string;
    desc: string;
    params: any[];
}

export interface Stat {
    lv: number;
    hp: number;
    atk: number;
    def: number;
    critRate: string;
    critDmg: string;
    resilienceBreakDmg: string;
    vul: string;
}
