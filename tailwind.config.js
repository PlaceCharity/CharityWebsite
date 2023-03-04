module.exports = {
  content: ['./src/**/*.{svelte,js,ts}'],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#f8a5a8"
        },
      },
      {
        garden: {
          ...require("daisyui/src/colors/themes")["[data-theme=garden]"],
          primary: "#f8a5a8"
        },
      }
    ],
    darkTheme: "dracula"
  },
  theme: {
    extend: {
      fontFamily: {
        'comingsans': ['comingsans', 'sans-serif'],
        'patrickhand': ['Patrick Hand', 'cursive']
      }
    }
  },
  plugins: [require('daisyui')],
  important: true
};
