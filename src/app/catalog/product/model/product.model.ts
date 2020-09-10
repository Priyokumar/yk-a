import { ICategory } from '../../category/model/category.model';

export interface IProduct {
    id?: string;
    name: string;
    unit: string;
    price?: number;
    weights: string[];
    pcs?: string[];
    customizable: boolean;
    totalQuantity?: number;
    category: ICategory;
}

export interface IProductRequest {
    id: string;
    name: string;
    unit: string;
    price: number;
    weights: string[];
    pcs: string[];
    customizable: boolean;
    totalQuantity: number;
    categoryId: string;
    mediaId:string;
}

export interface IProductQuantity {
    id: string;
    quantity: number;
    size: string;
    color: string;
}

export interface IPaymentOption {
    id: string;
    name: string;
    enabled: boolean;
}

export interface IMedia {
    id: string;
    mediaId: string;
    color: string;
}

export interface IProductOffer {
    id: string;
    name?: string;
    status?: string;
    description?: string;
    offerType?: string;
    amount?: number;
    percentage?: number;
}