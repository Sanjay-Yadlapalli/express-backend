require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());

app.get("/mine", async (req, res) => {
  try {
    const mine = {
      firstName: "Sanjay",
      lastName: "Y",
      age: 25,
      place: "Vinukonda, Palnadu, Andhra Pradesh",
    };
    res.send(mine)
  } catch (e) {
    res.status(401).send({ error_message: e.message });
  }
});

const initializeDBAndServer = () => {
  const PORT = 4001;
  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
};
initializeDBAndServer();
