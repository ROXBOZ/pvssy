import { Routes, Route } from "react-router-dom";
import "./styles/globals.css";
import { Navigate } from "react-router-dom";

// pages and components
import Home from "./pages/Home";
import About from "./pages/About";
import GererSoiMeme from "./pages/GererSoiMeme";
import TrouverDeLAide from "./pages/TrouverDeLAide";
import Shop from "./pages/Shop";
import Agenda from "./pages/Agenda";
import GeneralConditions from "./pages/GeneralConditions";
import Breadcrumbs from "./components/Breadcrumbs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Pains from "./components/Pains/Pains";
import Pain from "./components/Pains/Pain";
import EventsArchives from "./components/EventsArchives";
import Event from "./components/Agenda/Event";
import ScrollToTop from "./utils/ScrollToTop";
import Tutos from "./components/Tutos";
import Articles from "./components/Articles";
import Annuaire from "./components/Annuaire";
import Ressources from "./components/Ressources";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./pages/NotFound";
import PainLex from "./components/Pains/PainLex";
import AllLexique from "./components/AllLexique";
import AddEvent from "./components/User/Agenda/AddEvent";
import DeleteEvent from "./components/User/Agenda/DeleteEvent";
import ApproveEvent from "./components/User/Agenda/ApproveEvent";
//contexts
import { PainsContextProvider } from "./contexts/PainsContext";
import { EventsContextProvider } from "./contexts/eventsContext";
import { TermsContextProvider } from "./contexts/termsContext";
import { AuthContextProvider } from "./contexts/authContext";
// utils
import getToken from "./utils/getToken";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const token = getToken();
  return (
    <>
      <AuthContextProvider>
        <Header />
        <div className="main">
          <ScrollToTop />
          <Breadcrumbs />
          <EventsContextProvider>
            <PainsContextProvider>
              <TermsContextProvider>
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="a-propos" element={<About />} />
                  <Route path="gerer-soi-meme" element={<GererSoiMeme />} />
                  <Route path="gerer-soi-meme/douleurs" element={<Pains />} />
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
                    path="gerer-soi-meme/douleurs/:name/lexique/#:term"
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
                  <Route
                    path="trouver-de-l-aide"
                    element={<TrouverDeLAide />}
                  />
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
                  <Route path="creer-un-compte" element={<Signup />} />
                  <Route
                    path="profile"
                    element={<ProtectedRoute />}
                    key={token}
                  >
                    <Route path="ajouter" element={<AddEvent />} />
                    <Route path="approuver" element={<ApproveEvent />} />
                    <Route path="supprimer" element={<DeleteEvent />} />
                  </Route>
                  <Route
                    path="conditions-generales"
                    element={<GeneralConditions />}
                  />

                  <Route path="*" element={<NotFound />} />
                  <Route
                    path="*"
                    element={<Navigate to="/notfound" replace />}
                  />
                </Routes>
              </TermsContextProvider>
            </PainsContextProvider>
          </EventsContextProvider>
        </div>
        <Footer />
      </AuthContextProvider>
    </>
  );
}

export default App;
