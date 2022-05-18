import { TestHelper } from 'src/core/test/test.helper';
import { SongTestHelper } from './song.helper';

describe('SongController (e2e)', () => {
  const testHelper = new TestHelper();
  let songTestHelper: SongTestHelper;

  beforeAll(async () => {
    await testHelper.initialize();
    songTestHelper = testHelper.getTestHelperModule(SongTestHelper);
  });

  afterAll(async () => {
    await testHelper.close();
  });

  it('POST /song', async () => {
    const input = await songTestHelper.getBody();
    return testHelper
      .post('/song')
      .send(input)
      .isCreated()
      .then(({ body }) => {
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('name');
        expect(body).toHaveProperty('genre');
        expect(body).toHaveProperty('releaseDate');

        expect(body.name).toEqual(input.name);
        expect(body.genre).toEqual(input.genre);
        expect(body.releaseDate).toEqual(input.releaseDate);
      });
  });

  it('PUT /song/:id/update', async () => {
    const song = await songTestHelper.findOne();
    const input = await songTestHelper.getBody();
    return testHelper
      .put(`/song/${song.id}/update`)
      .send(input)
      .isNoContent()
      .then(async () => {
        const updatedSong = await songTestHelper.findById(song.id);
        expect(updatedSong.name).toEqual(input.name);
        expect(updatedSong.genre).toEqual(input.genre);
        expect(updatedSong.releaseDate.toISOString()).toEqual(
          input.releaseDate,
        );
      });
  });

  it('DELETE /song/:id/delete', async () => {
    const song = await songTestHelper.findOne();
    return testHelper
      .delete(`/song/${song.id}/delete`)
      .isNoContent()
      .then(async () => {
        const deletedSong = await songTestHelper.findById(song.id);
        expect(deletedSong).toBe(null);
      });
  });

  it('GET /song/:id/specific', async () => {
    const song = await songTestHelper.findOne();
    return testHelper
      .get(`/song/${song.id}/specific`)
      .isOk()
      .then(({ body }) => {
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('name');
        expect(body).toHaveProperty('genre');
        expect(body).toHaveProperty('releaseDate');
        expect(body).toHaveProperty('artists');
      });
  });

  it('GET /song/random', async () => {
    return testHelper
      .get(`/song/random`)
      .isOk()
      .then(({ body }) => {
        body.forEach((item) => {
          expect(item).toHaveProperty('id');
          expect(item).toHaveProperty('name');
          expect(item).toHaveProperty('genre');
          expect(item).toHaveProperty('releaseDate');
          expect(item).toHaveProperty('artists');
        });
      });
  });
});
