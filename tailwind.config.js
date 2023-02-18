module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        digitalKhat: "DigitalKhatt Madina",
        scheherazade: "ScheherazadeRW",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
