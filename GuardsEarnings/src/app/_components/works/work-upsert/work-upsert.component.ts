import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guard } from 'src/_interfaces/IGuard';
import { Journey } from 'src/_interfaces/IJourney';
import { Target } from 'src/_interfaces/ITarget';
import { Work } from 'src/_interfaces/IWork';
import { GuardService } from 'src/app/_services/guard.service';
import { JourneyService } from 'src/app/_services/journey.service';
import { TargetService } from 'src/app/_services/target.service';
import { WorkService } from 'src/app/_services/work.service';
import { Targets } from 'src/assets/MockTargets';

@Component({
  selector: 'app-work-upsert',
  templateUrl: './work-upsert.component.html',
  styleUrls: ['./work-upsert.component.css']
})
export class WorkUpsertComponent implements OnInit {

  guardId = 0;

  guard:Guard = {
    GuardId: 0,
    Name: "string",
    Surname: "string",
    Email: "string",
    Cellphone: "string",
    Image: null,
    Direction: "string",
    Works: [] //Works //Mock Data
  }

  targets:any[] = [];
  journey!:Journey;
  newWork!:Work;
  
  workForm!: FormGroup;

  constructor(
    private router:ActivatedRoute,
    private navigation:Router,
    private formBuilder:FormBuilder,
    private guardService:GuardService,
    private targetService:TargetService,
    private journeyService: JourneyService,
    private workService: WorkService
  ) { }

  ngOnInit(): void {

    this.router.queryParams.subscribe(param => {
      this.guardId = param['guard_id'];
    });

    this.guardService.getGuard(this.guardId).subscribe({
      next: guard => {
        this.guard={
          GuardId:guard.guardId,
          Name:guard.name,
          Surname:guard.surname,
          Email:guard.email,
          Cellphone:guard.cellphone,
          Image:guard.image,
          Direction:guard.direction,
          Works:guard.works
        };
        console.log("[WorkUpsertComponent]Guard get from API: ", this.guard);
      },
      error: error => console.log(error),
      complete: () => console.log("[WorkUpsertComponent] Guard get complete")
    })

    this.targetService.getTargets().subscribe({
      next: targets => {
        this.targets = targets;
      },
      error: error => console.log(error),
      complete: () => console.log("[WorkUpsertComponent] Targets get complete")
    });


    
    //Form Group
    this.workForm = this.formBuilder.group({
      enterTime:['', Validators.required],
      outTime:['', Validators.required],
      payment:[,Validators.required],
      target:['', Validators.required],
      journeyDate:['', Validators.required],
    });
  }


  onSubmit(event:Event):void{
    event.preventDefault();

    if(this.workForm.valid){
      console.log("[WorkUpsertComponent] workForm = ",this.workForm.value);
      console.log("[WorkUpsertComponent] date from form: ", String(this.workForm.value['journeyDate'].getFullYear()+"-"+(this.workForm.value['journeyDate'].getMonth()+1)+"-"+this.workForm.value['journeyDate'].getDate()));
      
      //Create a temp Journey for search in DB
      const journeyTemp:Journey = {
        JourneyId:0,
        Date: this.dateToString(this.workForm.value['journeyDate'])//this.workForm.value['journeyDate'].getFullYear().toString()+"-"+(this.workForm.value['journeyDate'].getMonth()+1).toString().padStart(2, '0')+"-"+this.workForm.value['journeyDate'].getDate().toString().padStart(2, '0')
      };

      console.log("[WorkUpsertComponent]: journey temp", journeyTemp);

      //pass temp Journey to search the date if exist or create it if not. 
      //Anyway the function return a Journey, or that should do 
      this.journeyService.createJourney(journeyTemp).subscribe({
        next: journey => {
          console.log("[WorkUpsertComponent]: journey of endpoint createJourney:", journey);
          this.journey = {
            JourneyId: journey.journeyId,
            Date: journey.date,
          };
        },
        error: error => console.log("[WorkUpsertComponent] error journey: ",error),
        complete: () => {
          console.log("[WorkUpsertComponent] Journey post complete: ", this.journey);

          //if the Journey its correct, the function will use his ID for add it to a new Work and create in the DB.
          if(this.journey != null && this.journey.Date != undefined){
            this.newWork = {
              WorkId: 0,
              EnterTime: this.workForm.value['enterTime'].toString(),
              OutTime: this.workForm.value['outTime'].toString(),
              Payment: this.workForm.value['payment'].toString(),
              NewGuardId: Number(this.guardId),
              NewTargetId: this.workForm.value['target'].targetId,
              NewJourneyId: this.journey.JourneyId!
            }
            console.log("[WorkUpsertComponent] newWork = ", this.newWork);
            
            //create the new Work into the DB
            this.workService.createWork(this.newWork).subscribe({
              next: work => {
                console.log("[WorkUpsertComponent] Adding work into DB... ", work);
              },
              error: error => console.log("[WorkUpsertComponent] error in work's creation in DB:", error),
              complete: () => {
                console.log("[WorkUpsertComponent] Work added into DB correctly!");
                //this.navigation.navigateByUrl('/guard?id='+this.guardId);
              } 
            });
          }
          else{
            console.log("[WorkUpsertComponent] Journey not found = ", this.journey);
          }
        }
      });
    }
    else{
      alert("incomplete form!");
      this.workForm.markAllAsTouched();
    }
    
  }


  private dateToString(date:Date):string{
    return date.getFullYear().toString()+
    "-"+
    (date.getMonth()+1).toString().padStart(2, '0')+
    "-"+
    date.getDate().toString().padStart(2, '0');
  }

}
