const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los proveedores GET
router.get('/', (req, res) => {
  db.query('SELECT * FROM proveedores', (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
});

// Alta: Agregar un nuevo proveedor POST
router.post('/', (req, res) => {
  const { nombre, apellido, localidad, telefono, mail } = req.body;
  db.query('INSERT INTO proveedores (nombre, apellido, localidad, telefono, mail) VALUES (?, ?, ?, ?, ?)', 
  [nombre, apellido, localidad, telefono, mail], 
  (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json({ id: result.insertId });
    }
  });
});

// Baja: Eliminar proveedor por ID DELETE 
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM proveedores WHERE ID_proveedor = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json({ message: 'Proveedor eliminado' });
    }
  });
});

// Modificación: Actualizar proveedor por ID PUT
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, apellido, localidad, telefono, mail } = req.body;
  db.query(
    'UPDATE proveedores SET nombre = ?, apellido = ?, localidad = ?, telefono = ?, mail = ? WHERE ID_proveedor = ?',
    [nombre, apellido, localidad, telefono, mail, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json({ message: 'Proveedor actualizado' });
      }
    }
  );
});

module.exports = router;
