import { Link } from 'react-router-dom';
import logo from '../assets/saleem-logo.jpg';

export default function Logo({ onClick, className = '' }) {
  return <Link to="/" aria-label="سليم — الصفحة الرئيسية" onClick={() => { onClick?.(); window.scrollTo({ top: 0, behavior: 'instant' }); }} className={`inline-flex shrink-0 rounded-md ${className}`}><img src={logo} alt="سليم، تأمينك أسهل" width="690" height="259" className="h-auto w-32 object-contain sm:w-36" /></Link>;
}
