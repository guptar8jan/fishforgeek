module.exports = {
    getUsers: getUsers
};

function getUsers(req, res){
    res.status(200).send([{
        email: 'test@test.com',
        firstName: 'Rekha',
        lastName: 'Gupta',
        authProvider: 'facebook',
        authId: '123452334'
    }]);
}
