import React from 'react';
import ReactDOM from 'react-dom/client';

const Nombre = (props) => {
  return (
    <div>
      <td>{props.nombre} </td>
    </div>
  )
}

const Apellido = (props) => {
  return (
    <div>
      <td>{props.apellido} </td>
    </div>
  )
}

const App = () => {
  const name = 'Gil Hernandez'
  return (
    <div>
      <table>
        <tr>
          <th>Nombre</th>
          <Nombre nombre="Bertino" />
        </tr>
        <tr>
          <th>Apellido</th>
          <Apellido apellido={name} />
        </tr>
        <tr>
          <th>No. Cuenta</th>
          <td>620078368</td>
        </tr>
      </table>
    </div>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);