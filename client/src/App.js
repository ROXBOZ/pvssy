import { Routes, Route } from "react-router-dom";
import "./styles/globals.css";

// pages and components
import Home from "./pages/Home";
import About from "./pages/About";
import GererSoiMeme from "./pages/GererSoiMeme";
import TrouverDeLAide from "./pages/TrouverDeLAide";
import Shop from "./pages/Shop";
import Agenda from "./pages/Agenda";
import GeneralConditions from "./pages/GeneralConditions";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Pains from "./components/Pains/Pains";
import Pain from "./components/Pains/Pain";
import EventsArchives from "./components/EventsArchives";
import Event from "./components/Agenda/Event";
import ScrollToTop from "./components/ScrollToTop";
import Tutos from "./components/Tutos";
import Articles from "./components/Articles";
import Annuaire from "./components/Annuaire";
import Ressources from "./components/Ressources";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import NotFound from "./pages/NotFound";
import Profile from "./components/Profile";
import PainLex from "./components/Pains/PainLex";
import AllLexique from "./components/AllLexique";
//contexts
import { PainsContextProvider } from "./contexts/PainsContext";
import { EventsContextProvider } from "./contexts/eventsContext";
import { TermsContextProvider } from "./contexts/termsContext";

function App() {
  return (
    <>
      {/* <authContextProvider> */}
      <Header />
      <div className="main">
        <ScrollToTop />
        <EventsContextProvider>
          <PainsContextProvider>
            <TermsContextProvider>
              <Routes>
                <Route index element={<Home />} />
                <Route path="a-propos" element={<About />} />
                <Route path="gerer-soi-meme" element={<GererSoiMeme />} />
                <Route path="gerer-soi-meme/douleurs" element={<Pains />} />

                {/* FIXME only works if from by clicking on the card */}
                <Route
                  path="gerer-soi-meme/douleurs/:name"
                  element={<Pain />}
                />

                <Route
                  path="gerer-soi-meme/ressources/tutos"
                  element={<Tutos />}
                />

                <Route
                  path="gerer-soi-meme/douleurs/:name/tutos"
                  element={<Tutos />}
                />

                <Route
                  path="gerer-soi-meme/ressources/lexique"
                  element={<AllLexique />}
                />

                <Route
                  path="gerer-soi-meme/douleurs/:name/lexique"
                  element={<PainLex />}
                />

                <Route
                  path="gerer-soi-meme/ressources/articles"
                  element={<Articles />}
                />

                <Route
                  path="gerer-soi-meme/douleurs/:name/articles"
                  element={<Articles />}
                />

                <Route
                  path="gerer-soi-meme/ressources"
                  element={<Ressources />}
                />

                <Route path="trouver-de-l-aide" element={<TrouverDeLAide />} />
                <Route
                  path="trouver-de-l-aide/annuaire"
                  element={<Annuaire />}
                />
                <Route
                  path="trouver-de-l-aide/annuaire/:name"
                  element={<Pain />}
                />
                <Route path="shop" element={<Shop />} />
                <Route path="agenda" element={<Agenda />} />
                <Route path="agenda/:title" element={<Event />} />
                <Route path="agenda/archives" element={<EventsArchives />} />
                <Route path="login" element={<Login />} />
                <Route path="logout" element={<Logout />} />
                <Route path="creer-un-compte" element={<Signup />} />
                <Route path="profil" element={<Profile />} />

                <Route path="*" element={<NotFound />} />

                <Route
                  path="conditions-generales"
                  element={<GeneralConditions />}
                />
              </Routes>
            </TermsContextProvider>
          </PainsContextProvider>
        </EventsContextProvider>
      </div>
      <Footer />
      {/* </authContextProvider> */}
    </>
  );
}

export default App;
