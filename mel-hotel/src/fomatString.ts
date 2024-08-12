export function Capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function toTItleCase(text: string) {
  let newText = text.split(" ").map((value) => {
    return Capitalize(value);
  });
  return newText;
}
