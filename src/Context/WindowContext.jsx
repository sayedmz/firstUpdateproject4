import React, { createContext, useEffect, useState } from "react";
export const WindowSize = createContext(null);

const WindowContext = ({ children }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    function setWindowWidth() {
      setWindowSize(window.innerWidth);
    }
    // get width screen
    window.addEventListener("resize", setWindowWidth);

    //cleanUp function
    return () => {
      window.removeEventListener("resize", setWindowWidth);
    };
  }, []);

  return (
    <WindowSize.Provider value={{ windowSize, setWindowSize }}>
      {children}
    </WindowSize.Provider>
  );
};

export default WindowContext;
