import { Route, Routes, Link } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<section className="site-container py-28 text-center"><h1 className="text-3xl font-bold">هذه الصفحة غير متاحة</h1><Link to="/" className="button-primary mt-8">العودة إلى سليم</Link></section>} />
      </Route>
    </Routes>
  );
}
