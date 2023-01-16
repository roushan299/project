module.exports.home = function(req, res){
    //console.log(req.cookies);
    //res.cookie('user_id',5);
    return res.render('home',{
        title:"FoodRunner | Dashboaed"
    });
}

//module.exports.actionName = function(req, res){}