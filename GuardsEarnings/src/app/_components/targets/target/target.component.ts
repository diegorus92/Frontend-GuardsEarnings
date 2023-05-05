import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Target } from 'src/_interfaces/ITarget';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { TargetService } from 'src/app/_services/target.service';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.css']
})
export class TargetComponent implements OnInit {

    @Input() target:Target = {
    TargetId: 0,
    Name: "Name",
    Type: "Type",
    Payment: 0,
    Direction: "Direction",
    Notes: "notes"
  }

  @Output() targetRemoveEvent = new EventEmitter<number>();

  editIcon = faPen;
  removeIcon = faTrash;

  constructor() { }

  ngOnInit(): void {
  }

  deleteGuard(id:number):void{
    this.targetRemoveEvent.emit(id);
  }
}
