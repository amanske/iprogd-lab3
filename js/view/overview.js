var Overview = function(container, model) {

	////// FOR TESTING PURPOSES ////
	model.addDishToMenu(2);
	model.addDishToMenu(100);
	model.addDishToMenu(201);

	///////////////////////////////

	model.addObserver(this);
	var starter = model.getSelectedDish("starter");
	var main = model.getSelectedDish("main dish");
	var dessert = model.getSelectedDish("dessert");
	var guests = model.getNumberOfGuests();

	this.update = function (obj) {
		guests = model.getNumberOfGuests();
	}
		
	container.append('<div class="row" id="overview_banner"> <div class="col-md-4"> <h2>My Dinner: ' + guests + ' people </h2> </div> <div class="col-md-4"> </div> <div class="col-md-4"> <button class="btn-default" type="button" id="goBackAndEdit"> Go back and edit dinner </button> </div> </div> <div class="row" id="overview_food"> <div class="col-md-3"> </div> <div class="col-md-2"> <img src="images/' + starter.image + '"> <span class="name"> ' + starter.name + '</span> <span class="price">' + getTotalDishPrice(starter, guests) + ' SEK </span> </div> <div class="col-md-2"> <img src="images/'+ main.image +'"> <span class="name"> '+  main.name +'</span> <span class="price"> ' + getTotalDishPrice(main, guests) + ' SEK </span> </div> <div class="col-md-2"> <img src="images/' + dessert.image + '"> <span class="name"> ' + dessert.name + ' </span> <span class="price"> ' + getTotalDishPrice(dessert, guests) + ' SEK </span> </div> <div class="col-md-3" id="verticalLine"> <span class="total"> Total:</span> <br> <span class="price" style="text-align:left; padding-bottom:0px;">' + model.getTotalMenuPrice() + ' SEK </span></div> </div> <hr> <div class="row" id="overview_print"> <div class="col-md-4"> </div> <div class="col-md-4"> <button class="btn-default" type="button" id="printRecipe"> Print Full Recipe </button> </div> <div class="col-md-4"> </div> </div>')



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
