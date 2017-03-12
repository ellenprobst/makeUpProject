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
		title: "How To: Apply FALSE EYELASHES tutorial" ,
		description: "If false eyelashes happen to be the biggest beauty bane of your existence, watch this in-depth six minute tutorial to learn easy-to-follow tips on how to quickly apply a band of falsies so that they look more natural and super flattering.",
		productTypes: ["eyeliner","mascara"]
	},
	{
		title: "How To: The Perfect Red Lip Tutorial",
		description: "While it may be intimidating for some, red lipstick dials up the glam on any outfit—therefore every girl needs to know how to make the look work for her. This video provides a visual step-by-step on painting the perfect punchy candy apple red pout." ,
		productTypes: ["lipstick","lip_liner","foundation"]
	},
	{
		title: "Perfect Eyeliner Tutorial!",
		description: "Feline eyeliner only looks fierce when it’s done just right—this amazing tutorial details two different ways to master the cat eye look as well as how to ensure your wings are perfectly symmetrical.",
		productTypes: ["eyeliner"]
	},
	{
		title: "FAST Makeup Touch-up Routine!",
		description: " Think of this as the five-minute face in reverse. After you’ve gotten all dolled up in the morning, this informative video teaches you how to touch everything up in four simple steps. Freshening up your face for cocktail hour has never been easier.",
		productTypes: [""]
	},
	{
		title: "How to: Contour & Highlight Your Face",
		description: "If the mere thought of purposefully creating a sunken-in look on your face is daunting, this comprehensive tutorial shares tricks for contouring your nose, forehead, and chin and intensifying the hollows of your cheeks for natural looking dimension.",
		productTypes: ["bronzer","blush"]
	},
	{
		title: "Tutorial: Fresh and Simple Everyday Makeup",
		description: "If you’re still struggling to perfect your no-fail everyday face, go for ‘girl next door gorgeous’. This instructional visual swiftly takes you through all of the necessary steps for looking fresh-faced and beautiful in a flash.",
		productTypes: ["eyeshadow","eyeliner","mascara","bronzer","blush","lipstick"]
	},
	{
		title: "How to Conceal Dark Circles on Any Skin Tone",
		description: "If the brown, green, pink, and yellow concealer wheel feels a lot like a cosmetic conundrum, this 12-minute visual breaks down its usefulness for you while sharing tricks on masking dark circles and minimizing the appearance of puffiness.",
		productTypes: ["concealer","foundation"]
	}
];

makeupApp.currentIndex = 0;
makeupApp.listOfSelectedItems = [];
makeupApp.total = 0;
makeupApp.shoppingCart = [];

makeupApp.displayVideoInfo = function(index){
	
	$('.video__description h3').text(makeupApp.videoInfoList[index].title);
	$('.video__description p').text(makeupApp.videoInfoList[index].description);
	
	$('.product__type').empty();
	makeupApp.videoInfoList[index].productTypes.forEach(function(type){
		// console.log(type)
		var title = $('<h3>').text(`${type.replace(/_/g, ' ')}`);
		var container = $('<div>').addClass(`${type}Wrapper productWrapper`).append(title);
		$('.product__type').append(container);
	})

}

makeupApp.displayProductInfo = function(data, type){
	// console.log(data);

	for (let i = 0; i < 3; i = i + 1){
		var currentItem = data[i];
		// console.log(currentItem.id)
		var priceRounded = parseFloat(currentItem.price).toFixed(2);
		var image = $('<img>').attr('src', currentItem.image_link).attr('alt', `${currentItem.name}`);
		var product = $('<p>').text(currentItem.name);
		var description = $('<p>').text(currentItem.description);
		var price = $('<p>').text(`$${priceRounded}`);
		var button = $('<button>').html('<i class="fa fa-shopping-cart" aria-hidden="true"></i>').addClass('cartButton').attr('data-id',currentItem.id);
		var productInfoWrap = $('<div class="productInfoWrapper ">').append(image,product, price, description, button);

		var productItem = {
			id:currentItem.id,
			name:currentItem.name,
			price:priceRounded,
			image:currentItem.image_link
		 };
	// console.log(i);

		makeupApp.listOfSelectedItems.push(productItem);
		// console.log(type);
		// console.log($(`.${type}Wrapper`))
		$(`.${type}Wrapper`).append(productInfoWrap);

	}


}

