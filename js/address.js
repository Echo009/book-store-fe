/**
 * Author : Ech0
 * Email  : ech0.extreme@foxmail.com
 * Time   : 04/27/2018 03:43 PM
 */

function addAddress() {

    var name = $("#add-address-name").val();
    var phone = $("#add-address-phone").val();
    var province = $("#add-address-province-selector").val();
    var city = $("#add-address-city-selector").val();
    var area = $("#add-address-district-selector").val();
    var detail = $("#add-address-detail").val();
    const params = new URLSearchParams();
    params.append("name", name);
    params.append("phone", phone);
    params.append("province", province);
    params.append("city", city);
    params.append("area", area);
    params.append("detail", detail);
    instance.post("/address/add", params).then(function (response) {
        console.log(response.data.desc);
        if (response.data.code == 0) {
            updateUserInfo();
            simpleSuccessInfo("添加成功 ！");
            $("#add-address-modal").modal('hide');
            updateAddrManagePanel();
        } else {
            simpleErrorInfo(response.data.desc);
        }
    }).catch(function (error) {
        console.log(error);
    });
}

function showAddressModal() {
    $("#add-address-modal").modal('show');
}

$(function () {
    $(document).on("click", ".edit-addr-btn", function () {
        var $this = $(this);
        var itemId = $this.attr("data-target-addr-id");
        var targetSelector = "#addr-item-" + itemId + " :input";

        if ($this.hasClass(".editing")) {
            // update addr
            $(targetSelector).each(function (index, ele) {
                console.log(index);
                console.log(ele);
                $(ele).attr("disabled", "disabled");
            });
            $this.removeClass(".editing");
            $this.children("img").attr("src", "../img/common/modify.png");
            $this.children("img").attr("data-original-title", "修改地址");
        } else {
            $this.addClass(".editing");
            $(targetSelector).each(function (index, ele) {
                console.log(index);
                console.log(ele);
                $(ele).removeAttr("disabled");
            });
            $this.children("img").attr("src", "../img/common/save.png");
            $this.children("img").attr("data-original-title", "保存地址");

        }
        $this.removeAttr("disabled");
    })
})

function updateAddrManagePanel() {
    var $addrContainer = $("#addr-container");
    instance.get("/address/all").then(function (response) {
        console.log(response.data.desc);
        if (response.data.code == 0) {
            $addrContainer.html("");
            response.data.data.forEach(function (addrItem) {
                var addrItem = "<div id='addr-item-" + addrItem.id + "' class=' border  rounded '>\n" +
                    "    <div class='row'>\n" +
                    "        <div class=' col-md-1  mt-2  text-left  font-weight-bold  align-items-center d-flex'>\n" +
                    "            <button class='btn btn-outline-light btn-block w-100'>\n" +
                    "                <i class='h4 fas fa-address-card vcenter '></i>\n" +
                    "            </button>\n" +
                    "        </div>\n" +
                    "        <div class='col-12 col-md-4 mt-2 text-left '>\n" +
                    "            <div>\n" +
                    "                姓名：\n" +
                    "                <input id='address-info-name-" + addrItem.id + "'\n" +
                    "                       class='form-control d-inline-block w-50 text-dark border-0'\n" +
                    "                       value='" + addrItem.name + "'\n" +
                    "                       disabled>\n" +
                    "                <!--sex-->\n" +
                    "                <div id='address-info-sex-" + addrItem.id + "' class=' badge badge-pill badge-secondary '>♀</div>\n" +
                    "            </div>\n" +
                    "            <div>\n" +
                    "                电话：\n" +
                    "                <input id='address-info-phone-" + addrItem.id + "'  type='number' disabled\n" +
                    "                       class=' w-50 h6 d-inline-block pr-2 mt-2 form-control border-0 text-dark'\n" +
                    "                       value='" + addrItem.phone + "'>\n" +
                    "            </div>\n" +
                    "        </div>\n" +
                    "        <div class='col-12 col-md-6  mt-2 pt-1  text-left  '>\n" +
                    "            <div id='dist-selector' data-toggle='distpicker' class='d-inline-block vcenter '>\n" +
                    "                <select id='province-selector-" + addrItem.id + "' data-province='" + addrItem.province + "'\n" +
                    "                        class='custom-select d-inline-block w-25' disabled='disabled'></select>\n" +
                    "                <select id='city-selector-" + addrItem.id + "' data-city='" + addrItem.city + "'\n" +
                    "                        class='custom-select d-inline-block w-25' disabled='disabled'></select>\n" +
                    "                <select id='district-selector-" + addrItem.id + "' data-district='" + addrItem.area + "'\n" +
                    "                        class='custom-select d-inline-block w-25' disabled='disabled'></select>\n" +
                    "            </div>\n" +
                    "            <div class='mt-2 ml-2'>\n" +
                    "                街道信息： <input id='address-info-detail-" + addrItem.id + "' type='text' class='form-control d-inline-block w-75 border-0' disabled\n" +
                    "                             value='" + addrItem.detail + "'>\n" +
                    "            </div>\n" +
                    "        </div>\n" +
                    "        <!--修改按钮-->\n" +
                    "        <div class='col-md-1 col-12 mt-2  text-center text-right  d-flex align-items-center'>\n" +
                    "            <button class='edit-addr-btn btn btn-outline-light btn-block w-100 ' data-target-addr-id='" + addrItem.id + "'>\n" +
                    "                <img src='../img/common/modify.png' class='icon btn-img vcenter'\n" +
                    "                     data-toggle='tooltip'\n" +
                    "                     data-placement='top'\n" +
                    "                     title='' data-original-title='修改地址'>\n" +
                    "                </img>\n" +
                    "            </button>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "</div><hr>";
                $(addrItem).appendTo($addrContainer);
                $('[data-toggle="' + NAMESPACE + '"]').distpicker();
                $("[data-toggle='tooltip']").tooltip();
            });
        } else {
            simpleErrorInfo(response.data.desc);
        }
    }).catch(function (error) {
        console.log(error);
    });

}


