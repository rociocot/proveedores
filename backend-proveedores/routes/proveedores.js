const express = require('express');
const router = express.Router();
const Proveedor = require('../models/Proveedor');

// GET
router.get('/', async (req, res) => {
  const proveedores = await Proveedor.findAll();
  res.json(proveedores);
});

// POST
router.post('/', async (req, res) => {
  const proveedor = await Proveedor.create(req.body);
  res.json(proveedor);
});

// PUT
router.put('/:id', async (req, res) => {
  await Proveedor.update(req.body, { where: { ID_proveedor: req.params.id } });
  res.json({ message: 'Actualizado' });
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Proveedor.destroy({ where: { ID_proveedor: req.params.id } });
  res.json({ message: 'Eliminado' });
});

module.exports = router;
