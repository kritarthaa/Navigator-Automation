import { AppPage } from '../app.po';

describe('Dashboard Page', () => {
  let app = new AppPage();

  beforeEach(() => {
    app = new AppPage();
  })

  it('Only navigates', async () => {
    // Navigate to login page
    await app.dashboard.navigateTo();
  });
});
