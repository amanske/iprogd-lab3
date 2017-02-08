var ItemDescription = function (container, model){
	model.addObserver(this);
	var dishToShow = model.getDish(100);

	var guests = model.getNumberOfGuests();
	container.append('<div class="row"> <div class="col-md-5" style="padding-left:30px;"> <h3 style="margin-top:10px;" id="dishToShowName">' + dishToShow.name.toUpperCase() + '</h3> <img src="images/' + dishToShow.image + '" id="foodImage"> <p style="padding-top:15px;" id="dishToShowDesc">' + dishToShow.description + '</p> <button class="btn-default" type="button" id="itemDescToSelDishButton">back to Select Dish</button> </div> <div class="col-md-5" id="ingredients"> <p id="ingBoxGuestNumber" style="padding-top:10px;"></p> <hr> <div class="row"> <div class="col-md-2" id="ingredientAmount"></div> <div class="col-md-6" id="ingredientName"></div> <div class="col-md-2" id="ingredientCurrency"></div> <div class="col-md-2" id="ingredientPrice"></div> </div> <hr> <div class="row"> <div class="col-md-8"> <button class="btn-default" type="button" id="confirmDishButton"> Confirm dish </button> </div> <div class="col-md-2"> SEK </div> <div class="col-md-2" id="totalPrice"></div> </div> </div> </div> <div class="row" style="padding:30px; padding-top:0px;"> <div class="col-md-2"> </div> <div class="col-md-10"> <h3 style="margin-top:0px;">PREPARATIONS</h3> <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? <br> <br> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p></div> </div>');

	var ingBoxGuestNumber = document.getElementById("ingBoxGuestNumber");
	var dishToShowName = document.getElementById("dishToShowName");
	var foodImage = document.getElementById("foodImage");
	var dishToShowDesc = document.getElementById("dishToShowDesc");

	ingBoxGuestNumber.innerHTML = 'INGREDIENTS FOR ' + guests + ' PEOPLE';

	fillIngredients(dishToShow, guests);

	this.update = function (obj) {
        //If obj contains a dishId it will change dish it

        if(!(typeof(obj) == 'undefined') && !(typeof(obj.dishId) == 'undefined')){
        	if(obj.dishId != -1){
        		dishToShow = model.getDish(obj.dishId);
        		dishToShowName.innerHTML = dishToShow.name;
        		foodImage.src = "images/" + dishToShow.image;
        		dishToShowDesc.innerHTML = dishToShow.description;
        	}
        }

        guests = model.getNumberOfGuests();
        fillIngredients(dishToShow, guests);
        ingBoxGuestNumber.innerHTML = 'INGREDIENTS FOR ' + guests + ' PEOPLE';
    }
    var backButton = document.getElementById("itemDescToSelDishButton");
    backButton.onclick = function(e){
    	$('#page3').hide();
    	$('#selectDish').show();
    	model.setDishToShow(-1);
    }
    var confirmButton = document.getElementById("confirmDishButton");
    confirmButton.onclick = function (e) {
    	$('#page3').hide();
    	$('#selectDish').show();
    	model.addDishToMenu(dishToShow.id);
    	model.setDishToShow(-1);
    }

    //fills the ingredient list with the ingredients of the given dish object. 
    function fillIngredients (dish, guests){
    	var ingredients = dish.ingredients;

		//fetch id's and nullify thier (possible) previous content.
		var ingredientName = document.getElementById("ingredientName");
		ingredientName.innerHTML = '';

		var ingredientPrice = document.getElementById("ingredientPrice");
		ingredientPrice.innerHTML = '';

		var ingredientAmount = document.getElementById("ingredientAmount");
		ingredientAmount.innerHTML = '';

		var ingredientCurrency = document.getElementById("ingredientCurrency");
		ingredientCurrency.innerHTML = '';

		var totalPrice = document.getElementById("totalPrice");
		totalPrice.innerHTML = '';

		var totalCost = 0;

		for(var i = 0; i < ingredients.length; i++){

			//populate names
			var name = document.createElement("p");
			name.innerHTML = ingredients[i].name;
			ingredientName.append(name);

			//populate prices
			var prices = document.createElement("p");
			var price = ingredients[i].price * guests;
			prices.innerHTML = price;
			ingredientPrice.append(prices);

			//populate amounts
			var amount = document.createElement("p");
			amount.innerHTML = Math.round(((ingredients[i].quantity) * guests* 100))/100 + " " + ingredients[i].unit; //round to max 2 dec. places
			ingredientAmount.append(amount);

			//populate currency
			var currency = document.createElement("p");
			currency.innerHTML = "SEK"; // SEK by default
			ingredientCurrency.append(currency);

			//to calculate the total cost of the ingredients
			totalCost += price;
		}

		var total = document.createElement("p");
		total.innerHTML = totalCost;
		totalPrice.append(total);

	}
}




