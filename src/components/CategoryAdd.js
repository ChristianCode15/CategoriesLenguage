import React, { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";



export const CategoryAdd = () => {
    const [category, setCategory] = useState('');
    const {socket} = useContext(SocketContext);

    const addCategory = (e) => {
        e.preventDefault();
        if(category.trim().length > 0){
            socket.emit('category-add', {name : category});
            setCategory('');
            
        }
    }

  return (
    <>
      <h3>Add Category</h3>

      <form onSubmit={addCategory}>
        <input
        className="form-control"
        placeholder="New category name"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        />
      </form>
    </>
  );
};
