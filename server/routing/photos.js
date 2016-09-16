import { photoController } from '../controllers';

export default [
    { path: '/getPhotos/', method: 'get', controller: photoController.getPhotos.bind(photoController) }
];
