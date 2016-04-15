// codepen 没办法直接在 body 标签加属性，所以用这里用 js 给 body 添加 ontouchstart 属性来触发 :active
//document.body.setAttribute('ontouchstart', '');

$(function () {
    $('.container').on('click', '#btnAlert', function (e) {
        $.weui.alert('警告你', function () {
            console.log('知道了...');
        });
    }).on('click', '#btnConfirm', function (e) {
        $.weui.confirm('确认删除吗？', function () {
            console.log('删除了...');
        }, function () {
            console.log('不删除...');
        });
    }).on('click', '#btnDialog', function (e) {
        $.weui.dialog({
            title: '自定义标题',
            content: '自定义内容',
            buttons: [{
                label: '知道了',
                type: 'default',
                onClick: function () {
                    console.log('知道了......');
                }
            }, {
                label: '好的',
                type: 'primary',
                onClick: function () {
                    console.log('好的......');
                }
            }]
        });
    }).on('click', '#btnToast', function (e) {
        $.weui.toast('已完成');
    }).on('click', '#btnLoading', function (e) {
        $.weui.loading('数据加载中...');
        setTimeout($.weui.hideLoading, 3000);
    }).on('click', '#btnTopTips', function (e) {
        $.weui.topTips('格式不对');
    }).on('click', '#btnActionSheet', function (e) {
        $.weui.actionSheet([{
            label: '示例菜单',
            onClick: function () {
                console.log('click1');
            }
        }, {
            label: '示例菜单',
            onClick: function () {
                console.log('click2');
            }
        }, {
            label: '示例菜单',
            onClick: function () {
                console.log('click3');
            }
        }]);
    });

    $('#uploader').uploader({
        maxCount: 4,
        onChange: function (file) {
            var update = this.update;
            var success = this.success;
            var error = this.error;
            $.ajax({
                type: 'POST',
                url: '/api/v1/upload?format=base64',
                data: {
                    data: file.data
                },
                xhr: function() {
                    var xhr = new window.XMLHttpRequest();
                    xhr.addEventListener('progress', function(evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                            update(percentComplete + '%');
                        }
                    }, false);
                    return xhr;
                },
                success: function(res){
                    success();
                },
                error: function (err){
                    error();
                }
            });
        }
                            
    });
  
    // 为表单加入检测功能：当required的元素blur时校验，并弹出错误提示
    var $form = $("#form");
    $form.form();

    // 表单校验
    $("#formSubmitBtn").on("click", function(){
        $form.validate();
        // $form.validate(function(error){ console.log(error);}); // error: {$dom:[$Object], msg:[String]}
    });

    // tab
    $('.weui_tab').tab();
  
    $(".weui_navbar div").bind("click", function(){

                           $(".weui_bar_item_on").removeClass('weui_bar_item_on');
                           //console.log($(this).find("a"));
                           $(this).addClass("weui_bar_item_on");
                           
                           //alert($(this).attr("id"));
                               
                            if ($(this).attr("id")=="navbar_item5") {
                               
                               getData($(this).attr("id"));
                            }
                           
    });
  
  
});

function getData(data){
    //$msg = $('.weui_navbar_item').eq(4).attr("id");
    
    var $itemInfo;
    var $actionInfo;
   // alert($msg)
    switch (data) {
        case 'navbar_item5':
            $itemInfo = "#item_5";
            $actionInfo = "pageOne";
            break;
        default:
            
    }
    
    //清除
    $($itemInfo).html("");
    
    $baseUrl = "../api/index.php?action=";
    $url = $baseUrl+$actionInfo+"&data=1";
    //插入
    $.getJSON($url ,"",function(json){
              
              $.each(json,function(i){
                     
                     //$($itemInfo).append("<li>name:"+json[i].post_title+"</li>");
                     //图片地址
                     var imgUrl = JSON.parse(json[i].smeta);
                     var BaseImgUrl= "../thinkcmfx2.1.0/data/upload/";
                     imgUrl  = BaseImgUrl+ imgUrl.thumb;
                     
                     $($itemInfo).append("<a href=\"./article_detail.html?postid="+json[i].id+"\" class=\"weui_media_box weui_media_appmsg\"><div class=\"weui_media_hd\"><img class=\"weui_media_appmsg_thumb\" src=\""+imgUrl+"\" alt=\"\"></div><div class=\"weui_media_bd\"><h4 class=\"weui_media_title\">"+json[i].post_title+"</h4><p class=\"weui_media_desc\">"+json[i].post_excerpt+"</p></div></a>");
                     
                     })
              
              
              })

}

