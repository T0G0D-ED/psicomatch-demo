import { AppProvider, useApp } from './context/AppContext';
import { PsychologistB2BView } from './components/b2b/PsychologistB2BView';
import { BookingsDrawer } from './components/booking/BookingsDrawer';
import { ChatbotWidget } from './components/chatbot/ChatbotWidget';
import { DirectoryView } from './components/directory/DirectoryView';
import { PsychologistModal } from './components/directory/PsychologistModal';
import { HeroSection } from './components/landing/HeroSection';
import { MoodOrientationWidget } from './components/landing/MoodOrientationWidget';
import { ValuePillars } from './components/landing/ValuePillars';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { MatchWizard } from './components/match/MatchWizard';

function MainContent() {
  const { activeView } = useApp();

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <Navbar />

      <main className="flex-1">
        {activeView === 'landing' && (
          <>
            <HeroSection />
            <MoodOrientationWidget />
            <ValuePillars />
          </>
        )}
        {activeView === 'match' && <MatchWizard />}
        {activeView === 'directory' && <DirectoryView />}
        {activeView === 'b2b' && <PsychologistB2BView />}
      </main>

      <Footer />

      <PsychologistModal />
      <BookingsDrawer />
      <ChatbotWidget />
    </div>
  );
}

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
