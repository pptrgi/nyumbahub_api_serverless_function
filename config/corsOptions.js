const allowedOrigins = [
  "https://nyumbahub.netlify.app",
  "https://nh-pptrgitonga-gmailcom.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      // allow same-origin requests with !origin
      // that includes https://nyumbahub.netlify.app and its subsequent routes

      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
