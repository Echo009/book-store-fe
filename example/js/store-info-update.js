
if ($this.hasclass('.editing'))
$("#store-info-form :input").each(function (index,ele) {

    $(ele).removeAttr("disabled");
})

for( index = 0 ; index < arr.length ; index++ ){
    ele = arr[index];
    ele.removeAttr("disabled");
}