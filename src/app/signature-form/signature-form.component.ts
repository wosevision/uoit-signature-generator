import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { CompleterService, LocalData } from 'ng2-completer';

import { SocialNetworks, ButtonStyles, EventIcons, BrandLogos, FormData } from '../shared/models';
import { LdapColumns } from '../shared';
import { DirectoryService } from '../core/directory.service';

const DIGIT = /\d/;
const DIGIT_1TO9 = /[1-9]/;
/**
 * @example
 * <signature-form (formChange)="onFormChange($event)"></signature-form>
 */
@Component({
  selector: 'signature-form',
  styleUrls: ['./signature-form.component.scss'],
  templateUrl: './signature-form.component.html'
})
export class SignatureFormComponent implements OnInit {
  @Output()
  formChange = new EventEmitter<FormData>();
  @Output()
  formSubmit = new EventEmitter();

  socialNetworks = SocialNetworks;
  buttonStyles = ButtonStyles;
  eventIcons = EventIcons;
  brandLogos = BrandLogos;
  phoneMask = [DIGIT_1TO9, DIGIT, DIGIT, '.', DIGIT, DIGIT, DIGIT, '.', DIGIT, DIGIT, DIGIT, DIGIT];
  directoryData: {
    firstNames: LocalData;
    lastNames: LocalData;
    titles: LocalData;
    emails: LocalData;
    departments: LocalData;
  };
  formData: FormGroup;

  constructor(
    private fb: FormBuilder,
    private directory: DirectoryService,
    private completer: CompleterService
  ) {}

  ngOnInit() {
    this.buildForm();
    const directory = this.directory.getAll(),
      departments = this.directory.getDepartments(),
      firstNameColumn = LdapColumns.NAME_FIRST,
      lastNameColumn = LdapColumns.NAME_LAST,
      titleColumn = LdapColumns.TITLE,
      emailColumn = LdapColumns.EMAIL,
      departmentColumn = LdapColumns.DEPARTMENT;
    this.directoryData = {
      firstNames: this.completer.local(directory, firstNameColumn, firstNameColumn),
      lastNames: this.completer.local(directory, lastNameColumn, lastNameColumn),
      titles: this.completer.local(directory, titleColumn, titleColumn),
      emails: this.completer.local(directory, emailColumn, emailColumn),
      departments: this.completer.local(departments)
    };
  }

  buildForm() {
    this.formData = this.fb.group({
      name: this.fb.group({
        first: ['', Validators.required],
        last: ['', Validators.required]
      }),
      contact: this.fb.group({
        phone: ['905.721.8668', Validators.required],
        ext: '',
        mobile: '',
        fax: '',
        faxext: '',
        email: ['', Validators.required],
        website: ['uoit.ca', Validators.required]
      }),
      credentials: this.fb.group({
        title: '',
        dept: ''
      }),
      // hours: this.fb.group({
      // 	title: '',
      // 	dept: '',
      // }),
      hours: '',
      social: this.fb.group({
        style: this.buttonStyles[0],
        networks: this.fb.array([
          this.initSocial({ type: 'fb', username: 'myuoit' }),
          this.initSocial({ type: 'tw', username: 'uoit' }),
          this.initSocial({ type: 'li', username: 'uoit' }),
          this.initSocial({ type: 'yt', username: 'universityofontario' }),
          this.initSocial({ type: 'in', username: 'uoit' })
        ])
      }),
      logo: this.brandLogos[0],
      event: this.fb.group({
        use: false,
        data: this.fb.group({
          icon: this.eventIcons[0],
          size: '',
          name: '',
          date: '',
          desc: '',
          cta: '',
          url: ''
        })
      }),
      message: this.fb.group({
        style: '',
        content: ''
      })
    });

    this.formData.valueChanges.subscribe(data => this.onFormChange(data));

    this.onFormChange(this.formData.value);
  }

  initSocial({ type = '', username = '' } = {}) {
    return this.fb.group({
      type: this.socialNetworks.find(network => network.value === type),
      username: [username, Validators.required]
    });
  }

  get socialControls() {
    return <FormGroup>this.formData.controls['social'];
  }

  get socialNetworksControls() {
    return <FormArray>this.socialControls.controls['networks'];
  }

  addSocial() {
    this.socialNetworksControls.push(this.initSocial());
  }

  removeSocial(i) {
    this.socialNetworksControls.removeAt(i);
  }

  onFormChange(data: FormData) {
    this.formChange.emit(data);
  }

  onSubmit(event, formData) {
    event.preventDefault();
    this.formSubmit.emit(formData);
  }
}
