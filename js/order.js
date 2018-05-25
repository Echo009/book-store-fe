/**
 * Author : Ech0
 * Email  : ech0.extreme@foxmail.com
 * Time   : 05/24/2018 04:34 PM
 */



function generateOrder(addressId) {
    var carts = new Array();
    $(":checked").each(function (index,ele) {
        if((typeof $(ele).attr("data-target-cart-id"))!="undefined"){
            var cartId =  $(ele).attr("data-target-cart-id")-0;
            console.log(cartId);
            carts.push(cartId);
        }
    })
    const params = new URLSearchParams();
    params.append("addressId", addressId);
    params.append("cartIdList", JSON.stringify(carts));
    instance.post("/order/generate", params).then(function (response) {
        console.log(response.data.desc);
        if (response.data.code == 0) {
            simpleSuccessInfo(" 下单成功 !");
            $("#select-address-modal").modal('hide');
            setTimeout(function () {
                document.location.reload() ;
            },500)
            return true;
        } else {
            simpleErrorInfo(response.data.desc);
            return false;
        }
    }).catch(function (error) {
        console.log(error);
    });
}