import BalanceCard from './components/BalanceCard';
import ActionButtons from './components/ActionButtons';
import Transactions from './components/Transactions';
import MarketInfo from './components/MarketInfo';

const MainContent = () => {
  return (
    <main className="main-content">
      <div className="main-top-section">
        <button className="main-top-button usdc-button">Buy & Sell your USDC</button>
        <button className="main-top-button invite-button">Invite & Earn $40</button>
        <div className="main-top-icons">
          <div className="progress-indicator">65%</div>
          <div className="icon-settings" />
          <div className="icon-notifications" />
          <div className="icon-user" />
        </div>
      </div>

      <div className="main-grid-top">
        <div className="main-grid-left">
          <BalanceCard />
        </div>
        <div className="main-grid-right">
          <ActionButtons />
        </div>
      </div>

      <div className="main-grid-bottom">
        <div className="main-grid-left">
          <Transactions />
        </div>
        <div className="main-grid-right">
          <MarketInfo />
        </div>
      </div>
    </main>
  );
};

export default MainContent;
