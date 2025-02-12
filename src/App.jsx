import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GrilledCheese from "./components/grilledCheese";
import Layout from "./components/layout";
import MainContent from "./components/mainContent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout forcedLanguage="en">
              <MainContent />
            </Layout>
          }
        />
        <Route
          path="/jp"
          element={
            <Layout forcedLanguage="jp">
              <MainContent />
            </Layout>
          }
        />
        <Route
          path="/grilled-cheese"
          element={
            <Layout forcedLanguage="en">
              <GrilledCheese isJapanese={false} />
            </Layout>
          }
        />
        <Route
          path="/grilled-cheese/jp"
          element={
            <Layout forcedLanguage="jp">
              <GrilledCheese isJapanese={true} />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
