import React, { useContext, useEffect } from "react";
import { HeadingArea } from "../../utilities/HeadingArea";
import { ContactsContext } from "../../contexts/contactsContext";
import { Helmet } from "react-helmet";

const Directory = () => {
  const { fetchContacts, allContacts, contactsUrl } =
    useContext(ContactsContext);

  useEffect(() => {
    fetchContacts(contactsUrl);
  }, [contactsUrl]);

  //FIXME : add a filter to sort by TYPE
  return (
    <div>
      <Helmet>
        <title>Annuaire Pvssy Talk</title>
        <meta
          name="description"
          content="Liste de spécialistes établie grâce aux recommandations de personnes concernées par les douleurs sexuelles."
        />
        <meta
          name="keywords"
          content="gynécologie, obstétrique, psychologie, physiothérapie, thérapie, kinésithérapie, sexpositive"
        />
      </Helmet>
      <HeadingArea
        title="Annuaire"
        subtitle="Cette liste a été établie grâce aux recommandations de personnes concernées par les douleurs sexuelles."
        level="h1"
      />
      <div className="grid-area">
        <div className="centered">
          {allContacts &&
            allContacts.map((c, index) => {
              return (
                <div className={index}>
                  {c.name}
                  <br />
                  {c.address}, {c.city} <br />
                  {c.region}
                  <br />
                  <ul>
                    {c.specialities.map((s) => {
                      return <li>{s}</li>;
                    })}
                  </ul>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Directory;
