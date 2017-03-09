var makeupApp = {};
makeupApp.videoInfoList = [
	{
		title: "How to Cover Acne​​​ | MissJessicaHarlow",
		description: "Perfect for those tasked with concealing cystic pimples and unsightly acne-related blemishes on a daily basis, this video is full of useful techniques for creating a flawless finish on a difficult canvas.",
		productTypes: ["eyeshadow","foundation","blush"] //List of product types associated with this video
	},
	{
		title: "Kim Kardashian Makeup Tutorial​​​ | Eman​​​",
		description: "Love her or hate her, you can’t deny how utterly fabulous Kim Kardashian’s makeup always looks—her sexy, sooty smoky eyes specifically. This thorough tutorial teaches you how to nail her signature sultry look in less than 12 minutes.",
		productTypes: ["eyeshadow","eyeliner", "eyebrow","blush","lip_liner","lipstick"] 
	},
	{
		title: "How TO: Apply FALSE EYELASHES tutorial" ,
		description: "If false eyelashes happen to be the biggest beauty bane of your existence, watch this in-depth six minute tutorial to learn easy-to-follow tips on how to quickly apply a band of falsies so that they look more natural and super flattering.",
		productTypes: []
	},
	{
		title: "How To: The Perfect Red Lip Tutorial",
		description: "While it may be intimidating for some, red lipstick dials up the glam on any outfit—therefore every girl needs to know how to make the look work for her. This video provides a visual step-by-step on painting the perfect punchy candy apple red pout." ,
		productTypes: []
	},
	{
		title: "Perfect Eyeliner Tutorial!",
		description: "Feline eyeliner only looks fierce when it’s done just right—this amazing tutorial details two different ways to master the cat eye look as well as how to ensure your wings are perfectly symmetrical.",
		productTypes: []
	},
	{
		title: "FAST Makeup Touch-up Routine!",
		description: " Think of this as the five-minute face in reverse. After you’ve gotten all dolled up in the morning, this informative video teaches you how to touch everything up in four simple steps. Freshening up your face for cocktail hour has never been easier.",
		productTypes: []
	},
	{
		title: "How to: Contour & Highlight Your Face",
		description: "If the mere thought of purposefully creating a sunken-in look on your face is daunting, this comprehensive tutorial shares tricks for contouring your nose, forehead, and chin and intensifying the hollows of your cheeks for natural looking dimension.",
		productTypes: []
	},
	{
		title: "Tutorial: Fresh and Simple Everyday Makeup",
		description: "If you’re still struggling to perfect your no-fail everyday face, go for ‘girl next door gorgeous’. This instructional visual swiftly takes you through all of the necessary steps for looking fresh-faced and beautiful in a flash.",
		productTypes: []
	},
	{
		title: "How to Conceal Dark Circles on Any Skin Tone",
		description: "If the brown, green, pink, and yellow concealer wheel feels a lot like a cosmetic conundrum, this 12-minute visual breaks down its usefulness for you while sharing tricks on masking dark circles and minimizing the appearance of puffiness.",
		productTypes: []
	}
];

makeupApp.currentIndex = 0;

makeupApp.displayVideoInfo = function(index){
	
	$('.video__description h3').text(makeupApp.videoInfoList[index].title);
	$('.video__description p').text(makeupApp.videoInfoList[index].description);
	
	$('.product__type').empty();
	makeupApp.videoInfoList[index].productTypes.forEach(function(type){
		// console.log(type)
		var title = $('<h3>').text(`${type}`);
		var container = $('<div>').addClass(`${type}Wrapper productWrapper`).append(title);
		$('.product__type').append(container);
	})

}

makeupApp.displayProductInfo = function(data){
	// console.log(data);
	for (let i = 0; i < 5; i = i + 1){
		var currentItem = data[i];
		var product = $('<p>').text(currentItem.name);
		var description = $('<p>').text(currentItem.description);
		var price = $('<p>').text(`$${currentItem.price}`);
		var productInfoWrap = $('<div>').append(price, product, description);

		var associatedProductType = currentItem.product_type;
		console.log(associatedProductType);
		$(`.${associatedProductType}Wrapper`).append(productInfoWrap);

	}
}

makeupApp.events = function(){
	var $carousel = $("#videoList").flickity();
	var flkty = $carousel.data("flickity");

	$carousel.on( 'select.flickity', function() {
	  // console.log( 'Flickity select ' + flkty.selectedIndex )
	  makeupApp.currentIndex = flkty.selectedIndex;
	  makeupApp.displayVideoInfo(flkty.selectedIndex)
	})

	$('#cheap').on('click', function(){
		makeupApp.videoInfoList[makeupApp.currentIndex].productTypes.forEach(function(type){
			makeupApp.data(type, 0, 14.99);
		})
	})

};


makeupApp.init = function(){
	makeupApp.data();
	makeupApp.events();

}

makeupApp.data = function(type, priceLow, priceHigh){
	$.ajax({
		url: "http://makeup-api.herokuapp.com/api/v1/products.json",
		method: "GET",
		dataType: "json",
		data: {
			product_type: type,
			price_less_than: priceHigh,
			price_greater_than: priceLow
		}
	}).then(function(data){
		makeupApp.displayProductInfo(data);
	})
};

//$$$ = >$40
//$$ = < $39.99 & >15
//$ = < $14.99

//we need 3 parameters
//product type, and prices less and greater than
//filter will be triggered when user clicks price-range selection
//








$(function(){
	$('#videoList').flickity({
		contain: true,
		setGalllerySize: false,
		wrapAround: true
	});
	makeupApp.init();

});