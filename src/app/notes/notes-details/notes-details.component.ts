import { Component, OnInit } from "@angular/core";
import { NotesService } from "../service/notes.service";
import { MatTableDataSource, MatDialog, MatSnackBar } from "@angular/material";
import { getNotes } from "../notes";
import { NotesAddDialogComponent } from '../notes-add-dialog/notes-add-dialog.component';
import { filter, remove } from "lodash";

@Component({
  selector: "app-notes-details",
  templateUrl: "./notes-details.component.html",
  styleUrls: ["./notes-details.component.scss"]
})
export class NotesDetailsComponent implements OnInit {
  // displayedColumns: string[] = ["id", "user", "notes", "createdAt", "updatedAt"];
  displayedColumns: string[] = ["id", "user", "notes", "action"];
  dataSource;
  // dataSource = new MatTableDataSource<getNotes[]>();

  constructor(private notesService: NotesService, public dialog: MatDialog, private snackbar: MatSnackBar, ) { }
  notes: string;
  name: string;
  openDialog(): void {
    const dialogRef = this.dialog.open(NotesAddDialogComponent, {
      width: "350px",
      height: "280px",
      data: { name: this.name, notes: this.notes }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.notes = result;
      this.dataSource.push(result);
      this.dataSource = [...this.dataSource];
      debugger;
    });
  }
  ngOnInit() {
    this.notesService.getNotes().subscribe(data => {
      // debugger;
      this.dataSource = data;
    });
  }
  deleteNotes(id) {
    this.notesService.deleteNotes(id).subscribe(data => {
      if (data.status == 200) {
        const dataItems = filter(this.dataSource, function (currentObject) {
          return currentObject.id != id;
        });
        this.dataSource = [...dataItems];
        this.snackbar.open("Notes Deleted", "Success", {
          duration: 10000
        });
      } else {
        this.errorHandler(data.mes);
      }
    });
  }
  errorHandler(mes) {
    this.snackbar.open(mes, "Failed", {
      duration: 10000
    });
  }
}