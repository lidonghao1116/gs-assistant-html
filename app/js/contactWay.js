//状态
var contactPhone, qqOne, qqTwo, qqThree = null;

$(function () {

  getContactInfo();

  //热线
  $(".showHotLine").click(function () {
    var ish = $("#hotLineSetting").is(":hidden")
    var that = $(this);
    switchStatus(ish, that);
    $("#hotLine h3 a").triggerHandler("click");
  })
  //QQ
  $(".showQQ").click(function () {
    var ish = $("#qqSetting").is(":hidden")
    var that = $(this);
    switchStatus(ish, that);
    $("#QQ h3 a").triggerHandler("click");
  })
  //weChat
  $(".showQR").click(function () {
    var ish = $("#weChatSetting").is(":hidden")
    var that = $(this);
    switchStatus(ish, that);
    $("#weChat h3 a").triggerHandler("click");
  })
//返回收起
  $(".btnBack").click(function (e) {
    stopDefault(e);
    var that = $(this);
    removeFrame(that);
    //刷新页面
    getContactInfo();
  })
//  保存
  $(".btnSave").click(function (e) {
    stopDefault(e);
    var that = $(this)
    var ctn = that.parents(".contentBox");
    ctn.find(".inpQQ").trigger("blur");
    var id = ctn.attr("id");
    var status = ctn.find(".cm-validation").data("status")
    console.log(id);
    switch (id) {
      case "hotLineSetting":
        if (status == 1) {
          var isOpen = $("input[name='isOpenMobile']").val();
          var phone = $("input[name='contactPhone']").val();
          var params = {
            contactPhone: phone,
            isOpenMobile: isOpen
          }
          updateContactInfo(params);
          removeFrame(that);
        }
        break;
      case "qqSetting":
        if (qqOne && qqTwo && qqThree) {
          var params = {};
          params.isOpenQq = $("[name='isOpenQq']").val();
          params.isOpenQqOne = $("[name='isOpenQqOne']").val();
          params.isOpenQqTwo = $("[name='isOpenQqTwo']").val();
          params.isOpenQqThree = $("[name='isOpenQqThree']").val();
          params.qqOne = $("[name='qqOne']").val();
          params.qqTwo = $("[name='qqTwo']").val();
          params.qqThree = $("[name='qqThree']").val();
          console.log(params);
          updateContactInfo(params);
          removeFrame(that);
        }
        break;
      case "weChatSetting":
        var params = {};
        params.isOpenQrCode = $("[name='isOpenQrCode']").val();
        var qRcode = {qRcode: $(".qrImg").attr("src")};
        console.log(qRcode);
        if (qRcode.qRcode=="img/qr.png"){
          ctn.find(".cm-validation").text("请上传二维码");
          return;
        }else {
          ctn.find(".cm-validation").text("");
        }
        updateQrCode(qRcode, params);
        removeFrame(that);
        break;
      default:
        break;
    }

  })
  //展开收起
  $(".controlR .box h3 a").click(function (e) {
    stopDefault(e);
    var that = $(this);
    var id = $(this).attr('href');
    var showId = $($(that).data("id"));
    var _box = $(this).parents(".box");
    $(".contentBox").stop();
    _box.siblings("div").removeData("status").find("i").removeClass("down");
    if (_box.data("status") == "open") {
      removeFrame(that);
      //刷新页面
      getContactInfo();
    } else {
      addFrame(that, showId);
    }
  })

//				热线,QQ修改
  var regTel = /^[0-9 -]+$/;
  var regNum = /^[0-9]*$/;
  //失去焦点
  $(".cm-content").on("blur", ".inpQQ", function (event) {
    var cont = $(this).val();
    var className = $(this).parent("label").attr("class");
    var $this = $(this);
    switch (className) {
      case "contactPhone":
        if (cont == "") {
          onError($this, "服务热线不能为空！");
          contactPhone = false;
          return;
        } else if (!regTel.test(cont)) {
          onError($this, "请填写正确的服务热线！");
          contactPhone = false;
          return;
        } else {
          onSuccess($this);
          contactPhone = true;
        }
        break;
      case "qqOne":
        if (cont == "") {
          onError($this, "QQ不能为空！");
          qqOne = false;
          return;
        } else if (!regNum.test(cont)) {
          onError($this, "只能填写数字！");
          qqOne = false;
          return;
        } else {
          onSuccess($this);
          qqOne = true;
        }
        break;
      case "qqTwo":
        if (cont == "") {
          onError($this, "QQ不能为空！");
          qqTwo = false;
          return;
        } else if (!regNum.test(cont)) {
          onError($this, "只能填写数字！");
          qqTwo = false;
          return;
        } else {
          onSuccess($this);
          qqTwo = true;
        }
        break;
      case "qqThree":
        if (cont == "") {
          onError($this, "QQ不能为空！");
          qqThree = false;
          return;
        } else if (!regNum.test(cont)) {
          onError($this, "只能填写数字！");
          qqThree = false;
          return;
        } else {
          onSuccess($this);
          qqThree = true;
        }
        break;
      default:
        break;
    }
  });

  $(".cm-content").on("keydown", ".inpQQ", function (event) {
    if (event.keyCode == "13") {
      $(this).trigger("blur");
    }
  })

//				图片上传检查
  $("body").on("change", "input[name='qrCode']", function () {
    var limsize = 2;
    var _this = this;
    var file = _this.files[0];
    var objUrl = getObjectURL(this.files[0]);
    imgCheck(_this, limsize);
    if (objUrl) {
      var that = $(this).parents(".formRt").find('.qrImg');
      that.attr("src", "img/loading.gif")
      var formData = new FormData();
      formData.append('file', file);
      console.log("update");
      uploadImage(formData, that);
    }
    ;
    /*$("#weixin").ajaxSubmit({
     url: publicPath + "/api/website/uploadImg",
     type: "post",
     dataType: "json",
     async: false,
     success: function success(data) {
     if (data.success) {
     if (data.code == 0) {
     location.reload();
     console.log(data.msg);
     } else {
     console.log(data.msg);
     }
     } else {
     console.log(data.msg);
     }
     }
     });*/
  });

  $("body").on("change", "input[type='checkbox']", function () {
    if ($(this).is(':checked')) {
      $(this).val(1);
    } else {
      $(this).val(0);
    }
  })
});
//上传图片加载数据
function responseData(data, that) {
  console.log(data);
  var url = data.result.url;
  that.attr('src', url);
  // var showUrl=data.result.url+s374;
  // $("#showBanner img").data("url",showUrl);
}
//二维码更新
function updateQrCode(qrCode, params) {
  $.ajax({
    url: publicPath + "/api/website/uploadImg",
    type: "post",
    data: qrCode,
    dataType: "json",
    async: false,
    success: function success(data) {
      if (data.success) {
        console.log(data.msg);
        updateContactInfo(params);
      } else {
        console.log(data.msg);
      }
    }
  });
}

