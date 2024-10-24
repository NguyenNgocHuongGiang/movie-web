import { Suspense } from 'react';
import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import PageNotFound from './templates/PageNotFound/PageNotFound';
import { renderRoutes } from './routes/routes';
import Loading from './components/Loading/Loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ToastContainer position="top-right"/>

      <Routes>
        <Route path="/admin" element={<Navigate replace to="/admin/dashboard" />} />
        {renderRoutes()}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
