import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import ToggleSwitch from "./pages/ToggleSwitch";

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/compound-component" element={<Layout/>}>
          <Route path="toggle-switch-app" element={<ToggleSwitch/>} />
        </Route>
      </Routes>
    </Router>
  );
}