//更新热线
function updateContactInfo(params) {
  $.ajax({
    url: publicPath + "/api/website/updateContactInfo",
    type: "post",
    data: params,
    dataType: "json",
    async: false,
    success: function success(data) {
      if (data.success) {
        toast();
        getContactInfo()
        console.log(data.msg);
      } else {
        console.log(data.msg);
      }
    }
  });
}
//初始化信息
function getContactInfo() {
  $.ajax({
    url: publicPath + "/api/website/getContactInfo",
    type: "post",
    data: {},
    dataType: "json",
    success: function success(data) {
      if (data.success) {

        var dataJD = data.jsonData;
        console.log(dataJD.isOpenMobile);
        var ctn = $("#hotLineShow p");
        var noShow = $("#hotLineShow .noShow");
        var isOpenM = dataJD.isOpenMobile;
        if (dataJD.contactPhone != null) {
          isShow(ctn, noShow, isOpenM);
          $(".contactPhone input").val(dataJD.contactPhone);
          $("#hotLineShow .lineTel").text(dataJD.contactPhone);
        } else {
          isShow(ctn, noShow, isOpenM);
          $(".contactPhone input").val("000-0000 0000");
          $("#hotLineShow .lineTel").text("000-0000 0000");
        }
        if (dataJD.isOpenQq == 0) {
          $("#qqShow .qqLine").hide();
          $("#qqShow .noShow").show();
        } else {
          $("#qqShow .qqLine").show();
          $("#qqShow .noShow").hide();
          //判断是否上架
          if (dataJD.isOpenQqOne == 0) {
            $("#qq01 i").addClass("qq-grey");
          } else {
            $("#qq01 i").removeClass("qq-grey");
          }
          if (dataJD.isOpenQqTwo == 0) {
            $("#qq02 i").addClass("qq-grey");
          } else {
            $("#qq02 i").removeClass("qq-grey");
          }
          if (dataJD.isOpenQqThree == 0) {
            $("#qq03 i").addClass("qq-grey");
          } else {
            $("#qq03 i").removeClass("qq-grey");
          }
        }
        if (dataJD.qqOne != null) {
          $(".qqOne input").val(dataJD.qqOne);
        } else {
          $(".qqOne input").val("00000000");
        }
        if (dataJD.qqTwo != null) {
          $(".qqTwo input").val(dataJD.qqTwo);
        } else {
          $(".qqTwo input").val("00000000");
        }
        if (dataJD.qqThree != null) {
          $(".qqThree input").val(dataJD.qqThree);
        } else {
          $(".qqThree input").val("00000000");
        }
        if(dataJD.isOpenQrCode==0){
          $("#weChatShow").children("img").hide();
          $("#weChatShow").children(".noShow").show();
          if (dataJD.qrCode == "") {
            $(".wx-code").attr("src", "");
            $(".qrImg").attr("src", "img/qr.png");
          } else {
            $(".wx-code").attr("src", dataJD.qrCode);
          }
        }else {
          if (dataJD.qrCode == "") {
            $("#weChatShow").children("img").hide();
            $("#weChatShow").children(".noShow").show();
            $(".wx-code").attr("src", "");
            $(".qrImg").attr("src", "img/qr.png");
          } else {
            $("#weChatShow").children("img").show();
            $("#weChatShow").children(".noShow").hide();
            $(".wx-code").attr("src", dataJD.qrCode);
          }
        }


          isOpen(dataJD.isOpenMobile, "isOpenMobile");
          isOpen(dataJD.isOpenQq, "isOpenQq");
          isOpen(dataJD.isOpenQrCode, "isOpenQrCode");
          isOpen(dataJD.isOpenQqOne, "isOpenQqOne");
          isOpen(dataJD.isOpenQqTwo, "isOpenQqTwo");
          isOpen(dataJD.isOpenQqThree, "isOpenQqThree");
          console.log(dataJD.isOpenMobile);
          console.log(data.msg);
        //权限禁止点击
        console.log($(".contact_m").data("authority"));
        if ($(".contact_m").data("authority") == 0) {
          $("a").unbind();
          return;
        }
      } else {
        console.log(data.msg);
      }
    }
  });
};

function isShow(ctn, noShow, isOpen) {
  if (isOpen == 0) {
    ctn.hide();
    noShow.show();
  } else {
    ctn.show();
    noShow.hide();
  }
}

function isOpen(data, name) {
  data == 1 ? $("input[name='" + name + "']").prop("checked", true).val(1)
      : $("input[name='" + name + "']").prop("checked", false).val(0);

}

