import { TestHelper } from 'src/core/test/test.helper';
import { ArtistTestHelper } from './artist.helper';

describe('ArtistController (e2e)', () => {
  const testHelper = new TestHelper();
  let artistTestHelper: ArtistTestHelper;

  beforeAll(async () => {
    await testHelper.initialize();
    artistTestHelper = testHelper.getTestHelperModule(ArtistTestHelper);
  });

  afterAll(async () => {
    await testHelper.close();
  });

  it('POST /artist', () => {
    const input = artistTestHelper.getBody();
    return testHelper
      .post('/artist')
      .send(input)
      .isCreated()
      .then(({ body }) => {
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('name');
        expect(body).toHaveProperty('dayOfBirth');
        expect(body).toHaveProperty('stageName');
        expect(body).toHaveProperty('description');
      });
  });
});
