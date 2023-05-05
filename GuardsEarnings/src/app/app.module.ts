import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GuardSelectorComponent } from './_components/guards/guard-selector/guard-selector.component';
import { HttpClientModule } from '@angular/common/http';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';





import { GuardComponent } from './_components/guards/guard/guard.component';
import { WorkListComponent } from './_components/works/work-list/work-list.component';
import { WorkUpsertComponent } from './_components/works/work-upsert/work-upsert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { PrincipalComponent } from './_components/principal/principal/principal.component';
import { GuardUpsertComponent } from './_components/guards/guard-upsert/guard-upsert.component';
import { DialogAlertComponent } from './shared/dialog-alert/dialog-alert.component';
import { TargetComponent } from './_components/targets/target/target.component';
import { TargetListComponent } from './_components/targets/target-list/target-list.component';
import { TargetUpsertComponent } from './_components/targets/target-upsert/target-upsert.component';




@NgModule({
  declarations: [
    AppComponent,
    GuardSelectorComponent,
    GuardComponent,
    WorkListComponent,
    WorkUpsertComponent,
    PrincipalComponent,
    GuardUpsertComponent,
    DialogAlertComponent,
    TargetComponent,
    TargetListComponent,
    TargetUpsertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
