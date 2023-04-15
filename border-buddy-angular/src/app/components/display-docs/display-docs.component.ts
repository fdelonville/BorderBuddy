import { Component } from '@angular/core';
import {UploadService} from "../../services/upload.service";
import {Justificatif} from "../../models/justif.model";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-display-docs',
  templateUrl: './display-docs.component.html',
  styleUrls: ['./display-docs.component.scss']
})
export class DisplayDocsComponent {
  startDate!: string
  endDate!: string
  documents?: Justificatif[]
  form: FormGroup

  constructor(private readonly uploadService: UploadService) {
    this.form = new FormGroup({
      'startDate': new FormControl(),
      'endDate': new FormControl()
    })
  }

  selectStartDate(){
    this.startDate = this.form.get('startDate')?.value
  }

  displayAll(){
    this.endDate = this.form.get('endDate')?.value
    this.uploadService.getBetweenDates(this.startDate,this.endDate).subscribe({
      next:(docs) => this.documents = docs
    })
  }

}
