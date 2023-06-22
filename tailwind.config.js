module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],

  daisyui: {
    themes: [
      {
        default: {
          "primary": "#8119e8",
          "primary-focus": "#5d0ebf",
          "primary-content": "#ffffff",
          "secondary": "#f000b8",
          "accent": "#9b070a",
          "neutral": "#37096c",
          "neutral-focus": "#270647",
          "neutral-content": "#ffffff",
          "base-100": "#f5f2ff",
          "base-200": "#efe7ff",
          "base-300": "#e0d3ff",
          "base-content": "#1f2937",
          "info": "#91b4de",
          "success": "#0d6841",
          "warning": "#945605",
          "error": "#ef4349",
        },
        darkBlue: {

        },
      },
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "valentine",
      "halloween",
      "garden",

      "pastel",
      "fantasy",
      "luxury",
      "dracula",
      "cmyk",
    ],
  },
};
