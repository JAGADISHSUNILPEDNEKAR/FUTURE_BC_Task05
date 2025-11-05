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

  return (
    <div className="add-coin-section">
      <button 
        className="toggle-form-btn"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? '− Hide Form' : '+ Add New Coin'}
      </button>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="add-coin-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="coinId">Coin ID</label>
              <input
                type="text"
                id="coinId"
                value={coinId}
                onChange={(e) => setCoinId(e.target.value)}
                placeholder="e.g., bitcoin, ethereum"
                className="form-input"
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
                placeholder="0.00"
                step="any"
                min="0"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="buyPrice">Buy Price (USD)</label>
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
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-btn">
            Add to Portfolio
          </button>

          <div className="popular-coins">
            <p>Popular coins:</p>
            <div className="coin-chips">
              <span onClick={() => setCoinId('bitcoin')}>Bitcoin</span>
              <span onClick={() => setCoinId('ethereum')}>Ethereum</span>
              <span onClick={() => setCoinId('cardano')}>Cardano</span>
              <span onClick={() => setCoinId('solana')}>Solana</span>
              <span onClick={() => setCoinId('polkadot')}>Polkadot</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddCoinForm;