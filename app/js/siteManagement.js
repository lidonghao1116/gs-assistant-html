var s1100 = "_1100x380";
var s750 = "_750x260";
var s620 = "_620x214";
var s374 = "_374x130";


$(function () {
  // gainStaffRecommend();

//返回收起
  $(".btnBack").click(function (e) {
    stopDefault(e);
    console.log("back");
    var that = $(this);
    removeFrame(that);
  })
//  保存
  /* $(".btnSave").click(function (e) {
   stopDefault(e);
   var that=$(this);

   removeFrame(that);
   })*/
//选择工种

  //collapse
  $(".controlR .box h3 a").click(function (e) {
    console.log("collapse")
    stopDefault(e);
    var that = $(this);
    var id = $(this).attr('href');
    var showId = $($(that).data("id"));
    console.log(showId);
    var _box = $(this).parents(".box");
    $(".contentBox").stop();
    _box.siblings("div").removeData("status").find("i").removeClass("down");
    if (_box.data("status") == "open") {
      removeFrame(that);
    } else {
      addFrame(that, showId);
    }
  })

/*//				Banner配置保存
  $("body").on('click',".save-es",function (e) {

  });*/
 /* //取消按钮
  $("body").on('click','.shangjia_alert .sj_cancel,.oi-title a',function () {
    $(this).parents(".shangjia_alert").hide();
    $("#layer").hide();
    return;
  })*/
  //确定按钮
/*
  $("body").on("click",".shangjia_alert .sj_ok",function () {
    console.log("ok");
    // console.log($(this).data("id"));
    // removeFrame(that);
  })
*/

  $("body").on("click", ".edit", function () {
    $(this).hide();
    $(".edit-sel,.upload-sel").show();
    $(".pic-manage input[type='radio']").removeProp("disabled");
    $(".pic-manage input[type='radio']").each(function () {
      var checked = $(this).parents(".pic-manage").find(".custom").prop("checked");
      if (checked) {
        $(this).parent().siblings(".upload-sel").children("a").css({
          "background-color": "#0A7EE3",
          "cursor": "pointer"
        }).children().css("cursor", "pointer").removeAttr("disabled");
        $(this).parent().siblings(".limit").css("color", "#333333").children("i").css("color", "#FF411B");
      } else {
        $(this).parent().siblings(".upload-sel").children("a").css({
          "background-color": "#DBDBDB",
          "cursor": "default"
        }).children().css("cursor", "default").attr("disabled", "disabled");
        $(this).parent().siblings(".limit").css("color", "#DBDBDB").children("i").css("color", "#DBDBDB");
      }
      ;
    })
  });

  $("body").on("click", ".cancel-es", function () {
    $(".edit-sel,.upload-sel").hide();
    $(".edit").show();
    $(".pic-manage .limit").css("color", "#333333");
    $(".pic-manage .limit i").css("color", "#FF411B");
    $(".pic-manage input[type='radio']").prop("disabled", "disabled");
  });


/*  $(".ca-inquiry .b-btn").click(function () {

  });*/

  /*$(".ca-inquiry input").keydown(function (event) {
    if (event.keyCode == "13") {
      $(".ca-inquiry .b-btn").trigger("click");
    }
  })*/
  $("body").on("click", ".changeAunt .cancel-ca", function () {
    $("#layer,.changeAunt").hide();
  });
});
function chkData(name, self) {
  //				表单验证
  var regChar = /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/;				//特殊字符
  var regNum = /^[0-9]*$/;
  switch (name) {
    case "servicePrice":
      if (!regNum.test(self.val())) {
        onError('请填写数字', self);
      } else if (self.val() == "") {
        onError('不能为空', self);
      } else {
        onSuccess(self);
      }
      break;
    case "serviceDesc":
      if (self.val() == "") {
        onError('不能为空', self);
      } else {
        onSuccess(self);
      }
      break;
    case "serviceObject":
      if (self.val() == "") {
        onError('不能为空', self);
      } else {
        onSuccess(self);
      }
      break;
    case "serviceContent":
      if (self.val() == "") {
        onError('不能为空', self, "txt");
      } else {
        onSuccess(self);
      }
      break;
    default:
      break;
  }
}

function onError(msg, self, txt) {
  console.log(txt)
  if (self.nextAll().hasClass('validation') || self.nextAll().hasClass('validationTxt')) {
    self.nextAll('.validation,.validationTxt').text(msg);
    return;
  }
  if (txt == "txt") {
    self.parent().append("<span class='validationTxt'>" + msg + "</span>");
  } else {
    self.parent().append("<span class='validation'>" + msg + "</span>");
  }
}

function onSuccess(self) {
  self.nextAll('.validation,.validationTxt').remove();
}
//上传banner图片
/*function responseData(data, that) {
  if (data.status == 0) {
    if (that.hasClass("imgCustom")) {
      var url = data.result.url + s374;
      that.attr('src', url)
      $("[name='bannerPath']").val(url);
    } else if (that.hasClass("jobImg")) {
      var url = data.result.url;
      that.attr('src', url)
    }
    console.log(data)
    // var url = data.result.url+s620;

    // $("#showBanner img").data("url", showUrl);

  } else {
    console.log(data.message);
  }
}*/
//模糊查询
function caInquiry() {
  var staffName = $(".ca-inquiry").find("input[type='text']").val();
//					总页数查询
  $.ajax({
    url: publicPath + "/api/staffs/staffsInfoLike",
    type: "post",
    data: {staffName: staffName},
    dataType: "json",
    success: function success(data) {
      if (data.success) {
        if (data.code == 0) {
          var dataJD = data.jsonData;
          paginationL(dataJD.records);
          console.log(data.msg);
        } else {
          console.log(data.msg);
        }
      } else {
        console.log(data.msg);
      }
    }
  });
}
//			分页
var pageNumber = 1;
var pageSize = 3;

