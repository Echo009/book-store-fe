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


function initProductContainer(targetContainerSelector,books) {
    var $container = $(targetContainerSelector);
    $container.html("");
    books.forEach(function (book) {
        var product = "<div class='col-6 col-lg-3 m-auto product ' data-product-id='"+book.id+"'>\n" +
            "    <div class='card mb-3 box-shadow border border-info rounded bg-light'>\n" +
            "        <div class='card-header mb-2 font-weight-bold text-dark'>"+book.bookName+"</div>\n" +
            "        <a href='#'>\n" +
            "            <img class='card-img-top img-thumbnail rounded m-auto small-cover-img'\n" +
            "                 src='"+book.coverImg+"' alt=' image '>\n" +
            "        </a>\n" +
            "        <div class='card-body '>\n" +
            "            <h7 class='text-info'>"+book.authorName+"</h7>\n" +
            "            <h5 class='card-title pricing-card-title font-weight-bold pt-2 text-secondary'>￥"+book.currentPrice+"\n" +
            "                <del class='text-muted d-inline '>\n" +
            "                    <small>￥"+book.pricing+"</small>\n" +
            "                </del>\n" +
            "            </h5>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</div>";
        $(product).appendTo($container);
    })
}

function initPaginationContainer(currentPage , totalPages ,bookName,category,baseLink ) {
    console.log("currentPage is " + currentPage);
    var $paginationContainer = $("#pagination-container");
    $paginationContainer.html("");
    if("undefined" == typeof baseLink) {
        baseLink = "./search.html?bookName="+bookName+"&category="+category+"&pageNum=";
    }
    for(i = 0 ; i <= totalPages+1 ;i++) {
        console.log(i);
        var pageItem = "<li class='page-item'>" +
        "<a class='page-link' href=''></a>" +
        "</li>";
        var $pageItem = $(pageItem);
        if(i==currentPage) {
            $pageItem.addClass("active");
            $pageItem.children("a").text(i);
        }else if(i==0){
            var index = currentPage-1;
            $pageItem.children("a").html("&laquo;");
            if(index<1) {
                $pageItem.addClass("disabled");
            }
            $pageItem.children("a").attr("href", baseLink + index);
        }else if(i==totalPages+1) {
            console.log("currentPage is " + currentPage);
            console.log("type of currentPage is " + typeof currentPage);
            // emmmm , currentPage is string . . . ,so , the method of fix bug is sub a value 
            var index = currentPage-1+2;
            console.log("index is " + index);
            $pageItem.children("a").html("&raquo;");
            if (index>totalPages) {
                $pageItem.addClass("disabled");
            }
            $pageItem.children("a").attr("href", baseLink + index);
        }else {
            $pageItem.children("a").text(i);
            $pageItem.children("a").attr("href", baseLink + i);
        }
        $pageItem.appendTo($paginationContainer);
        console.log($pageItem);
    }
}
$(function () {
    $(document).on("click", ".search-option", function () {
        var $this = $(this);
        $("#searchOption").text($this.text());
    });
    $(document).on("click", ".product", function () {
        var $this = $(this);
        var bookId = $this.attr("data-product-id");
        console.log("bookId is : " + bookId);
        window.location.href = "./bookDetail.html?bookId="+bookId;
    });
    $("[data-toggle='tooltip']").tooltip();

    $("#search-btn").on("click", function () {
        var category = $.trim($("#searchOption").text());
        var keyword = $.trim($("#search-keyword").val());
        var targetLink = "./search.html?bookName=" + keyword;
        if (category != "所有分类") {
            targetLink += "&category=" + category;
        }
        console.log(targetLink);
        window.location.href = targetLink;
    })
});