import React, { useState } from "react";

export const CategoryAdd = ({addData}) => {

    const [category, setCategory] = useState('');

    const addCategory = (e) => {
        e.preventDefault();
        if(category.trim().length > 0){
            addData(category);
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
        onChange={(event) => setCategory(event.target.value)}
        value={category}
        />
      </form>
    </>
  );
};
