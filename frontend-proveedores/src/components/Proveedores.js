import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Proveedores.css';  // archivo CSS con estilos

function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [form, setForm] = useState({ nombre: '', apellido: '', localidad: '', telefono: '', mail: '' });
  const [editId, setEditId] = useState(null);

  // Cargar proveedores al iniciar
  useEffect(() => {
    cargarProveedores();
  }, []);

  const cargarProveedores = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/proveedores');
      setProveedores(res.data);
    } catch (error) {
      console.error('Error cargando proveedores:', error);
    }
  };

  // Manejar cambio en inputs
  const handleChange = e => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  // Guardar nuevo o editar existente
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      if (editId) {
        // Editar
        await axios.put(`http://localhost:4000/api/proveedores/${editId}`, form);
      } else {
        // Crear nuevo
        await axios.post('http://localhost:4000/api/proveedores', form);
      }
      setForm({ nombre: '', apellido: '', localidad: '', telefono: '', mail: '' });
      setEditId(null);
      cargarProveedores();
    } catch (error) {
      console.error('Error guardando proveedor:', error);
    }
  };

  // Cargar datos en formulario para editar
  const handleEdit = (proveedor) => {
    setForm({
      nombre: proveedor.nombre,
      apellido: proveedor.apellido,
      localidad: proveedor.localidad,
      telefono: proveedor.telefono,
      mail: proveedor.mail
    });
    setEditId(proveedor.ID_proveedor);
  };

  // Eliminar proveedor
  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este proveedor?')) {
      try {
        await axios.delete(`http://localhost:4000/api/proveedores/${id}`);
        cargarProveedores();
      } catch (error) {
        console.error('Error eliminando proveedor:', error);
      }
    }
  };

  return (
    <div className="contenedor">
      <h2>Proveedores</h2>

      <form onSubmit={handleSubmit} className="formulario">
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} required />
        <input name="localidad" placeholder="Localidad" value={form.localidad} onChange={handleChange} />
        <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
        <input name="mail" placeholder="Mail" value={form.mail} onChange={handleChange} />
        <button type="submit" className="btn-guardar">{editId ? 'Modificar' : 'Agregar'}</button>
      </form>

      <table className="tabla-proveedores">
        <thead>
          <tr>
            <th>ID</th><th>Nombre</th><th>Apellido</th><th>Localidad</th><th>Teléfono</th><th>Mail</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map(p => (
            <tr key={p.ID_proveedor}>
              <td>{p.ID_proveedor}</td>
              <td>{p.nombre}</td>
              <td>{p.apellido}</td>
              <td>{p.localidad}</td>
              <td>{p.telefono}</td>
              <td>{p.mail}</td>
              <td>
                <button className="btn-editar" onClick={() => handleEdit(p)}>Editar</button>
                <button className="btn-eliminar" onClick={() => handleDelete(p.ID_proveedor)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Proveedores;
