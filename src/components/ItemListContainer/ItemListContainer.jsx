import React, { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import RotateLoader from 'react-spinners/RotateLoader'
import getAllItems from "../../services/firestore";

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState(null);

  useEffect(() => { 
    getAllItems()
      .then((res) => {
        setProducts(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(products);

  return (
    <div className="text-center container mx-auto mt-5">
      <div className="font-bold text-pink-600 text-4xl mb-2">{greeting}</div>
     
      {
        products
          ? <ItemList items={products} />
          : (
            <div className="mx-auto h-96 flex justify-around">
              <div className="flex-1 flex justify-center items-center">
              <RotateLoader className="mx-auto align-middle" color={"rgb(217, 4, 121)"} size={20} />
              </div>
            </div>
          )
       }
    </div>
  );
};

export default ItemListContainer;
