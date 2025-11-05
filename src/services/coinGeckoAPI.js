// CoinGecko API Service Layer
const BASE_URL = 'https://api.coingecko.com/api/v3';

/**
 * Fetch current prices for multiple cryptocurrencies
 * @param {string[]} coinIds - Array of coin IDs (e.g., ['bitcoin', 'ethereum'])
 * @returns {Promise<Object>} Price data for requested coins
 */
export const fetchCryptoPrices = async (coinIds) => {
  if (!coinIds || coinIds.length === 0) {
    return {};
  }

  try {
    const ids = coinIds.join(',');
    const response = await fetch(
      `${BASE_URL}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw error;
  }
};

/**
 * Search for a cryptocurrency by name or symbol
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of matching coins
 */
export const searchCoin = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search?query=${query}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.coins || [];
  } catch (error) {
    console.error('Error searching coins:', error);
    throw error;
  }
};

/**
 * Get list of all supported coins
 * @returns {Promise<Array>} Array of all coins with id, symbol, and name
 */
export const getAllCoins = async () => {
  try {
    const response = await fetch(`${BASE_URL}/coins/list`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching coin list:', error);
    throw error;
  }
};

/**
 * Format price with appropriate decimals
 * @param {number} price - Price to format
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  if (price === null || price === undefined) return 'N/A';
  
  if (price < 0.01) {
    return `$${price.toFixed(6)}`;
  } else if (price < 1) {
    return `$${price.toFixed(4)}`;
  } else {
    return `$${price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }
};

/**
 * Format percentage change with sign and color
 * @param {number} change - Percentage change value
 * @returns {Object} Object with formatted value and color class
 */
export const formatPercentChange = (change) => {
  if (change === null || change === undefined) {
    return { value: 'N/A', colorClass: '' };
  }
  
  const sign = change >= 0 ? '+' : '';
  const colorClass = change >= 0 ? 'positive' : 'negative';
  const value = `${sign}${change.toFixed(2)}%`;
  
  return { value, colorClass };
};