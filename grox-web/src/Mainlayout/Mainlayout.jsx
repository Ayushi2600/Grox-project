import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './Mainlayout.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

function Mainlayout({ children }) {
  const location = useLocation();

  const mainLayoutAccess = ['/dashboard'];
  
  let isAccessableLayout = useMemo(() => {
    return mainLayoutAccess.includes(location.pathname);
  }, []);

  return (
    <>
      {isAccessableLayout && (
        <div className='main-layout'>
          <Container>
            <Row className='cstm-row'>
              <Col xs={3} xl={3} className='main-sidebar-col'>
                <Sidebar />
              </Col>
              <Col xs={9} xl={9}>
                {children}
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}

export default Mainlayout;
