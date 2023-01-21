// import express from "express";
import express, { json } from 'express';



// location is the simple (x, y) coordinates of an entity within the system
// spaceCowboy models a cowboy in our super amazing system
// spaceAnimal models a single animal in our amazing system
type location = { x: number; y: number };
type spaceCowboy = { name: string; lassoLength: number };
type spaceAnimal = { type: "pig" | "cow" | "flying_burger" };

// spaceEntity models an entity in the super amazing (ROUND UPPER 100) system
type spaceEntity =
  | { type: "space_cowboy"; metadata: spaceCowboy; location: location }
  | { type: "space_animal"; metadata: spaceAnimal; location: location };

// === ADD YOUR CODE BELOW :D ===

// === ExpressJS setup + Server setup ===
const spaceDatabase = [] as spaceEntity[];
const app = express();
// express.json();
app.use(json());


// the POST /entity endpoint adds an entity to your global space database
app.post("/entity", (req, res) => {
  // TODO: fill me in

  const { entities: spaceEntities } = req.body;
  spaceDatabase.push(...spaceEntities);
  res.json();
});

type lassoableAnimal = { type: spaceAnimal["type"], location: location};

// lasooable returns all the space animals a space cowboy can lasso given their name
app.get("/lassoable", (req, res) => {
  // TODO: fill me in

  const { cowboy_name } = req.query;
  const cowboy = spaceDatabase.find(entity => entity.type === "space_cowboy" && entity.metadata.name === cowboy_name);
  let list_of_animals = [] as lassoableAnimal[];

  if (cowboy && 'lassoLength' in cowboy.metadata) {
    const cowboy_lasso_length = cowboy.metadata.lassoLength;
    for (const entity of spaceDatabase) {
      if (entity.type !== "space_animal") continue;
      const distance = Math.sqrt(Math.pow(cowboy.location.x - entity.location.x , 2) + Math.pow(cowboy.location.y - entity.location.y, 2));
      if (distance <= cowboy_lasso_length) {
        list_of_animals.push({ type: entity.metadata.type, location: entity.location });
      }
    }
  }
  res.json({space_animals: list_of_animals});
});

app.listen(8080);