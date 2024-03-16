import { GridRenderCellParams } from "@mui/x-data-grid";

export const filterLastFour = (number:string) => {
    // const numStr = parseFloat(num);
    // return parseFloat(numnumber.toFixed(4));

    // Find the position of the decimal point
    let decimalPosition = number.indexOf(".");
    
    if (decimalPosition !== -1) { // If decimal point exists
        // Find the position of the first non-zero digit after the decimal point
        let firstNonZeroIndex = decimalPosition + 1; // Initialize with the position right after the decimal point
        while (firstNonZeroIndex < number.length && number.charAt(firstNonZeroIndex) === '0') {
            firstNonZeroIndex++;
        }
        // Calculate the number of characters to keep after the decimal point
        let adjustedLength = Math.min(firstNonZeroIndex + 4, number.length); // Keep until the first four non-zero digits after the decimal point
        let adjustedStr = number.substring(0, adjustedLength);
        return parseFloat(adjustedStr);
    } else {
        return parseFloat(number); // No decimal point, parse as is
    }
}

export const formatPrice =  (priceStr:string) => {
    const price = parseFloat(priceStr);
    let formatedPrice = '';

    if (isNaN(price)) {
        return "NaN";
    }
    if (price < 1000) {
        formatedPrice = price.toFixed(2); // No need for abbreviation
    } else if (price < 1000000) {
        formatedPrice = (price / 1000).toFixed(2) + "K";
    } else if (price < 1000000000) {
        formatedPrice = (price / 1000000).toFixed(2) + "M";
    } else {
        formatedPrice = (price / 1000000000).toFixed(2) + "B";
    }

    return `$ ${formatedPrice}`;
}

export const filterPercentageColor = (params: GridRenderCellParams) => {
    const value = params.value.toString(); // Ensure value is string for includes function
    const hasHyphen = value.includes('-');
    const style = {
      color: hasHyphen ? 'red' : 'green'
    };
    return <span style={style}>{value}%</span>;
  }