import React, { useState } from 'react';
import { validateCoinInput } from '../utils/helpers';

const AddCoinForm = ({ onAddCoin }) => {
  const [coinId, setCoinId] = useState('');
  const [amount, setAmount] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const validation = validateCoinInput(coinId, parseFloat(amount), parseFloat(buyPrice));
    
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    const newCoin = {
      coinId: coinId.toLowerCase().trim(),
      amount: parseFloat(amount),
      buyPrice: parseFloat(buyPrice)
    };

    onAddCoin(newCoin);
    
    // Reset form
    setCoinId('');
    setAmount('');
    setBuyPrice('');
    setIsExpanded(false);
  };

  const handleQuickSelect = (coin) => {
    setCoinId(coin);
    // Scroll to the coin ID input
    document.getElementById('coinId')?.focus();
  };

  return (
    <div className="add-coin-section">
      <button 
        className="toggle-form-btn"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? '✕ Close Form' : '+ Add New Cryptocurrency'}
      </button>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="add-coin-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="coinId">Cryptocurrency ID</label>
              <input
                type="text"
                id="coinId"
                value={coinId}
                onChange={(e) => setCoinId(e.target.value)}
                placeholder="bitcoin, ethereum, etc."
                className="form-input"
                autoComplete="off"
              />
              <small className="form-hint">Use CoinGecko coin ID (lowercase)</small>
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount Held</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0000"
                step="any"
                min="0"
                className="form-input"
              />
              <small className="form-hint">How many coins do you own?</small>
            </div>

            <div className="form-group">
              <label htmlFor="buyPrice">Purchase Price (USD)</label>
              <input
                type="number"
                id="buyPrice"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                placeholder="0.00"
                step="any"
                min="0"
                className="form-input"
              />
              <small className="form-hint">Price per coin when purchased</small>
            </div>
          </div>

          {error && <div className="error-message">⚠️ {error}</div>}

          <button type="submit" className="submit-btn">
            ✅ Add to Portfolio
          </button>

          <div className="popular-coins">
            <p>Quick Select Popular Coins:</p>
            <div className="coin-chips">
              <span onClick={() => handleQuickSelect('bitcoin')}>₿ Bitcoin</span>
              <span onClick={() => handleQuickSelect('ethereum')}>Ξ Ethereum</span>
              <span onClick={() => handleQuickSelect('cardano')}>₳ Cardano</span>
              <span onClick={() => handleQuickSelect('solana')}>◎ Solana</span>
              <span onClick={() => handleQuickSelect('polkadot')}>● Polkadot</span>
              <span onClick={() => handleQuickSelect('ripple')}>✕ Ripple</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddCoinForm;