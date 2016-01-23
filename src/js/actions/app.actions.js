var AppConstants = require('../contants/appconstants')
var AppDispatcher = require('../dispatchers/appdispatcher')

var AppActions = {
	addItem: function(item){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.ADD_ITEM,
			item: item
		})
	},
	removeItem: function(index){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.REMOVE_ITEM,
			index: index
		})
	},
	increaseItem: function(index){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.Increase_Item,
			index: index
		})
	},
	decreaseItem: function(index){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.Decrease_Item,
			index: index
		})
	}
}

module.exports = AppActions;