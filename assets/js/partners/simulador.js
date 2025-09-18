 // Define game settings with house edge and win probability for each game
 const gameSettings = {
    americanRoulette: { houseEdge: 5.26, winProbability: 47.37 },
    europeanRoulette: { houseEdge: 2.7, winProbability: 48.65 },
    blackjack: { houseEdge: 1, winProbability: 49.5 },
    slotLow: { houseEdge: 4.0, winProbability: 48 },
    slotHigh: { houseEdge: 10.0, winProbability: 45 }
};

// Update house edge and win probability based on selected game
function updateGameSettings() {
    const selectedGame = document.getElementById('gameSelect').value;
    const settings = gameSettings[selectedGame];
    document.getElementById('houseEdge').value = settings.houseEdge;
    document.getElementById('winProbability').value = settings.winProbability;
}

// Run quick simulation with predefined rounds
function runQuickSimulation(rounds) {
    simulate(rounds);
}

// Main simulation logic
function simulate(totalRounds) {
// Retrieve user inputs
const startingBalance = parseFloat(document.getElementById('startingBalance').value);
const betAmount = parseFloat(document.getElementById('betAmount').value);

// Set default values if houseEdge or winProbability are null or undefined
const houseEdge = parseFloat(document.getElementById('houseEdge').value) / 100 || 0.0526; // Default to 5.26% (American Roulette)
const winProbability = parseFloat(document.getElementById('winProbability').value) / 100 || 0.4737; // Default to 47.37%

// Calculate the total gambling volume and expected profit
const gamblingVolume = totalRounds * betAmount;
const expectedProfit = gamblingVolume * houseEdge;

// Initialize variables
let userBalance = startingBalance;
let casinoProfit = 0;

// Run the specified number of rounds
for (let round = 0; round < totalRounds; round++) {
    const result = Math.random();
    if (result <= winProbability) {
        // Player wins, casino loses
        userBalance += betAmount;
        casinoProfit -= betAmount;
    } else {
        // Player loses, casino wins
        userBalance -= betAmount;
        casinoProfit += betAmount;
    }
}

// Calculate metrics
const profitDifference = casinoProfit - expectedProfit;
const percentageDifference = ((profitDifference / expectedProfit) * 100).toFixed(2);

// Display results with formatted numbers
document.getElementById('expectedProfit').innerText = formatNumber(expectedProfit);
document.getElementById('actualProfit').innerText = formatNumber(casinoProfit);
document.getElementById('profitDifference').innerText = formatNumber(profitDifference);
document.getElementById('percentageDifference').innerText = percentageDifference;
document.getElementById('startingBalanceResult').innerText = formatNumber(startingBalance);
document.getElementById('endingBalanceResult').innerText = formatNumber(userBalance);
document.getElementById('gamblingVolume').innerText = formatNumber(gamblingVolume);
}


// Format numbers with commas for readability
function formatNumber(number) {
    return number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Initialize with the first game settings
updateGameSettings();