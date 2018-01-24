//阻止默认事件
function stopDefault(e) {
  if (e && e.preventDefault) {
    e.preventDefault(); //阻止默认浏览器动作(W3C)
  } else {
    window.event.returnValue = false; //IE中阻止函数器默认动作的方式
  }
  return false;
}

function switchStatus(ishidden, that) {
  if (ishidden) {
    that.addClass("frameActive").parents(".showL").find(".frameActive").not(that).removeClass("frameActive");
  } else {
    $(".frameActive").removeClass("frameActive");
  }
}
//单选框交互
/*$("body").on("change", ".rdoBase", function () {
  console.log("checked");
  var checked = $(this).parents(".rdoGroup").find(".custom").prop("checked");
  var isPic=$(this).parents(".rdoGroup").hasClass("pic-manage");
  console.log("isPic"+isPic);
  if(isPic){
    if (checked){
      $("#imgCustom").show();
      $("#imgDefault").hide();
    }else {
      $("#imgCustom").hide();
      $("#imgDefault").show();
    }
  }
  console.log(checked);
  if (checked) {
    $(this).parents(".rdoGroup").find(".limit").addClass("limCust").find("input").removeAttr("disabled");
  } else {
    $(this).parents(".rdoGroup").find(".limit").removeClass("limCust").find("input").attr("disabled", "disabled")
  };
});*/


//关闭选择控件
function removeFrame(that) {
  that.parents(".box").removeData("status").find("i").removeClass("down").parents(".box").siblings(".box").show();
  $(".contentBox").slideUp();
  $(".showL").find(".frameActive").removeClass("frameActive");
  $(".cm-validation").text("");
  // window.location.reload();
}
//打开选择控件
function addFrame(that, showId) {
  var id = that.attr('href');
  showId.addClass("frameActive").parents(".showL").find(".frameActive").not(showId).removeClass("frameActive");
  that.parents(".box").show().data("status", "open").find("i").addClass("down").parents(".box").siblings(".box").hide();
  $(id).slideDown().parents(".box").siblings().children(".contentBox").slideUp();
}


//获取路径
function getObjectURL(file) {
  var url = null;
  if (window.createObjectURL != undefined) { // basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) { // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}

//出错提示
function onError(that, txt) {
  that.parents("label").siblings(".cm-validation").html(txt).data("status", "0");
}
//成功提示
function onSuccess(that) {
  that.parents("label").siblings(".cm-validation").html("").data("status", "1");
}

//检查图片
function imgCheck(that, limsize) {
  var fileSize = that.files[0].size;
  var size = fileSize / (1024*1024);
  var filepath = $(that).val();
  var ls=limsize||2;
  var extStart = filepath.lastIndexOf(".");
  var ext = filepath.substring(extStart, filepath.length).toUpperCase();
  if (ext != ".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG") {
    alert("图片限于bmp,png,gif,jpeg,jpg格式");
    $(that).val("");
    return;
  }
  if (size > ls) {
    alert("上传的图片大小不能超过" + ls + "M！");
    $(that).val("");
    return;
  }
  ;
}


function uploadImage(formData, that) {
  $.ajax({
    url: "http://test.jiacersxy.com:8000/image/upload",
    type: "post",
    data: formData,
    async: false,
    cache: false,
    contentType: false,
    processData: false,
    success: function success(data) {
      if (data.status == 0) {
        responseData(data,that);
        // console.log(data)
        // var url = data.result.url;
        // var showUrl=data.result.url+s374;
        // $("#showBanner img").data("url",showUrl);

      } else {
        console.log(data.message);
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
}
function fomateValue(value) {
  value=value=="0"?false:true;
  return value;
}

function backFomateValue(value) {
  value=value==false?"0":"1";
  return value;
}