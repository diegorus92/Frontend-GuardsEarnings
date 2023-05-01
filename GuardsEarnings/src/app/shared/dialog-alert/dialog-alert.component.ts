import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GuardSelectorComponent } from 'src/app/_components/guards/guard-selector/guard-selector.component';

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.css']
})
export class DialogAlertComponent implements OnInit {

  @Input()asset = "Object";

  constructor(public dialogRef: MatDialogRef<DialogAlertComponent>) { }

  ngOnInit(): void {
  }

  accept(){
    this.dialogRef.close(true); //return the data that we need (true), and then close the dialog
  }
}
