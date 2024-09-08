require('dotenv').config();

const generateCode = (value) => {
    let output = '';
    // Ensure value is treated as a string
    value = String(value)
        .normalize('NFD') // Normalize Unicode characters
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .split(' ')
        .join(''); // Remove spaces

    // Concatenate value and secret from .env
    let merge = value + process.env.phongtrolalahome;
    let length = merge.length;

    // Select characters from the merge string
    for (let i = 0; i < 3; i++) {
        // Calculate index based on the remaining length
        let index = Math.floor(length / 2); // Get middle index
        output += merge.charAt(index); // Add character at index to output
        length = index; // Reduce length to adjust for next iteration
    }

    // Combine the third character of value with the generated output
    return `${value.charAt(2)}${output}`.toUpperCase();
};

export default generateCode;