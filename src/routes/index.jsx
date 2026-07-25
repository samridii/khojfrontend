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

const Placeholder = ({ name }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-2">
      <p className="font-mono text-sm text-copper uppercase tracking-widest">Coming Soon</p>
      <h1 className="font-display font-bold text-4xl text-primary">{name}</h1>
    </div>
  </div>
);

const router = createBrowserRouter([
  { path: "/",                          element: <MainLayout><HomePage /></MainLayout> },
  { path: "/explore",                   element: <MainLayout><ExplorePage /></MainLayout> },
  { path: "/ai/compass",                element: <MainLayout><AICompassPage /></MainLayout> },
  { path: "/ai/compass/result",         element: <MainLayout><CompassResultPage /></MainLayout> },
  { path: "/ai/journey-builder",        element: <MainLayout><JourneyBuilderPage /></MainLayout> },
  { path: "/ai/journey-builder/result", element: <MainLayout><JourneyResultPage /></MainLayout> },
  { path: "/login",                     element: <AuthPage /> },
  { path: "/signup",                    element: <AuthPage /> },
  { path: "/forgot-password",           element: <ForgotPasswordPage /> },
  { path: "/reset-password/:token",     element: <ResetPasswordPage /> },
  { path: "/workshops",                 element: <MainLayout><Placeholder name="Workshops" /></MainLayout> },
  { path: "/workshops/:id",             element: <MainLayout><Placeholder name="Workshop Detail" /></MainLayout> },
  { path: "/artisans",                  element: <MainLayout><Placeholder name="Artisans" /></MainLayout> },
  { path: "/artisans/:id",              element: <MainLayout><Placeholder name="Artisan Profile" /></MainLayout> },
  { path: "/collections",              element: <MainLayout><Placeholder name="My Collections" /></MainLayout> },
  { path: "/journeys",                  element: <MainLayout><Placeholder name="My Journeys" /></MainLayout> },
  { path: "/journal",                   element: <MainLayout><Placeholder name="My Journal" /></MainLayout> },
  { path: "/profile",                   element: <MainLayout><Placeholder name="My Profile" /></MainLayout> },
  { path: "/about",                     element: <MainLayout><Placeholder name="About Us" /></MainLayout> },
  { path: "/bookings",                  element: <MainLayout><Placeholder name="My Bookings" /></MainLayout> },
]);

export default router;