import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import './styles/main.scss';
import Cat from './pages/Cat';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/:id" element={<Cat />} />
  </Routes>
);

const WrappedApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default WrappedApp;
