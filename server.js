const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'vehicleapp',
  password: 'Thisisthevehicleapp@22',
  database: 'vehicle_management'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API routes
app.get('/api/vehicles', (req, res) => {
  db.query('SELECT * FROM vehicles', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching vehicles' });
      return;
    }
    res.json(results);
  });
});

app.post('/api/vehicles', (req, res) => {
  const { make, model, year, licensePlate, status, fuelLevel, mileage, lastService, type, fuelEfficiency, insuranceExpiry, registrationExpiry } = req.body;
  db.query('INSERT INTO vehicles (make, model, year, licensePlate, status, fuelLevel, mileage, lastService, type, fuelEfficiency, insuranceExpiry, registrationExpiry) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
  [make, model, year, licensePlate, status, fuelLevel, mileage, lastService, type, fuelEfficiency, insuranceExpiry, registrationExpiry], 
  (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error adding vehicle' });
      return;
    }
    res.json({ id: result.insertId, make, model, year, licensePlate, status, fuelLevel, mileage, lastService, type, fuelEfficiency, insuranceExpiry, registrationExpiry });
  });
});

app.put('/api/vehicles/:id', (req, res) => {
  const { id } = req.params;
  const { make, model, year, licensePlate, status, fuelLevel, mileage, lastService, type, fuelEfficiency, insuranceExpiry, registrationExpiry } = req.body;
  db.query('UPDATE vehicles SET make = ?, model = ?, year = ?, licensePlate = ?, status = ?, fuelLevel = ?, mileage = ?, lastService = ?, type = ?, fuelEfficiency = ?, insuranceExpiry = ?, registrationExpiry = ? WHERE id = ?', 
  [make, model, year, licensePlate, status, fuelLevel, mileage, lastService, type, fuelEfficiency, insuranceExpiry, registrationExpiry, id], 
  (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error updating vehicle' });
      return;
    }
    res.json({ id, make, model, year, licensePlate, status, fuelLevel, mileage, lastService, type, fuelEfficiency, insuranceExpiry, registrationExpiry });
  });
});

app.delete('/api/vehicles/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM vehicles WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error deleting vehicle' });
      return;
    }
    res.json({ message: 'Vehicle deleted successfully' });
  });
});

// Get all maintenance records
app.get('/api/maintenance-records', (req, res) => {
  db.query('SELECT * FROM maintenance_records', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching maintenance records' });
      return;
    }
    res.json(results);
  });
});

// Add a new maintenance record
app.post('/api/maintenance-records', (req, res) => {
  const { vehicleId, description, status, date } = req.body;
  db.query('INSERT INTO maintenance_records (vehicleId, description, status, date) VALUES (?, ?, ?, ?)', [vehicleId, description, status, date], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error adding maintenance record' });
      return;
    }
    res.json({ id: result.insertId, vehicleId, description, status, date });
  });
});

// Update a maintenance record
app.put('/api/maintenance-records/:id', (req, res) => {
  const { id } = req.params;
  const { description, status, date } = req.body;
  db.query('UPDATE maintenance_records SET description = ?, status = ?, date = ? WHERE id = ?', [description, status, date, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error updating maintenance record' });
      return;
    }
    res.json({ id, description, status, date });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));