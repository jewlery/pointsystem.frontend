export const toFixedWithoutRounding = (num, decimalPlaces = 3) => {
    const factor = Math.pow(10, decimalPlaces);
    return (Math.trunc(num * factor) / factor).toFixed(decimalPlaces);
}
