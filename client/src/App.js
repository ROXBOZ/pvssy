import React from "react";
import { Routes, Route } from "react-router-dom";

// css
import "./styles/globals.css";

// pages and components
// import Layout from "./layout/Layout";
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
import Agenda from "./pages/Agenda";
import Event from "./components/Agenda/Event";
import About from "./pages/About";

//contexts
import { PainsContextProvider } from "./contexts/PainsContext";
import { EventsContextProvider } from "./contexts/eventsContext";

function App() {
  return (
    <>
      <Header />
      <div className="main">
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
              <Route path="connect" element={<Agenda />} />
              <Route path="connect/:id" element={<Event />} />
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
