import { createContext, useState } from "react";

export const modalContext = createContext({
    isActiveModal: false,
    toggleActiveModal: () => {}
  });

export const ModalContextProvider = ({ children }) => {
  const [isActiveModal, setIsActiveModal] = useState(false);

  const toggleActiveModal = () => {
    setIsActiveModal((prevState) => !prevState);
  };

  const contextValue = {
    isActiveModal,
    toggleActiveModal
  };

  return (
    <modalContext.Provider value={contextValue}>
      {children}
    </modalContext.Provider>
  );
};
