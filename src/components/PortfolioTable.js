import React from 'react';
import { formatPrice, formatPercentChange } from '../services/coinGeckoAPI';
import { calculateProfitLoss } from '../utils/helpers';

const PortfolioTable = ({ portfolio, onRemoveCoin }) => {
  if (portfolio.length === 0) {
    return (
      <div className="portfolio-table-container">
        <div className="empty-state">
          <div className="empty-icon">🪙</div>
          <h3>Your portfolio is empty</h3>
          <p>Add your first cryptocurrency to start tracking!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-table-container">
      <div className="portfolio-cards">
        {portfolio.map((coin) => {
          const profitLoss = calculateProfitLoss(
            coin.currentPrice,
            coin.buyPrice,
            coin.amount
          );
          const changeData = formatPercentChange(coin.priceChange24h);
          const holdingsValue = coin.currentPrice * coin.amount;

          return (
            <div key={coin.id} className="portfolio-card">
              <div className="card-header">
                <div className="coin-info">
                  <div className="coin-icon">
                    {coin.coinId.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="coin-details">
                    <h3>{coin.coinId.charAt(0).toUpperCase() + coin.coinId.slice(1)}</h3>
                    <span className="coin-id">@{coin.coinId}</span>
                  </div>
                </div>
                <span className={`change-badge ${changeData.colorClass}`}>
                  {changeData.value >= 0 ? '↗' : '↘'} {changeData.value}
                </span>
              </div>

              <div className="card-body">
                <div className="stat-item">
                  <span className="stat-label">Amount</span>
                  <span className="stat-value">{coin.amount.toFixed(4)}</span>
                </div>

                <div className="stat-item">
                  <span className="stat-label">Buy Price</span>
                  <span className="stat-value">${formatPrice(coin.buyPrice)}</span>
                </div>

                <div className="stat-item">
                  <span className="stat-label">Current Price</span>
                  <span className="stat-value">${formatPrice(coin.currentPrice)}</span>
                </div>

                <div className="stat-item">
                  <span className="stat-label">Holdings Value</span>
                  <span className="stat-value">${formatPrice(holdingsValue)}</span>
                </div>

                <div className="stat-item">
                  <span className="stat-label">Profit/Loss</span>
                  <div className="profit-loss">
                    <span className={profitLoss.value >= 0 ? 'positive' : 'negative'}>
                      {profitLoss.value >= 0 ? '+' : '-'}${formatPrice(Math.abs(profitLoss.value))}
                    </span>
                    <span className={`percent ${profitLoss.value >= 0 ? 'positive' : 'negative'}`}>
                      ({profitLoss.value >= 0 ? '+' : ''}{profitLoss.percentage}%)
                    </span>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <button
                  className="remove-btn"
                  onClick={() => onRemoveCoin(coin.id)}
                  title="Remove from portfolio"
                >
                  <span>🗑️</span>
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioTable;