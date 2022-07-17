import { Product } from "../../models/product";

import Products from "../../helpers/apiSetup";
import { useDispatch } from "react-redux";
import { setCart } from "../Cart/CartSlice";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: Props) => {
  const dispatch = useDispatch();

  const handleAddItem = (productId: number) => {
    Products.cart.addItem(productId).then((cart) => dispatch(setCart(cart)));
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: "contain",
          bgcolor: "primary.light",
        }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          {product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton onClick={() => handleAddItem(product.id)} size="small">
          Add to cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
};

interface Props {
  product: Product;
}

export default ProductCard;
function currencyFormat(price: number): import("react").ReactNode {
  throw new Error("Function not implemented.");
}
