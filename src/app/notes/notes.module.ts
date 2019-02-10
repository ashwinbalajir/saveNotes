import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotesToolbarComponent } from "./notes-toolbar/notes-toolbar.component";
import { NotesRoutingModule } from "./notes-routing.module";
import { MaterialModule } from "../shared/material.module";
import { NotesAddDialogComponent } from "./notes-add-dialog/notes-add-dialog.component";
import { FormsModule } from "@angular/forms";
import { NotesService } from "./service/notes.service";

@NgModule({
  declarations: [NotesToolbarComponent, NotesAddDialogComponent, NotesAddDialogComponent],
  imports: [CommonModule, FormsModule, NotesRoutingModule, MaterialModule],
  entryComponents: [NotesAddDialogComponent],
  providers: [NotesService]
})
export class NotesModule {}
