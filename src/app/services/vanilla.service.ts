import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class VanillaService {
  public swal: typeof Swal;

  constructor() {

    this.swal = Swal;

   }
}
