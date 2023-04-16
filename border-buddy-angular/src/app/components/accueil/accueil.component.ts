import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  showRegister: boolean = false

    protected readonly sessionStorage = sessionStorage;

  toggle() {
    this.showRegister = !this.showRegister
  }
}
