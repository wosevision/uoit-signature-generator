import { Component } from '@angular/core';

import { MailerService } from './core/mailer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formData: Partial<FormData> = {};
  resultSuccess;
  resultError;

  constructor(private mailer: MailerService) {}

  onFormChange(event: FormData) {
    this.formData = event;
  }

  onFormSubmit(event, html, addressee) {
    event.preventDefault();
    this.mailer
      .send({ html, addressee })
      .subscribe(result => (this.resultSuccess = result), error => (this.resultError = error));
  }
}