makeupApp.events = function(){
	var $carousel = $("#videoList").flickity();
	var flkty = $carousel.data("flickity");

	$carousel.on( 'select.flickity', function() {
	  // console.log( 'Flickity select ' + flkty.selectedIndex )
	  makeupApp.currentIndex = flkty.selectedIndex;
	  makeupApp.displayVideoInfo(makeupApp.currentIndex);
	})

	$('#cheap').on('click', function(){
		if($(".productInfoWrapper").length > 0){

			$('.productInfoWrapper').remove();
		}
		makeupApp.videoInfoList[makeupApp.currentIndex].productTypes.forEach(function(type){
			makeupApp.data(type, 0, 9.99);
		})
	});

	$('#middle').on('click', function(){
		if($(".productInfoWrapper").length > 0){

			$('.productInfoWrapper').remove();
		}
		makeupApp.videoInfoList[makeupApp.currentIndex].productTypes.forEach(function(type){
			makeupApp.data(type, 10, 19.99);
		})
	});

	$('#pricy').on('click', function(){
		if($(".productInfoWrapper").length > 0){

			$('.productInfoWrapper').remove();
		}
		makeupApp.videoInfoList[makeupApp.currentIndex].productTypes.forEach(function(type){
			makeupApp.data(type, 20, 10000);
		})
	});

	$('select').on( 'change', function() {
	  var index = $(this).val();
	  $carousel.flickity( 'select', index );
	  console.log(index);
	});

	$('.product__type').on('click', '.cartButton', function(){
		// console.log("twerking?");

		var currentItemId = $(this).data("id")

		var filteredItem = makeupApp.listOfSelectedItems.filter(function(itemOfList) {

			// console.log("This is what the current ID is:" + itemOfList.id);
			// console.log("This is what we are looking for:" + currentItemId);
			return itemOfList.id === currentItemId;

		}) // filteredItem

		// console.log(makeupApp.total);
		console.log(filteredItem[0].price);

		makeupApp.total = makeupApp.total + parseFloat(filteredItem[0].price);
		makeupApp.shoppingCart.push(filteredItem[0]);

		console.log(makeupApp.total.toFixed(2));
		console.log(makeupApp.shoppingCart);

		var makeupImage = filteredItem[0].image;
		var makeupName = filteredItem[0].name;
		var makeupPrice = filteredItem[0].price;

		makeupApp.displayCart(makeupImage, makeupName, makeupPrice);
		// console.log(makeupApp.listOfSelectedItems)
	})

	$(".basket__layover").on("click", ".removeItem", function() {
		makeupApp.total = 0;
		var cartItemIndex = $(this).data("id");

		makeupApp.shoppingCart.splice(cartItemIndex,1);
		console.log(makeupApp.shoppingCart);

		$(".basket__layover").empty();

		makeupApp.shoppingCart.forEach(function(currentItem, index) {
			var currentItem = makeupApp.shoppingCart[index]
			var makeupImage = currentItem.image;
			var makeupName = currentItem.name;
			var makeupPrice = currentItem.price;

			makeupApp.displayCart(makeupImage, makeupName, makeupPrice)
			makeupApp.total = makeupApp.total + parseFloat(currentItem.price);
		});

		var makeupTotalEl = $("<p>").text(`Your total is: $${makeupApp.total.toFixed(2)}`);
		$(".basket__total").html(makeupTotalEl);
	});

	$(".basket__total").on("click", function(){
		$(".basket").slideToggle("slow");
	})

};


makeupApp.displayCart = function(makeupImage, makeupName, makeupPrice) {

	var makeupImageEl = $("<img>").attr("src", makeupImage).attr("alt", `Image of ${makeupName}`);
	var makeupNameEl = $("<p>").text(makeupName);
	var makeupPriceEl = $("<p>").text(`$${makeupPrice}`);
	var cartItemIndex = makeupApp.shoppingCart.length - 1;
	var makeupItemButtonEl = $("<button>").addClass("removeItem").text("Remove Item").attr('data-id',cartItemIndex);
	var cartItemDetailsEl = $("<div>").append(makeupImageEl, makeupNameEl, makeupPriceEl).addClass("cartItemDetails")

	var cartItemContainer = $("<div>").append(cartItemDetailsEl, makeupItemButtonEl).addClass(`cartItemContainer${cartItemIndex} cartItemContainer`);

	$(".basket__layover").append(cartItemContainer);
	var makeupTotalEl = $("<p>").text(`Your total is: $${makeupApp.total.toFixed(2)}`);
	$(".basket__total").html(makeupTotalEl);

	console.log(makeupApp.shoppingCart.length);

}

makeupApp.init = function(){

	makeupApp.displayVideoInfo(makeupApp.currentIndex);
	makeupApp.events();


	//check if the button element exists


	// $('button').on('click', function(e) {
	// 	//check what that casrt item data-id iss
	// 	console.log(e, "Hello");
	// 	// console.log(makeupApp.listOfSelectedItems);



	// });

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
		makeupApp.displayProductInfo(data, type);
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