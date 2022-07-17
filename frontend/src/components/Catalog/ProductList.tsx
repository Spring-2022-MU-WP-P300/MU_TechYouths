import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { Product } from "../../models/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  const { productsLoaded } = useSelector((state: any) => state.catalogSlice);

  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={4} key={product.id}>
          {/* {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : ( */}
          <ProductCard product={product} />
          {/* )} */}
        </Grid>
      ))}
    </Grid>
  );
}
