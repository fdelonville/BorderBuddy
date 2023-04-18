import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FileDetails} from "../../models/file-details.model";
import {DocumentService} from "../../services/document.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  file!: File
  fileDetails!: FileDetails
  fileUris: Array<string> = []
  form: FormGroup
  login = sessionStorage.getItem('username')?.toString()


  constructor(private uploadService : DocumentService) {
    this.form = new FormGroup({
      'date1' : new FormControl('', Validators.required),
      'date2' : new FormControl('', Validators.required)
    })
  }

  selectFile(event: any) {
    this.file = event.target.files.item(0)
  }

  uploadFile() {
    if (this.form.valid && this.file) {
      this.uploadService.upload(this.file).subscribe({
        next: (data) => {
          this.fileDetails = data
          this.fileUris.push(this.fileDetails.fileUri)
          let startDate: string = this.form.get('date1')?.value
          let endDate: string = this.form.get('date2')?.value
          if(this.login==undefined)this.login=''
          this.uploadService.save(startDate, endDate, this.fileUris[0],this.login).subscribe({
            next: () => {
              alert("Fichier ajouté avec succès")
            }
          })
        },
        error: (e) => {
          console.log(e)
        }
      })
    }
  }
}
