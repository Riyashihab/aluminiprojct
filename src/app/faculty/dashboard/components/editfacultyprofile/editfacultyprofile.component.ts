import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/faculty/message.service';


@Component({
  selector: 'app-editfacultyprofile',
  templateUrl: './editfacultyprofile.component.html',
  styleUrls: ['./editfacultyprofile.component.css']
})
export class EditfacultyprofileComponent implements OnInit {
  message=[{
    username:'',
    email:'',
    date:'',
    subject:'',
    message:'', 
    expanded: false
  }];
  toggle(expanded: boolean) {
    expanded = !expanded;
  }


  constructor(private messageService:MessageService) { }

  ngOnInit(): void {
    this.messageService.getMessages().subscribe((data)=>{
      this.message=JSON.parse(JSON.stringify(data));
  })

  }
}
