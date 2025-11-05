import React from 'react';
import { formatPrice, formatPercentChange } from '../services/coinGeckoAPI';
import { calculateProfitLoss } from '../utils/helpers';

const PortfolioTable = ({ portfolio, onRemoveCoin }) => {
  if (portfolio.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📊</div>
        <h3>Your portfolio is empty</h3>
        <p>Add your first cryptocurrency to start tracking!</p>
      </div>
    );
  }

  return (
    <div className="portfolio-table-container">
      <table className="portfolio-table">
        <thead>
          <tr>
            <th>Coin</th>
            <th>Amount</th>
            <th>Buy Price</th>
            <th>Current Price</th>
            <th>24h Change</th>
            <th>Holdings Value</th>
            <th>Profit/Loss</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((coin) => {
            const profitLoss = calculateProfitLoss(
              coin.currentPrice,
              coin.buyPrice,
              coin.amount
            );
            const changeData = formatPercentChange(coin.priceChange24h);
            const holdingsValue = coin.currentPrice * coin.amount;

            return (
              <tr key={coin.id} className="table-row">
                <td className="coin-name">
                  <div className="coin-info">
                    <span className="coin-symbol">{coin.coinId.toUpperCase()}</span>
                  </div>
                </td>
                <td>{coin.amount.toFixed(4)}</td>
                <td>{formatPrice(coin.buyPrice)}</td>
                <td className="current-price">{formatPrice(coin.currentPrice)}</td>
                <td>
                  <span className={`change-badge ${changeData.colorClass}`}>
                    {changeData.value}
                  </span>
                </td>
                <td className="holdings-value">{formatPrice(holdingsValue)}</td>
                <td>
                  <div className="profit-loss">
                    <span className={profitLoss.value >= 0 ? 'positive' : 'negative'}>
                      {formatPrice(Math.abs(profitLoss.value))}
                    </span>
                    <span className={`percent ${profitLoss.value >= 0 ? 'positive' : 'negative'}`}>
                      ({profitLoss.percentage}%)
                    </span>
                  </div>
                </td>
                <td>
                  <button
                    className="remove-btn"
                    onClick={() => onRemoveCoin(coin.id)}
                    title="Remove from portfolio"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioTable;