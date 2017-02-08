var Overview = function(container, model) {

	////// FOR TESTING PURPOSES ////
	model.addDishToMenu(2);
	model.addDishToMenu(100);
	model.addDishToMenu(201);

	///////////////////////////////

	var starter = model.getSelectedDish("starter");
	var main = model.getSelectedDish("main dish");
	var dessert = model.getSelectedDish("dessert");
	var guests = model.getNumberOfGuests();
	container.append('<div class="row" id="overview_banner"> <div class="col-md-4"> <h2 id="dinnerGuests"></h2> </div> <div class="col-md-4"> </div> <div class="col-md-4"> <button class="btn-default" type="button" id="goBackAndEdit"> Go back and edit dinner </button> </div> </div> <div class="row" id="overview_food"> <div class="col-md-3"> </div> <div class="col-md-2"> <img id="startImage"> <span class="name" id="startName"></span> <span class="price" id="startPrice"></span> </div> <div class="col-md-2"> <img id="mainImage"> <span class="name" id="mainName"></span> <span class="price" id="mainPrice"> </span> </div> <div class="col-md-2"> <img id="dessertImage"> <span class="name" id="dessertName"></span> <span class="price" id="dessertPrice"> </span> </div> <div class="col-md-3" id="verticalLine"> <span class="total"> Total:</span> <br> <span class="price" id="totalPriceSpan" style="text-align:left; padding-bottom:0px;"></span></div> </div> <hr> <div class="row" id="overview_print"> <div class="col-md-4"> </div> <div class="col-md-4"> <button class="btn-default" type="button" id="printRecipe"> Print Full Recipe </button> </div> <div class="col-md-4"> </div> </div>')

	model.addObserver(this);
	this.update = function (obj) {
		starter = model.getSelectedDish("starter");
		main = model.getSelectedDish("main dish");
		dessert = model.getSelectedDish("dessert");
		guests = model.getNumberOfGuests();
		document.getElementById("dinnerGuests").innerHTML = 'My Dinner: ' + guests + ' people';

		document.getElementById("startImage").src = 'images/' + starter.image;
		document.getElementById("startName").innerHTML = starter.name;
		document.getElementById("startPrice").innerHTML = getTotalDishPrice(starter,guests) + ' SEK';

		document.getElementById("mainImage").src = 'images/' + main.image;
		document.getElementById("mainName").innerHTML = main.name;
		document.getElementById("mainPrice").innerHTML = getTotalDishPrice(main,guests) + ' SEK';

		document.getElementById("dessertImage").src = 'images/' + dessert.image;
		document.getElementById("dessertName").innerHTML = dessert.name;
		document.getElementById("dessertPrice").innerHTML = getTotalDishPrice(dessert,guests) + ' SEK';

		document.getElementById("totalPriceSpan").innerText = model.getTotalMenuPrice() + ' SEK'; //FIX

	}
		



    var goBackButton = document.getElementById("goBackAndEdit");
    goBackButton.onclick = backToSelectDish;

    var printRecipeButton = document.getElementById("printRecipe");
    printRecipeButton.onclick = printFullRecipe;

}

function printFullRecipe(){
    $('#overview_page').hide();
    $('#print_page').show();
}

function backToSelectDish(){
    $('#overview_page').hide();
    $('#sideBarDiv').show();
    $('#selectDish').show();
}

function getTotalDishPrice(dish, guests){
	var ingredients = dish.ingredients;
	var price = 0;
	for(var i = 0; i < ingredients.length; i++){
		price += ingredients[i].price;
	}
	return price * guests;
}
