import React from 'react';
import { formatPrice } from '../services/coinGeckoAPI';

const PortfolioChart = ({ portfolio }) => {
  if (portfolio.length === 0) {
    return null;
  }

  // Calculate total value for percentage calculations
  const totalValue = portfolio.reduce((sum, coin) => 
    sum + (coin.currentPrice * coin.amount), 0
  );

  // Prepare data for visualization
  const chartData = portfolio.map(coin => {
    const value = coin.currentPrice * coin.amount;
    const percentage = ((value / totalValue) * 100).toFixed(2);
    return {
      ...coin,
      value,
      percentage
    };
  }).sort((a, b) => b.value - a.value);

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
  ];

  return (
    <div className="portfolio-chart">
      <h2>Portfolio Distribution</h2>
      <div className="chart-container">
        <div className="bar-chart">
          {chartData.map((coin, index) => (
            <div key={coin.id} className="chart-bar-wrapper">
              <div 
                className="chart-bar"
                style={{
                  width: `${coin.percentage}%`,
                  backgroundColor: colors[index % colors.length]
                }}
              >
                <span className="bar-label">
                  {coin.coinId.toUpperCase()} ({coin.percentage}%)
                </span>
              </div>
              <div className="bar-info">
                <span className="coin-name">{coin.coinId}</span>
                <span className="coin-value">{formatPrice(coin.value)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="chart-legend">
          <h3>Top Holdings</h3>
          {chartData.slice(0, 5).map((coin, index) => (
            <div key={coin.id} className="legend-item">
              <span 
                className="legend-color"
                style={{ backgroundColor: colors[index % colors.length] }}
              ></span>
              <span className="legend-label">
                {coin.coinId.toUpperCase()}: {coin.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioChart;