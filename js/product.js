/**
 * Author : Ech0
 * Email  : ech0.extreme@foxmail.com
 * Time   : 04/28/2018 10:50 AM
 */
/**
 *
 * @param option add or update
 * @param data bookEntity or bookDeatailEntity
 */
function updateAddBookDetailPanel(option, data) {
    if (option == "add") {
        // 添加商品详情
        $("#action").val("add");
        $("#bookId").val(data.id);
        $("#bookDetail-bookName").val(data.bookName);
        $("#product-detail-panel-title").text("完善商品详情信息 ")
        $("#detail-submit-btn").text("提交商品详情信息");

    }
    else {
        // 修改商品详情
        // todo
        $("#action").val("update");
        $("#product-detail-panel-title").text("修改商品详情信息 ")
        $("detail-submit-btn").text("确认修改 ");
    }
}

// 添加商品
function addProduct() {
    var bookName = $("#bookName").val();
    var authorName = $("#authorName").val();
    var category = $("#category").val();
    var recommendation = $("#recommendation").val();
    var publisher = $("#publisher").val();
    var publishDate = $("#publishDate").val();
    var pricing = $("#pricing").val();
    var currentPrice = $("#currentPrice").val();
    var stock = $("#stock").val();
    var coverImg = $("#coverImg").val();
    const params = new URLSearchParams();
    params.append("bookName", bookName);
    params.append("authorName", authorName);
    params.append("category", category);
    params.append("recommendation", recommendation);
    params.append("publisher", publisher);
    params.append("publishDate", publishDate);
    params.append("pricing", pricing);
    params.append("currentPrice", currentPrice);
    params.append("stock", stock);
    params.append("coverImg", coverImg);
    instance.post("/book/add", params).then(function (response) {
        console.log(response.data.desc);
        if (response.data.code == 0) {
            console.log(response.data.data);
            swal({
                title: "添加商品成功！",
                text: "请务必补充商品详情信息 ！",
                icon: "success",
                buttons: {
                    cancel: "暂时不添加",
                    add: {
                        text: "现在去补充",
                        value: "add",
                    }
                },
            }).then((value) => {
                switch (value) {
//                        todo
                    case "add":
                        switchPanel("add-product-detail-panel");
                        updateAddBookDetailPanel("add", response.data.data);
                        break;
                    default:
                        window.location.href = "./personal-center.html?target-panel=product-manage";
                }
            });
        } else {
            simpleErrorInfo(response.data.desc);
        }
    }).catch(function (error) {
        console.log(error);
    });
}

/**
 * 新增或修改商品详情信息
 */
function operateProductDetail() {

    var id = $("#bookDetailId").val();
    var bookId = $("#bookId").val();
    var edition = $("#edition").val();
    var words = $("#words").val();
    var pages = $("#pages").val();
    var paperType = $("#paperType").val();
    var printDate = $("#printDate").val();
    var authorIntro = $("#authorIntro").val();
    var briefIntro = $("#briefIntro").val();
    var foreword = $("#foreword").val();
    var images = $("#images").val();
    const params = new URLSearchParams();
    params.append("id", id);
    params.append("bookId", bookId);
    params.append("edition", edition);
    params.append("words", words);
    params.append("pages", pages);
    params.append("paperType", paperType);
    params.append("printDate", printDate);
    params.append("authorIntro", authorIntro);
    params.append("briefIntro", briefIntro);
    params.append("foreword", foreword);
    params.append("images", images);
    if ($("#action").val() == "add") {
        instance.post("/book/addDetail", params).then(function (response) {
            console.log(response.data.desc);
            if (response.data.code == 0) {
                simpleSuccessInfo("添加商品详情成功 ！");
                setTimeout(function () {
                    // todo
                    window.location.href = "./personal-center.html?target-panel=product-manage-panel";
                }, MIDDLE_DELAY);
            } else {
                simpleErrorInfo(response.data.desc);
            }
        }).catch(function (error) {
            console.log(error);
        });
    } else {
        instance.post("/book/updateDetail", params).then(function (response) {
            console.log(response.data.desc);
            if (response.data.code == 0) {
                simpleSuccessInfo("修改商品详情成功 ！");
                setTimeout(function () {
                    // todo
                    window.location.href = "./personal-center.html";
                }, MIDDLE_DELAY);
            } else {
                simpleErrorInfo(response.data.desc);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
};
