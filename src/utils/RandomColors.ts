// Cores randomicas para os avatares
const colors = [
  "red.500",
  "orange.500",
  "yellow.500",
  "green.500",
  "teal.500",
  "blue.500",
  "cyan.500",
  "purple.500",
  "pink.500",
  "emerald.500",
];
export function RandomColors() {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}
