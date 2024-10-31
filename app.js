const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch(() => {
    (error) => console.error("Error al conectar a MongoDB:", error);
  });

const superheroSchema = new mongoose.Schema(
  {
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: "Desconocido" },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "Grupo-10" }
);

const SuperHero = mongoose.model("Grupo-10", superheroSchema);

async function insertSuperHero() {
  const hero = new SuperHero({
    nombreSuperHeroe: "Spiderman",
    nombreReal: "Peter Parker",
    edad: 25,
    planetaOrigen: "Tierra",
    debilidad: "Radioactiva",
    poderes: ["Trepar paredes", "Sentido Aracnido", "Super Fuerza", "Agilidad"],
    aliados: ["Ironman"],
    enemigos: ["Duende Verder"],
  });
  await hero.save();
  console.log("Superheroe insertado", hero);
}

async function updateSuperHero(nombreSuperHeroe) {
  const result = await SuperHero.updateOne({ nombreSuperHeroe }, { $set: { edad: 26 } });
  console.log("Resultado de la actualización", result);
}

async function deleteSuperHero(nombreSuperHeroe) {
  const result = await SuperHero.deleteOne({ nombreSuperHeroe });
  console.log("Superhéroe eliminado", result);
}

async function findSuperHero() {
  const heroes = await SuperHero.find({ planetaOrigen: "Tierra" });
  console.log("Superhéroes encontrados", heroes);
}

async function main() {
  await insertSuperHero();
  await updateSuperHero("Spiderman");
  await deleteSuperHero("Spiderman");
  await findSuperHero();
}

main();
