import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit{


  constructor(private requestsServise: RequestsService, private route: ActivatedRoute) {}

  contact:any = [];
  message: any = [];
  topic: any = [];

  // TopicMap:Map<string, string> = new Map();
  // NameMap:Map<string, string> = new Map();
  // EmailMap:Map<string, string> = new Map();
  // PhoneMap:Map<string, string> = new Map();

    ngOnInit(): void {
    // this.messageOutput();
    // this.refreshTopicMap();    
    // this.refreshNameMap(); 
    
    this.route.paramMap.subscribe({
      next: (params) =>{
        const id = +params.get('id')!;
        this.requestsServise.getMessage(id).subscribe(data => {
          this.message = data;        
          this.requestsServise.getContact(this.message.contactId).subscribe(data => {
            this.contact = data;
          });  
          this.requestsServise.getTopic(this.message.topicId).subscribe(data => {
            this.topic = data;
          });
        }); 
      }
    })
  }

  // messageOutput(){
  //   this.requestsServise.getAllMessages().subscribe(data => {
  //     this.messageList = data;
  //   });
  // }

  // refreshTopicMap(){
  //   this.requestsServise.getAllTopics().subscribe(data => {
  //     this.topicList = data;

  //     for( let i in data){
  //       this.TopicMap.set(this.topicList[i].id, this.topicList[i].topicName)
  //     }    
  //   });
  // }

  // refreshNameMap(){
  //   this.requestsServise.getAllContacts().subscribe(data => {
  //     this.contactList = data;

  //     for( let i in data){
  //       this.NameMap.set(this.contactList[i].id, this.contactList[i].contactName)
  //     }    
  //   });
  // }


}

