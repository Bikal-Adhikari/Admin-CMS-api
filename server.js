import express from "express";
const app = express();

const PORT = process.env.PORT || 8001;

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running on port http://localhost${PORT}`);
});
