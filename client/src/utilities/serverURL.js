const serverURL =
  process.env.NODE_ENV === "production"
    ? "https://pvssy-talk.org"
    : "http://localhost:5000";

export { serverURL };
