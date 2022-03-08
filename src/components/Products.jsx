import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import React, { useState, useEffect } from "react";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [product, setProduct] = useState({
    products: popularProducts,
    size: "",
    color: "",
    sort: "",
    cat: "",
  });
  const [filterProducts, setFilterProducts] = useState([]);
  useEffect(() => {
    if (cat === "") {
      setProduct({ cat: cat, products: popularProducts });
    } else {
      setProduct({
        cat: cat,
        products: popularProducts.filter(
          (product) => product.cat.indexOf(cat) >= 0
        ),
      });
    }
  }, [cat]);
  console.log(product);
  useEffect(() => {
    cat &&
      setFilterProducts(
        product.products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [filters, cat, product]);
  useEffect(() => {
    if (sort === "newest") {
      setFilterProducts((prev) =>
        [...prev].sort((a, b) => a.createdAT - b.createdAT)
      );
    } else if (sort === "asc") {
      setFilterProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilterProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filterProducts.map((item) => <Product item={item} key={item.id} />)
        : popularProducts
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
