/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{html,ts}"],
   theme: {
      extend: {
         screens: {
            "tl-l": { max: "1200px" },
            "tl-p": { max: "1000px" },
            mb: { max: "767px" },
         },

         colors: {
            pink: {
               100: "#FF0A6C",
            },
            blue: {
               100: "#3027FE",
            },
            second: {
               100: "#4F4F4F",
            },
            light: {
               100: "#EFF3FA",
            },
         },
      },
   },
   variants: {
      fill: ['hover', 'focus'], // this line does the trick
    },

   plugins: [],
};
