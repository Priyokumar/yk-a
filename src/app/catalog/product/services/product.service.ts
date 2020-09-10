import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { API } from 'src/app/common/constants/Api.constant';
import { IProduct, IProductQuantity, IProductRequest } from '../model/product.model';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<any>(API.PRODUCT_URL);
  }

  getProduct(id: string) {
    return this.http.get<any>(API.PRODUCT_URL + '/' + id);
  }

  deleteProduct(id: string) {
    return this.http.delete<any>(API.PRODUCT_URL + '/' + id);
  }

  saveProduct(data: IProductRequest) {
    return this.http.post<any>(API.PRODUCT_URL, data);
  }

  updateProduct(id: string, data: IProductRequest) {
    return this.http.put<any>(API.PRODUCT_URL + '/' + id, data);
  }

  addQuantity(id: string, data: IProductQuantity) {
    return this.http.patch<any>(API.PRODUCT_URL + '/' + id + '/addQuantities', data);
  }


  uploadMedia(file: File, id: string, color: string, type: string): Observable<HttpEvent<{}>> {

    const formdata: FormData = new FormData();

    const mediaBody = {
      color,
      type
    };

    formdata.append('file', file);
    formdata.append('mediaBody', JSON.stringify(mediaBody));

    const url = API.PRODUCT_URL + '/' + id + '/addMedia';
    const req = new HttpRequest('PATCH', url, formdata, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }


}
