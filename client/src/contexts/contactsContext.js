import { createContext, useState } from "react";
import { serverURL } from "../utils/serverURL";
export const ContactsContext = createContext();

export const ContactsContextProvider = (props) => {
  const [allContacts, setAllContacts] = useState(null);
  const contactsUrl = `${serverURL}/api/contacts/all`;
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContacts = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      setAllContacts(result.allContacts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Catch", error);
      setError(error);
    }
  };

  return (
    <ContactsContext.Provider
      value={{
        fetchContacts,
        contactsUrl,
        allContacts,
      }}
    >
      {props.children}
    </ContactsContext.Provider>
  );
};
