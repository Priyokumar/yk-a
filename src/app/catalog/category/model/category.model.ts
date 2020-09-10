import { IProduct } from '../../product/model/product.model';

export interface ICategory{
    id:string;
    name:string;
    description:string;
    topCategory:boolean;
    subCategories: ICategory[];
    products: IProduct[];
}