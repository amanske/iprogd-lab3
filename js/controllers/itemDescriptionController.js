var ItemDescriptionController = function (view, model) {

	view.backButton.onclick = function (e){
		$('#page3').hide();
    	$('#selectDish').show();
    	model.setDishToShow(-1);
	}

	view.confirmButton.onclick = function (e){
		view.confirmDish();
	}
}