//user schema
// {
//   name: "Jane Doe", // String, required
//   bio: "Not Tarzan's Wife, another Jane",  // String
//   created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//   updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
// }

const express = require("express");
const db = require("./data/db");

const server = express();

server.use(express.json());

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  const { name, bio } = userInfo;
  if (name && bio) {
    db.insert(userInfo)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: "There was an error while saving the user to the database"
          });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

server.listen(4000, () => {
  console.log("server listening on port 4000");
});
