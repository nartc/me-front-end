import { Component, OnInit } from '@angular/core';
import { Validators,FormControl,FormGroup,FormBuilder } from '@angular/forms';
import { Message, SelectItem } from 'primeng/primeng';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Client, Contact, Address } from '../../models/client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contact: {
      address: {
        street: '',
        street2: '',
        city: '',
        state: '',
        zip: ''
      },
      phone: ''
    },
    balance: 0,
    _id: '',
    role: ''
  }

  public states: Array<SelectItem> = [];
  public clientForm: FormGroup;
  public registerMessages: Array<Message> = [];
  public emailRegex: string = "[^ @]*@[^ @]*";
  public phoneRegex: string = "[1-9]{3}-[0-9]{3}-[0-9]{4}";

  constructor(
    public fB: FormBuilder,
    public authService: AuthService,
    public clientService: ClientService,
    public router: Router,
    public flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.clientForm = this.fB.group({
      'firstName': new FormControl(''),
      'lastName': new FormControl(''),
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(this.emailRegex)
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      
      'contact': this.fB.group({
        'address': this.fB.group({
          'street': new FormControl(''),
          'street2': new FormControl(''),
          'city': new FormControl(''),
          'state': new FormControl(''),
          'zip': new FormControl('', Validators.required)
        }),
        'phone': new FormControl(0, Validators.compose([
          Validators.pattern(this.phoneRegex)
        ]))
      }),
      'balance': new FormControl({value: 0, disabled: true}, Validators.required),
      
    });

    console.log(this.clientForm.value);

    this.states = [];
    this.states.push({label:'Alabama',value:'AL'});
    this.states.push({label:'Alaska',value:'AK'});
    this.states.push({label:'Arizona',value:'AZ'});
    this.states.push({label:'Arkansas',value:'AR'});
    this.states.push({label:'California',value:'CA'});
    this.states.push({label:'Colorado',value:'CO'});
    this.states.push({label:'Connecticut',value:'CT'});
    this.states.push({label:'Delaware',value:'DE'});
    this.states.push({label:'Florida',value:'FL'});
    this.states.push({label:'Georgia',value:'GA'});
    this.states.push({label:'Hawaii',value:'HI'});
    this.states.push({label:'Idaho',value:'ID'});
    this.states.push({label:'Illinois',value:'IL'});
    this.states.push({label:'Indiana',value:'IN'});
    this.states.push({label:'Iowa',value:'IA'});
    this.states.push({label:'Kansas',value:'KS'});
    this.states.push({label:'Kentucky',value:'KY'});
    this.states.push({label:'Louisiana',value:'LA'});
    this.states.push({label:'Maine',value:'ME'});
    this.states.push({label:'Maryland',value:'MD'});
    this.states.push({label:'Massachusetts',value:'MA'});
    this.states.push({label:'Michigan',value:'MI'});
    this.states.push({label:'Minnesota',value:'MN'});
    this.states.push({label:'Mississippi',value:'MS'});
    this.states.push({label:'Missouri',value:'MO'});
    this.states.push({label:'Montana',value:'MT'});
    this.states.push({label:'Nebraska',value:'NE'});
    this.states.push({label:'Nevada',value:'NV'});
    this.states.push({label:'New Hampshire',value:'NH'});
    this.states.push({label:'New Jersey',value:'NJ'});
    this.states.push({label:'New Mexico',value:'NM'});
    this.states.push({label:'New York',value:'NY'});
    this.states.push({label:'North Carolina',value:'NC'});
    this.states.push({label:'North Dakota',value:'ND'});
    this.states.push({label:'Ohio',value:'OH'});
    this.states.push({label:'Oklahoma',value:'OK'});
    this.states.push({label:'Oregon',value:'OR'});
    this.states.push({label:'Pennsylvania',value:'PA'});
    this.states.push({label:'Rhode Island',value:'RI'});
    this.states.push({label:'South Carolina',value:'SC'});
    this.states.push({label:'South Dakota',value:'SD'});
    this.states.push({label:'Tennessee',value:'TN'});
    this.states.push({label:'Texas',value:'TX'});
    this.states.push({label:'Utah',value:'UT'});
    this.states.push({label:'Vermont',value:'VT'});
    this.states.push({label:'Virginia',value:'VA'});
    this.states.push({label:'Washington',value:'WA'});
    this.states.push({label:'West Virginia',value:'WV'});
    this.states.push({label:'Wisconsin',value:'WI'});
    this.states.push({label:'Wyoming',value:'WY'});
    this.states.push({label:'District of Columbia',value:'DC'});
  }

  onAddSubmit(value) {
    value.balance = 0;
    this.client = value;
    console.log(this.client);

    this.clientService.addClient(this.client).subscribe(
      (data: any): void => {
        console.log(data);
        if(data.success) {
          this.flashMessagesService.show(
            data.msg,
            {
              cssClass: 'ui-messages-info',
              timeout: 3000
            }
          );
          this.router.navigate(['/dashboard/'+data.client.role+'/'+data.client._id]);
        }
      }
    )
  }

}
