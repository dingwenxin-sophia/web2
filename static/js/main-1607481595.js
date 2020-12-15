"use strict"

//tips
var sweetTitles = {
	x: 10,
	y: 20,
	tipElements: "a,span,img,div,button",
	noTitle: false,
	init: function() {
		var b = this.noTitle;
		$(this.tipElements).each(function() {
			$(this).mouseover(function(e) {
				if (b) {
					var isTitle = true
				} else {
					var isTitle = $.trim(this.title) != ''
				}
				if (isTitle) {
					this.myTitle = this.title;
					this.title = "";
					var a = "<div class='tooltip'><div class='tipsy-arrow tipsy-arrow-n'></div><div class='tipsy-inner'>" + this.myTitle + "</div></div>";
					$('body').append(a);
					$('.tooltip').css({
						"top": (e.pageY + 20) + "px",
						"left": (e.pageX - 20) + "px"
					}).show('fast')
				}
			}).mouseout(function() {
				if (this.myTitle != null) {
					this.title = this.myTitle;
					$('.tooltip').remove()
				}
			}).mousemove(function(e) {
				$('.tooltip').css({
					"top": (e.pageY + 20) + "px",
					"left": (e.pageX - 20) + "px"
				})
			})
		})
	}
};
// 获取站内信
function getMsg() {
    if ($('body').attr('data-auth') == 'is_auth') {
        $.ajax({
            type: "get",
            url: "/api/msg/list",
            success: function (res) {
                console.log(res);

                if (res) {
                    var total = res['data']['total'] ? res['data']['total'] : 0;
                    if (total) {
                        $('#UserMsg').append(
                            ' <a href="/user/messages"><i class="fa fa-envelope-o fa-fw"></i> <span class="text-warning">' +
                            total + '</span></a>');
                    }
                } else {
                    layer.msg('获取站内信失败');
                }
            }
        });
    }
}
$(function () {
    getMsg();
});

// 获取页面get参数
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
// 加载默认错误图
function imgerrorfun() {
    var img = event.srcElement;
    img.src = "/static/images/user_default.png";
    img.onerror = null;
}
// 鼠标悬浮图片放大显示
function hoverOpenImg() {
    var img_show = null;
    $('.support_content .fa').hover(function () {
        var img = "<img class='img_msg' src='" + $(this).attr('file-url') + "' style='width:130px;' />";
        img_show = layer.tips(img, this, {
            tips: [2, 'rgba(41,41,41,.5)'],
            area: ['160px']
        });
    }, function () {
        layer.close(img_show);
    });
    $('.support_content .fa').click(function () {
        layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            area: $(window).width() > 900 ? '50%' : '90%',
            skin: 'layui-layer-nobg',
            shadeClose: true,
            content: "<img class='img_msg' src='" + $(this).attr('file-url') +
                "' style='width:100%;height:100%;'/>"
        });
    });
}