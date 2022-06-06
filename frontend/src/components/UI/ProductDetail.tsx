import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Product } from "../../models/product";
import axios from "axios";

const ProductDetail = (props: Props) => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => setProduct(response.data));
  }, [id]);

  if (product === null) return <h1>There is not Product.</h1>;

  return <React.Fragment />;
};

interface Props {}

export default ProductDetail;
