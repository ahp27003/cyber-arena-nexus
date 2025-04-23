import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout
import AppLayout from "./components/layout/AppLayout";

// Pages
import HomePage from "./pages/HomePage";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Profile Pages
import Profile from "./pages/profile/Profile";
import ProfileSetup from "./pages/profile/ProfileSetup";

// Feature Pages
import Players from "./pages/players/Players";
import Messages from "./pages/messages/Messages";
import Settings from "./pages/settings/Settings";

// Other
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Home Page - Public */}
          <Route path="/" element={<HomePage />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* App Routes - Protected */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="/app/profile" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/setup" element={<ProfileSetup />} />
            <Route path="players" element={<Players />} />
            <Route path="messages" element={<Messages />} />
            <Route path="messages/:id" element={<Messages />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
