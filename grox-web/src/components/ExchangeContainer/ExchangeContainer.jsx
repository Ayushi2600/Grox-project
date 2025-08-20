import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CaretDoubleDown } from '@phosphor-icons/react';
import {
  exchangeRates as staticExchangeRates,
  countryFlags,
  statsData,
  formatExchangeRate,
} from './exchangeData';
import './ExchangeContainer.scss';
import GroxLogo from './grox-logo.svg';
import Divider from './grox-divider.svg';
import { getFiatExchangeRates } from '../../store/features/exchangeRate/groxApi';

const ExchangeContainer = () => {
  const [groxAmount, setGroxAmount] = useState('1');
  const [showAllRates, setShowAllRates] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const prioritized = ['USD', 'USDT', 'NGN', 'EUR', 'GBP', 'CAD', 'ZAR'];

  const sortedCurrencies = useCallback(currencyList => {
    return currencyList.sort((a, b) => {
      const aIndex = prioritized.indexOf(a.currency.toUpperCase());
      const bIndex = prioritized.indexOf(b.currency.toUpperCase());

      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;

      return a.currency.localeCompare(b.currency); // sort rest alphabetically
    });
  }, []);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await getFiatExchangeRates();

        if (
          data &&
          typeof data === 'object' &&
          Object.values(data)[0]?.rate !== undefined
        ) {
          const mergedRates = Object.entries(data).map(
            ([currency, dataObj]) => {
              const match = staticExchangeRates.find(
                item => item.currency === currency
              );

              return {
                currency,
                rate: dataObj.rate,
                symbol: dataObj.symbol || match?.symbol || currency,
                icon: match?.icon || dataObj.flag || null, // use API flag if no local icon
              };
            }
          );
          let sortedList = sortedCurrencies(mergedRates);
          setExchangeRates(sortedList);
        } else {
          console.warn('Unexpected API format:', data);
          setExchangeRates([]);
        }
      } catch (error) {
        console.error('API error:', error);
        setExchangeRates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const handleToggleRates = () => {
    setShowAllRates(!showAllRates);
    setIsExpanded(!isExpanded);
    setSearchTerm('');
  };

  const handleGroxInputChange = e => {
    const value = e.target.value;
    if (value === '' || (parseFloat(value) >= 0 && !isNaN(value))) {
      setGroxAmount(value);
    }
  };

  const visibleRates = showAllRates
    ? exchangeRates || []
    : (exchangeRates || []).slice(0, 5);
  const groxAmountNum = parseFloat(groxAmount) || 0;

  const searchedItem = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return exchangeRates.filter(item =>
      item.currency.toLowerCase().includes(lowerSearch)
    );
  }, [exchangeRates, searchTerm]);

  const renderCurrency = useCallback(list => {
    return !list?.length ? (
      <p>No matching currencies found</p>
    ) : (
      list?.map(rate => (
        <div key={rate.currency} className='exchange-container__rate-item'>
          <div className='exchange-container__rate-info'>
            {rate.icon ? (
              <img
                src={rate.icon}
                alt={`${rate.currency} flag`}
                className='exchange-container__rate-icon'
              />
            ) : (
              <span className='exchange-container__rate-icon'>🌍</span>
            )}
            <span className='exchange-container__rate-currency'>
              {rate.currency}
            </span>
          </div>
          <div className='exchange-container__rate-value'>
            {rate.symbol} {formatExchangeRate(rate.rate, groxAmountNum)}
          </div>
        </div>
      ))
    );
  });

  return (
    <div className='exchange-container'>
      {/* Side Panel */}
      <div className='exchange-container__side'>
        <div className='exchange-container__stats'>
          <div className='exchange-container__stat'>
            <div className='exchange-container__stat-number'>
              {statsData.registeredUsers}
            </div>
            <div className='exchange-container__stat-label'>
              Registered users
            </div>
          </div>

          <div className='exchange-container__stat'>
            <div className='exchange-container__stat-number'>
              {statsData.countries}
            </div>
            <div className='exchange-container__stat-label'>countries</div>
            <div className='exchange-container__flags'>
              {countryFlags.slice(0, 6).map((flag, index) => (
                <div
                  key={index}
                  className='exchange-container__flag'
                  style={{
                    left: `${index * 24}px`,
                    zIndex: countryFlags.length - index,
                  }}
                >
                  <img
                    src={flag}
                    alt={`Country flag ${index + 1}`}
                    className='exchange-container__flag-image'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className='exchange-container__main'>
        {/* Input Section */}
        <div className='exchange-container__input-section'>
          <div className='exchange-container__grox-info'>
            <div className='exchange-container__grox-logo'>
              <img src={GroxLogo} alt='GROX Logo' />
            </div>
            <span className='exchange-container__grox-text'>GROX</span>
          </div>
          <input
            type='number'
            value={groxAmount}
            onChange={handleGroxInputChange}
            className='exchange-container__grox-input'
            placeholder='0'
            min='0'
            step='0.01'
          />
        </div>

        {/* Divider */}
        <div className='exchange-container__divider'>
          <img src={Divider} alt='Divider' />
        </div>

        {showAllRates && (
          <div className='exchange-container__input-section search-coin-input'>
            <input
              type='text'
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
              }}
              className='exchange-container__grox-input'
              placeholder='Country name or Currency'
            />
          </div>
        )}

        {/* Exchange List */}
        <div
          className={`exchange-container__rates-list ${showAllRates ? 'all-show' : ''}`}
        >
          {loading ? (
            <p>Loading exchange rates...</p>
          ) : (
            renderCurrency(searchTerm ? searchedItem : visibleRates)
          )}
        </div>

        {/* Toggle Button */}
        <div className='toggle-btn-container'>
          <button
            className={`exchange-container__toggle-button ${isExpanded ? 'exchange-container__toggle-button--expanded' : ''}`}
            onClick={handleToggleRates}
            disabled={loading}
          >
            <span>{showAllRates ? 'Hide list' : 'See all'}</span>
            <CaretDoubleDown
              size={16}
              className={`exchange-container__toggle-icon ${isExpanded ? 'exchange-container__toggle-icon--flipped' : ''}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExchangeContainer;
