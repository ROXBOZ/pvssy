import { Routes, Route, useLocation } from "react-router-dom";
import "./styles/globals.css";
import { Navigate } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Donate from "./components/Donate";
import SeSoigner from "./components/SeSoigner";
import SInformer from "./components/SInformer";
import Shop from "./components/Shop";
import Agenda from "./components/Agenda";
import GeneralConditions from "./components/GeneralConditions";
import Breadcrumbs from "./components/Breadcrumbs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Pains from "./components/Pains/Pains";
import Pain from "./components/Pains/Pain";
import PainArticle from "./components/Pains/PainArticle";
import ScrollToTop from "./utils/ScrollToTop";
import Annuaire from "./components/Annuaire";
import Ressources from "./components/Ressources";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";
import PainLexique from "./components/Pains/PainLexique";
import PainExercices from "./components/Pains/PainExercices";
import PainSuggestions from "./components/Pains/PainSuggestions";
import AddEvent from "./components/User/Agenda/AddEvent";
import DeleteEvent from "./components/User/Agenda/DeleteEvent";
import ApproveEvent from "./components/User/Agenda/ApproveEvent";
import Lexique from "./components/Lexique";
import Accessibility from "./components/Accessibility";

//contexts
import { PainsContextProvider } from "./contexts/PainsContext";
import { EventsContextProvider } from "./contexts/eventsContext";
import { TermsContextProvider } from "./contexts/termsContext";
import { AuthContextProvider } from "./contexts/authContext";
// utils
import getToken from "./utils/getToken";
import ProtectedRoute from "./routes/ProtectedRoute";
import Exercises from "./components/Exercises";
import Medias from "./components/Medias";
import { ContactsContextProvider } from "./contexts/contactsContext";
import { useRef } from "react";

function App() {
  const token = getToken();
  const location = useLocation();
  const grdRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    grdRef.current.style.setProperty("--x", x + "px");
    grdRef.current.style.setProperty("--y", y + "px");
  };
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
  const handleMouseLeave = (e) => {
    grdRef.current.style.setProperty("--size", "0");
  };
  const debouncedHandleMouseMove = debounce(handleMouseMove, 100);
  grdRef.current?.addEventListener("mousemove", debouncedHandleMouseMove);
  grdRef.current?.addEventListener("mouseleave", handleMouseLeave);

  return (
    <>
      <AuthContextProvider>
        {location.pathname === "/" ? (
          <>
            <div
              className="landing-view"
              ref={grdRef}
              onMouseMove={handleMouseMove}
            >
              <Header />
              <div className="title-container">
                <h1>
                  S’informer sur ses douleurs pour se réapproprier son corps et
                  sa sexualité
                </h1>
              </div>
            </div>
          </>
        ) : (
          <Header />
        )}

        <div className="main">
          <ScrollToTop />
          <Breadcrumbs />
          <ContactsContextProvider>
            <EventsContextProvider>
              <PainsContextProvider>
                <TermsContextProvider>
                  <Routes>
                    <Route index element={<Home />} />
                    <Route path="a-propos" element={<About />} />
                    <Route path="se-soigner" element={<SeSoigner />} />
                    <Route path="s-informer/douleurs" element={<Pains />} />
                    <Route path="s-informer/douleurs/:name" element={<Pain />}>
                      <Route path="medical" element={<PainArticle />} />
                      <Route path="sexologie" element={<PainArticle />} />
                    </Route>

                    <Route
                      path="s-informer/ressources/glossaire"
                      element={<Lexique />}
                    />
                    <Route
                      path="s-informer/ressources/exercices"
                      element={<Exercises />}
                    />
                    <Route
                      path="s-informer/ressources/litterature-et-medias"
                      element={<Medias />}
                    />
                    <Route
                      path="s-informer/douleurs/:name/glossaire"
                      element={<PainLexique />}
                    />
                    <Route
                      path="s-informer/douleurs/:name/glossaire/#:term"
                      element={<PainLexique />}
                    />
                    <Route
                      path="s-informer/douleurs/:name/exercices"
                      element={<PainExercices />}
                    />
                    <Route
                      path="s-informer/douleurs/:name/recommendations"
                      element={<PainSuggestions />}
                    />
                    <Route
                      path="s-informer/ressources"
                      element={<Ressources />}
                    />
                    <Route path="s-informer" element={<SInformer />} />
                    <Route
                      path="s-informer/ressources/annuaire"
                      element={<Annuaire />}
                    />
                    <Route
                      path="s-informer/annuaire/:name"
                      element={<Pain />}
                    />
                    <Route path="shop" element={<Shop />} />
                    <Route path="agenda" element={<Agenda />} />
                    <Route path="login" element={<Login />} />
                    <Route path="creer-un-compte" element={<Signup />} />
                    <Route path="faire-un-don" element={<Donate />} />

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

                    <Route path="accessibilite" element={<Accessibility />} />

                    <Route path="*" element={<NotFound />} />
                    <Route
                      path="*"
                      element={<Navigate to="/notfound" replace />}
                    />
                  </Routes>
                </TermsContextProvider>
              </PainsContextProvider>
            </EventsContextProvider>
          </ContactsContextProvider>
        </div>

        <Footer />
      </AuthContextProvider>
    </>
  );
}

export default App;
