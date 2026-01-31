import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import CoursesPreview from '@/components/home/CoursesPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CertificatePath from '@/components/home/CertificatePath';

export default function Index() {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <CoursesPreview />
      <CertificatePath />
      <TestimonialsSection />
    </Layout>
  );
}
