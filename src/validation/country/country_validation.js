const validator = require('validator');

module.exports = {
	validate_country_form : function(data) {
		let error = {
			country_name_error : '',
			country_image_error : ''
		}
		let valid = true;
		if( data[0] === '' ){
			error['country_name_error'] = 'Filed must not be empty';
			valid = false;
		} else {
			let name = data[0].split(' ').join('').trim();
			if(!validator.isAlpha(name)){
				error['country_name_error'] = 'Country name must be an alphabet';
				valid = false;
			}
		}
		if( data[1] === null ) {
			error['country_image_error'] = 'Filed must not be empty';
			valid = false;
		}
		if(valid) return {};
		return error;
	},
	validate_edit_country_form : function(data) {
		let error = {
			country_name_error : '',
			country_image_error : ''
		}
		let valid = true;
		if( data[0] === '' ){
			error['country_name_error'] = 'Filed must not be empty';
			valid = false;
		} else {
			let name = data[0].split(' ').join('').trim();
			if(!validator.isAlpha(name)){
				error['country_name_error'] = 'Country name must be an alphabet';
				valid = false;
			}
		}
		if(valid) return {};
		return error;
	}
}