export interface ProductParameters {
  PageNumber: number;
  PageSize: number;
  Brands?: string[]; // optional
  Types?: string[]; // optional
  Search?: string;
  OrderBy: string;
}
