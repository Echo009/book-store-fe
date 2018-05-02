$(function () {
    $(document).on("click", ".edit-info-btn", function () {
        var $this = $(this);
        //var itemId = $this.attr("data-target-addr-id");
        var targetSelector = "#store-info-form :input"

        if ($this.hasClass(".editing")) {
            // update addr
            $(targetSelector).each(function (index, ele) {
                console.log(index);
                console.log(ele);
                $(ele).attr("disabled", "disabled");
            });
            $this.removeClass(".editing");
            $this.attr("src", "../img/common/modify.png");
            $this.attr("data-original-title", "update information");
        } else {
            $this.addClass(".editing");
            $(targetSelector).each(function (index, ele) {
                console.log(index);
                console.log(ele);
                // important
                $(ele).removeAttr("disabled");
            });
            $this.attr("src", "../img/common/save.png");
            $this.attr("data-original-title", "save information");

        }
        $this.removeAttr("disabled");
    })
})
