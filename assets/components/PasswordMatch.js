const PASSWORD_CHECK = (data) => {
    var resObj = new Array();
    var character = '';
    var booleans = false;
    var lenBoolean = false;
    var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s+]/gi;
    var numExp = /[1234567890]/gi;
    var resText = false;

    // Check Text Length
    var len = data.length;
    if (len >= 8) {
        lenBoolean = true;
    }
    // Check Upper Case Existance
    for (var i = 0; i < data.length; i++) {
        character = data.charCodeAt(i);
        if (character >= 65 && character <= 90) {
            booleans = true;
        }
    }

    // Marks Existance
    var marksBoolean = regExp.test(data);

    // Number Existance 
    var numBoolean = numExp.test(data);

    if (booleans == true && marksBoolean == true && numBoolean == true && lenBoolean == true) {
        resText = true;
    }

    resObj = { response : resText, text: data }
    return resObj;
};

export default PASSWORD_CHECK;