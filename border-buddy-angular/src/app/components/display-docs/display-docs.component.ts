import { Component } from '@angular/core';
import {DocumentService} from "../../services/document.service";
import {Justificatif} from "../../models/justif.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-display-docs',
  templateUrl: './display-docs.component.html',
  styleUrls: ['./display-docs.component.scss']
})
export class DisplayDocsComponent {
  startDate!: string
  endDate!: string
  documents?: Justificatif[]
  errorMessage?: string
  form: FormGroup
  username = sessionStorage.getItem('username')
  login = (this.username ? this.username : '')

  constructor(private readonly uploadService: DocumentService) {
    this.form = new FormGroup({
      'startDate': new FormControl('',Validators.required),
      'endDate': new FormControl('',Validators.required)
    })
  }

  displayAll(){
    if(this.form.valid){
      this.startDate = this.form.get('startDate')?.value
      this.endDate = this.form.get('endDate')?.value
      this.uploadService.getBetweenDates(this.startDate,this.endDate,this.login).subscribe({
        next:(docs) => {
          this.documents = docs
          if(this.documents.length===0){
            this.errorMessage = "La période choisie ne contient aucun document."
          }
          else this.errorMessage = undefined
          this.startDate = ''
          this.endDate = ''
        },
        error: () => this.errorMessage = "Erreur: les documents pour la période donnée n'ont pas pu être récupérés."
      })
    }
    else this.errorMessage = "Tous les champs doivent être remplis."
  }

}
