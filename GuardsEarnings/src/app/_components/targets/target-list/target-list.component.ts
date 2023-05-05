import { Component, OnInit } from '@angular/core';
import { Target } from 'src/_interfaces/ITarget';
import { Targets } from 'src/assets/MockTargets';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TargetService } from 'src/app/_services/target.service';

@Component({
  selector: 'app-target-list',
  templateUrl: './target-list.component.html',
  styleUrls: ['./target-list.component.css']
})
export class TargetListComponent implements OnInit {

  targets:Target[] = [];
  addIcon = faPlus;

  constructor(private targetService:TargetService) { }

  ngOnInit(): void {
    this.getTargets();
  }

  getTargets():void{
    this.targetService.getTargets().subscribe({
      next: targets => {
        console.log("[TargetListComponent] Targets retrieve from DB: ", targets);
        for(let target of targets){
          this.targets.push({
            TargetId:target.targetId,
            Name:target.name,
            Type: target.type,
            Payment: target.payment,
            Direction: target.direction,
            Notes: target.notes
          })
        }
        console.log("[TargetListComponent] Targets saved into variable: ", this.targets);
      },
      error: error => console.log("[TargetListComponent] Error during GET ", error),
      complete:() => console.log("[TargetListComponent] Targets get complete!")
    });
  }

  deleteGuard(id:number):void{
    console.log("[TargetComponent] target whith ID: ", id+" its going to be deleted: ");

    this.targetService.deleteTarget(id).subscribe({
      next: response => {
        console.log("[TargetCOmponent] Deleting Target", response);
      },
      error: error => console.log("[TargetComponent] error during remove target", error),
      complete: () => {
        console.log("[TargetCOmponent] Target Deleted!");
        this.targets = [];
        this.getTargets();
      }
    })
  }
}
