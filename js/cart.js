/**
 * Author : Ech0
 * Email  : ech0.extreme@foxmail.com
 * Time   : 04/27/2018 12:47 AM
 */

// 购物车相关

$(function () {


    // 选中店铺下所有的书籍
    $(document).on("click", ".store-selector", function () {
        var $this = $(this);
        var storeId = $this.attr("data-target-store-id");
        console.log("storeId :" + storeId);
        var targetSeletor = ".store-" + storeId;
        console.log("selector is  :" + targetSeletor);
        if ($this.is(':checked')) {
            $(targetSeletor).attr("checked", false).click();
        } else {
            $(targetSeletor).attr("checked", true).click();
        }
    });
    $(document).on("click", ".cart-del-btn", function () {
        var $this = $(this);
        var cartId = $this.attr("data-target-cart-id");
        console.log("cart-id is : " + cartId);
        const params = new URLSearchParams();
        params.append("cartId", cartId);
        instance.post("/cart/remove", params).then(function (response) {
            console.log(response.data.desc);
            if (response.data.code == 0) {
                simpleSuccessInfo("删除成功 !")
                updateCartInfoPanel();
            } else {
                simpleErrorInfo(response.data.desc);

            }
        }).catch(function (error) {
            console.log(error);
        });
    });

    $(document).on("click", ".cart-btn-plus", function () {
        var $this = $(this);
        var bookId = $this.attr("data-target-book-id");
        console.log("bookId :" + bookId);
        var targetSeletor = "#book-" + bookId + "-amount";
        console.log("selector is  :" + targetSeletor);
        const params = new URLSearchParams();
        params.append("bookId", bookId);
        instance.post("/cart/add", params).then(function (response) {
            console.log(response.data.desc);
            if (response.data.code == 0) {
                console.log(response.data.data.amount);
                $(targetSeletor).text(response.data.data.amount);
//                    set total price
                var totalPriceSelector = "#book-" + bookId + "-total-price";
                $(totalPriceSelector).text(response.data.data.totalPrice);
            } else {
                simpleErrorInfo(response.data.desc);
            }
        }).catch(function (error) {
            console.log(error);
        });
    });

    $(document).on("click", ".cart-btn-minus", function () {
        var $this = $(this);

        var bookId = $this.attr("data-target-book-id");
        console.log("bookId :" + bookId);
        var targetSeletor = "#book-" + bookId + "-amount";
        console.log("selector is  :" + targetSeletor);
        const params = new URLSearchParams();
        params.append("bookId", bookId);
        params.append("amount", -1);
        instance.post("/cart/add", params).then(function (response) {
            console.log(response.data.desc);
            if (response.data.code == 0) {
                console.log(response.data.data.amount);
                $(targetSeletor).text(response.data.data.amount);
//                    set total price
                var totalPriceSelector = "#book-" + bookId + "-total-price";
                $(totalPriceSelector).text(response.data.data.totalPrice);
                $this.removeClass("disabled");
            } else {
//                    simpleErrorInfo(response.data.desc);
                if ($this.hasClass("disabled")) {
                    return;
                }
                $this.addClass("disabled");
            }
        }).catch(function (error) {
            console.log(error);
        });
    });


});

function removeCart() {
    var $this = $(this);
    var cartId = $this.attr("data-target-cart-id");
    console.log("cart-id is : " + cartId);
    const params = new URLSearchParams();
    params.append("cartId", cartId);
    instance.post("/cart/remove", params).then(function (response) {
        console.log(response.data.desc);
        if (response.data.code == 0) {
            simpleSuccessInfo("删除成功 !")
            updateCartInfoPanel();
        } else {
            simpleErrorInfo(response.data.desc);

        }
    }).catch(function (error) {
        console.log(error);
    });
}

/**
 * add carts to cart panel , classify them by store
 * @param cartWrapperData
 */
