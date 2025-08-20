const transactions = [
  {
    type: 'Send',
    amount: '500 GROX',
    date: '13-06-2025',
    time: '3:42AM',
    icon: '📤',
  },
  {
    type: 'Receive',
    amount: '500 GROX',
    date: '13-06-2025',
    time: '3:42AM',
    icon: '📥',
  },
  {
    type: 'Stake',
    amount: '500 GROX',
    date: '13-06-2025',
    time: '3:42AM',
    icon: '📈',
  },
  {
    type: 'Send',
    amount: '500 GROX',
    date: '13-06-2025',
    time: '3:42AM',
    icon: '📤',
  },
];

const Transactions = () => {
  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <h3 className="transactions-title">Recent Transactions</h3>
        <button className="transactions-view-all">View all transactions</button>
      </div>

      <div className="transactions-list">
        {transactions.map((tx, index) => (
          <div key={index} className="transaction-item">
            <div className="transaction-info">
              <span className="transaction-icon">{tx.icon}</span>
              <div className="transaction-details">
                <div className="transaction-type">{tx.type}</div>
                <div className="transaction-date-time">
                  {tx.date} {tx.time}
                </div>
              </div>
            </div>
            <div className="transaction-amount">{tx.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
