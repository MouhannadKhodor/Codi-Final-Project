import { withRouter } from 'react-router-dom';
import SessionProvider from './Components/session/SessionProvider';
import Routes from './Components/Routes';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div className="app">
      <SessionProvider>
        <Routes />
      </SessionProvider>
      <ToastContainer />
    </div>
  );
}

export default withRouter(App);