function addCart(cartWrapperData) {
    var storeModule = "<div class='store-container text-center' id='carts-store-" + cartWrapperData.storeId + "'>\n" +
        "    <div  class='text-left pl-4 font-weight-bold h6 text-secondary'>\n" +
        "        <input type='checkbox' class='store-selector mr-2' data-target-store-id='" + cartWrapperData.storeId + "'> <i class=\"fas fa-shopping-bag\"></i>" + cartWrapperData.storeName +
        "    </div>\n" +
        "    <hr>\n" +
        "</div>";
    var $carts = $("#carts");
    // add store container

    $storeModule = $(storeModule);
    // $(storeModule).appendTo($carts);


    var $currentStoreContainer = $("#carts-store-" + cartWrapperData.storeId);
    console.log("currentStoreContainer is :" + $currentStoreContainer.id);
    console.log("currentStoreContainer is :" + "#carts-store-" + cartWrapperData.storeId);
    var carts = cartWrapperData.cartEntityList;
    carts.forEach(function (cart) {
        var cartModule = "<div class='cart-container row' data-target-cart-id='" + cart.id + "'>\n" +
            "    <div class='col-md-1 d-flex align-items-center text-left'>\n" +
            "        <div class='w-100 pl-4'>\n" +
            "            <input class='store-" + cart.storeId + "' data-target-cart-id='" + cart.id + "' type='checkbox'>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "    <div class='col-md-3 d-flex align-items-center text-center'>\n" +
            "        <img class=' d-none d-md-block img-thumbnail mr-auto' style='max-height: 10rem ; cursor:pointer;'\n" +
            "             src='" + cart.coverImg + "' data-holder-rendered='true' onclick=\"window.location.href='./bookDetail.html?bookId="+cart.bookId+"'\">\n" +
            "    </div>\n" +
            "    <div class='col-md-3 text-center vcenter align-items-center'>\n" +
            "        <div>\n" +
            "            <strong>" + cart.bookName + "</strong>\n" +
            "            <div class='badge badge-info d-inline-block'>" + cart.category + "</div>\n" +
            "            <hr>\n" +
            "            <div class='h6 d-inline-block pr-2 vcenter'>" + cart.authorName + "</div>\n" +
            "            <span class='badge badge-primary ml-2'>" + cart.publishDate + "</span>\n" +
            "            <div>\n" +
            "                <price class='text-danger'>\n" +
            "                    ￥<h5 class='font-weight-bold d-inline-block pr-2 '>" + cart.currentPrice + "</h5>\n" +
            "                </price>\n" +
            "                <del>￥" + cart.pricing + "</del>\n" +
            "                <h6 class='d-inline-block pl-2'>" + cart.publisher + "</h6>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "\n" +
            "    </div>\n" +
            "    <div class='col-md-1 text-center   d-flex align-items-center'>\n" +
            "        <div class='mr-auto w-100' >\n" +
            "            <span class='h5 text-danger' id='book-" + cart.bookId + "-total-price'>" + cart.totalPrice + "</span>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "    <div class='col-md-3 text-center d-flex align-items-center'>\n" +
            "        <div class='btn-group w-100 pr-5 pl-5 ' role='group' >\n" +
            "            <button class='btn btn-info w-25 cart-btn-minus' data-target-book-id='" + cart.bookId + "'>-</button>\n" +
            "            <button class='btn btn-outline-primary w-50 disabled cart-amount'\n" +
            "                    data-target-book-id='" + cart.bookId + "' id='book-" + cart.bookId + "-amount'>" + cart.amount + "" +
            "            </button>\n" +
            "            <button class='btn btn-info w-25 cart-btn-plus' data-target-book-id='" + cart.bookId + "'>+</button>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "    <div class='col-md-1 d-md-flex align-items-center text-center d-none '>\n" +
            "        <div class='w-100'>\n" +
            "            <div class='btn-group-vertical w-100 ' role='group'>\n" +
            "                <button class='btn btn-danger h-50 cart-del-btn'\n" +
            "                        data-toggle='tooltip'\n" +
            "                        data-placement='top'\n" +
            "                        data-original-title='删除'\n" +
            "                        data-target-cart-id='" + cart.id + "'>\n" +
            "                    <i class='fas fa-trash-alt mr-0'></i>\n" +
            "                </button>\n" +
            "                <button class='btn btn-primary h-50 cart-to-favorite-btn'\n" +
            "                        data-toggle='tooltip'\n" +
            "                        data-placement='bottom'\n" +
            "                        data-original-title='移入收藏夹'\n" +
            "                        data-target-book-id='" + cart.bookId + "'>\n" +
            "                    <i class='fas fa-random  mr-0'></i>\n" +
            "                </button>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</div>\n" +
            "<div class='row text-center align-items-center d-md-none d-sm-flex'>\n" +
            "    <div class='col-12 pt-4 '>\n" +
            "        <div class='btn-group w-100 pl-5 pr-5' role='group'>\n" +
            "            <button class='btn btn-danger w-50 cart-del-btn'\n" +
            "                    data-toggle='tooltip'\n" +
            "                    data-placement='top'\n" +
            "                    data-original-title='删除'\n" +
            "                    data-target-cart-id='" + cart.id + "'>\n" +
            "                <i class='fas fa-trash-alt mr-0'></i>\n" +
            "            </button>\n" +
            "            <button class='btn btn-primary w-50 cart-to-favorite-btn'\n" +
            "                    data-toggle='tooltip'\n" +
            "                    data-placement='bottom'\n" +
            "                    data-original-title='移入收藏夹'\n" +
            "                    data-target-book-id='" + cart.bookId + "'>\n" +
            "                <i class='fas fa-random  mr-0'></i>\n" +
            "            </button>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</div><hr>";

        $(cartModule).appendTo($storeModule);
    })

    $storeModule.appendTo($carts);
    $("[data-toggle='tooltip']").tooltip();
}