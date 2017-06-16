import { Ng2ExcelExportPage } from './app.po';

describe('ng2-excel-export App', () => {
  let page: Ng2ExcelExportPage;

  beforeEach(() => {
    page = new Ng2ExcelExportPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
