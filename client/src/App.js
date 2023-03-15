import { Routes, Route } from "react-router-dom";
import "./styles/globals.css";
import { Navigate } from "react-router-dom";

// pages and components
import Home from "./pages/Home";
import About from "./pages/About";
import SeSoigner from "./pages/SeSoigner";
import SInformer from "./pages/SInformer";
import Shop from "./pages/Shop";
import Agenda from "./pages/Agenda";
import GeneralConditions from "./pages/GeneralConditions";
import Breadcrumbs from "./components/Breadcrumbs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Pains from "./components/Pains/Pains";
import Pain from "./components/Pains/Pain";
import PainArticle from "./components/Pains/PainArticle";
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
import PainLexique from "./components/Pains/PainLexique";
import PainExercices from "./components/Pains/PainExercices";
import PainExtras from "./components/Pains/PainExtras";
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
import DonationBanner from "./components/DonationBanner";

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
                  <Route path="se-soigner" element={<SeSoigner />} />
                  <Route path="se-soigner/douleurs" element={<Pains />} />
                  <Route path="se-soigner/douleurs/:name" element={<Pain />}>
                    <Route path="medical" element={<PainArticle />} />
                    <Route path="sexologie" element={<PainArticle />} />
                  </Route>
                  <Route
                    path="se-soigner/ressources/tutos"
                    element={<Tutos />}
                  />
                  <Route
                    path="se-soigner/douleurs/:name/tutos"
                    element={<Tutos />}
                  />
                  <Route
                    path="se-soigner/ressources/lexique"
                    element={<AllLexique />}
                  />
                  <Route
                    path="se-soigner/douleurs/:name/lexique"
                    element={<PainLexique />}
                  />
                  <Route
                    path="se-soigner/douleurs/:name/lexique/#:term"
                    element={<PainLexique />}
                  />
                  <Route
                    path="se-soigner/douleurs/:name/exercices"
                    element={<PainExercices />}
                  />
                  <Route
                    path="se-soigner/douleurs/:name/extras"
                    element={<PainExtras />}
                  />
                  <Route
                    path="se-soigner/ressources/articles"
                    element={<Articles />}
                  />
                  <Route
                    path="se-soigner/douleurs/:name/articles"
                    element={<Articles />}
                  />
                  <Route
                    path="se-soigner/ressources"
                    element={<Ressources />}
                  />
                  <Route path="s-informer" element={<SInformer />} />
                  <Route path="s-informer/annuaire" element={<Annuaire />} />
                  <Route path="s-informer/annuaire/:name" element={<Pain />} />
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
        <DonationBanner />
        <Footer />
      </AuthContextProvider>
    </>
  );
}

export default App;
