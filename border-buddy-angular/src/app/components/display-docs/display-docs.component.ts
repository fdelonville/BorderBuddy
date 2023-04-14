import { Component } from '@angular/core';
import {UploadService} from "../../services/upload.service";
import {Justificatif} from "../../models/justif.model";

@Component({
  selector: 'app-display-docs',
  templateUrl: './display-docs.component.html',
  styleUrls: ['./display-docs.component.scss']
})
export class DisplayDocsComponent {
  startDate!: string
  endDate!: string
  documents?: Justificatif[]

  constructor(private readonly uploadService: UploadService) {}

  displayAll(){
    this.uploadService.getBetweenDates(this.startDate,this.endDate).subscribe({
      next:(docs) => this.documents = docs
    })
  }

}
