/**
 * Author : Ech0
 * Email  : ech0.extreme@foxmail.com
 * Time   : 04/27/2018 08:42 AM
 */
// 收藏夹相关

function addFavorite(isBook,contentId) {

    const params = new URLSearchParams();
    params.append("isBook", isBook);
    params.append("contentId", contentId);
    instance.post("/favorite/add", params).then(function (response) {
        console.log(response.data.desc);
        if (response.data.code == 0) {
            simpleSuccessInfo("收藏成功 !");
            return true;
        } else {
            simpleErrorInfo(response.data.data);
            return false;
        }
    }).catch(function (error) {
        console.log(error);
    });

}

/**
 * there are optional parameters
 * @param isBook
 * @param contentId
 * @param id
 */
function removeFavorite(isBook,contentId,id) {

    const params = new URLSearchParams();
    if("undefined" != typeof id){
        params.append("id", id);
    }else{
        params.append("isBook", isBook);
        params.append("contentId", contentId);

    }
    instance.post("/favorite/remove", params).then(function (response) {
        console.log(response.data.desc);
        if (response.data.code == 0) {
            simpleSuccessInfo(" 已取消收藏 !");
            return true;
        } else {
            simpleErrorInfo(response.data.desc);
            return false;
        }
    }).catch(function (error) {
        console.log(error);
    });

}

var instance = axios.create({
    baseURL: 'http://localhost/book-store/',
    timeout: 500,
    withCredentials:true,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});
var params = new URLSearchParams();
params.append("isBook", true);
instance.post("/favorite/all", params).then(function (response) {
    console.log(response.data.data);
    if (response.data.code == 0) {
        simpleSuccessInfo("success!");
        return true;
    } else {
        simpleErrorInfo(response.data.desc);
        return false;
    }
}).catch(function (error) {
    console.log(error);
});