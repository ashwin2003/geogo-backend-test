const app = require("./app.js");

const server = app.listen(process.env.PORT || 4000, () => {
  console.log(`Server started at ${process.env.PORT}`);
});
