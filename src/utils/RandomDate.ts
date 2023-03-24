import { addDays, format } from "date-fns";

export function RandomDate() {
  const currentDate = new Date();

  const randomDays = Math.floor(Math.random() * 365);

  const randomDate = addDays(currentDate, randomDays);

  const formattedDate = format(randomDate, "dd/MM/yyyy");
  //  Como não tenho datas concretas, fiz datas aleatórias

  return formattedDate;
}
