const marketInfo = [
  {
    title: 'Latest Mint',
    value: '+845,000 GROX',
    time: '2 hours ago',
    extraClass: 'text-success',
    subtext: 'Asset investments',
  },
  {
    title: 'Last Burn',
    value: '-25,000 GROX',
    time: '32 hours ago',
    extraClass: 'text-danger',
    subtext: 'Demand adjustment',
  },
  {
    title: 'Total Supply',
    value: '75.4M GROX',
    time: '',
    extraClass: 'text-primary',
    subtext: '',
  },
  {
    title: 'Market Cap',
    value: '$100.88M',
    time: '',
    extraClass: 'text-primary',
    subtext: '',
  },
];

const MarketInfo = () => {
  return (
    <div className="market-info-container">
      <h3 className="market-info-title">Market Information</h3>

      <div className="market-info-grid">
        {marketInfo.map((info, index) => (
          <div key={index} className="market-info-card">
            <div className="market-info-label">{info.title}</div>
            <div className={`market-info-value ${info.extraClass}`}>
              {info.value}
            </div>
            {info.time && (
              <div className="market-info-time">{info.time}</div>
            )}
            {info.subtext && (
              <div className="market-info-subtext">{info.subtext}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketInfo;
