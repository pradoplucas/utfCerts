var eventSearch;
var pathEventSearch = '/searchEvent/eventSearch/';
var pathEventData = '/searchEvent/eventData/';
var pathEventDownload = '/searchEvent/download/';

async function getDataJSON (_path, _id = ''){
    const response = await fetch(_path + _id);

    return response.json()
}

async function getData (_path, _id = ''){
    const response = await fetch(_path + _id);

    return response.text()
}

function getEventSearch(inputSearchEvent) {
	let ulSearch = document.getElementById('ulSearch');

	if (inputSearchEvent.length >= 5) {

		getData(pathEventSearch, inputSearchEvent).then(resp => {

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

function getEventData(eventId, eventName){
	document.getElementById('ulSearch').classList.add('d-none')
	document.getElementById('inputSearchEvent').value = eventName

	getDataJSON(pathEventData, eventId).then(resp => {
		document.getElementById('divInfo').classList.remove('d-none')
		document.getElementById('tableBody').innerHTML = resp.tableBody

		document.getElementById('floatingInputEventYear').value = resp.year
		document.getElementById('floatingInputEventCampus').value = resp.campus
		document.getElementById('floatingInputEventQty').value = resp.qty

	}).catch(err => {
		console.log(err)
	})
}

function filterOwners(){
	let ownerString = document.getElementById('floatingInputOwner').value

	let allTrs = document.getElementById('tableBody').children;

	for(oneTr of allTrs){
		if (oneTr.querySelector("a").innerHTML.indexOf(ownerString.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) != -1) {
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
	document.getElementById('floatingInputOwner').value = ''

	filterOwners()
}

function downloadFiles(isOnlySelected) {
	
	let allTrs = document.getElementById('tableBody'),
		queryStr = 'input.is-show[name="checkboxDownload"]'
	
	if(isOnlySelected) queryStr += ':checked'

	arrayCodes = [... allTrs.querySelectorAll(queryStr)].map(item => item.id)

	const modalLoading = new bootstrap.Modal(document.getElementById('modalLoading'))
	
	modalLoading.show()
	
	getData(pathEventDownload, JSON.stringify(arrayCodes)).then((resp) => {
		window.location = '/download/' + resp;
		modalLoading.hide()
	});
}
