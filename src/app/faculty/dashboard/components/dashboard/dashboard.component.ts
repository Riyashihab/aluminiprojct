import { Component, OnInit } from '@angular/core';
import { FacultyService } from 'src/app/faculty/faculty.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/register/mustmatch';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  registerForm!: FormGroup;
  //imageSrc: string;
  gridColumns = 3;
  minDate = new Date(2010, 4, 12); 
  formdata = new FormData();
  submitted = false;
  constructor( private facultyservice:FacultyService,private formBuilder: FormBuilder) { }
  facultyinfo= {
    userid:'610934ae2bb10823dc9bf9b4',
     username : '',
     lastname: '',
     user_email : '',
     password : '',
     phone_number : '',
     skills:'',
     dateofjoining:'',
     coursehandling:''
  }
  ngOnInit(): void {

    
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required,Validators.minLength(5)]],
     
      email: ['', [Validators.required, Validators.email]],
      phone:['',[Validators.required,Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)]],
      password: ['', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    
      confirmPassword: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
    
 

    console.log("display profilesssss");

    let facultyid = localStorage.getItem("userid");
    console.log(facultyid);
    this.facultyservice.getUser(facultyid).subscribe((data)=>{
      this.facultyinfo=JSON.parse(JSON.stringify(data));
      console.log(this.facultyinfo);
  })
  }
  get f() { return this.registerForm.controls; }


  editProfile(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    else{
    console.log("submittteeeed",this.facultyinfo);
    alert(" update Success");
    this.facultyservice.editUser(this.facultyinfo);   
    console.log("update",this.facultyinfo);
   // this.router.navigate(['products']);
    }
  }

  onChangeSelection(selected: string) {
    var chang = parseInt(selected);
    console.log(chang);
}


// onFileChange(event) {
//   const reader = new FileReader();
  
//   if(event.target.files && event.target.files.length) {
//     const [file] = event.target.files;
//     reader.readAsDataURL(file);
  
//     reader.onload = () => {
 
//       this.imageSrc = reader.result as string;
   
//       this.myForm.patchValue({
//         fileSource: reader.result
//       });
 
//     };
 
//   }
// }
}

