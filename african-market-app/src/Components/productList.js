import React, { useState, useEffect } from "react";
import WithAuth from "./axiosWithAuth";

export default function Products() {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    WithAuth()
      .get("https://african-marketplace-2020.herokuapp.com/api/listings")
      .then(resp => {
        debugger;
        setproducts(resp.data);
        debugger;
      });
  }, []);

  return (
    <div>
      debugger
      {products.map(product => {
        return (
          <div>
            <h1>{product.item}</h1>
            <img className='card-img' alt='cardImage' />
            <p className='pill'>Price : ₦ {product.price}</p>
            <p className='place'>Location :{product.location}</p>
            <p className='group'>Description :{product.description}</p>
          </div>
        );
      })}{" "}
    </div>
  );
}
