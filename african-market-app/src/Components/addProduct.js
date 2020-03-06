import React, { useState, useContext } from "react";
import WithAuth from "./axiosWithAuth";

import { withRouter } from "react-router-dom";
import { userContext } from "../context/userContext";

function AddProduct(props) {
  const [addProducts, setaddProducts] = useState(initialState);
  debugger;
  const onchange = e => {
    setaddProducts({ ...addProducts, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    console.log(addProducts);
    const id = localStorage.getItem("userId");
    debugger;

    WithAuth()
      .post(
        `https://african-marketplace-2020.herokuapp.com/api/users/${id}/listings`,
        addProducts
      )
      .then(res => {
        debugger;
        console.log(res);
        props.history.push("/products");
        setaddProducts(initialState);
      })
      .catch(e => console.log(e))
      .finally(() => {
        console.log("Axios request finished.");
      });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
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
