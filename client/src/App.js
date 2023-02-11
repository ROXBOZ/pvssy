import { Routes, Route } from "react-router-dom";
import "./styles/globals.css";

// pages and components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TrouverDeLAide from "./pages/TrouverDeLAide";
import GererSoiMeme from "./pages/GererSoiMeme";
import Pains from "./components/Pains/Pains";
import Pain from "./components/Pains/Pain";
import Shop from "./pages/Shop";
import Connect from "./pages/Agenda";
import EventsArchives from "./pages/EventsArchives";
import Event from "./components/Agenda/Event";
import About from "./pages/About";
import ScrollToTop from "./components/ScrollToTop";
import Tutos from "./components/Tutos";
import Articles from "./components/Articles";
import Annuaire from "./components/Annuaire";

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

              <Route path="gerer-soi-meme" element={<GererSoiMeme />} />
              <Route path="gerer-soi-meme/douleurs" element={<Pains />} />
              <Route path="gerer-soi-meme/douleurs/:name" element={<Pain />} />

              <Route path="gerer-soi-meme/tutos" element={<Tutos />} />
              <Route path="gerer-soi-meme/articles" element={<Articles />} />

              <Route path="trouver-de-l-aide" element={<TrouverDeLAide />} />
              <Route path="trouver-de-l-aide/annuaire" element={<Annuaire />} />

              <Route path="shop" element={<Shop />} />
              <Route path="agenda" element={<Connect />} />
              <Route path="agenda/:title" element={<Event />} />
              <Route path="agenda/archives" element={<EventsArchives />} />
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
