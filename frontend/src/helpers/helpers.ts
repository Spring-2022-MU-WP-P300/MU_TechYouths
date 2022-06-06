import { Product } from "../models/product";
import { ProductParameters } from "../models/ProductParameters";

export function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export const getParameters = (params: ProductParameters) => {
  const p = new URLSearchParams();
  p.append("PageNumber", params.PageNumber.toString());
  p.append("PageSize", params.PageSize.toString());
  params.Brands && p.append("Brands", params.Brands.toString());
  params.Types && p.append("Types", params.Types.toString());
  params.Search && p.append("Search", params.Search.toString());
  p.append("OrderBy", params.OrderBy.toString());

  return p;
};

export const getAllBrands = (items: Product[]) => {
  const brands: string[] = [];
  items.map((item: Product) => {
    const found = brands.findIndex((curBrand) => curBrand === item.brand);
    if (found === -1 || brands.length === 0) {
      brands.push(item.brand);
    }
    return found === -1;
  });
  return brands;
};

export const getAllTypes = (items: Product[]) => {
  const types: string[] = [];
  items.map((item: Product) => {
    const found = types.findIndex((curType) => curType === item.type);
    if (found === -1 || types.length === 0) {
      types.push(item.type);
    }
    return found === -1;
  });
  return types;
};
