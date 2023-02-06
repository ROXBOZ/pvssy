import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

var corsOptions = {
  origin: "http://localhost.3000 ",
  credentials: true,
};

app.use(cors(corsOptions));
