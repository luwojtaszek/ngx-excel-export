# Description

An example Angular4 application that shows how to export data to an excel file.

This example shows how to use [xlsx](https://github.com/SheetJS/js-xlsx) and [xlsx-style](https://github.com/protobi/js-xlsx) libraries together to save styled excel file.

* xlsx - Main library which provides typings (makes it easier to use it with TypeScript). It's used for preparing workbook object from json structure.

* xlsx-style - Project forked from xlsx. I only use `write` method from this library to properly write cells styles defined in workbook object.

Cell styles should be defined by injecting styles object to cell representation. Example:

```javascript
workbook.B3.s = { alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } }
```

List of all available styles can be found here: https://github.com/protobi/js-xlsx#cell-styles

# Instruction

## Start application

1. Download dependencies by executing `npm install` command.

2. Because of this bug: https://github.com/protobi/js-xlsx/issues/78 it's required to replace `xlsx-style/dist/cpexcel.js` with `xlsx/dist/cpexcel.js` in node_modules directory.

3. Start application by executing `ng serve` command.

## Use in your project

Follow this instruction if you want to export data to excel file in your project.

1. Add [file-saver](https://www.npmjs.com/package/file-saver) and [xlsx](https://www.npmjs.com/package/xlsx) dependencies
```
npm install file-saver --save
npm install xlsx --save
npm install xlsx-style --save
```

2. Replace cpexcel.js file in xlsx-style dist directory.

Because of this bug: https://github.com/protobi/js-xlsx/issues/78 it's required to replace `xlsx-style/dist/cpexcel.js` with `xlsx/dist/cpexcel.js` in node_modules directory.

3. Implement ExcelService

```typescript
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as XLSXStyle from 'xlsx-style';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    this.wrapAndCenterCell(worksheet.B2);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    // Use XLSXStyle instead of XLSX write function which property writes cell styles.
    const excelBuffer: any = XLSXStyle.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private wrapAndCenterCell(cell: XLSX.CellObject) {
    const wrapAndCenterCellStyle = { alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } };
    this.setCellStyle(cell, wrapAndCenterCellStyle);
  }

  private setCellStyle(cell: XLSX.CellObject, style: {}) {
    cell.s = style;
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
```