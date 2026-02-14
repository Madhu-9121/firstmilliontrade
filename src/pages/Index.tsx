import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

export default function Index() {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
    </Layout>
  );
}
