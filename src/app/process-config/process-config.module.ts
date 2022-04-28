import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessConfigRoutingModule } from './process-config-routing.module';
import { ProcessConfigComponent } from './process-config.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { AddProcessComponent } from './add-process/add-process.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgIdleModule } from '@ng-idle/core';
import { SelectIdVerifierDialogComponent } from './select-id-verifier-dialog/select-id-verifier-dialog.component';


@NgModule({
  declarations: [ProcessConfigComponent, AddProcessComponent, SelectIdVerifierDialogComponent],
  imports: [
    CommonModule,
    ProcessConfigRoutingModule,
    DragDropModule,
    FlexModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    NgIdleModule.forRoot(),
    FormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProcessConfigModule { }
