export const integerToNumeral = (userInput: string): string => {
    const romanNumerals: Record<number, string> = {
        1: "I",
        4: "IV",
        5: "V",
        9: "IX",
        10: "X",
        40: "XL",
        50: "L",
        90: "XC",
        100: "C",
        400: "CD",
        500: "D",
        900: "CM",
        1000: "M",
    };
    // final roman numeral
    let result = "";
    // used to track power 10 position
    let position = 1;

    let i = userInput.length - 1;
    while (i >= 0) {
        const number = Number(userInput[i]);
        if (number < 4)
            result = result.padStart(number + result.length, romanNumerals[position]);
        else if (number > 5 && number < 9)
            result = romanNumerals[5 * position] + result.padStart(number - 5 + result.length, romanNumerals[position]);
        else
            result = romanNumerals[number * position] + result;
        position *= 10;
        i--;
    }
    return result;
}
