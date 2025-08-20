const BusinessCTA = ({ onClick }) => (
  <div className='for-businesses__container'>
    <div className='for-businesses__container__pill'>
      <p>For Businesses</p>
    </div>
    <div className='for-businesses__container__text'>
      <h4 className='for-businesses__container__title'>
        Power Your Pocket. <br /> Or Your Platform.
      </h4>
      <p>
        Pay anyone or move money across borders and get paid anywhere & fast! You can even create your own stablecoin.
      </p>
    </div>
    <button className='for-businesses__container__button' onClick={onClick}>
      Create Free Business Account
    </button>
  </div>
);

export default BusinessCTA;