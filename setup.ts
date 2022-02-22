import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';



const app = express();
app.use(cors());
app.use(express.json());



const db = new Database('./data.db', {
  verbose: console.log
})

// drivers
const hospitals = [
  { name: 'Endi', city: 'test' },
  { name: 'Geri', city: 'test' },
  { name: 'Ed', city: 'test' },
  { name: 'Ilir', city: 'test' }
]

// passengers
const patients = [
  { name: 'Rinor' },
  { name: 'Elidon' },
  { name: 'Visard' },
  { name: 'Desintila' },
  { name: 'Artiola' }
]

// rides
const visits = [
  {
    hospitalId: 1,
    patientId: 1,
    price: 20.3
  },
  {
    hospitalId: 1,
    patientId: 2,
    price: 30.3
  },
  {
    hospitalId: 1,
    patientId: 3,
    price: 40.3
  },
  {
    hospitalId: 1,
    patientId: 4,
    price: 100.3
  },
  {
    hospitalId: 1,
    patientId: 5,
    price: 12342545.3
  },
  {
    hospitalId: 2,
    patientId: 1,
    price: 40.3
  },
  {
    hospitalId: 1,
    patientId: 3,
    price: 70.3
  },
  {
    hospitalId: 1,
    patientId: 5,
    price: 100.3
  },
  {
    hospitalId: 4,
    patientId: 1,
    price: 50.3
  },
  {
    hospitalId: 4,
    patientId: 2,
    price: 80.7
  }
]

db.exec(`
DROP TABLE IF EXISTS visits;
DROP TABLE IF EXISTS hospitals;
DROP TABLE IF EXISTS patients;

CREATE TABLE IF NOT EXISTS patients (
  id INTEGER,
  name TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS hospitals (
  id INTEGER,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS visits (
  id INTEGER,
  hospitalId INTEGER NOT NULL,
  patientId INTEGER NOT NULL,
  price REAL NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (hospitalId) REFERENCES hospitals(id),
  FOREIGN KEY (patientId) REFERENCES patients(id)
);
`)

const createHospitals = db.prepare(`
INSERT INTO hospitals (name, city) VALUES (?, ? );
`)

const createPacients = db.prepare(`
INSERT INTO patients  (name) VALUES (?);
`)

const createVisits = db.prepare(`
INSERT INTO visits (hospitalId, patientId, price)
VALUES (?, ? ,?);
`)


const gethostpitals = db.prepare(`
SELECT * FROM hospitals;
`)

for (const hosital of hospitals) {
  createHospitals.run(hosital.name, hosital.city)
}

for (const patient of patients) {
  createPacients.run(patient.name)
}

for (const visit of visits) {
  createVisits.run(visit.hospitalId, visit.patientId, visit.price)
}





app.get('/', (req, res) => {
  `
 
 
 `

})



app.get('/test', (req, res) => {

  const result = gethostpitals.all()

  res.send(result)

})

app.listen(4000, () => console.log(`Listening on : http://localhost:4000/test`))

