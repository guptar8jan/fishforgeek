var AppDisplatcher = require('../dispatchers/app-dispacter');
var AppConstants = require('../constants/app-constants');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _catalog = [];
for(var i=1; i<0; i++){
	_catalog.push({
			'id': 'Widget '+ i,
			'title': 'Widget #' +i,
			'summary': 'This is awesome wideget #' + i,
			'description': 'something something',
			'cost': i	
	});
}

var _cartItems = [];

function _removeItem(index){
	_cartItems[index].inCart = false;
	_cartItems.splice(index, 1);
}

function _increaseItem(index){
	_cartItems[index].qty++;
}

function _decreaseItem(index){
	if(_cartItems[index].qty > 1){
		_cartItems[index].qty--;
	}
	else{
		_cartItems._removeItem(index);
	}
}

function _addItem(item){
	if(!item.inCart){
		item.qty = 1;
		item.inCart = true;
		_cartItems.push(item);
	}
	else{
		_cartItems.forEach(function(cartItem, i){
			if(cartItem.id = item.id){
				cartItem.qty++;
			}
		});
	}
}

function _cartTotals(){
	var qty=0, total=0;
	_cartItems.forEach(function(cartItem, i){
		qty += cartItem.qty;
		total += cartItem.cost;
	});
	return {'qty':qty, 'total': total};
}