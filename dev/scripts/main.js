var makeupApp = {};
makeupApp.videoInfoList = [
	{
		title: "How to Cover Acne​​​ | MissJessicaHarlow",
		description: "Perfect for those tasked with concealing cystic pimples and unsightly acne-related blemishes on a daily basis, this video is full of useful techniques for creating a flawless finish on a difficult canvas.",
		productTypes: [] //List of product types associated with this video
	},
	{
		title: "Kim Kardashian Makeup Tutorial​​​ | Eman​​​",
		description: " Love her or hate her, you can’t deny how utterly fabulous Kim Kardashian’s makeup always looks—her sexy, sooty smoky eyes specifically. This thorough tutorial teaches you how to nail her signature sultry look in less than 12 minutes.",
		productTypes: [] 
	}
];

makeupApp.display = function(){
	
}

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
};











$(function(){
	makeupApp.init()
});