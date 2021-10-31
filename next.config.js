const { i18n } = require("./next-i18next.config");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
module.exports = withPWA({
  images: {
    domains: [
      'res.cloudinary.com'
    ],
},
  pwa: {
    disable: process.env.NODE_ENV !== "production",
    dest: "public",
    runtimeCaching,
  },
  target: "experimental-serverless-trace",
  i18n,
});
