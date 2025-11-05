import React from 'react';
import { formatPrice } from '../services/coinGeckoAPI';

const PortfolioHeader = ({ totalValue, lastUpdated }) => {
  return (
    <div className="portfolio-header">
      <div className="header-content">
        <h1>💰 Crypto Portfolio Tracker</h1>
        <p className="subtitle">Real-time portfolio tracking powered by CoinGecko</p>
      </div>
      
      <div className="portfolio-stats">
        <div className="stat-card total-value">
          <h3>Total Portfolio Value</h3>
          <p className="value">{formatPrice(totalValue)}</p>
        </div>
        
        <div className="stat-card last-update">
          <h3>Last Updated</h3>
          <p className="update-time">{lastUpdated}</p>
          <div className="refresh-indicator">
            <span className="pulse"></span>
            Auto-refreshing
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioHeader;