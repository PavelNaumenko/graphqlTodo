import googleImages from 'google-images';

class imageSearcher {

	constructor() {

		this.client = googleImages('003266641986619049925:edoeuh1pv2a',
            'AIzaSyDLmQqyTLFLCnZGXXlQtGIK9_mHpnSOGho');

	}

	search(query, size) {

		return new Promise((resolve, reject) => {

			this.client.search(query, { size })
				.then((data) => {

					resolve(data);

				})
				.catch((error) => {

					reject(error);

				});

		});
        
	}

}

export default new imageSearcher();
