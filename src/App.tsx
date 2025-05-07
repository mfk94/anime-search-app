import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import DetailsPage from "./pages/DetailsPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/anime/:id" element={<DetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
