const ActionButtons = () => {
  const actions = [
    { label: 'Fund Wallet', icon: '' },
    { label: 'Send Money', icon: '' },
    { label: 'P2P Market', icon: '' },
    { label: 'Stake Grox', icon: '' },
  ];

  return (
    <div className="action-buttons">
      {actions.map((action, index) => (
        <div
          key={index}
          className="action-tile"
        >
          <div className="icon">{action.icon}</div>
          <div className="label">{action.label}</div>
        </div>
      ))}
    </div>
  );
};

export default ActionButtons;
