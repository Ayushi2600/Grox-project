import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <p className="error-description">
          Opps!, The the page you are looking for is not here.
        </p>

        <div className="error-actions">
          <Button
            onClick={goHome}
            variant="primary"
            size="md"
          >
            Go to Back Home
          </Button>


        </div>
      </div>
    </div>
  );
};

export default NotFound;