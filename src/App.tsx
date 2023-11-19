import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import './styles/main.scss';
import Cat from './pages/Cat';
import { CatBreedContextProvider } from './context/catBreedContext';
import { NotificationContextProvider } from './context/notificationContext';
import Notification from './components/Notification';

const App = () => (
  <NotificationContextProvider>
    <CatBreedContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Cat />} />
      </Routes>
      <Notification />
    </CatBreedContextProvider>
  </NotificationContextProvider>
);

const WrappedApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default WrappedApp;
