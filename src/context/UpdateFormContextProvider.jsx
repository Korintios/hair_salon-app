import { createContext, useState } from "react";

export const updateFormContext = createContext({
    isUpdateForm: false,
    toggleUpdateForm: () => {}
  });

export const ModalContextProvider = ({ children }) => {
  const [isUpdateForm, setIsUpdateForm] = useState(false);

  const toggleUpdateForm = () => {
    setIsUpdateForm((prevState) => !prevState);
  };

  const contextValue = {
    isUpdateForm,
    toggleUpdateForm
  };

  return (
    <updateFormContext.Provider value={contextValue}>
      {children}
    </updateFormContext.Provider>
  );
};
