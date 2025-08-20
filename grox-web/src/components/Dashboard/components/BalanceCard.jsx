const BalanceCard = () => {
  return (
    <div className="balance-card">
      <div className="balance-card-header">
        <div className="balance-amount-section">
          <p className="balance-label">Grox Balance</p>
          <h2 className="balance-value">12,500.00 GROX</h2>
        </div>
        <div className="current-value-section">
          <p className="current-value-label">Current Grox Value</p>
          <h3 className="current-value">$2.5 USD</h3>
        </div>
      </div>

      <div className="currency-breakdown">
        <div className="currency-item">
          <p className="currency-label">NGN</p>
          <p className="currency-value">₦47,500,000</p>
        </div>
        <div className="currency-item">
          <p className="currency-label">USD</p>
          <p className="currency-value">$30,625.00</p>
        </div>
        <div className="currency-item">
          <p className="currency-label">GBP</p>
          <p className="currency-value">£24,312.50</p>
        </div>
      </div>

      <div className="performance-stats">
        <span className="performance-icon">📈</span>
        <span className="performance-text">20.5% This week</span>
      </div>
    </div>
  );
};

export default BalanceCard;
