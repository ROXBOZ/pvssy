const serverURL =
  process.env.NODE_ENV === "production"
    ? "https://pvssy-backend.vercel.app"
    : "http://localhost:5000";

export { serverURL };
