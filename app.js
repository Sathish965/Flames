const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/inputs", (req, res, next) => {
  let person1 = req.body.person1.toLowerCase().split("");
  let person2 = req.body.person2.toLowerCase().split("");
  let count = 0;
  for (let i = 0; i < person1.length; i++) {
    for (let j = 0; j < person2.length; j++) {
      if (person1[i] === person2[j]) {
        person1.splice(i, 1);
        person2.splice(j, 1);
        i--;
        j--;
        break;
      }
    }
  }
  let total = person1.length + person2.length;
  let flameCharacter = calculateFlames(total);
  res.status(200).json({ result: flameCharacter });
});

app.use("/", (req, res, next) => {
  res.status(200).render("index", { result: "" });
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Application started on port: ${port}`);
});

function calculateFlames(flameValue) {
  let flames = "flames".split("");
  let result = 6;
  let count = 1;
  
  let i = 0;
  while (flames.length !== 1) {
    
    if (count % flameValue === 0) {
      flames.splice(i, 1);
      i--;
    }

    if (i + 1 >= flames.length) {
      i = 0;
    } else {
      i++;
    }

    count++;
  }

  return flames[0];
}
