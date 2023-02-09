import { Routes, Route } from "react-router-dom";
import "./styles/globals.css";

// pages and components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Agir from "./pages/Agir";
import Consulter from "./components/Consulter";
import Evaluer from "./components/Evaluer";
import Pains from "./components/Pains/Pains";
import Tutos from "./components/Tutos";
import Pain from "./components/Pains/Pain";
import Ressources from "./pages/Ressources";
import Annuaire from "./components/Annuaire";
import Shop from "./pages/Shop";
import Connect from "./pages/Connect";
import EventsArchives from "./pages/EventsArchives";

import Event from "./components/Connect/Event";
import About from "./pages/About";
import ScrollToTop from "./components/ScrollToTop";

//contexts
import { PainsContextProvider } from "./contexts/PainsContext";
import { EventsContextProvider } from "./contexts/eventsContext";

function App() {
  return (
    <>
      <Header />
      <div className="main">
        {/* <Breadcrumbs /> */}
        <ScrollToTop />
        <EventsContextProvider>
          <PainsContextProvider>
            <Routes>
              <Route index element={<Home />} />
              <Route path="agir" element={<Agir />} />
              <Route path="consulter" element={<Consulter />} />
              <Route path="evaluer" element={<Evaluer />} />
              <Route path="douleurs" element={<Pains />} />
              <Route path="douleurs/:name" element={<Pain />} />
              <Route path="tutos" element={<Tutos />} />
              <Route path="ressources" element={<Ressources />} />
              <Route path="annuaire" element={<Annuaire />} />
              <Route path="shop" element={<Shop />} />
              <Route path="connect" element={<Connect />} />
              <Route path="connect/:title" element={<Event />} />
              <Route path="connect/archives" element={<EventsArchives />} />
              <Route path="a-propos" element={<About />} />
            </Routes>
          </PainsContextProvider>
        </EventsContextProvider>
      </div>
      <Footer />
    </>
  );
}

export default App;
