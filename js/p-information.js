$(function () {
    $(document).on("click", ".edit-info-btn", function () {
        var $this = $(this);
        //var itemId = $this.attr("data-target-addr-id");
        var targetSelector = "#store-info-form:input"

        if ($this.hasClass(".editing")) {
            // update addr
            $(targetSelector).each(function (index, ele) {
                console.log(index);
                console.log(ele);
                $(ele).attr("disabled", "disabled");
            });
            $this.removeClass(".editing");
            $this.children("img").attr("src", "../img/common/modify.png");
            $this.children("img").attr("data-original-title", "修改information");
        } else {
            $this.addClass(".editing");
            $(targetSelector).each(function (index, ele) {
                console.log(index);
                console.log(ele);
                // important
                $(ele).removeAttr("disabled");
            });
            $this.children("img").attr("src", "../img/common/save.png");
            $this.children("img").attr("data-original-title", "保存information");

        }
        $this.removeAttr("disabled");
    })
})
