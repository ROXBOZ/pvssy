import React, { useContext, useEffect } from "react";
import { HeadingArea } from "../utils/HeadingArea";
import { ContactsContext } from "../contexts/contactsContext";

const Annuaire = () => {
  const { fetchContacts, allContacts, contactsUrl } =
    useContext(ContactsContext);

  useEffect(() => {
    fetchContacts(contactsUrl);
  }, [contactsUrl]);

  return (
    <div>
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

export default Annuaire;
