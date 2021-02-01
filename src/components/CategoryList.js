import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export const CategoryList = () => {
  //Estado para cpoder editar categorias
  const [categories, setCategories] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("category-list", (categories) => {
      setCategories(categories);
    })
    return  () => socket.off('category-list');
  }, [socket]);

  const changeName = (event, id) => {
    const newName = event.target.value;
    setCategories(categories=> categories.map(category => {
        if (category.id === id) {
          category.name = newName;
        }
        return category;
      })
    );
  }

  const onLostFocus = (id, name) => {
    socket.emit("category-edit", { id, name });
  };

  const votes = (id) => {
    socket.emit("category-vote", id);
  };

  const deleteCategory = (id) => {
    socket.emit('category-delete', id);
  }

  const createRows = () => {
    return ( 
      categories.map(category => (
        <tr key={category.id}>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => votes(category.id)}
          >
            +1
          </button>
        </td>
        <td>
          <input
            className="form-control"
            value={category.name}
            onChange={(event) => changeName(event, category.id)}
            onBlur={() => onLostFocus(category.id, category.name)}
          />
        </td>
        <td>
          <h3>{category.votes}</h3>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteCategory(category.id)}
          >
            Borrar
          </button>
        </td>
      </tr>
    ))
    );
  }
  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </table>
    </>
  );
};
