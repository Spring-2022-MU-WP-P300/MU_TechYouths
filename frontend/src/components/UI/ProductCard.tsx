import { Product } from "../../models/product";

import Products from "../../helpers/apiSetup";
import { useDispatch } from "react-redux";
import { setCart } from "../Cart/CartSlice";

const ProductCard = (props: Props) => {
  const dispatch = useDispatch();

  const handleAddItem = (productId: number) => {
    Products.cart.addItem(productId).then((cart) => dispatch(setCart(cart)));
  };
};

interface Props {
  product: Product;
}

export default ProductCard;
