var SideBarController = function (view, model) {

	view.buttonUp.onclick = function (e) {
		view.incrementValue();
	}

	view.buttonDown.onclick = function (e) {
		view.decrementValue();
	}

	view.confButton.onclick = function (e) {
		view.confirmDinner();
	}
}