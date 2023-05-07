import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { WorkService } from 'src/app/_services/work.service';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css']
})
export class WorkListComponent implements OnInit {


  constructor(private workSevice:WorkService) { }

  @Input() works = null;
  @Output() deleteWorkEvent = new EventEmitter<number>();
  displayedColumns:string[] = ['Date', 'Target', 'Income', 'Outcome', 'Payment per Hour', 'Total Hours', 'Payment this Journey', 'Delete'];
  deleteIcon = faTrash;


  ngOnInit(): void {
    
  }

  

  private separateTimeParts(timeString:string):number[]{
    return timeString.split(':').map(item => Number(item));
  }

  private calculateHours(entranceHours:number, outHours:number):number{
    let limit = 24;
    let acum = 0;
    let counter = entranceHours;

    do{
        if(counter == limit)
            counter = 0;
        counter++;
        acum++;
    }while(counter != outHours);
    
    return acum;
  }

  private calculateMinutes(entranceMinutes:number, outMinutes:number):number{
    return (entranceMinutes + outMinutes) / 60;
  }

  calculateWorkingTime(enterTime:string, outTime:string):number{
    let separatedEntrance = this.separateTimeParts(enterTime);
    let separatedOut = this.separateTimeParts(outTime);
    let hours = this.calculateHours(separatedEntrance[0], separatedOut[0]);
    let minutes = this.calculateMinutes(separatedEntrance[1], separatedOut[1]);

    return separatedEntrance[1] > separatedOut[1] ? (hours - minutes):(hours + minutes) ;  
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

  calculateMonthlyHours(monthWorked:any):number{
    let acum = 0;

    for(let journey of monthWorked.datas){
      acum += this.calculateWorkingTime(journey.enterTime, journey.outTime);
    }

    return acum;
  }

  deleteWork(id: number):void{
    this.deleteWorkEvent.emit(id);
  }
}
