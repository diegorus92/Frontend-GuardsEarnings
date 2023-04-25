import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css']
})
export class WorkListComponent implements OnInit {


  constructor() { }

  @Input() works = null;


  ngOnInit(): void {
    
  }

  

  private separateTimePart(stringTime:string):string[]{
    let out = stringTime.split(":");
    return out;
  }

  calculateWorkingTime(enter:string, out:string):number{
    const minutesPerHour = 60;
    const hoursPerDay = 24;
    let splitedEnter = this.separateTimePart(enter);
    let splitedOut = this.separateTimePart(out);

    let enterHour = Number(splitedEnter[0]);
    let enterMinutes = Number(splitedEnter[1]);
    let outHour = Number(splitedOut[0]);
    let outMinutes = Number(splitedOut[1]);

    let totalHours = 0;

    enterHour *= minutesPerHour - (enterMinutes);
    outHour *= minutesPerHour - (outMinutes);

    if(enterHour > outHour) enterHour -= (hoursPerDay * 60);
    else outHour -= (hoursPerDay * 60);
    

    totalHours = (enterHour - outHour)/ minutesPerHour;

    return totalHours < 0 ? totalHours * (-1): totalHours;
  }

  calculatePayPerDay(workedHours:number, payPerHours:number):number{
    return (workedHours * payPerHours);
  }

  calculateMonthlyEarning(monthWorked:any):number{
    let acum = 0;

    for(let journey of monthWorked.datas){
      acum += this.calculatePayPerDay(this.calculateWorkingTime(journey.enterTime, journey.outTime), journey.target.payment);
    }

    return acum;
  }
}
