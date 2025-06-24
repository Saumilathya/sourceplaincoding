import express from "express";

const app = express();

app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "server is perfectly working.",
  });
});

// app.all("*", (req, res) => {
//   res.status(400).json({
//     success: true,
//     message: "server is not perfectly working or route is not defend",
//   });
// });

const PORT = 8000;
app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
