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
    withCredentials:true
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
