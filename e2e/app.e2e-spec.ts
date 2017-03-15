import { NgCsgPage } from './app.po';

describe('ng-csg App', () => {
  let page: NgCsgPage;

  beforeEach(() => {
    page = new NgCsgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
