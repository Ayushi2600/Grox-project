import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import useWaitlistModal from './hooks/useWaitlistModal';
import publicRoutes from './routes/PublicRoute';
import privateRoutes from './routes/PrivateRoute';
import { Loader } from './loader';
import './styles/main.scss';
import './styles/common.scss';

function App() {
  const { isOpen, openModal, closeModal, handleSubmit } = useWaitlistModal();

  const allRoutes = [
    ...publicRoutes({ openModal, isOpen, closeModal, handleSubmit }),
    ...privateRoutes(),
  ];

  return (
    <div className='App'>
      <Router>
        <Suspense fallback={<Loader loading={true} />}>
          <Routes>
            {allRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
