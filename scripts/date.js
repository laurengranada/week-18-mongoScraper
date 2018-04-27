//Date
var generateDate = function(){
	//current date variable 
	var currentDate = new Date();
	var formattedDate = "";
	//generate month
	formattedDate += (currentDate.getMonth() + 1) + "_";
	//generate days of month
	formattedDate += currentDate.getDate() + "_";
	//generate year
	formattedDate += currentDate.getFullYear();
	//return generated Date
	return formattedDate;
};

//export
module.exports = generateDate;