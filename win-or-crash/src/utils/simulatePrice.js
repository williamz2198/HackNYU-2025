export function simulatePrice(price, trend, volatility) {
  const randomFactor = (Math.random() - 0.5) * volatility; // small daily wiggle
  let newPrice = price * (1 + randomFactor);
  newPrice = newPrice * (1 + trend); // apply long-term trend
  return +newPrice.toFixed(2);
}
