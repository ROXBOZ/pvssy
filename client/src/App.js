import "./styles/globals.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Navigate } from "react-router-dom";
import { useRef } from "react";
import { PainsContextProvider } from "./contexts/PainsContext";
import { EventsContextProvider } from "./contexts/eventsContext";
import { TermsContextProvider } from "./contexts/termsContext";
import { AuthContextProvider } from "./contexts/authContext";
import { ContactsContextProvider } from "./contexts/contactsContext";
import Breadcrumbs from "./utilities/Breadcrumbs";
import ScrollToTop from "./utilities/ScrollToTop";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import Donate from "./components/Pages/Donate";
import SInformer from "./components/Pages/SInformer";
import Agenda from "./components/Pages/Agenda";
import GeneralConditions from "./components/Pages/GeneralConditions";
import Pains from "./components/Pages/Pains";
import Pain from "./components/Pages/Pain";
import Article from "./components/Article";
import Directory from "./components/Pages/Directory";
import Ressources from "./components/Pages/Ressources";
import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup";
import NotFound from "./components/NotFound";
import PainGlossary from "./components/Pages/PainGlossary";
import PainExercices from "./components/Pages/PainExercices";
import PainMedias from "./components/Pages/PainMedias";
import AddEvent from "./components/User/AddEvent";
import DeleteEvent from "./components/User/DeleteEvent";
import ApproveEvent from "./components/User/ApproveEvent";
import Glossary from "./components/Pages/Glossary";
import Accessibility from "./components/Pages/Accessibility";
import Exercises from "./components/Pages/Exercises";
import Medias from "./components/Pages/Medias";
import Header from "./components/Header";
import Footer from "./components/Footer";
import getToken from "./utilities/getToken";
import Introduction from "./components/Pages/Introduction";
import AutoObservation from "./components/Pages/AutoObservation";
import Consultation from "./components/Pages/Consultation";

function App() {
  const token = getToken();
  const location = useLocation();
  const grdRef = useRef(null);

  const LandingView = () => {
    return (
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
    );
  };
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
        {location.pathname === "/" ? <LandingView /> : <Header />}
        <Helmet>
          <title>Pvssy Talk – avoir mal n'est pas normal</title>
          <meta
            name="description"
            content=" S'informer sur ses douleurs pour se réapproprier son corps et sa sexualité"
          />
        </Helmet>
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
                    <Route path="s-informer/douleurs" element={<Pains />} />
                    <Route
                      path="s-informer/introduction"
                      element={<Introduction />}
                    />
                    <Route
                      path="s-informer/auto-observation"
                      element={<AutoObservation />}
                    />
                    <Route
                      path="s-informer/consulter"
                      element={<Consultation />}
                    />
                    <Route path="s-informer/douleurs/:name" element={<Pain />}>
                      <Route path="medical" element={<Article />} />
                      <Route path="sexologie" element={<Article />} />
                    </Route>
                    <Route
                      path="s-informer/ressources/glossaire"
                      element={<Glossary />}
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
                      element={<PainGlossary />}
                    />
                    <Route
                      path="s-informer/douleurs/:name/glossaire/#:term"
                      element={<PainGlossary />}
                    />
                    <Route
                      path="s-informer/douleurs/:name/exercices"
                      element={<PainExercices />}
                    />
                    <Route
                      path="s-informer/douleurs/:name/litterature-et-medias"
                      element={<PainMedias />}
                    />
                    <Route
                      path="s-informer/ressources"
                      element={<Ressources />}
                    />
                    <Route path="s-informer" element={<SInformer />} />
                    <Route
                      path="s-informer/ressources/annuaire"
                      element={<Directory />}
                    />
                    <Route
                      path="s-informer/annuaire/:name"
                      element={<Pain />}
                    />
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
