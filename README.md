# Description

An example Angular6 application that shows how to export data to an excel file.

# Instruction

## Start application
Simple start application by executing `ng serve` command.

## Use in your project
Follow this instruction if you want to export data to excel file in your project.

1. Add [xlsx](https://www.npmjs.com/package/xlsx) dependency

**npm:**
```
npm install xlsx --save
```

**yarn:**
```
yarn install xlsx --save
```

2. Implement ExcelService

```typescript
import {Injectable} from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable()
export class ExcelService {

  constructor() {
  }

  static toExportFileName(excelFileName: string): string {
    return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    XLSX.writeFile(workbook, ExcelService.toExportFileName(excelFileName));
  }
}
```
