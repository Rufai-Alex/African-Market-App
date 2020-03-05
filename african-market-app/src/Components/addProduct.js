import React, { useState } from "react";

import { withRouter, useHistory } from "react-router-dom";

function AddProduct() {
  const [addProducts, setaddProducts] = useState(initialState);
  const onchange = e => {
    setaddProducts({ ...addProducts, [e.target.name]: e.target.value });
    debugger;
  };
  const onSubmit = () => {};
  return (
    <div>
      <form onSubmit={onsubmit}>
        <label htmlFor='productForm_name'>Item :</label>
        <input
          type='text'
          id='productForm_name'
          name='item'
          placeholder='Enter product name'
          onChange={onchange}
          value={addProducts.item}
        />
        <br />
        <label htmlFor='productForm__description'>Description : </label>
        <input
          type='text'
          id='productForm_description'
          name='description'
          placeholder='Enter product description'
          onChange={onchange}
          value={addProducts.description}
        />{" "}
        <br />
        <label htmlFor='productForm__price'>Price : </label>
        <input
          type='text'
          id='productForm_price'
          name='price'
          placeholder='Enter product price'
          onChange={onchange}
          value={addProducts.price}
        />{" "}
        <br />
        <label htmlFor='productForm__location'>Location : </label>
        <input
          type='text'
          id='productForm__location'
          name='location'
          placeholder='Enter product location'
          onChange={onchange}
          value={addProducts.location}
        />
        <input type='submit' />
      </form>
    </div>
  );
}

const initialState = {
  location: " ",
  item: " ",
  description: " ",
  price: 0
};
export default withRouter(AddProduct);
