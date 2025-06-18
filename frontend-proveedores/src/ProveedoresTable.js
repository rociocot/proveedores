import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProveedoresTable = () => {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/proveedores')      //muestra todos los proveedores
      .then(response => setProveedores(response.data))
      .catch(error => console.error('Error al obtener proveedores:', error));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Lista de Proveedores</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Localidad</th>
            <th>Teléfono</th>
            <th>Mail</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map(proveedor => (
            <tr key={proveedor.id}>
              <td>{proveedor.id}</td>
              <td>{proveedor.nombre}</td>
              <td>{proveedor.apellido}</td>
              <td>{proveedor.localidad}</td>
              <td>{proveedor.telefono}</td>
              <td>{proveedor.mail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProveedoresTable;
