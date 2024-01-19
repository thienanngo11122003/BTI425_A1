/*********************************************************************************
 *  WEB422 – Assignment 1
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Nguyen Duy Hoang Student ID: 108397217 Date: _Jan 20 2023_
 *  Cyclic Link: https://odd-plum-indri-coat.cyclic.app
 *
 ********************************************************************************/

const express = require("express");
const cors = require("cors");
const path = require("path");
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();
require("dotenv").config();
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "API Listening" });
});

//AC
app.post("/api/movies", (req, res) => {
  db.addNewMovie(req.body)
    .then((movie) => {
      res.status(201).json(movie);
    })
    .catch(() => {
      res.status(500).json(err);
    });
});

//AC
app.get("/api/movies", (req, res) => {
  db.getAllMovies(req.query.page, req.query.perPage, req.query.title)
    .then((movie) => {
      res.status(200).json(movie);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//AC
app.get("/api/movies/:id", (req, res) => {
  db.getMovieById(req.params.id)
    .then((movie) => {
      res.status(200).json(movie);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//AC
app.put("/api/movies/:id", (req, res) => {
  db.updateMovieById(req.body, req.params.id)
    .then((movie) => {
      res.status(200).json(movie);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//AC
app.delete("/api/movies/:id", (req, res) => {
  db.deleteMovieById(req.params.id);
  res.status(204).end();
});

db.initialize(process.env.MONGODB_CONN_STRING)
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`server listening on: ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
