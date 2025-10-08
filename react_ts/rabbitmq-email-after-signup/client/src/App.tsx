import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "@/presentation/layouts/AuthLayout";
import LoginPage from "@/presentation/pages/auth/LoginPage";
import SignupPage from "@/presentation/pages/auth/SignupPage";
import VerifyOTP from "@/presentation/pages/auth/VerifyOTP";
import ForgotPassword from "./presentation/pages/auth/ForgotPassword";

import { Provider } from "react-redux";
import { store } from "./presentation/state/store";
import { Toaster } from "@/presentation/components/ui/sonner"

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index path="" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="otp-verify" element={<VerifyOTP />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster/>
    </Provider>
  );
};

export default App;
