import { MeFrontEndPage } from './app.po';

describe('me-front-end App', () => {
  let page: MeFrontEndPage;

  beforeEach(() => {
    page = new MeFrontEndPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