function pagination(records) {
  $("#pagination").siblings(".records").children().text(records);
  $("#pagination").pagination(records, {
    num_edge_entries: 1,
    num_display_entries: 4,
    current_page: pageNumber - 1,
    items_per_page: pageSize,
    prev_text: "上一页",
    next_text: "下一页",
    callback: staffsInfo
  });
}
;

function staffsInfo(page_index) {
  var pageNumber = page_index + 1;
  $.ajax({
    url: publicPath + "/api/staffs/staffsInfo",
    type: "post",
    data: {pageNumber: pageNumber, pageSize: pageSize},
    dataType: "json",
    success: function success(data) {
      if (data.success) {
        if (data.code == 0) {
          var dataJD = data.jsonData.rows;
          var html = "";
          $.each(dataJD, function (i, item) {
            var workStatus = "";
            if (item.workStatus == "待聘") {
              workStatus = "空闲";
            } else {
              workStatus = item.workStatus;
            }
            html += "<tr>" +
                "<td><input type='radio' name='aunt' value='" + item.staffId + "'></td>" +
                "<td><img src='" + item.headImage + "'></td>" +
                "<td>" + item.staffName + "</td>" +
                "<td>" + item.baseInfo + "</td>" +
                "<td>" + item.educarion + "</td>" +
                "<td>" + item.serviceType + "</td>" +
                "<td>" + workStatus + "</td>" +
                "</tr>";
          });
          $(".changeAunt_m tbody").html(html);
          console.log(data.msg);
        } else {
          console.log(data.msg);
        }
      } else {
        console.log(data.msg);
      }
    }
  });
}
;

//			模糊查询分页
function paginationL(records) {
  $("#pagination").pagination(records, {
    num_edge_entries: 1,
    num_display_entries: 4,
    current_page: pageNumber - 1,
    items_per_page: pageSize,
    prev_text: "上一页",
    next_text: "下一页",
    callback: staffsInfoLike
  });
}
;

function staffsInfoLike(page_indexL) {
  var pageNumber = page_indexL + 1;
  var staffName = $(".ca-inquiry").find("input[type='text']").val();
  $(".changeAunt_m tbody").empty();
  $.ajax({
    url: publicPath + "/api/staffs/staffsInfoLike",
    type: "post",
    data: {pageNumber: pageNumber, pageSize: pageSize, staffName: staffName},
    dataType: "json",
    success: function success(data) {
      if (data.success) {
        if (data.code == 0) {
          var dataJD = data.jsonData.rows;
          var html = "";
          $.each(dataJD, function (i, item) {
            var workStatus = "";
            if (item.workStatus == "待聘") {
              workStatus = "空闲";
            } else {
              workStatus = item.workStatus;
            }
            html += "<tr>" +
                "<td><input type='radio' name='aunt' value='"+item.staffId+"'></td>" +
                "<td><img src='" + item.headImage + "'></td>" +
                "<td>" + item.staffName + "</td>" +
                "<td>" + item.baseInfo + "</td>" +
                "<td>" + item.educarion + "</td>" +
                "<td>" + item.serviceType + "</td>" +
                "<td>" + workStatus + "</td>" +
                "</tr>";
            $(".changeAunt_m tbody").html(html);
          });
          console.log(data.msg);
        } else {
          console.log(data.msg);
        }
      } else {
        console.log(data.msg);
      }
    }
  });
}
;
//			获取banner信息
/*function getBannerInfo() {
  $.ajax({
    url: publicPath + "/api/banner/getBannerInfo",
    type: "post",
    data: {},
    dataType: "json",
    success: function success(data) {
      if (data.success) {
        if (data.code == 0) {
          var dataJD = data.jsonData;
          if (dataJD.bannerUrl == "") {
            $("#imgCustom").hide();
            $("#imgDefault").show();
            $("#showBanner img").attr("src", "img/siteManagement/banner.png");
          } else {
            if (dataJD.isDefault == 0) {
              $("#imgCustom").hide();
              $("#imgDefault").show();
              $("#showBanner img").attr("src", "img/siteManagement/banner.png")
              $("#imgCustom").attr("src", dataJD.bannerUrl)
            } else {
              $("#imgCustom").show();
              $("#imgDefault").hide();
              $("#showBanner img").attr("src", dataJD.bannerUrl)
              $("#imgCustom").attr("src", dataJD.bannerUrl)
            }
          }
          if (dataJD.isDefault == 0) {
            $(".pic-manage .default").prop("checked", true);

          } else {
            $(".pic-manage .limit").addClass("limCust")
            $(".pic-manage .custom").prop("checked", true);
          }
          console.log(data.msg);
        } else {
          console.log(data.msg);
        }
      } else {
        console.log(data.msg);
      }
    }
  });
}*/
;

/*
function isSave(that) {
  $("#layer,.shangjia_alert").show();
}
*/


