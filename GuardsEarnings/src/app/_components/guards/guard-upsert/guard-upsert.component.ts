import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GuardService } from 'src/app/_services/guard.service';
import { Guard } from 'src/_interfaces/IGuard';

@Component({
  selector: 'app-guard-upsert',
  templateUrl: './guard-upsert.component.html',
  styleUrls: ['./guard-upsert.component.css']
})
export class GuardUpsertComponent implements OnInit {

  guardId!:number;
  guardForm!:FormGroup;

  constructor(
    private router:ActivatedRoute,
    private guardService:GuardService, 
    private formBuilder:FormBuilder,
    private navigation:Router
    ) { }

  ngOnInit(): void {

    this.router.queryParams.subscribe(params => {
      this.guardId = params['id'];
    });

    if(this.guardId && this.guardId !=0 ){
      //Edition
      console.log("[GuardUpsertComponent] Edition mode");
      this.guardService.getGuard(this.guardId).subscribe({
        next: guard => {

          this.guardForm = this.formBuilder.group({
            Name:[guard.name, Validators.required],
            Surname: [guard.surname, Validators.required],
            Email:[guard.email, Validators.email],
            Cellphone:[guard.cellphone.toString()],
            Direction:[guard.direction, Validators.required]
          });
        }
      })
    }
    else{
      //Creation
      console.log("[GuardUpsertComponent] Creation mode");
      
      this.guardForm = this.formBuilder.group({
        Name:['', Validators.required],
        Surname: ['', Validators.required],
        Email:['', Validators.email],
        Cellphone:[''],
        Direction:['', Validators.required]
      });
    }
  }


  onSubmit(event:Event):void{
    event.preventDefault();

    if(this.guardForm.valid){
      if(this.guardId && this.guardId != 0){
        //Edition mode
        var guard:Guard = {
          GuardId: 0,
          Name: this.guardForm.value['Name'],
          Surname: this.guardForm.value['Surname'],
          Email: this.guardForm.value['Email'],
          Cellphone: this.guardForm.value['Cellphone'].toString(),
          Direction: this.guardForm.value['Direction']
        } 
    
        console.log("[GuardUpsertComponent] Guard to Put: ", guard);
        
        this.guardService.putGuard(this.guardId, guard).subscribe({
          next: response =>{
            console.log("[GuardUpsertComponent] Updated Guard: ", response);
          },
          error: error => console.log("[GuardUpsertComponent] error during Update: ", error),
          complete: () => {
            console.log("[GuardUpsertComponent] Guard Updated!");
            this.navigation.navigate(['/guard/selector']);
          }
        })
      }
      else{
        //Creation Mode
        var guard:Guard = {
          GuardId: 0,
          Name: this.guardForm.value['Name'],
          Surname: this.guardForm.value['Surname'],
          Email: this.guardForm.value['Email'],
          Cellphone: this.guardForm.value['Cellphone'].toString(),
          Direction: this.guardForm.value['Direction']
        } 
    
        console.log("[GuardUpsertComponent] New guard to post: ", guard);
  
        this.guardService.postGuard(guard).subscribe({
          next: response => {
            console.log("[GuardUpsertComponent] posted new Guard: ", response);
          },
          error: error => console.log("[GuardUpsertComponent] error during post: ", error),
          complete: () => {
            console.log("[GuardUpsertComponent] New Guard posted!");
            this.navigation.navigate(['/guard/selector']);
          }
        });
      }
      
      
    }
    else{
      alert("[GuardUpsertComponent] Form Incomplete!");
      this.guardForm.markAllAsTouched();
    }
  }


  getErrorMessage() {
    return this.guardForm.controls['Email'].hasError('email') ? 'Not a valid email' : '';
  }
}
