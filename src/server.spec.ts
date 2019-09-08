import 'mocha';
import { Done } from 'mocha';
import supertest from 'supertest';
import { app, server } from './server';


describe('Image Filter', () => {
    it('should filter images', (done: Done) => {
        const imageUrl = 'https://timedotcom.files.wordpress.com/2019/03/kitten-report.jpg';

        supertest(app)
            .get(`/filteredimage?image_url=${imageUrl}`)
            .expect('Content-Type', 'image/jpeg')
            .expect(200, done);
    });

    it('should validate the image_url query parameter', (done: Done) => {
        supertest(app)
            .get(`/filteredimage?image_url=`)
            .expect(400, done);
    });

    it('should return an error response when the service fails to filter an image', (done: Done) => {
        supertest(app)
            .get(`/filteredimage?image_url=fakeurl`)
            .expect(422, done);
    });

    after(() => server.close());
});