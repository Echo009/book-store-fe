/**
 * Author : Ech0
 * Email  : ech0.extreme@foxmail.com
 * Time   : 04/18/2018 08:59 AM
 */
// it depends on jQuery , sweetalert.js
function simpleSuccessInfo(content) {
    swal({
        icon:"success",
        text:content,
        button:false,
        timer:1000,
    });
    return true;
}