function showBox(id) {
	var activeElem = document.querySelector('.tutorial-box.active');
	activeElem.classList.toggle('active');

	var newBox = document.querySelector('#tutorial-box-' + id);
	newBox.classList.toggle('active');

	var activePic = document.querySelector('.tutorials-row img.active');
	activePic.classList.toggle('active');

	var picElem = document.querySelector('#pic' + id);
	picElem.classList.toggle('active');

	window.scrollBy(0, 200); 	
}
