import Navbar from '@/src/ui/components/Navbar';
// import { useTranslations } from 'next-intl';
import FeaturesSection from './components/FeaturesSection';
import HeroArea from './components/HeroArea';
import Footer from '@/src/ui/components/Footer';
export const LandingPage = () => {
  // const t = useTranslations('HomePage');

  return (
    <>
      <div className='bg-white'>
        <Navbar />
        <HeroArea />
        <FeaturesSection />
        <Footer />
      </div>
    </>
  );
};
