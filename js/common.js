/**
 * Author : Ech0
 * Email  : ech0.extreme@foxmail.com
 * Time   : 04/18/2018 08:59 AM
 */
// it depends on jQuery , sweetalert.js , axios.js
function simpleSuccessInfo(content) {
    swal({
        icon:"success",
        text:content,
        button:false,
        timer:MIDDLE_DELAY,
    });
    return true;
}
function simpleErrorInfo(content) {
    swal({
        icon:"error",
        text:content,
        button:false,
        timer:MIDDLE_DELAY,
    });
    return true;
}
function simpleWarningInfo(content) {
    swal({
        icon:"warning",
        text:content,
        button:false,
        timer:LONG_DELAY,
    });
    return true;
}
// xhr config
var instance = axios.create({
    baseURL: 'http://localhost/book-store/',
    timeout: 500,
    withCredentials:true,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});
function logout() {
    instance.get('/common/logout')
        .then(function (response) {
            console.log(response);
            simpleSuccessInfo("注销成功 ！")
        })
        .catch(function (error) {
            console.log(error);
        });
    store.remove(CURRENT_USER);
    //refresh page
    setTimeout("window.location.href='index.html'",MIDDLE_DELAY);
}
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return false;
}
function updateUserInfo() {

    instance.get('/common/userInfo')
        .then(function (response) {
            console.log("update userInfo :" + response.data.data.userName);
            store.set(CURRENT_USER,response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        });
};

$(function () {

});