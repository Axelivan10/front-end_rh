const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        morphoBlue: '#09a9b8',
        morphoYellow: '#ffa916'
      },
    },
  },
  
  plugins: [],
});