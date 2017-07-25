import { NgCsgPage } from './app.po';

describe('ng-proto App', () => {
  let page: NgCsgPage;

  beforeEach(() => {
    page = new NgCsgPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
