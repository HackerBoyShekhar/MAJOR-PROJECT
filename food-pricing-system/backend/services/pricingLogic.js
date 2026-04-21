// AI-Based Pricing Logic Engine

const calculateDynamicPrice = (item, weather) => {
    let price = item.basePrice;
    let appliedRules = [];

    const { temp, condition } = weather;
    const isRainy = condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('drizzle');

    // 1. Extreme Mixed Weather (e.g. Hot+Rainy or Cold+Rainy)
    // Add global delivery surge
    if (isRainy && (temp > 30 || temp < 15)) {
        price *= 1.10; // +10% base surge for tough weather conditions
        appliedRules.push('Extreme Weather Surge (+10%)');
    }

    // 2. Weather Rules
    if (temp > 30 && (item.category === 'cold_drink' || item.name.toLowerCase().includes('ice'))) {
        price *= 1.20;
        appliedRules.push('Hot Weather Boost (+20%)');
    }

    if (temp < 20 && (item.category === 'coffee' || item.name.toLowerCase().includes('hot'))) {
        price *= 1.15;
        appliedRules.push('Cold Weather Comfort (+15%)');
    }

    if (isRainy && item.category === 'snack') {
        price *= 1.25;
        appliedRules.push('Rainy Day Craving (+25%)');
    }

    // 3. Demand Rules (Dynamic Scaling)
    // High demand scaling up to +40%
    if (item.demandScore > 1.1) {
        const surgeMultiplier = Math.min(1.4, item.demandScore);
        price *= surgeMultiplier;
        appliedRules.push(`High Demand Surge (+${Math.round((surgeMultiplier-1)*100)}%)`);
    } else if (item.demandScore < 0.9) {
        // Low demand discount scaling up to -10%
        const discountMultiplier = Math.max(0.9, item.demandScore);
        price *= discountMultiplier;
        appliedRules.push(`Low Demand Discount (${Math.round((discountMultiplier-1)*100)}%)`);
    }

    return {
        dynamicPrice: Math.round(price * 100) / 100, 
        appliedRules
    };
};

// Simulate demand shift -> After every order, demand goes up for that item significantly.
const updateDemandScore = async (MenuItem, itemId, quantity) => {
    try {
        const item = await MenuItem.findById(itemId);
        if (item) {
            // increase demand score based on quantity, max bound e.g. 2.5
            let newScore = item.demandScore + (0.10 * quantity);
            newScore = Math.min(newScore, 2.5); 
            
            item.demandScore = newScore;
            await item.save();
        }
    } catch (err) {
        console.error('Error updating demand score', err);
    }
};

module.exports = { calculateDynamicPrice, updateDemandScore };
