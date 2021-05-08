//format any number to n decimal places 
export const numToFixedDecimal = (num, decimal) => {
    return parseFloat(num.toFixed(decimal));
}