// Utility Helper Functions

/**
 * Calculate total portfolio value
 * @param {Array} portfolio - Array of portfolio items
 * @returns {number} Total portfolio value in USD
 */
export const calculateTotalValue = (portfolio) => {
  return portfolio.reduce((total, coin) => {
    return total + (coin.currentPrice * coin.amount);
  }, 0);
};

/**
 * Calculate profit/loss for a single coin
 * @param {number} currentPrice - Current price of the coin
 * @param {number} buyPrice - Price at which the coin was bought
 * @param {number} amount - Amount of coins held
 * @returns {Object} Object with profit/loss value and percentage
 */
export const calculateProfitLoss = (currentPrice, buyPrice, amount) => {
  const currentValue = currentPrice * amount;
  const investedValue = buyPrice * amount;
  const profitLoss = currentValue - investedValue;
  const profitLossPercent = ((profitLoss / investedValue) * 100).toFixed(2);
  
  return {
    value: profitLoss,
    percentage: profitLossPercent
  };
};

/**
 * Save portfolio to localStorage
 * @param {Array} portfolio - Portfolio array to save
 */
export const saveToLocalStorage = (portfolio) => {
  try {
    localStorage.setItem('cryptoPortfolio', JSON.stringify(portfolio));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

/**
 * Load portfolio from localStorage
 * @returns {Array} Portfolio array or empty array if none exists
 */
export const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('cryptoPortfolio');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return [];
  }
};

/**
 * Generate unique ID for portfolio items
 * @returns {string} Unique identifier
 */
export const generateId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Validate coin input data
 * @param {string} coinId - Coin ID
 * @param {number} amount - Amount of coins
 * @param {number} buyPrice - Buy price
 * @returns {Object} Validation result with isValid and error message
 */
export const validateCoinInput = (coinId, amount, buyPrice) => {
  if (!coinId || coinId.trim() === '') {
    return { isValid: false, error: 'Coin ID is required' };
  }
  
  if (!amount || amount <= 0) {
    return { isValid: false, error: 'Amount must be greater than 0' };
  }
  
  if (!buyPrice || buyPrice <= 0) {
    return { isValid: false, error: 'Buy price must be greater than 0' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Format large numbers with K, M, B suffixes
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export const formatLargeNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K';
  }
  return num.toFixed(2);
};

/**
 * Debounce function to limit API calls
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};