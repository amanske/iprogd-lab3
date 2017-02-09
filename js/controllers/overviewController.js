var OverviewController = function (view,model){

	view.goBackButton.onclick = function (e){
		view.backToSelectDish();
	}

	view.printRecipeButton.onclick = function (e){
		view.printFullRecipe();
	}
}