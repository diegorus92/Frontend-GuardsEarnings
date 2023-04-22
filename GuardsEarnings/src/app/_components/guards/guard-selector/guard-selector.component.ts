import { Component, OnInit } from '@angular/core';
import { Guard } from 'src/_interfaces/IGuard';
import { GuardService } from 'src/app/_services/guard.service';

@Component({
  selector: 'app-guard-selector',
  templateUrl: './guard-selector.component.html',
  styleUrls: ['./guard-selector.component.css']
})
export class GuardSelectorComponent implements OnInit {

  guards:any[] = [];

  constructor(private guardService:GuardService) { }

  ngOnInit(): void {
    this.getGuards();
  }

  getGuards():void{
      this.guardService.getGuards().subscribe({
        next: guards => {
          this.guards = guards;
          console.log("[GuardSelectorComponent]: ",this.guards);
        },
        error: error =>{
          console.log("Error in Get guards: "+ error);
        },
        complete: () => console.log("Get Guards complete")
      })
  }

  onSelect(guard:any):void{
    console.log("Guard selected: ", guard);
  }
}
