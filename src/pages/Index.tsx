import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MoodTracker from "@/components/MoodTracker";
import SharingWall from "@/components/SharingWall";
import CommunitySection from "@/components/CommunitySection";
import ShareThoughtsSection from "@/components/ShareThoughtsSection";
import CounselingSection from "@/components/CounselingSection";
import HabitTracker from "@/components/HabitTracker";
import DailyChecklist from "@/components/DailyChecklist";
import ResourcesSection from "@/components/ResourcesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <MoodTracker />
      <DailyChecklist />
      <SharingWall />
      <CommunitySection />
      <ShareThoughtsSection />
      <CounselingSection />
      <HabitTracker />
      <ResourcesSection />
      <Footer />
    </div>
  );
};

export default Index;
