export default function GetRemFontSize(val: number, baseFont: number = 14){
    return (val / baseFont)+'rem';
}

export function GetLineHeightUnitless(val:number, fontsize:number = 14){
    return val / fontsize;
}