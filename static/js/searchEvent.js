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
	//let ulSearch = document.getElementById('ulSearch');

	if (inputSearchEvent.length >= 5) {

		getData(pathEventSearch, encodeURIComponent(inputSearchEvent)).then(resp => {

			if (resp.length > 0){
				document.getElementById('ulSearch').innerHTML = resp
				document.getElementById('divSearch').classList.remove('d-none');
			}
			else {
				document.getElementById('divSearch').classList.add('d-none');
			}

		}).catch(err => {
			console.log(err)
		});
	} else {
		document.getElementById('divSearch').classList.add('d-none');
	}
}

function getEventData(eventId, eventName){
	document.getElementById('divSearch').classList.add('d-none')
	document.getElementById('inputSearchEvent').value = eventName

	document.getElementById('divInfo').classList.add('d-none')
	document.getElementById('divLoadingContent').classList.remove('d-none')

	getDataJSON(pathEventData, eventId).then(resp => {
		document.getElementById('tableBody').innerHTML = resp.tableBody
		
		document.getElementById('floatingInputEventYear').value = resp.year
		document.getElementById('floatingInputEventCampus').value = resp.campus
		document.getElementById('floatingInputEventQty').value = resp.qty
		
		document.getElementById('divLoadingContent').classList.add('d-none')
		document.getElementById('divInfo').classList.remove('d-none')
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

	if (arrayCodes.length > 0){
		const modalDownload = new bootstrap.Modal(document.getElementById('modalDownload'))
		
		modalDownload.show()
		
		getDataJSON(pathEventDownload, JSON.stringify(arrayCodes)).then((resp) => {
			if (!resp.err){
				window.location = '/download/' + resp.userId;
				modalDownload.hide()
			}
			else{
				document.getElementById('modalDownloadTitle').innerHTML = 'Problema no Download'
				document.getElementById('modalDownloadBody').innerHTML = '<div id="modalDownloadTitle" class="modal-body text-center"><h6>Parece que você está tentando baixar muitos arquivos de uma só vez. Você vai precisar mesmo de todos esses arquivos? Se sim, tente baixá-los em porções menores para não sobrecarregar o servidor.</h6><h5>:D</h5></div>'
			}
		}).catch(err => {
			document.getElementById('modalDownloadTitle').innerHTML = 'Problema no Download'
			document.getElementById('modalDownloadBody').innerHTML = '<div id="modalDownloadTitle" class="modal-body text-center"><h6>Parece que você está tentando baixar muitos arquivos de uma só vez. Você vai precisar mesmo de todos esses arquivos? Se sim, tente baixá-los em porções menores para não sobrecarregar o servidor.</h6><h5>:D</h5></div>'
		});
	}
}

function closeSearch(){
	document.getElementById('divSearch').classList.add('d-none')
}

function selectAll(elm){
	elm.select()
}