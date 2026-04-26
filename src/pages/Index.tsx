import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HighlightsBar from "@/components/HighlightsBar";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import AdmissionsSection from "@/components/AdmissionsSection";
import TestimonialSection from "@/components/TestimonialSection";
import ContactSection from "@/components/ContactSection";
import SocialFeedSection from "@/components/SocialFeedSection";
import LeadershipSection from "@/components/LeadershipSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <HighlightsBar />
      <AboutSection />
      <FeaturesSection />
      <AdmissionsSection />
      <TestimonialSection />
      <SocialFeedSection />
      <LeadershipSection />
      <ContactSection />
    </main>
    <Footer />
    <WhatsAppButton />
  </>
);

export default Index;
