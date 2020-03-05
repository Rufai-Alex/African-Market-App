import React, { useState, useEffect } from "react";
import WithAuth from "./axiosWithAuth";

export default function Products() {
  const [products, setproducts] = useState([]);
  const [itemsUpdate, setitemsUpdate] = useState({
    location: " ",
    item: " ",
    description: " ",
    price: 0
  });
  const [currentId, setcurrentId] = useState(null);
  const [currentUserId, setcurrentUserId] = useState(null);

  useEffect(() => {
    WithAuth()
      .get("https://african-marketplace-2020.herokuapp.com/api/listings")
      .then(resp => {
        setproducts(resp.data);
      });
  }, [products]);
  const deleteItem = ({ id, user_id }) => {
    WithAuth()
      .delete(
        `https://african-marketplace-2020.herokuapp.com/api/users/${user_id}/listings/${id}`
      )
      .then(resp => {
        alert(resp.data.message);
      })
      .catch(err => {
        debugger;
      });
  };
  const updateItem = product => {
    setcurrentId(product.id);
    setcurrentUserId(product.user_id);
  };
  const onSubmit = e => {
    e.preventDefault();
    WithAuth()
      .put(
        `https://african-marketplace-2020.herokuapp.com/api/users/${currentUserId}/listings/${currentId}`,
        itemsUpdate
      )

      .then(resp => {
        setcurrentId(null);
      })
      .catch(err => {
        debugger;
      });
  };
  const oncancel = () => {
    setcurrentId(null);
  };
  const onchange = e => {
    setitemsUpdate({ ...itemsUpdate, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {products.map(product => {
        return (
          <div key={product.id}>
            <h1>{product.item}</h1>
            <img className='card-img' alt='cardImage' />
            <p className='pill'>Price : ₦ {product.price}</p>
            <p className='place'>Location :{product.location}</p>
            <p className='group'>Description :{product.description}</p>
            <div>
              <button onClick={() => updateItem(product)}>Update</button>
            </div>
            <div>
              {" "}
              <button onClick={() => deleteItem(product)}>Delete</button>
            </div>
            {currentId ? (
              <div>
                <form onSubmit={onSubmit}>
                  <label htmlFor='productForm_name'>Item :</label>
                  <input
                    type='text'
                    id='productForm_name'
                    name='item'
                    placeholder='Enter product name'
                    onChange={onchange}
                    value={itemsUpdate.item}
                  />
                  <br />
                  <label htmlFor='productForm__description'>
                    Description :{" "}
                  </label>
                  <input
                    type='text'
                    id='productForm_description'
                    name='description'
                    placeholder='Enter product description'
                    onChange={onchange}
                    value={itemsUpdate.description}
                  />{" "}
                  <br />
                  <label htmlFor='productForm__price'>Price : </label>
                  <input
                    type='text'
                    id='productForm_price'
                    name='price'
                    placeholder='Enter product price'
                    onChange={onchange}
                    value={itemsUpdate.price}
                  />{" "}
                  <br />
                  <label htmlFor='productForm__location'>Location : </label>
                  <input
                    type='text'
                    id='productForm__location'
                    name='location'
                    placeholder='Enter product location'
                    onChange={onchange}
                    value={itemsUpdate.location}
                  />
                  <input type='submit' />
                  <button onClick={oncancel}>Cancel </button>
                </form>
              </div>
            ) : (
              <div></div>
            )}{" "}
          </div>
        );
      })}
    </div>
  );
}
