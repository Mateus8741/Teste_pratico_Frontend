import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export function useApp() {
  const context = useContext(AppContext);
  return context;
}