module.exports = {
	validate_sub_array : function(array){
		let error_array = [];
		let duplicate_values = {};
		for(let i =0; i < array.length; i++){
			if(array[i] !== ""){
				if(duplicate_values[array[i]]){
					error_array[i] = "Duplicate values are not allowed";
				} else {
					duplicate_values[array[i]] = 1;
				}
			} else {
				error_array[i] = "Field must not be empty or remove this field";
			}
		}
		if(error_array.length > 0) return error_array;
		return [];
	}
}