import { Component, OnInit } from '@angular/core';
import { GuardService } from 'src/app/_services/guard.service';
import { TargetService } from 'src/app/_services/target.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private guardService:GuardService, private targetService:TargetService) { }

  ngOnInit(): void {

    //Load Guards
    /*this.guardService.getGuards().subscribe({
      next: guards => {
        console.log("[AppComponent] get guards from api: ", guards);
        this.guardService.setGuardsSubject$(guards);
      },
      error: error => console.log(error),
      complete: () => console.log("[AppComponent] get guards from api complete")
    });

    this.guardService.guardsSubject$.subscribe({
      next: guards => {
        console.log("[AppComponent] get guards from subject: ", guards);
      },
      error: error => console.log(error),
      complete: () => console.log("[AppComponent] get guards from subject complete")
    });


    //Load Targets
    this.targetService.getTargets().subscribe({
      next: targets => {
        console.log("[AppComponent] get Targets from api: ", targets);
        this.targetService.setTargetSubject$(targets);
      },
      error: error => console.log(error),
      complete: () => console.log("[AppComponent] get Targets from api complete")
    });

    this.targetService.targetsSubject$.subscribe({
      next: targets => {
        console.log("[AppComponent] get Targetss from subject: ", targets);
      },
      error: error => console.log(error),
      complete: () => console.log("[AppComponent] get Targets from subject complete")
    });*/

    
  }

}
