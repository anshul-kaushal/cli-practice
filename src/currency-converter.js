// This file will contain the primary logic for the currency conversion program.
// To run the program use the `node` command followed by the name of this file.
// ie. `node currency-converter.js`.

// This file has been split up into several sections, each of which focuses on a
// portion of the program. Completing each of these sections in order should result
// in a functional, testable program. However, please free to approach the problem
// differently. There are many paths and approaches that result in a perfectly
// valid finished product.

// --------------------------------------------------
// Step 1: Capture user input
// --------------------------------------------------
// In this step we will capture the command line  information supplied by the user.
const variableArray = process.argv;
// We will store each piece of information in a dedicated variable for later use.
let amount = parseInt(variableArray[2]);
let initialCurrency = variableArray[3];
let targetCurrency = variableArray[4];


// --------------------------------------------------
// Step 2: Validate user input
// --------------------------------------------------
// Next we will ensure that the user has provided all of the require information.

// If any of the required information is missing, display a meaningful message
// and exit the program.
if (amount == undefined){
    console.log('Amount not entered');
    process.exit()
}
if (Number.isNaN(amount)){
    console.log('Kindly provide an integer value for amount');
    process.exit();
}
if (initialCurrency == undefined){
    console.log('Initial currency not provided');
    process.exit()
}
else{
    initialCurrency = initialCurrency.toUpperCase();
}
if (targetCurrency == undefined){
    console.log('Target currency not provided');
    process.exit()
}
else{
    targetCurrency = targetCurrency.toUpperCase();
}


// --------------------------------------------------
// Step 3: Define currency conversion rates
// --------------------------------------------------
// Here we will define which currency conversions are supported, as well as the
// rates between each currency. We will capture this information as an object
// and store it in dedicated varaible for later use.

// We will use the official currency abbreviation for each currency (eg. USD, CAD, etc.).

// The conversion rates do not have to be accurate, athough this resource contains
// up-to-date rate information: https://www.xe.com/
// const currencyRates = {
//     USD: {CAD: 2},
//     CAD: {USD: 0.5}
// }

const dynamicRatesWRTOneUSD = {
    CAD: 2,
    INR: 70,
}

supportedRates = ['USD', 'INR', 'CAD'];


// --------------------------------------------------
// Step 4: Ensure that a conversion rate exists
// --------------------------------------------------
// Since it is possible for the user to supply invalid or unsupported currencies,
// we must check for the presence of a rate before attempting to convert.

// If the user supplies an invalid initial or target currency, display a meaningful
// warning message and exit the program.

// if(currencyRates[initialCurrency] == undefined){
//     console.log('Unsupported initial currency entered')
//     console.log('Supported currencies: USD CAD')
//     console.log(`Received: ${initialCurrency}`)
//     process.exit()
// }
// if(currencyRates[initialCurrency][targetCurrency] == undefined){
//     if (initialCurrency == targetCurrency){
//         result = amount
//     }
//     else{
//         console.log('Unsupported target currency entered')
//         console.log('Supported currencies: USD CAD')
//         console.log(`Received: ${targetCurrency}`)
//         process.exit()
//     }
// }
let result;
const initialCurrencyIncluded = supportedRates.includes(initialCurrency);
const targetCurrencyIncluded = supportedRates.includes(targetCurrency);
if (supportedRates.includes(initialCurrency) && supportedRates.includes(targetCurrency)){
    if (initialCurrency == targetCurrency){
        result = amount
    }
    else {
        if(initialCurrency == 'USD'){
            result = amount * dynamicRates[targetCurrency];
        }
        else if(targetCurrency == 'USD'){
            result = amount / dynamicRates[initialCurrency];
        }
        else {
            result = (amount / dynamicRates[initialCurrency]) * dynamicRates[targetCurrency];
        }
    }
}
else {
    if (!initialCurrencyIncluded){
        console.log('Unsupported initial currency entered')
        console.log('Supported currencies: USD CAD INR')
        console.log(`Received: ${initialCurrency}`)
        process.exit()
    }
    else if(!targetCurrencyIncluded){
        console.log('Unsupported target currency entered')
        console.log('Supported currencies: USD CAD INR')
        console.log(`Received: ${targetCurrency}`)
        process.exit()
    }
}


// --------------------------------------------------
// Step 5: Perform conversion
// --------------------------------------------------
// At this point we've confirmed that the user has supplied all of the necessary
// information, and that a rate exists for each of the currencies.

// Now we will compute the rate, apply it to the amount, and capture the result.
// else{
//  result = amount * currencyRates[initialCurrency][targetCurrency];
// }

// --------------------------------------------------
// Step 6: Display results
// --------------------------------------------------
// Finally we will display the result as part of a meaningful message.

// This message should also include the original amount and currency information
// supplied by the user.
console.log(`${amount} ${initialCurrency} is equal to ${result.toFixed(3)} ${targetCurrency}`)