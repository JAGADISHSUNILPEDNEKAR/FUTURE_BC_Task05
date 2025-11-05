# API Documentation

## CoinGecko API Integration

This project uses the CoinGecko API (v3) to fetch real-time cryptocurrency prices.

### Base URL
```
https://api.coingecko.com/api/v3
```

### Endpoints Used

#### 1. Simple Price
Fetches current prices for multiple cryptocurrencies.

**Endpoint:** `/simple/price`

**Parameters:**
- `ids` (required): Comma-separated list of coin IDs
- `vs_currencies` (required): Target currency (e.g., "usd")
- `include_24hr_change` (optional): Include 24-hour price change percentage

**Example Request:**
```
GET https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true
```

**Example Response:**
```json
{
  "bitcoin": {
    "usd": 45000,
    "usd_24h_change": 2.5
  },
  "ethereum": {
    "usd": 3000,
    "usd_24h_change": -1.2
  }
}
```

#### 2. Search Coins
Search for cryptocurrencies by name or symbol.

**Endpoint:** `/search`

**Parameters:**
- `query` (required): Search term

**Example Request:**
```
GET https://api.coingecko.com/api/v3/search?query=bitcoin
```

#### 3. Coins List
Get list of all supported coins with ID, symbol, and name.

**Endpoint:** `/coins/list`

**Example Request:**
```
GET https://api.coingecko.com/api/v3/coins/list
```

### Rate Limits

**Free Tier:**
- 10-30 calls per minute
- No API key required
- Best practice: Cache responses and limit update frequency

### Common Coin IDs

| Cryptocurrency | Coin ID |
|----------------|---------|
| Bitcoin | `bitcoin` |
| Ethereum | `ethereum` |
| Cardano | `cardano` |
| Solana | `solana` |
| Polkadot | `polkadot` |
| Ripple | `ripple` |
| Dogecoin | `dogecoin` |
| Binance Coin | `binancecoin` |
| Litecoin | `litecoin` |
| Chainlink | `chainlink` |

### Error Handling

The API returns standard HTTP status codes:

- **200 OK**: Successful request
- **404 Not Found**: Coin ID not found
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error

### Best Practices

1. **Batch Requests**: Request multiple coins in a single API call
2. **Caching**: Implement local caching to reduce API calls
3. **Rate Limiting**: Respect the 10-30 calls/minute limit
4. **Error Handling**: Always handle potential errors gracefully
5. **Update Frequency**: Don't update more than once per minute

### Code Example

```javascript
import { fetchCryptoPrices } from './services/coinGeckoAPI';

// Fetch prices for multiple coins
const prices = await fetchCryptoPrices(['bitcoin', 'ethereum', 'cardano']);

console.log(prices);
// Output:
// {
//   bitcoin: { usd: 45000, usd_24h_change: 2.5 },
//   ethereum: { usd: 3000, usd_24h_change: -1.2 },
//   cardano: { usd: 0.50, usd_24h_change: 3.1 }
// }
```

### Links

- [CoinGecko API Documentation](https://www.coingecko.com/en/api/documentation)
- [CoinGecko Website](https://www.coingecko.com)
- [API Status Page](https://status.coingecko.com)