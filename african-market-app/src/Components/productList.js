import React, { useState, useEffect } from "react";
import WithAuth from "./axiosWithAuth";
import Product from "./product";
import { userContext } from "../context/userContext";
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

  const obj = {
    products: products,
    updateItem: updateItem,
    deleteItem: deleteItem,
    currentId: currentId,
    onSubmit: onSubmit,
    itemsUpdate: itemsUpdate,
    onchange: onchange,
    oncancel: oncancel
  };
  if (products.length == 0) {
    return <h1>loading</h1>;
  }
  return (
    <div>
      <userContext.Provider value={obj}>
        <Product />
      </userContext.Provider>
    </div>
  );
}
