import React, { useEffect, useState } from 'react'

export const CategoryList = ({data, votes, deleteCategory, EditName}) => {
    //Estado para cpoder editar categorias
    const [ categories, setCategories] = useState(data);

    useEffect( () => {
        setCategories(data);
    }, [data])

    const changeName = (event, id) => {
        const newName = event.target.value;
        setCategories(categories => categories.map( category => {
            if(category.id === id){
                category.name = newName;
            }
            return category;
        }));
    }

    const onLostFocus = (id, name) => {
        EditName(id, name);
    }
    
    const createRows = () => {
        return(
            categories.map( category => 
                <tr key={category.id}>
                <td>
                    <button 
                    className="btn btn-primary"
                    onClick={() => votes(category.id)}
                    > +1 </button>
                </td>
                <td>
                    <input 
                    className="form-control"
                    value={category.name}
                    onChange={ (event) => changeName(event, category.id)}
                    onBlur={ () => onLostFocus(category.id,category.name )}
                    />
                </td>
                <td><h3>{category.votes}</h3></td>
                <td>
                    <button 
                    className="btn btn-danger"
                    onClick={() => deleteCategory(category.id)}
                    >Borrar</button>
                </td>
            </tr>   
            )
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
              <tbody>
                  {createRows()}
              </tbody>
              </table>  
        </>
    )
}
