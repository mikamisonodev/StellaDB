export interface Word {
    name: string;
    desc: string;
    icon?: string;
    params: (string | number)[];
    effectType: string[];
    addAttrType: string[];
    effectData: string[];
    buffIcons: string[];
}
