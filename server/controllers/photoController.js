// import vocabulary from '../assets/vocabulary';
import fs from 'fs';
import path from 'path';
import imageSearcher from '../plugins/google-images';

class PhotoController {

	getPhotos(request, response) {

		this.getRandomWords(request.query.count || 0).then((words) => {

			let promises = this.setPromises(words);

			Promise.all(promises)
				.then((data) => {

					let urls = this.parseResponse(data);
					response.status(200).send({ urls });

				})
				.catch((error) => {

					response.status(400).send({ error });

				});

		});

	}

	getRandomWords(count) {

		return new Promise((resolve, reject) => {

			fs.readFile(path.join(__dirname, '../assets/vocabulary.js'), (error, data) => {

				data = data.toString();

				let vocabulary = data.split(",");
				
				let index;
				let words = [];

				for (let i = 0; i < count; i++) {

					index = Math.floor(Math.random() * vocabulary.length);
					words.push(vocabulary[index]);

				}

				(!error) ? resolve(words) : reject(error);

			});

		});

	}

	setPromises(words) {

		let promises = [];

		words.forEach((word) => {

			promises.push(imageSearcher.search(word, 'large'));

		});
		
		return promises;

	}
	
	parseResponse(data) {
		
		let urls = [];
		let index;
		
		data.forEach((item) => {
			
			index = Math.floor(Math.random() * data.length);
			urls.push(item[index].url);
			
		});
		
		return urls;
		
	}

}

export default new PhotoController();
