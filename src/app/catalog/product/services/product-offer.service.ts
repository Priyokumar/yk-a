import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'src/app/common/constants/Api.constant';

@Injectable()
export class ProductOfferService {

  constructor(private http: HttpClient) { }

  getProductOffers() {
    return this.http.get<any>(API.PRODUCT_OFFER_URL);
  }

}
