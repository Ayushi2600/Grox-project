import { Spinner } from 'react-bootstrap';

export const Loader = props =>
  props.loading && (
    <div className='loader_style'>
      <Spinner animation='grow' />
      <span className='text-loading'>Loading...</span>
    </div>
  );
