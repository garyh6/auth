var whitelist = [
  "http://localhost:3000",
  `http://localhost:${process.env.CLIENT_PORT}`,
  `http://localhost:${process.env.CLIENT_PORT}/*`,
  `http://127.0.0.1:${process.env.CLIENT_PORT}`,
  `http://127.0.0.1:${process.env.CLIENT_PORT}/*`
];
export const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};