function showSelectAddressModal() {
    $("#select-address-modal").modal('show');
    updateAddrPanel();
}
function updateAddrPanel() {
    var $addrContainer = $("#select-addr-container");
    console.log($addrContainer);
    instance.get("/address/all").then(function (response) {
        console.log(response.data);
        if (response.data.code == 0) {
            $addrContainer.html("");
            response.data.data.forEach(function (addrItem) {
                var addrItem = "<div id='addr-item-" + addrItem.id + "' class=' border  btn-light rounded ' style='cursor: pointer' onclick='generateOrder("+addrItem.id+")'>\n" +
                    "    <div class='row'>\n" +
                    "        <div class=' col-md-2  mt-2  text-left  font-weight-bold  align-items-center d-flex'>\n" +
                    "            <div class='ml-5 w-100'>\n" +
                    "                <i class='h4 fas fa-address-card vcenter '></i>\n" +
                    "            </div>\n" +
                    "        </div>\n" +
                    "        <div class='col-12 col-md-3 mt-2 text-left '>\n" +
                    "            <div>\n" +
                    "                姓名：\n" +
                    "                <input id='address-info-name-" + addrItem.id + "'\n" +
                    "                       class='form-control d-inline-block w-50 text-dark border-0'\n" +
                    "                       value='" + addrItem.name + "'\n" +
                    "                       disabled>\n" +
                    "                <!--sex-->\n" +
                    "                <div id='address-info-sex-" + addrItem.id + "' class=' badge badge-pill badge-secondary '>♀</div>\n" +
                    "            </div>\n" +
                    "            <div>\n" +
                    "                电话：\n" +
                    "                <input id='address-info-phone-" + addrItem.id + "' type='number' disabled\n" +
                    "                       class='h6 d-inline-block pr-2 mt-2 form-control w-50 border-0 text-dark'\n" +
                    "                       value='" + addrItem.phone + "'>\n" +
                    "            </div>\n" +
                    "        </div>\n" +
                    "        <div class='col-12 col-md-6  mt-2 pt-1  text-left  '>\n" +
                    "            <div id='dist-selector' data-toggle='distpicker' class='d-inline-block vcenter '>\n" +
                    "                <select id='province-selector-" + addrItem.id + "' data-province='" + addrItem.province + "'\n" +
                    "                        class='custom-select d-inline-block w-25' disabled='disabled'></select>\n" +
                    "                <select id='city-selector-" + addrItem.id + "' data-city='" + addrItem.city + "'\n" +
                    "                        class='custom-select d-inline-block w-25' disabled='disabled'></select>\n" +
                    "                <select id='district-selector-" + addrItem.id + "' data-district='" + addrItem.area + "'\n" +
                    "                        class='custom-select d-inline-block w-25' disabled='disabled'></select>\n" +
                    "            </div>\n" +
                    "            <div class='mt-2 ml-2'>\n" +
                    "                街道信息： <input id='address-info-detail-" + addrItem.id + "' type='text' class='form-control d-inline-block w-75 border-0' disabled\n" +
                    "                             value='" + addrItem.detail + "'>\n" +
                    "            </div>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "</div><hr>";
                $(addrItem).appendTo($addrContainer);
                $('[data-toggle="' + NAMESPACE + '"]').distpicker();
                $("[data-toggle='tooltip']").tooltip();
            });
        } else {
            simpleErrorInfo(response.data.desc);
        }
    }).catch(function (error) {
        console.log(error);
    });

}