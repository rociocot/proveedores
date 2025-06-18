const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const proveedoresRoutes = require('./routes/proveedores');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/proveedores', proveedoresRoutes);

sequelize.authenticate()
  .then(() => console.log('Conexión establecida con MySQL'))
  .catch(err => console.error('Error de conexión', err));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
