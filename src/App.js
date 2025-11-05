import React, { useState, useEffect } from 'react';
import './App.css';
import PortfolioHeader from './components/PortfolioHeader';
import AddCoinForm from './components/AddCoinForm';
import PortfolioTable from './components/PortfolioTable';
import PortfolioChart from './components/PortfolioChart';
import { fetchCryptoPrices } from './services/coinGeckoAPI';
import { 
  calculateTotalValue, 
  generateId, 
  saveToLocalStorage, 
  loadFromLocalStorage 
} from './utils/helpers';

function App() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('Never');

  // Load portfolio from localStorage on mount
  useEffect(() => {
    const savedPortfolio = loadFromLocalStorage();
    if (savedPortfolio.length > 0) {
      setPortfolio(savedPortfolio);
      updatePrices(savedPortfolio);
    }
  }, []);

  // Auto-refresh prices every 60 seconds
  useEffect(() => {
    if (portfolio.length === 0) return;

    const interval = setInterval(() => {
      updatePrices(portfolio);
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [portfolio]);

  // Update prices from API
  const updatePrices = async (currentPortfolio) => {
    if (currentPortfolio.length === 0) return;

    setLoading(true);
    setError('');

    try {
      const coinIds = currentPortfolio.map(coin => coin.coinId);
      const priceData = await fetchCryptoPrices(coinIds);

      const updatedPortfolio = currentPortfolio.map(coin => {
        const coinData = priceData[coin.coinId];
        if (coinData) {
          return {
            ...coin,
            currentPrice: coinData.usd,
            priceChange24h: coinData.usd_24h_change
          };
        }
        return coin;
      });

      setPortfolio(updatedPortfolio);
      saveToLocalStorage(updatedPortfolio);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError('Failed to fetch prices. Please check coin IDs and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add new coin to portfolio
  const handleAddCoin = async (newCoin) => {
    setLoading(true);
    setError('');

    try {
      // Fetch current price for the new coin
      const priceData = await fetchCryptoPrices([newCoin.coinId]);
      
      if (!priceData[newCoin.coinId]) {
        setError(`Coin "${newCoin.coinId}" not found. Please check the coin ID.`);
        setLoading(false);
        return;
      }

      const coinWithPrice = {
        ...newCoin,
        id: generateId(),
        currentPrice: priceData[newCoin.coinId].usd,
        priceChange24h: priceData[newCoin.coinId].usd_24h_change
      };

      const updatedPortfolio = [...portfolio, coinWithPrice];
      setPortfolio(updatedPortfolio);
      saveToLocalStorage(updatedPortfolio);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError('Failed to add coin. Please check the coin ID and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Remove coin from portfolio
  const handleRemoveCoin = (id) => {
    const updatedPortfolio = portfolio.filter(coin => coin.id !== id);
    setPortfolio(updatedPortfolio);
    saveToLocalStorage(updatedPortfolio);
  };

  // Calculate total portfolio value
  const totalValue = calculateTotalValue(portfolio);

  return (
    <div className="App">
      <div className="container">
        <PortfolioHeader 
          totalValue={totalValue}
          lastUpdated={lastUpdated}
        />

        {error && (
          <div className="error-banner">
            <span>⚠️ {error}</span>
            <button onClick={() => setError('')}>×</button>
          </div>
        )}

        {loading && (
          <div className="loading-banner">
            <div className="spinner"></div>
            <span>Updating prices...</span>
          </div>
        )}

        <AddCoinForm onAddCoin={handleAddCoin} />
        
        <PortfolioTable 
          portfolio={portfolio}
          onRemoveCoin={handleRemoveCoin}
        />

        <PortfolioChart portfolio={portfolio} />

        <footer className="app-footer">
          <p>
            Powered by <a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer">CoinGecko API</a>
          </p>
          <p className="footer-note">
            💡 Tip: Prices update automatically every 60 seconds
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;