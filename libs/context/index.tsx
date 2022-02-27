import {
  createContext,
  useContext,
  ReactChild,
  useEffect,
  useState,
} from "react";
import { Translation } from "../types";

const translationContext = createContext<
  (string | ((tr: Translation) => void))[]
>([]);

export const useTranslation = () => {
  return useContext(translationContext);
};

function useTranslationProvider() {
  const [translation, setTranslation] = useState<Translation>("en");

  useEffect(()=> {
  	if (localStorage.getItem("translation")) setTranslation(localStorage.getItem("translation") || "en")
  },[])
  
  function translateTo(tr: Translation) {
    setTranslation(tr);
    localStorage.setItem("translation", tr);
  }
  return [translation, translateTo];
}

export function TranslationProvider({
  children,
}: {
  children?: ReactChild | ReactChild[];
}) {
  const [translation, translateTo] = useTranslationProvider();

  return (
    <translationContext.Provider value={[translation, translateTo]}>
      {children}
    </translationContext.Provider>
  );
}
