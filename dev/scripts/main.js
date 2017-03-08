var makeupApp = {};

makeupApp.init = function(){
	makeupApp.data();
}

makeupApp.data = function(){
	$.ajax({
		url: "http://makeup-api.herokuapp.com/api/v1/products.json",
		method: "GET",
		dataType: "json",
		data: {
			product_type: "lipstick",
			price_less_than: 20.00

		}
	}).then(function(data){
		console.log(data);
	})
}









$(function(){
	makeupApp.init()
});