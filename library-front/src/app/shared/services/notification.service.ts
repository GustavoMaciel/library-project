import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toastrService: ToastrService
  ) { }

  successMessage(message: string, title?: string) {
    this.toastrService.success(message, title);
  }

  insertedSuccess() {
    this.toastrService.success('Item inserted successfully.');
  }

  updateSucess() {
    this.toastrService.success('Item updated successfully.');
  }

  deletedSucess() {
    this.toastrService.success('Item successfully deleted.');
  }

  error() {
    this.toastrService.error('This action could not be completed.', 'Error');
  }

  errorMessage(message: string, title?: string) {
    this.toastrService.error(message, title);
  }

}
