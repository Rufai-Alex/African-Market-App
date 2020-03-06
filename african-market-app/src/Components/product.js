import React, { useContext } from "react";
import { userContext } from "../context/userContext";

export default function Product() {
  const context = useContext(userContext);
  debugger;
  return (
    <div>
      {context.products.map(product => {
        return (
          <div key={product.id}>
            <h1>{product.item}</h1>
            <img className='card-img' alt='cardImage' />
            <p className='pill'>Price : ₦ {product.price}</p>
            <p className='place'>Location :{product.location}</p>
            <p className='group'>Description :{product.description}</p>
            <div>
              <button onClick={() => context.updateItem(product)}>
                Update
              </button>
            </div>
            <div>
              {" "}
              <button onClick={() => context.deleteItem(product)}>
                Delete
              </button>
            </div>
            {context.currentId ? (
              <div>
                <form onSubmit={context.onSubmit}>
                  <label htmlFor='productForm_name'>Item :</label>
                  <input
                    type='text'
                    id='productForm_name'
                    name='item'
                    placeholder='Enter product name'
                    onChange={context.onchange}
                    value={context.itemsUpdate.item}
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
                    onChange={context.onchange}
                    value={context.itemsUpdate.description}
                  />{" "}
                  <br />
                  <label htmlFor='productForm__price'>Price : </label>
                  <input
                    type='text'
                    id='productForm_price'
                    name='price'
                    placeholder='Enter product price'
                    onChange={context.onchange}
                    value={context.itemsUpdate.price}
                  />{" "}
                  <br />
                  <label htmlFor='productForm__location'>Location : </label>
                  <input
                    type='text'
                    id='productForm__location'
                    name='location'
                    placeholder='Enter product location'
                    onChange={context.onchange}
                    value={context.itemsUpdate.location}
                  />
                  <input type='submit' />
                  <button onClick={context.oncancel}>Cancel </button>
                </form>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
