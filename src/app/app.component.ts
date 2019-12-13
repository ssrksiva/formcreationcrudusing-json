import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	url="test";
	editMode=false;
  json: any = {
      name: {
        label: 'Name1',
        value: 'Juri',
        type: 'text',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 10
        },
      },
      age: {
        label: 'Age',
        value: 32,
        type: 'number'
      },
      email: {
        label: 'Email Address',
        value: null,
        type: 'email'
      },
      profilePic: {
        label: 'Profile Picture Upload',
        type: 'file'
      },
      comment: {
        label: 'comment',
        value: null,
        type: 'text',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 10
        },
      },
      gender: {
        label: 'Gender',
        value: 'M',
        type: 'radio',
        options: [
          { label: 'Male', value: 'M' },
          { label: 'Female', value: 'F' }
        ]
      },
      city: {
        label: 'City',
        value: '39010',
        type: 'select',
        options: [
          { label: '(choose one)', value: '' },
          { label: 'Bolzano', value: '39100' },
          { label: 'Meltina', value: '39010' },
          { label: 'Appiano', value: '39057' }
        ],
        validation: {
          required: true
        }
      }
    };
	fields={};
public e = {
    '@baseType': 'string',
    '@type': 'string',
    aristocraticTitle: 'string',
    birthDate: '2019-11-11T06:27:56.399Z',
    countryOfBirth: 'string',
    deathDate: '2019-11-11T06:27:56.400Z',
    familyName: 'string',
    familyNamePrefix: 'string',
    formattedName: 'string',
    fullName: 'string',
    gender: 'string',
    generation: 'string',
    givenName: 'string',
    legalName: 'string',
    location: 'string',
    maritalStatus: 'string',
    middleName: 'string',
    nationality: 'string',
    placeOfBirth: 'string',
    preferredGivenName: 'string',
    status: 'initialized',
    title: 'string'
  };
  constructor() {
  }
ngOnInit() {
	 this.makeFields(this.e, this.fields, false);
 }
  components(fg: FormGroup) {
    if (fg.controls['gender'].value == 'F' && fg.controls['age'].value != '--') {
      fg.controls['age'].setValue('--');
      fg.controls['age'].disable();
    } else if (fg.controls['gender'].value == 'M' && !fg.controls['age'].enabled) {
      fg.controls['age'].enable();
      fg.controls['age'].setValue('');
    }
  }
makeFields(e: any, fields: any, remove: boolean, json?: any) {
    if (!json) {
      console.log('inside without json');
      const props5 = Object.keys(e);
      for (const p of props5) {
        const test5 = {
          type: this.checkTypes(p, e),
          label: this.generateLabel(p),
          value: this.checkValues(p, e),
          options: this.optionsCheck(p, e)
        };
        fields[p] = test5;
      }
    } else {
      console.log('inside json');
      const props5 = Object.keys(e);
      for (const p of props5) {
        const test5 = 
		 {
          type: this.checkTypes(p, e),
          label: this.generateLabel(p),
          value: this.checkValues(p, json),
          options: this.optionsCheck(p, e, json)
        };
        fields[p] = test5;
      }
    }
  }
   checkValues(p: any, e: any, remove?: boolean, type?: any) {
    console.log(type);
    if (this.editMode) {
      if (type === 'checkbox') {
        return (e[p][p] = e[p]);
      }
      if (p.includes('Date')) {
        const test = e[p].toString().split('-');
        const test2 = test[2].split('T');
        console.log(test[0] + '-' + test[1] + '-' + test2[0]);
        return test[0] + '-' + test[1] + '-' + test2[0];
      }
      return e[p];
    } else {
      return '';
    }
  }
  checkTypes(p: any, e: any) {
    if (p.includes('Date')) {
      return 'date';
    } else if (typeof e[p] === 'boolean') {
      return 'checkbox';
    } else if (typeof e[p] === 'number') {
      return 'number';
    } /* else if (typeof e[p] === 'object') {
      this.makeFields(e[p],this.fields,false);
    } */ else if (typeof e[p] === 'object' && e[p] !== null && Array.isArray(e[p])) {
	  return 'array';
		   
	} else {
      return 'text';
    }
  }
  optionsCheck(p: any, e: any, json?: any) {
    const options = [];
    if (typeof e[p] === 'boolean') {
      if (!json) {
        options.push({label: p, value:p });
      } else {
        options.push({ label: p, value:p });
      }
      return options;
    } else {
      return null;
    }
  }
  generateLabel(p1: any) {
    if (p1.includes('@')) {
      p1 = p1.replace('@', '');
    }
    return p1.substring(0, 1).toUpperCase() + p1.substring(1);
  }
  update($event) {
    debugger;
    this.json = JSON.parse($event.target.value);
  }

  get rapidPageValue () {
    return JSON.stringify(this.json, null, 2);
  }

  set rapidPageValue (v) {
    try{
    this.json = JSON.parse(v);}
    catch(e) {
      console.log('error occored while you were typing the JSON');
    };
  }

check(value)
{
 console.log(value);
}

}
