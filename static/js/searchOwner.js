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
	//let ulSearch = document.getElementById('ulSearch');

	if (inputSearchOwner.length >= 5) {

		getData(pathOwnerSearch, encodeURIComponent(inputSearchOwner)).then(resp => {

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

function getOwnerData(ownerId, ownerName){
	document.getElementById('divSearch').classList.add('d-none')
	document.getElementById('inputSearchOwner').value = ownerName

	document.getElementById('divInfo').classList.add('d-none')
	document.getElementById('divLoadingContent').classList.remove('d-none')

	getDataJSON(pathOwnerData, ownerId).then(resp => {
		document.getElementById('tableBody').innerHTML = resp.tableBody

		document.getElementById('floatingSelectYear').innerHTML = resp.selectYear

		document.getElementById('divLoadingContent').classList.add('d-none')
		document.getElementById('divInfo').classList.remove('d-none')

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

	if (arrayCodes.length > 0){
		const modalDownload = new bootstrap.Modal(document.getElementById('modalDownload'))
		
		modalDownload.show()
		
		getDataJSON(pathOwnerDownload, JSON.stringify(arrayCodes)).then((resp) => {
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