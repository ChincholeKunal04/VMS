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

// API routes for vehicles
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
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Vehicle not found' });
      return;
    }
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  });
});

// API routes for maintenance records
app.get('/api/maintenancerecords', (req, res) => {
  db.query('SELECT * FROM maintenancerecords', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching maintenance records' });
      return;
    }
    res.json(results);
  });
});

app.post('/api/maintenancerecords', (req, res) => {
  const { vehicleId, date, type, description, status, cost, technicianName, partsUsed, notes } = req.body;
  db.query('INSERT INTO maintenancerecords (vehicleId, date, type, description, status, cost, technicianName, partsUsed, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
  [vehicleId, date, type, description, status, cost, technicianName, partsUsed, notes], 
  (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error adding maintenance record' });
      return;
    }
    res.json({ id: result.insertId, vehicleId, date, type, description, status, cost, technicianName, partsUsed, notes });
  });
});

app.put('/api/maintenancerecords/:id', (req, res) => {
  const { id } = req.params;
  const { vehicleId, date, type, description, status, cost, technicianName, partsUsed, notes } = req.body;
  db.query('UPDATE maintenancerecords SET vehicleId = ?, date = ?, type = ?, description = ?, status = ?, cost = ?, technicianName = ?, partsUsed = ?, notes = ? WHERE id = ?', 
  [vehicleId, date, type, description, status, cost, technicianName, partsUsed, notes, id], 
  (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error updating maintenance record' });
      return;
    }
    res.json({ id, vehicleId, date, type, description, status, cost, technicianName, partsUsed, notes });
  });
});

app.delete('/api/maintenancerecords/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM maintenancerecords WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error deleting maintenance record' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Maintenance record not found' });
      return;
    }
    res.status(200).json({ message: 'Maintenance record deleted successfully' });
  });
});

// API route for adding drivers
app.post('/api/drivers', (req, res) => {
  const driverData = req.body;
  console.log('Received driver data:', driverData);
  const sql = 'INSERT INTO drivers SET ?';
  db.query(sql, driverData, (err, result) => {
    if (err) {
      console.error('Error inserting driver data:', err);
      res.status(500).json({ error: 'Error adding driver' });
    } else {
      res.status(201).json({ message: 'Driver added successfully', driverId: result.insertId });
    }
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});