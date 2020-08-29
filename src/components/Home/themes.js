// const theme = {
//   "--text-color": "#f9f5ff",
//   "--header-color": "#28262c",

//   "--bg-color": "#998fc7",
//   "--bg-color-dark": "#14248a",
//   "--bg-color-darker": "#28262c",

//   "--color-green": "#3e7a43;",
//   "--color-green-bright": "#52a158;",
//   "--color-yellow": "#d0b61e;",
//   "--color-blue": "#1040a8;",
//   "--color-red": "#b63d3d;",
//   "--color-red-dark": "#993333;",
//   "--color-red-bright": "#cb6363;",
// };

const theme = {
  "--text-color": "#ffffff",
  "--header-color": "#28262c",

  "--bg-color": "#364156",
  "--bg-color-dark": "#212d40",
  "--bg-color-darker": "#11151c",

  "--color-green": "#85b996",
  "--color-green-bright": "#akcca5",
  "--color-yellow": "#efca08",
  "--color-blue": "#86bbd8",
  "--color-red": "#d66853",
  "--color-red-dark": "#7d4e57",
  "--color-red-bright": "#ff8c61",
};

const root = document.documentElement;

export const handleThemeChange = (e) => {
  Object.entries(theme).forEach((entry) => {
    const [key, val] = entry;
    root.style.setProperty(key, val);
  });
};
