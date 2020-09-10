import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'src/app/common/constants/Api.constant';
import { map } from 'rxjs/operators';
import { IPaymentOption } from '../model/product.model';

@Injectable()
export class PaymentOptionService {

  constructor(private http: HttpClient) { }

  getPaymentOptions() {
    return this.http.get<IPaymentOption[]>(API.PAYMENT_OPTION_URL).pipe(map((data: any) => {
      return data.data;
    }));
  }
}
