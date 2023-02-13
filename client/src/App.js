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
import Agenda from "./pages/Agenda";
import EventsArchives from "./components/EventsArchives";
import Event from "./components/Agenda/Event";
import About from "./pages/About";
import ScrollToTop from "./components/ScrollToTop";
import Tutos from "./components/Tutos";
import Articles from "./components/Articles";
import Annuaire from "./components/Annuaire";
import Ressources from "./components/Ressources";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddEvent from "./components/AddEvent";
//contexts
import { PainsContextProvider } from "./contexts/PainsContext";
import { EventsContextProvider } from "./contexts/eventsContext";

function App() {
  return (
    <>
      <Header />
      <div className="main">
        <ScrollToTop />
        <EventsContextProvider>
          <PainsContextProvider>
            <Routes>
              <Route index element={<Home />} />
              <Route path="a-propos" element={<About />} />
              <Route path="gerer-soi-meme" element={<GererSoiMeme />} />
              <Route path="gerer-soi-meme/douleurs" element={<Pains />} />
              <Route path="gerer-soi-meme/douleurs/:name" element={<Pain />} />
              <Route
                path="gerer-soi-meme/douleurs/tutos/:name"
                element={<Pain />}
              />
              <Route
                path="gerer-soi-meme/douleurs/articles/:name"
                element={<Pain />}
              />
              <Route
                path="gerer-soi-meme/douleurs/lexique/:name"
                element={<Pain />}
              />
              <Route
                path="gerer-soi-meme/ressources"
                element={<Ressources />}
              />
              <Route
                path="gerer-soi-meme/ressources/tutos"
                element={<Tutos />}
              />
              <Route
                path="gerer-soi-meme/ressources/articles"
                element={<Articles />}
              />
              <Route path="trouver-de-l-aide" element={<TrouverDeLAide />} />
              <Route path="trouver-de-l-aide/annuaire" element={<Annuaire />} />
              <Route
                path="trouver-de-l-aide/annuaire/:name"
                element={<Pain />}
              />
              <Route path="shop" element={<Shop />} />
              <Route path="agenda" element={<Agenda />} />
              <Route path="agenda/:title" element={<Event />} />
              <Route path="agenda/archives" element={<EventsArchives />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="nouvel-evenement" element={<AddEvent />} />
            </Routes>
          </PainsContextProvider>
        </EventsContextProvider>
      </div>
      <Footer />
    </>
  );
}

export default App;
