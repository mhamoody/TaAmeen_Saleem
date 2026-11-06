import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CircleHelp, UserRound, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Modal from '../components/ui/Modal.jsx';

const info = {
  account: { title: 'حسابك في سليم', Icon: UserRound, description: 'سيجمع حسابك عروضك السابقة ووثائقك وطلبات الخدمة في مكان واحد. تسجيل الدخول والتحقق من الهوية غير متاحين في هذا التصور.' },
  help: { title: 'نحن هنا لتوضيح البداية', Icon: CircleHelp, description: 'يمكنك استكشاف المسارات والأسئلة الشائعة الآن. ستُضاف قنوات التواصل وطلبات المساعدة عند إطلاق الخدمة؛ لا يتم إرسال أي طلب من هذه الصفحة.' },
  privacy: { title: 'الخصوصية والشروط', Icon: ShieldCheck, description: 'هذا نموذج لاستعراض واجهة سليم. لا يطلب بيانات الهوية أو الدفع، ولا ينشئ حساباً أو وثيقة. ستُعرض الشروط وسياسة الخصوصية المعتمدتان قبل استخدام الخدمات الفعلية.' },
};

export default function MainLayout() {
  const [activeInfo, setActiveInfo] = useState(null);
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      const frame = requestAnimationFrame(() => target?.scrollIntoView({ behavior: 'instant' }));
      return () => cancelAnimationFrame(frame);
    }
  }, [location.pathname, location.hash, location.key]);
  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);
  const content = info[activeInfo];
  return (
    <div id="top">
      <a href="#main-content" className="fixed start-4 top-3 z-50 -translate-y-24 rounded-lg bg-brand px-5 py-3 text-sm text-white focus:translate-y-0">تجاوز إلى المحتوى</a>
      <Navbar onAccount={() => setActiveInfo('account')} />
      <main id="main-content" tabIndex={-1} className="outline-none"><Outlet /></main>
      <Footer onInfo={setActiveInfo} />
      <Modal open={Boolean(content)} onClose={() => setActiveInfo(null)} title={content?.title || ''} id="info-title">
        {content && <><content.Icon className="mb-5 text-green" size={34} strokeWidth={1.5} /><p className="text-sm leading-9 text-muted">{content.description}</p><button className="button-primary mt-7" onClick={() => setActiveInfo(null)}>فهمت، شكراً</button></>}
      </Modal>
    </div>
  );
}
