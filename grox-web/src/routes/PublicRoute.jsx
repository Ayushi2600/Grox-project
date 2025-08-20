import {
  LandingPage,
  WaitlistModal,
  Login,
  CreateAccount,
} from './lazyRoute';

const publicRoutes = ({ openModal, isOpen, closeModal, handleSubmit }) => [
  {
    path: '/',
    element: (
      <>
        <LandingPage onJoinWaitlist={openModal} />
        <WaitlistModal
          isOpen={isOpen}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      </>
    ),
  },
  { path: '/login', element: <Login /> },
  { path: '/create-account', element: <CreateAccount /> },
];

export default publicRoutes;
