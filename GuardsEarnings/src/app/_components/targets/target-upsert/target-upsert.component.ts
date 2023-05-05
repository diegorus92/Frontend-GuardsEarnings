import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Target } from 'src/_interfaces/ITarget';
import { TargetService } from 'src/app/_services/target.service';

@Component({
  selector: 'app-target-upsert',
  templateUrl: './target-upsert.component.html',
  styleUrls: ['./target-upsert.component.css']
})
export class TargetUpsertComponent implements OnInit {

  targetId!:number;
  targetForm!:FormGroup;
  target:Target = {
    TargetId: 0,
    Name: "string",
    Type: "string",
    Payment: 0,
    Direction: "string",
    Notes: "string"
  };

  constructor(
    private router:ActivatedRoute,
    private formBuilder:FormBuilder, 
    private targetService:TargetService,
    private navigation:Router
    ) { }


  ngOnInit(): void {
    this.router.queryParams.subscribe(params =>{
      this.targetId = params['id'];
    });

    if(this.targetId && this.targetId != 0){
      //Edit mode
      this.targetService.getTarget(this.targetId).subscribe({
        next: target => {
          console.log("[TargetUpsertComponent] Edition mode, target retrieved: ", target);

          this.targetForm = this.formBuilder.group({
            Name: [target.name, Validators.required],
            Type: [target.type, Validators.required],
            Payment: [target.payment, Validators.required],
            Direction: [target.direction, Validators.required],
            Notes: [target.notes]
          });
        },
        error: error => console.log("[TargetUpsertComponent] error during Target Get: ", error),
        complete: () =>{
          console.log("[TargetUpsertComponent] Target get complete!")
        } 
      });
    }
    else{
      //Creation mode
      this.targetForm = this.formBuilder.group({
        Name: ['', Validators.required],
        Type: ['', Validators.required],
        Payment: [ , Validators.required],
        Direction: ['', Validators.required],
        Notes: ['']
      });
    }
  }


  onSubmit(event:Event):void{
    event.preventDefault();

    if(this.targetForm.valid){
      if(this.targetId && this.targetId != 0){
        //Edition mode
        this.target = this.targetForm.value as Target;
        this.target.TargetId = this.targetId;

        console.log("[TargetUpsertComponent] Edition mode, target ready to update: ", this.target);

        this.targetService.putTarget(this.targetId, this.target).subscribe({
          next: response => {
            console.log("[TargetUpsertComponent]: Updating Target: ", response);
          },
          error: error => console.log("[TargetUpsertComponent]: Error during update Target: ", error),
          complete: () => {
            console.log("[TargetUpsertComponent]: Target updated correctly!: ");
            this.navigation.navigate(['/targets']);
          }
        })
      }
      else{
        //Creation mode
        console.log("[TargetUpsertComponent]: data from form: ", this.targetForm.value);

        this.target = this.targetForm.value as Target;
        this.target.TargetId = 0;
        console.log("[TargetUpsertComponent]: object Target prepare to post: ", this.target);

        this.targetService.postTarget(this.target).subscribe({
          next: response => {
            console.log("[TargetUpsertComponent]: saving new Target. Response: ", response);
          },
          error: error => console.log("[TargetUpsertComponent]: Error ocurred in Post Target: ", error),
          complete: () => {
            console.log("[TargetUpsertComponent]: Target Posted correcly!");
            this.navigation.navigate(['/targets']);
          }
        });
      }
    }
    else{
      alert("Invalid form");
      this.targetForm.markAllAsTouched();
    }
  }
}
