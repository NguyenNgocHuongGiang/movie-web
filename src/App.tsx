import { Suspense } from 'react';
import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import PageNotFound from './templates/PageNotFound/PageNotFound';
import { renderRoutes } from './routes/routes';
// import Login from './pages/Login';
import Loading from './components/Loading/Loading';
// import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
// import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/admin" element={<Navigate replace to="/admin/dashboard" />} />
        {renderRoutes()}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
