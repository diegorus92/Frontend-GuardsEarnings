import { Component, OnInit } from '@angular/core';
import { Guard } from 'src/_interfaces/IGuard';
import { GuardService } from 'src/app/_services/guard.service';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Guards } from 'src/assets/MockGuards';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAlertComponent } from 'src/app/shared/dialog-alert/dialog-alert.component';

@Component({
  selector: 'app-guard-selector',
  templateUrl: './guard-selector.component.html',
  styleUrls: ['./guard-selector.component.css']
})
export class GuardSelectorComponent implements OnInit {

  guards:any[] = [];//Guards;
  guardSelected:Guard = {
    GuardId: 0,
    Name: "string",
    Surname: "string",
    Email: "string",
    Cellphone: "string",
    Image: null,
    Direction: "string",
    Works: []
  };

  addIcon = faPlus;

  constructor(private guardService:GuardService, public dialog: MatDialog) { }

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
    this.guardSelected = {
      GuardId: guard.guardId,
      Name: guard.name,
      Surname: guard.surname,
      Email: guard.email,
      Cellphone: guard.cellphone,
      Image: guard.image,
      Direction: guard.direction,
      Works: guard.works
    }
    console.log("Guard type: ", this.guardSelected);
  }

  private deleteGuard(id:number):void{
    if(id && id != 0){
      console.log("[GuardSelectorComponent] Guard (ID:"+id+") its going to be deleted");
      this.guardService.deleteGuard(id).subscribe({
        next: response =>{
          console.log("[GuardUpsertComponent] Deleting Guard: ", response);
        },
        error: error => console.log("[GuardUpsertComponent] error during Delete: ", error),
        complete: () => {
          console.log("[GuardUpsertComponent] Guard Deleted!");
          this.getGuards();
        }
      })
    }
    else
      alert("[GuardSelectorComponent] no guard has been selected");
  }

  openDialog(id:number): void {
    let dialog = this.dialog.open(DialogAlertComponent);
    dialog.componentInstance.asset = "Guard";

    dialog.afterClosed().subscribe(selection => {
      if(selection){
        console.log("[GuardSelectorCOmponent] Choose AFFIRMATIVE in Dialog");
        this.deleteGuard(id);
      }
      else{
        console.log("[GuardSelectorCOmponent] Choose NEGATIVE in Dialog");
      }
    })
  }
}


