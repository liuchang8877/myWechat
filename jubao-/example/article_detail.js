// codepen 没办法直接在 body 标签加属性，所以用这里用 js 给 body 添加 ontouchstart 属性来触发 :active
//document.body.setAttribute('ontouchstart', '');

$(function () {

  //调用
  var showValue = getURLParameter("postid");
  //alert(showValue);
  
  var baseUrl = "../api/index.php?action=getPageById&data=";
  var url = baseUrl+showValue;
  
  $.getJSON(url ,"",function(json){
            
                    var last=JSON.stringify(json);
            
                alert(last);
            
            })
  
});

//通过准则表达式来获取对用的值
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;}
