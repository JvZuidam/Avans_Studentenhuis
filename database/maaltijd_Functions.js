exports.newMaaltijd = function (name, description, ingredients, allergies, costs, userId, studentenhuisId) {
    //POST
    //Create new Maaltijd
};

exports.getAllMaaltijden = function (userId, studentenhuisId) {
  //GET
  //Get all maaltijden from studentenhuisId  
};

exports.getMaaltijd = function (userId, studentenhuisId, maaltijdId) {
    //GET
    //Get maaltijden from studentenhuisId & maaltijdId
};

exports.updateMaaltijd = function (userId, studentenhuisId, maaltijdId ) {
    //PUT
    //Update the maaltijden from studentenhuisId & maaltijdId 
};

exports.deleteMaaltijd = function (userId, studentenhuisId, maaltijdId ) {
    //DELETE
    //DELETE the maaltijden from studentenhuisId & maaltijdId
};