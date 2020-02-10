var shipSelected = '';
var shipLength = 0;
var cellsPlaced = 0;
var placedShips = 0;
var shipData = [
	[ 'portaaviones', 4 ],
	[ 'submarino', 3 ],
	[ 'submarino', 3 ],
	[ 'submarino', 3 ],
	[ 'destructor', 2 ],
	[ 'destructor', 2 ],
	[ 'destructor', 2 ],
	[ 'fragata', 1 ],
	[ 'fragata', 1 ]
]; 



function readyBoardforPlacement( e ){
	
	
	var btnClickedId = getElementId( e );
	var isDisabled = document.getElementById( btnClickedId ).classList.contains( 'btnDisabled' );
	//console.log( 'isDisabled: '+isDisabled );
	if( !isDisabled ){
			makeBtnActive( btnClickedId );
			setMasterValues( btnClickedId );
			setCheckboxListeners( btnClickedId );
	}
	
}

function makeBtnActive( id ){
	console.log( 'FUNCTION: makeBtnActive' );
	
	var btnClicked = document.getElementById( id );
	
	resetBoard();
	resetBtnActive();
	resetMasterValues();
	btnClicked.parentNode.classList.add( 'active' );
	btnClicked.parentNode.innerHTML += getActiveHTML( getShipSpaces( getShipType( id ) ) );
	//console.log( getShipType( id ) );
	//console.log( getShipSpaces( getShipType( id ) ) );
}

function setCheckboxListeners( id ){
	var board = getBoard();
	for( var i=0; i<board.length; i++ ){
		var isDisabled = board[ i ].disabled;
		if( !isDisabled ){
			board[ i ].addEventListener("click", placeShip, false);
		}
	}
}

function placeShip( e ){
	//alert( getElementId( e ) );
	var checkBox = document.getElementById( getElementId( e ) );
	var placementCorrect = checkPlacement( getElementId( e ) );

	console.log('shipSelected: '+shipSelected+' shipLength: '+shipLength+' cellsPlaced: '+cellsPlaced+' placedShips: '+placedShips);

	if( placementCorrect ){
		checkBox.id = shipSelected + '_' + checkBox.id;
		checkBox.name = shipSelected + '_' + checkBox.name;
		checkBox.value = shipSelected + '_' + checkBox.value;
		cellsPlaced = cellsPlaced + 1;
	}else{
		// lanzar error
		// descheckear el checkbox
		alert( 'Posición incorrecta. Compruebe su selección.' )
		checkBox.checked = false;
	}
}

function lockPlacement( e ){
	if( shipLength == cellsPlaced ){
		var board = getBoard();
		for( var i=0; i<board.length; i++ ){
			var isDisabled = board[ i ].disabled;
			var isChecked = board[ i ].checked;
			if( isChecked && !isDisabled ){
				board[ i ].disabled = true;
			}
		}
			e = e || window.event;
		var elementClicked = e.target || e.srcElement;
		elementClicked.parentNode.parentNode.parentNode.parentNode.getElementsByTagName( 'a' )[0].classList.add( 'btnDisabled' );
		resetBtnActive();
		setPlacedShips();
		resetMasterValues()
	}else{
		alert( 'El barco no está completamente colocado. Faltan ' + ( shipLength - cellsPlaced ) + ' posiciones' );
	}
}

function setMasterValues( id ){
	shipSelected = getShipType( id );
	shipLength = getShipSpaces( getShipType( id ) );
	//console.log('shipSelected: '+shipSelected+' - shipLength: '+shipLength);
}

function resetMasterValues(){
	shipSelected = '';
	shipLength = 0;
	cellsPlaced = 0;
	//placedShips = 0;
}
	
function resetBtnActive(){
	console.log( 'FUNCTION: resetBtnActive' );
	
	var btnShips = document.getElementById( 'barcos' ).getElementsByTagName( 'a' );
	var activeControls = document.getElementById( 'activeControls' );
	if ( activeControls ) activeControls.parentNode.removeChild( activeControls );
	for( var i=0; i<btnShips.length; i++ ){
		btnShips[ i ].parentNode.classList.remove( 'active' );
	}
	
}

function getElementId( e ){
		e = e || window.event;
	var elementClicked = e.target || e.srcElement;
	var elementClickedId = elementClicked.id;
	return elementClickedId;
}

function getShipType( id ){
	var shipType = '';
		shipType = id.split( '_' )[ 0 ];
	return shipType;
}

function getShipSpaces( shipName ){
	var shipSpaces = false;
	for( var i=0; i<shipData.length; i++ ){
		if( shipData[ i ][ 0 ] == shipName ){
			shipSpaces = shipData[ i ][ 1 ];
			break;
		}
	}
	return shipSpaces;
}

function getActiveHTML( shipSpaces ){
	return '<div id="activeControls"><p>Casillas <span>'+shipSpaces+'</span></p><p><a class="btnReset" href="#" onclick="resetBoard()"><img src="img/quit.svg" alt="X"></a><a class="btnPlace" href="#" onclick="lockPlacement()"><img src="img/check.svg" alt="P"></a></p></div>';
}

function getBoard(){
	return document.getElementById( 'shipBoard' ).getElementsByTagName( 'input' );
}

function resetBoard(){
	var board = getBoard();
	for( var i=0; i<board.length; i++ ){
		var isChecked = board[ i ].checked;
		var isDisabled = board[ i ].disabled;
		if( isChecked && !isDisabled ){
			board[ i ].checked = false;
			board[ i ].id = board[ i ].id.split( '_' )[1] + '_' + board[ i ].id.split( '_' )[2];
			board[ i ].name = board[ i ].name.split( '_' )[1] + '_' + board[ i ].name.split( '_' )[2];
			board[ i ].value = board[ i ].value.split( '_' )[1] + '_' + board[ i ].value.split( '_' )[2];
		}
	}
}

function setPlacedShips(){
	placedShips += 1;
	if( placedShips == 9 ){
		document.getElementById( 'btnSubmit' ).classList.remove( 'btnHidden' );
	}
}

function removeDisableBoxes(){
	var board = getBoard();
	for( var i=0; i<board.length; i++ ){
		var isDisabled = board[ i ].disabled;
		if( isDisabled ) board[ i ].disabled = false;
	}
}

/*
var shipSelected = '';
var shipLength = 0;
var cellsPlaced = [];
var placedShips = 0;
*/

function checkPlacement( id ){
	var numCellsPlaced = cellsPlaced.length;
	var validation = true;

	if( cellsPlaced >= shipLength) return false;

	switch( numCellsPlaced ){
		case 0:
			return validation;
			break;
		case 1:
			//
	}
	
	return true;
}