import { Link, createBrowserRouter } from "react-router-dom";
import MainLayout        from "../components/layout/MainLayout";
import HomePage          from "../pages/Home";
import ExplorePage       from "../pages/Explore/index";
import AICompassPage     from "../pages/AI/Compass/CompassPage";
import CompassResultPage from "../pages/AI/Compass/CompassResultPage";
import JourneyBuilderPage from "../pages/AI/Journey/JourneybuilderPage";
import JourneyResultPage  from "../pages/AI/Journey/JourneyresultPage";
import AuthPage           from "../pages/Auth/AuthPage";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage";
import ResetPasswordPage  from "../pages/Auth/ResetPasswordPage";
import WorkshopsPage      from "../pages/Workshops/WorkshopsPage";
import WorkshopBookingPage from "../pages/Workshops/WorkshopBookingPage";
import MyBookingsPage     from "../pages/Workshops/MyBookingsPage";
import BookingConfirmedPage from "../pages/Workshops/BookingConfirmedPage";
import CraftDetailPage    from "../pages/Craft/CraftDetailPage";
import ArtisanProfilePage from "../pages/Artisan/ArtisanProfilePage";
import JournalPage        from "../pages/Journal/index";
import NewJournalPage     from "../pages/Journal/NewJournalPage";
import ProfilePage        from "../pages/Profile/index";
import CollectionsPage    from "../pages/Collections/index";
import AboutPage          from "../pages/About/index";
import CollectionDetailPage from "../pages/Collections/CollectionDetailPage";
import ExploreDetailPage from "../pages/Explore/ExploreDetailPage";
import TermsPage from "../pages/Auth/TermsPage";
import AdminPage from "../pages/Admin/AdminPage";

const Placeholder = ({ name }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-2">
      <p className="font-mono text-sm text-copper uppercase tracking-widest">Coming Soon</p>
      <h1 className="font-display font-bold text-4xl text-primary">{name}</h1>
    </div>
  </div>
);

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF7F2" }}>
    <div className="text-center space-y-4">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[3px] text-copper">404</p>
      <h1 className="font-display font-bold text-5xl text-primary">Page not found</h1>
      <p className="font-body text-sm text-ink-muted">The trail you followed doesn't exist.</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-primary-light transition-colors"
      >
        Back to Home
      </Link>
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout><HomePage /></MainLayout>,
  },
  {
    path: "/explore",
    element: <MainLayout><ExplorePage /></MainLayout>,
  },
  { path: "/explore/:slug", element: <MainLayout><ExploreDetailPage /></MainLayout> },
  {
    path: "/ai/compass",
    element: <MainLayout><AICompassPage /></MainLayout>,
  },
  {
    path: "/ai/compass/result",
    element: <MainLayout><CompassResultPage /></MainLayout>,
  },
  {
    path: "/ai/journey-builder",
    element: <MainLayout><JourneyBuilderPage /></MainLayout>,
  },
  {
    path: "/ai/journey-builder/result",
    element: <MainLayout><JourneyResultPage /></MainLayout>,
  },
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/signup",
    element: <AuthPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPasswordPage />,
  },
  { path: "/terms", element: <MainLayout><TermsPage /></MainLayout> },
  {
    path: "/workshops",
    element: <MainLayout><WorkshopsPage /></MainLayout>,
  },
  { path: "/workshops/book/:id", element: <MainLayout><WorkshopBookingPage /></MainLayout> },
  {
    path: "/bookings",
    element: <MainLayout><MyBookingsPage /></MainLayout>,
  },
  {
    path: "/bookings/confirmed",
    element: <MainLayout><BookingConfirmedPage /></MainLayout>,
  },
  {
    path: "/craft/:slug",
    element: <MainLayout><CraftDetailPage /></MainLayout>,
  },
  
  { path: "/artisans/:id", element: <MainLayout><ArtisanProfilePage /></MainLayout> },
 
  {
    path: "/journal",
    element: <MainLayout><JournalPage /></MainLayout>,
  },
  {
    path: "/journal/new",
    element: <MainLayout><NewJournalPage /></MainLayout>,
  },
  {
    path: "/profile",
    element: <MainLayout><ProfilePage /></MainLayout>,
  },
  {
    path: "/collections",
    element: <MainLayout><CollectionsPage /></MainLayout>,
  },
  {
  path: "/collections/:id",
  element: <MainLayout><CollectionDetailPage /></MainLayout>,
},
  {
    path: "/about",
    element: <MainLayout><AboutPage /></MainLayout>,
  },
  
{ path: "/admin", element: <MainLayout><AdminPage /></MainLayout> },
{
    path: "*",
    element: <MainLayout><NotFound /></MainLayout>,
  },
]);

export default router;