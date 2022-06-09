// var ownerSearch;
var pathOwnerSearch = '/searchOwner/ownerSearch/';
var pathOwnerData = '/searchOwner/ownerData/';
var pathOwnerDownload = '/searchOwner/download/';

async function getDataJSON (_path, _id = ''){
    const response = await fetch(_path + _id);

    return response.json()
}

async function getData (_path, _id = ''){
    const response = await fetch(_path + _id);

    return response.text()
}

function getOwnerSearch(inputSearchOwner) {
	let ulSearch = document.getElementById('ulSearch');

	if (inputSearchOwner.length >= 5) {

		getData(pathOwnerSearch, inputSearchOwner).then(resp => {

			if (resp.length > 0){
				ulSearch.innerHTML = resp
				ulSearch.classList.remove('d-none');
			}
			else {
				ulSearch.classList.add('d-none');
			}

		}).catch(err => {
			console.log(err)
		});
	} else {
		ulSearch.classList.add('d-none');
	}
}

function getOwnerData(ownerId, ownerName){
	document.getElementById('ulSearch').classList.add('d-none')
	document.getElementById('inputSearchOwner').value = ownerName

	getDataJSON(pathOwnerData, ownerId).then(resp => {
		document.getElementById('divInfo').classList.remove('d-none')
		document.getElementById('tableBody').innerHTML = resp.tableBody
		document.getElementById('floatingSelectYear').innerHTML = resp.selectYear

	}).catch(err => {
		console.log(err)
	})
}

function filterEvents(){
	let yearSelected = document.getElementById('floatingSelectYear').value,
		eventString = document.getElementById('floatingInputEvent').value

	let allTrs = document.getElementById('tableBody').children;

	for(oneTr of allTrs){
		if (oneTr.classList.contains(yearSelected) && oneTr.querySelector("a").innerHTML.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').indexOf(eventString.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) != -1) {
			oneTr.classList.remove('d-none')
			oneTr.querySelector('input').classList.add('is-show')
		}
		else {
			oneTr.classList.add('d-none')
			oneTr.querySelector('input').classList.remove('is-show')
		}
	}
}

function clearFilter(){
	document.getElementById('floatingSelectYear').value = 'all'
	document.getElementById('floatingInputEvent').value = ''

	filterEvents()
}

function downloadFiles(isOnlySelected) {
	
	let allTrs = document.getElementById('tableBody'),
		queryStr = 'input.is-show[name="checkboxDownload"]'
	
	if(isOnlySelected) queryStr += ':checked'

	arrayCodes = [... allTrs.querySelectorAll(queryStr)].map(item => item.id)
	
	const modalLoading = new bootstrap.Modal(document.getElementById('modalLoading'))
	
	modalLoading.show()
	
	getData(pathOwnerDownload, JSON.stringify(arrayCodes)).then((resp) => {
		window.location = '/download/' + resp;
		modalLoading.hide()
	});

}
