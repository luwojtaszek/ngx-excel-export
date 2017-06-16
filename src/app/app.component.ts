import { Component } from '@angular/core';
import { ExcelService } from './excel.service';
import { PERSONS, Person } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  persons: Person[];

  constructor(private excelService: ExcelService) {
    this.excelService = excelService;
    this.persons = PERSONS;
  }

  exportToExcel(event) {
    this.excelService.exportAsExcelFile(PERSONS, 'persons');
  }
}
