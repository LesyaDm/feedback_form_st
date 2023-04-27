import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { Message } from 'src/app/models/message.model';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  contactList$!: Observable<any[]>;
  topicList$!: Observable<any[]>;
  contactList: any = [];
  topicList: any = [];
  newContact: boolean = true;
  siteKey: string = '6LdFQr4lAAAAAPAR37RURyid0rOym5E0N7RQdoUO';

  TopicMap:Map<string, string> = new Map();

  contact: Contact = {
    id: 0,
    ContactName: '',
    ContactEmail: '',
    ContactPhone: '',
  };

  message: Message = {
    id: 0,
    TopicId: 0,
    ContactId: 0,
    MessageText: '',
  };

  formCheck = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    phone: new FormControl('',[Validators.required, Validators.pattern('[0-9]{11,15}')]),
    topic: new FormControl('',Validators.required),
    mes:new FormControl('',Validators.required),
    captcha: new FormControl('',Validators.required)
  })

  constructor(private requestsServise: RequestsService, private router: Router, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.contactList$ = this.requestsServise.getAllContacts();
    this.topicList$ = this.requestsServise.getAllTopics();
    this.refreshTopicMap();
  }



  refreshTopicMap(){
    this.requestsServise.getAllTopics().subscribe(data => {
      this.topicList = data;

      for( let i of data){
        this.TopicMap.set(this.topicList[i].id, this.topicList[i].topicName)
      }
    })
    
  }

  get name(){
    return this.formCheck.get('name');
  }
  get email(){
    return this.formCheck.get('email');
  }
  get phone(){
    return this.formCheck.get('phone');
  }
  get topic(){
    return this.formCheck.get('topic');
  }
  get mes(){
    return this.formCheck.get('mes');
  }
  get captcha(){
    return this.formCheck.get('captcha');
  }

  addRequest() {
    this.requestsServise.getAllContacts().subscribe(data => {
      this.contactList = data;
      for (let i in this.contactList){

        if ((this.contactList[i].contactEmail == this.contact.ContactEmail) && (this.contactList[i].contactPhone == this.contact.ContactPhone)){
          this.newContact = false; 
          this.message.ContactId = data[+i].id;          
        }
      }
      if(this.newContact == false){
        this.requestsServise.addMessage(this.message).subscribe({
          next: (result) => {
            this.router.navigate(['request', Object.values(result)[0]]);
          }
        });
      } else{
        this.requestsServise.addContact(this.contact).subscribe({
          next: (result) => {
            this.message.ContactId = Object.values(result)[0];
            this.requestsServise.addMessage(this.message).subscribe({
              next: (result) => {
                this.router.navigate(['request', Object.values(result)[0]]);
              }
            });
          }
        });
      }
    });
   

   

    


    
  }

}
