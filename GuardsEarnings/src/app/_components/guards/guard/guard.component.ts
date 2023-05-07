import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Guard } from 'src/_interfaces/IGuard';
import { GuardService } from 'src/app/_services/guard.service';
import { WorkService } from 'src/app/_services/work.service';
import {Works} from 'src/assets/MockGuardWorks';

@Component({
  selector: 'app-guard',
  templateUrl: './guard.component.html',
  styleUrls: ['./guard.component.css']
})
export class GuardComponent implements OnInit {

  guardId:number = 0;


  guard:Guard = {
    GuardId: 0,
    Name: "string",
    Surname: "string",
    Email: "string",
    Cellphone: "string",
    Image: null,
    Direction: "string",
    Works: [] //Works //Mock Data
  };

  processedWorksDates = null;

  constructor(
    private route:ActivatedRoute,
    private guardService:GuardService,
    private workService:WorkService,
    private navigation:Router) { }

  ngOnInit(): void {

    //Test without server  
    /*
    console.log("[GuarComponent] hardcode works: ", this.guard.Works);
    this.processedWorksDates = this.processDates(this.guard.Works as any[]);
    console.log("[GuarComponent] processing works: ", this.processedWorksDates);
    console.log("[GuarComponent] List of years: ", this.getListOfyear(this.guard.Works as any[]));
    console.log("[GuarComponent] Months of a year: ", this.getMonthsOfYear(2024, this.guard.Works as any[]));
    */
    ///////////////////////////////////
    
    this.route.queryParams.subscribe(params => {
      this.guardId = params['id'];
    })
    
    if(this.guardId != 0){
      this.guardService.getGuard(this.guardId).subscribe({
        next: guard => {
          this.guard = {
            GuardId: guard.guardId,
            Name: guard.name,
            Surname: guard.surname,
            Email: guard.email,
            Cellphone: guard.cellphone,
            Image: guard.image,
            Direction: guard.direction,
            Works: guard.works 
          }

          this.processedWorksDates = this.processDates(guard.works);
        },

        error: error => console.log("[GuardComponent]",error),
        complete: () => console.log("[GuardComponent] get guard by id complete: ", this.guard)
      })
    }
  }


  refresh():void{
    console.log("Refreshing Guard Component");

    this.guard = {
      GuardId: 0,
      Name: "string",
      Surname: "string",
      Email: "string",
      Cellphone: "string",
      Image: null,
      Direction: "string",
      Works: []
  };

    this.route.queryParams.subscribe(params => {
      this.guardId = params['id'];
    })
    
    if(this.guardId != 0){
      this.guardService.getGuard(this.guardId).subscribe({
        next: guard => {
          this.guard = {
            GuardId: guard.guardId,
            Name: guard.name,
            Surname: guard.surname,
            Email: guard.email,
            Cellphone: guard.cellphone,
            Image: guard.image,
            Direction: guard.direction,
            Works: guard.works 
          }

          this.processedWorksDates = this.processDates(guard.works);
        },

        error: error => console.log("[GuardComponent]",error),
        complete: () => console.log("[GuardComponent] get guard by id complete: ", this.guard)
      })
    }
  }
  
  processDates(works:any[]):any{
  
    let yearList = this.getListOfyear(works);
    let processedDates = [];
    let years:{
      year:number,
      months:any
    };
    let months:{
      month:number,
      datas:any
    };

    for(let year of yearList){
      let monthsOfYear = this.getMonthsOfYear(year, works);

      years={
        year:year,
        months:[]
      };

      for(let m of monthsOfYear){
        months={
          month: m,
          datas: works.filter(w => w.journey.date.slice(0,4) == year && w.journey.date.slice(5,7) == m),
        }

        years.months.push(months);
      }
      

      processedDates.push(years);
    }
    return processedDates;
  }


  private getListOfyear(works:any[]):any[]{
    var years:number[]=[];
    for(let work of works){
      if(!years.includes( work.journey.date.slice(0, 4) as number))
        years.push(work.journey.date.slice(0, 4) as number);
    }

    return years;
  }

  private getMonthsOfYear(year:number, works:any[]):any[]{
    var monthsOfYear:number[]=[];
    for(let work of works){
      if(work.journey.date.slice(0,4) as number == year){
        if(!monthsOfYear.includes(work.journey.date.slice(5,7) as number))
          monthsOfYear.push(work.journey.date.slice(5,7) as number);
      }
    }

    return monthsOfYear;
  }

  deleteWork(id:number):void{
    console.log("[GuardComponent] Work Id to delete: ", id);
    this.workService.deleteWork(id).subscribe({
      next: response => {
        console.log("[GuardComponent] deleting work... ", response);
        this.refresh();
      },
      error: error => console.log("[GuardComponent] error during deletion of WOrk", error),
      complete: () => console.log("[GuardComponent] deletion of work complete!")
    });
  }
}
