export const toNumberFa = (number: number, Is_price: boolean=true) => {
    return Number(number).toLocaleString('fa-IR',{useGrouping: Is_price});
}