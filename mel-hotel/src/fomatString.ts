export function Capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function toTItleCase(text: string) {
  let newText = text.split(" ").map((value) => {
    return Capitalize(value);
  });
  return newText.join(" ");
}

export function EpochToInputDate(epochDate: number) {
  //  MM/D/YYYY
  const splitteddDate = new Date(epochDate).toLocaleDateString().split("/");
  const year = splitteddDate[2];
  const date =
    splitteddDate[1].length === 1 ? "0" + splitteddDate[1] : splitteddDate[1];
  const month =
    splitteddDate[0].length === 1 ? "0" + splitteddDate[0] : splitteddDate[0];
  return [year, month, date].join("-");
}
