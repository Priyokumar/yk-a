import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'src/app/common/constants/Api.constant';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(params?: any) {
    if (params) {
      return this.http.get<any>(API.CATEGORY_URL, { params: params });
    } else {
      return this.http.get<any>(API.CATEGORY_URL);
    }
  }

  getCategoryById(id: string) {
    return this.http.get<any>(API.CATEGORY_URL + '/' + id);
  }

  saveCategory(data: any) {
    return this.http.post<any>(API.CATEGORY_URL, data);
  }

  deleteCategory(categoryId: string) {
    return this.http.delete<any>(API.CATEGORY_URL + '/' + categoryId);
  }

  updateCategory(categoryId: string, data: any) {
    return this.http.put<any>(API.CATEGORY_URL + '/' + categoryId, data);
  }

}
