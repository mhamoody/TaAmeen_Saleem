import { BadgeCheck, Car, HandHeart, HeartPulse, House, Plane, Ship, Sprout, Stethoscope, Truck } from 'lucide-react';
import { insuranceProducts } from './insurance.js';
import motor from '../assets/hero-motor.png';
import fleet from '../assets/hero-fleet.png';
import businessHealth from '../assets/hero-business-health.png';
import malpractice from '../assets/hero-malpractice.png';
import domestic from '../assets/hero-domestic.png';
import travel from '../assets/hero-travel.png';
import residency from '../assets/hero-residency.png';
import savings from '../assets/hero-savings.png';
import cargo from '../assets/hero-cargo.png';
import home from '../assets/hero-home.png';

// Illustrative local artwork, not actual clients, insurers or a Saleem office.
const imagery = {
  motor: { src: motor, Icon: Car, alt: 'مركبة بيضاء أمام منزل بطابع سعودي، تحت أشجار النخيل' },
  fleet: { src: fleet, Icon: Truck, alt: 'أسطول مركبات تجارية بيضاء أمام منشأة حديثة' },
  'business-health': { src: businessHealth, Icon: HeartPulse, alt: 'طبيبة تتحدث مع موظفين في عيادة مضيئة' },
  malpractice: { src: malpractice, Icon: Stethoscope, alt: 'طبيب يراجع ملفاً في غرفة استشارة طبية' },
  domestic: { src: domestic, Icon: HandHeart, alt: 'عاملة منزلية وصاحبة المنزل تتحدثان أثناء تنسيق الزهور' },
  travel: { src: travel, Icon: Plane, alt: 'حقائب سفر أمام نافذة مطار تطل على طائرة' },
  residency: { src: residency, Icon: BadgeCheck, alt: 'شخصان ينظران من شرفة منزل إلى أفق مدينة الرياض' },
  savings: { src: savings, Icon: Sprout, alt: 'عائلة تخطط للمستقبل حول طاولة عليها حصالة ونبتة' },
  cargo: { src: cargo, Icon: Ship, alt: 'سفينة حاويات وشاحنة نقل بضائع في ميناء تجاري' },
  home: { src: home, Icon: House, alt: 'مدخل منزل بحديقة نخيل وواجهة حجرية دافئة' },
};

export const heroSlides = insuranceProducts.map(({ id, title }) => ({ id, title, ...imagery[id] }));
