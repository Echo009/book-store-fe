/**
 * Author : Ech0
 * Email  : ech0.extreme@foxmail.com
 * Time   : 04/24/2018 01:45 PM
 */

// apply store info

function initApplyStoreInfo() {
    $("#storeName").val("Echo-Zzz");
    $("#email").val("ech0.extreme@foxmail.com");
    $("#registerPhone").val("15273256666");
    $("#realName").val("ironman");
    $("#idNumber").val("425263188789788654");
    $("#bankNum").val("42568789231312312357");
    $("#province-selector").val("湖南省");
    $("#city-selector").val("湘潭市");
}

function initAddBookInfo() {

    $("#bookName").val("刺杀骑士团长");
    $("#authorName").val("村上春树 著，林少华 译");
    $("#category").val("小说");
    $("#recommendation").val("简体中文版正式上市！【王俊凯3月书单】村上春树时隔七年长篇巨著,关于创伤、内省、对峙、重生的力量之作,2017年度日本小说类榜首！");
    $("#publisher").val("上海译文出版社");
    $("#publishDate").val("2018-03-06");
    $("#pricing").val(98);
    $("#currentPrice").val(94);
    $("#stock").val(100);
    $("#coverImg").val("http://p7f7rr200.bkt.clouddn.com/87142cad-3357-4795-9394-94934a2d726a");

}

$("#add-product-detail-panel").slideDown();

var data = {
    "bookDetailId": 2,
    "bookId": 7,
    "storeId": 1,
    "bookName": "刺杀骑士团长 2",
    "recommendation": "简体中文版正式上市！【王俊凯3月书单】村上春树时隔七年长篇巨著,关于创伤、内省、对峙、重生的力量之作,2017年度日本小说类榜首！",
    "authorName": "村上春树 著，林少华 译",
    "publisher": "上海译文出版社",
    "publishDate": "2018-03-06 00:00:00.0",
    "pricing": 98,
    "discount": 0,
    "currentPrice": 94,
    "sales": 0,
    "stock": 100,
    "coverImg": "http://p7f7rr200.bkt.clouddn.com/87142cad-3357-4795-9394-94934a2d726a",
    "category": "小说",
    "status": 0,
    "edition": 2,
    "pages": 292,
    "words": 88888,
    "printDate": null,
    "paperType": "胶版纸",
    "briefIntro": "渣渣辉",
    "authorIntro": "渣渣",
    "foreword": "哈哈哈哈哈哈哈哈哈哈或或",
    "images": ";http://p7f7rr200.bkt.clouddn.com/437144ec-647c-4749-b877-1bdde5fdf375"
}