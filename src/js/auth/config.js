var baseUrl = 'http://localhost:3000/users'

var config = {
	getSearchUrl: function(user){
		return baseUrl + "?authId=" + user.authId + "&authProvider=" + user.authProvider ;
	},
	getPostUrl: function(){
		return baseUrl;
	}
}

export default config;
