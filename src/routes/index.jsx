import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/Home";
import ExplorePage from "../pages/Explore/index";
import AICompassPage from "../pages/AI/Compass/CompassPage";
import CompassResultPage from "../pages/AI/Compass/CompassResultPage";
import JourneyBuilderPage from "../pages/AI/Journey/JourneybuilderPage";
import JourneyResultPage from "../pages/AI/Journey/JourneyresultPage";
import AuthPage from "../pages/Auth/AuthPage";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/Auth/ResetPasswordPage";
import WorkshopsPage from "../pages/Workshops/WorkshopsPage";
import WorkshopBookingPage from "../pages/Workshops/WorkshopBookingPage";
import MyBookingsPage from "../pages/Workshops/MyBookingsPage";
import BookingConfirmedPage from "../pages/Workshops/BookingConfirmedPage";
import CraftDetailPage from "../pages/Craft/CraftDetailPage";
import ArtisanStoryPage from "../pages/Artisian/ArtisanStoryPage";
import JournalPage    from "../pages/Journal/index";
import NewJournalPage from "../pages/Journal/NewJournalPage";
import ProfilePage    from "../pages/Profile/index";

const Placeholder = ({ name }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-2">
      <p className="font-mono text-sm text-copper uppercase tracking-widest">Coming Soon</p>
      <h1 className="font-display font-bold text-4xl text-primary">{name}</h1>
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
  {
    path: "/workshops",
    element: <MainLayout><WorkshopsPage /></MainLayout>,
  },
  {
    path: "/workshops/book/:id",
    element: <MainLayout><WorkshopBookingPage /></MainLayout>,
  },
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
  {
    path: "/stories/:slug",
    element: <MainLayout><ArtisanStoryPage /></MainLayout>,
  },
  {
    path: "/artisans",
    element: <MainLayout><Placeholder name="Artisans" /></MainLayout>,
  },
  {
    path: "/artisans/:id",
    element: <MainLayout><Placeholder name="Artisan Profile" /></MainLayout>,
  },
  {
    path: "/collections",
    element: <MainLayout><Placeholder name="My Collections" /></MainLayout>,
  },
  {
    path: "/journeys",
    element: <MainLayout><Placeholder name="My Journeys" /></MainLayout>,
  },
  { path: "/journal",     element: <MainLayout><JournalPage /></MainLayout> },
{ path: "/journal/new", element: <MainLayout><NewJournalPage /></MainLayout> },
{ path: "/profile",     element: <MainLayout><ProfilePage /></MainLayout> },
  {
    path: "/about",
    element: <MainLayout><Placeholder name="About Us" /></MainLayout>,
  },
]);

export default router;