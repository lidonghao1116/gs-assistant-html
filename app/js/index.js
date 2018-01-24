//	路径

var publicPath="http://"+window.location.host+"/fbeeConsole_web";
function height(){
	var dh = $(document).height()-88;
	$(".naviLeft").css("height",dh);
}
var  publicPathSP = "";
var local = window.location.host;
	if(local.indexOf("hfw.jiacersxy.com")!=-1||local.indexOf("ysc-b.jiacer.com")!=-1){
		publicPathSP = "http://test.jiacersxy.com:8000";
	}else if(local.indexOf("b.jiacer.com")!=-1){
		publicPathSP = "http://common.jiacedu.com";
	}
////订阅消息
//var goEasy = new GoEasy({
//	appkey: 'd99a96c2-09c3-4eee-97be-13d4b0044662'
//});
////订阅消息
////订单通知
//goEasy.subscribe({
//	channel: 'orderNotice',
//	onMessage: function(message){
//		alert('收到：'+message.content);
//	}
//});
//
////				投递箱通知
//goEasy.subscribe({
//	channel: 'boxNotice',
//	onMessage: function(message){
//		alert('收到：'+message.content);
//	}
//});
//
////				通过通知
//goEasy.subscribe({
//	channel: 'passNotice',
//	onMessage: function(message){
//		alert('收到：'+message.content);
//	}
//});
//
////				拒绝通知
//goEasy.subscribe({
//	channel: 'rejectNotice',
//	onMessage: function(message){
//		alert('收到：'+message.content);
//	}
//});
//
////				退回通知
//goEasy.subscribe({
//	channel: 'returnNotice',
//	onMessage: function(message){
//		alert('收到：'+message.content);
//	}
//});

var toast = function(){
	$(document.body).append("<div id='toast'>保存成功</div>");
	setTimeout("$('#toast').remove()",3000);
};
var toast_tip = function(msg){
	$(document.body).append("<div class='toast'>"+msg+"</div>");
        setTimeout(function(){
            $('.toast').remove();	
        },2000);
}
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//			区域选择
function serviceProvice(){
	$.ajax({
        url: publicPath+"/api/common/getAreaData/c001",
        type: "post",
        data: {},
        dataType: "json",
        async:false,
        success: function success(data) {
            if(data.success){
                if(data.code == 0){
                	var dataJD = data.jsonData;
                	var html = "";
                	$.each(dataJD, function(i,item) {
                		html += "<option data-parentCode='"+item.parentCode+"' data-areaLevel='"+item.areaLevel+"' value='"+item.areaCode+"'>"+item.areaName+"</option>";
                	});
                	$("select[name='serviceProvice']").html("<option value=''>请选择</option>"+html);
                	console.log(data.msg);
                }else{
                    console.log(data.msg);
                }
            }else{
                console.log(data.msg);
            }
        }
    });
}

function serviceCity(pcode){
	$.ajax({
        url: publicPath+"/api/common/getAreaData/c002",
        type: "post",
        data: {pcode:pcode},
        dataType: "json",
        success: function success(data) {
            if(data.success){
                if(data.code == 0){
                	var dataJD = data.jsonData;
                	var html = "";
                	$.each(dataJD, function(i,item) {
                		html += "<option data-parentCode='"+item.parentCode+"' data-areaLevel='"+item.areaLevel+"' value='"+item.areaCode+"'>"+item.areaName+"</option>";
                	});
                	$("select[name='serviceCity']").html("<option value=''>请选择</option>"+html);
                	console.log(data.msg);
                }else{
                    console.log(data.msg);
                }
            }else{
                console.log(data.msg);
            }
        }
    });
}

function serviceCounty(pcode){
	$.ajax({
        url: publicPath+"/api/common/getAreaData/c003",
        type: "post",
        data: {pcode:pcode},
        dataType: "json",
        success: function success(data) {
            if(data.success){
                if(data.code == 0){
                	var dataJD = data.jsonData;
                	var html = "";
                	$.each(dataJD, function(i,item) {
                		html += "<option data-parentCode='"+item.parentCode+"' data-areaLevel='"+item.areaLevel+"' value='"+item.areaCode+"'>"+item.areaName+"</option>";
                	});
                	$("select[name='serviceCounty']").html("<option value=''>请选择</option>"+html);
                	console.log(data.msg);
                }else{
                    console.log(data.msg);
                }
            }else{
                console.log(data.msg);
            }
        }
    });
}

//下拉选择框
function pullDown(lurl,name){
	if($("select[name='"+name+"']").length<1)return ;
	$.ajax({
        url: publicPath+"/api/common/getDictionaryData/"+lurl,
        type: "post",
        data: {},
        dataType: "json",
        success: function success(data) {
            if(data.success){
                if(data.code == 0){
                	var dataJD = data.jsonData;
                	var html = "";
                	$.each(dataJD, function(i,item) {
                		if (lurl=="c007"){
                			var name="";
                			if (item.name=="0,1"){
                				name="一年以下";
                			} else if (item.name=="1,2") {
                				name="1-2年";
                			} else if (item.name=="3,5") {
                				name="3-5年";
                			} else if (item.name=="5,") {
                				name="5年以上";
                			}
                			html += "<option value='"+item.code+"'>"+name+"</option>";
                		} else if (lurl=="c008") {
                			var name="";
                			if (item.name=="0,29"){
                				name="29岁以下";
                			} else if (item.name=="29,39") {
                				name="29-39岁";
                			} else if (item.name=="39,49") {
                				name="39-49岁";
                			} else if (item.name=="50,") {
                				name="50岁以上";
                			}
                			html += "<option value='"+item.code+"'>"+name+"</option>";
                		} else{
                			html += "<option value='"+item.code+"'>"+item.name+"</option>";
                		}
                	});
                	$("select[name='"+name+"']").html("<option value=''>请选择</option>"+html);
                	console.log(data.msg);
                }else{
                    console.log(data.msg);
                }
            }else{
                console.log(data.msg);
            }
        }
    });
}

//金额千位分隔
function RetainedDecimalPlaces(num) {
　　num = parseFloat(num).toFixed(2);
　　var source = String(num).split(".");
　　source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
　　return source.join(".");
};

$(function(){
//	登录账户名
//	var userName=localStorage.getItem("loginAccount");
//	if (userName!="") {
//		$(".account .login").text("<a>欢迎您,"+userName+"</a>")
//	};
	$("title").html("您身边的，家政好帮手");

	setTimeout("height()",100);

//	登录状态
	$.ajax({
        url: publicPath+"/api/index/getSession.do",
        type: "post",
        data: {},
        dataType: "json",
        success: function success(data) {
            if(data.success){
                if(data.code == 0){
					var dataJD = data.jsonData;
					var html="";
                	if (dataJD == null) {
						html="<li class='login'><a href='login.html'>登录</a></li>";
                		location.href="login.html";
                	} else{
						html="<li class='login'><a data-userid='"+dataJD.userId+"'>欢迎您,"+dataJD.userName+"</a><input type='hidden' name='' id='userId' value='"+dataJD.userId+"' /></li>"+
							 "<li class='xitong'><a>系统管理</a></li>"+
							  "<li class='loginOut'><a>退出</a></li>";
								if(dataJD.userType=="01"||dataJD.userType=="02"){
									$(".my_account_box").show();
								}else {
									$(".my_account_box").hide();
								}
							}
					$(".account ul").html(html);
                	console.log(data.msg);
                }else{
                    console.log(data.msg);
                }
            }else{
                console.log(data.msg);
            }
        }
    });



//	权限

	$.ajax({
        url: publicPath+"/api/user/getUserPermission",
        type: "post",
        data: {},
        dataType: "json",
        success: function success(data) {
            if(data.success){
                if(data.code == 0){
                	var navi = "";
                	$.each(data.jsonData, function(i,item) {
                		navi+="<li><a href='"+item.href+"'>"+item.name+"</a></li>";
                	});
                	$(".navigator ul").html(navi);
                	var Url = location.href;
            		if (Url.indexOf("index")!=-1||Url.indexOf("deposit")!=-1||Url.indexOf("withdraw")!=-1) {
            			$(".navigator ul li").eq(0).children().addClass("navi-on");
            		} else if (Url.indexOf("homeManagement")!=-1||Url.indexOf("contactWay")!=-1||Url.indexOf("aboutUs")!=-1||Url.indexOf("serviceManagement")!=-1) {
            			$(".navigator ul li").eq(1).children().addClass("navi-on");
            			var naviLeft1 = data.jsonData[1].subMenuList;
						$(".naviLeft ul").empty();
						for (var i=0;i<naviLeft1.length;i++) {
							if (naviLeft1[i].name=="two_module_power") {
								var hmAuthority = naviLeft1[i].subMenuList;
								var hmAA = [];
								$.each(hmAuthority, function(j,item) {
									hmAA.push(item.id);
								});
								if ($.inArray(13,hmAA)!=-1) {
									$(".jobRecruitment").find(".qu_left").prepend("<a class='addPost' href='recruitManagementEdit.html'>+ 新增岗位</a>")
								}
								if ($.inArray(14,hmAA)!=-1) {
									$("#banner_m .clearfix .title").after("<a class='edit'></a>");
									$(".recommend_m").attr("data-authority",1);
									$("#accordion").attr("data-authority",1);
									sessionStorage.setItem("siteAuth",1);
									$(".serviceWork table").attr("data-authority",1);
									$(".contact_m").attr("data-authority",1);
									$(".jobRecruitment table").attr("data-authority",1);
									$(".au-list").siblings(".clearfix").append("<a class='edit'></a>")
								}
								continue;
							}
							$(".naviLeft ul").append("<li><a href='"+naviLeft1[i].href+"'><em></em>"+naviLeft1[i].name+"</a></li>")
						}
						$(".naviLeft ul li").each(function(){
							if ($(this).index()==0) {
								$(this).children("a").addClass("sygl");
							} else if ($(this).index()==1) {
								$(this).children("a").addClass("fwgl");
							} else if ($(this).index()==2) {
								$(this).children("a").addClass("lxfs");
							}  else if ($(this).index()==3) {
								$(this).children("a").addClass("gywm");
							}
						})

            			var UrlLeft = location.href;
            			if (UrlLeft.indexOf("homeManagement")!=-1) {
            				$(".naviLeft li").eq(0).addClass("nl_on");
            			} else if (UrlLeft.indexOf("contactWay")!=-1) {
            				$(".naviLeft li").eq(1).addClass("nl_on");
            			}/*else if (UrlLeft.indexOf("recruitManagement")!=-1) {
                    $(".naviLeft li").eq(2).addClass("nl_on");
                  }*/

            		} else if (Url.indexOf("housekeepingStaffManagement")!=-1||Url.indexOf("addHousekeepingStaff")!=-1) {
            			$(".navigator ul li").eq(2).children().addClass("navi-on");
            			var hkAuthority = data.jsonData[2].subMenuList[0].subMenuList;
            			var hkAA = [];
						$.each(hkAuthority, function(i,item) {
							hkAA.push(item.id);
						});
						if ($.inArray(15,hkAA)!=-1) {
							$(".hs-sheet .createNew").prepend("<a href='addHousekeepingStaff.html'>+ 新增家政员</a>");
						}
						if ($.inArray(16,hkAA)!=-1) {
							$(".hs-info-detail .info_list").eq(0).find(".onOffShelf_sp").append("<span class='onOffShelf right'>是否上架：<label class='checkbox'>"+
									"<em></em>"+
								    "<input type='checkbox'/>"+
								"</label>"+
							"</span>");
							// 基本信息修改
							$(".tab_content .base_list").append("<a class='edit'>修改</a>");
							// 求职信息、能力评价
							$(".qiuzhi_list,.pingjia_list").find(".title_box").append("<a class='edit'>修改</a>");
							$(".fuwu_list").find(".title_box").append("<a class='addNew'>添加证书</a>");
							$(".hs-info-detail").attr("data-authority",1);
						}


            		} else if (Url.indexOf("bookingManagement")!=-1||Url.indexOf("orderManagement")!=-1||Url.indexOf("completionOrder")!=-1||Url.indexOf("cancelOrder")!=-1||Url.indexOf("beeShare")!=-1||Url.indexOf("dropBox")!=-1||Url.indexOf("createOrder")!=-1||Url.indexOf("recruitManagement")!=-1||Url.indexOf("ordering")!=-1) {
						$(".navigator ul li").eq(3).children().addClass("navi-on");
            		} else if (Url.indexOf("customerManagement")!=-1) {
            			$(".navigator ul li").eq(4).children().addClass("navi-on");
            		} else if (Url.indexOf("financialManagement")!=-1) {
            			$(".navigator ul li").eq(5).children().addClass("navi-on");
					}


                	console.log(data.msg);
                }else{
                    console.log(data.msg);
                }
            }else{
            	if (data.code == "100014") {

            	}
                console.log(data.msg);
            }
        }
    });



	$(".naviLeft ul li").click(function(){
		$(this).addClass("nl_on").siblings().removeClass("nl_on");
	});

	$(".naviLeft ul .beeshare-btn").click(function(){
		var divS = $(this).children("div");
		if (divS.css("display")=="none"){
			divS.slideDown();
		} else {
			divS.slideUp();
		}
	});




//	开关
	$(".checkbox input").each(function(){
		var State = $(this).prop("checked");
		if (State){
			$(this).val(1).siblings("em").css("left","17px").parent().css("background-color","#0A7EE3");
		} else {
			$(this).val(0).siblings("em").css("left","1px").parent().css("background-color","#B3B3B3");
		}
	});

	$("body").on("change",".checkbox input",function(){
		var state = $(this).prop("checked");
		if (state){
			$(this).val(1).siblings("em").stop().animate({left:"17px"}).parent().css("background-color","#0A7EE3");
		} else {
			$(this).val(0).siblings("em").stop().animate({left:"1px"}).parent().css("background-color","#B3B3B3");
		}
	});


	$("body").on("change",".pic-manage input[type='radio']",function(){
		var checked = $(this).parents(".pic-manage").find(".custom").prop("checked");
		if (checked) {
			$(this).parent().siblings(".upload-sel").children("a").css({"background-color":"#0A7EE3","cursor":"pointer"}).children().css("cursor","pointer").removeAttr("disabled");
			$(this).parent().siblings(".limit").css("color","#333333").children("i").css("color","#FF411B");
		} else {
			$(this).parent().siblings(".upload-sel").children("a").css({"background-color":"#DBDBDB","cursor":"default"}).children().css("cursor","default").attr("disabled","disabled");
			$(this).parent().siblings(".limit").css("color","#DBDBDB").children("i").css("color","#DBDBDB");
		};
	});

//	地区
	serviceProvice();
	$("select[name='serviceProvice']").change(function(){
		var pcode = $(this).val();
		if(pcode==""){
			$(this).removeClass("active");
			$(this).addClass("grey_i");
		}else{
			$(this).addClass("active");
			$(this).removeClass("grey_i");
		}
		serviceCity(pcode);
		$("select[name='serviceCity']").addClass("grey_i");
	});
	$("select[name='serviceCity']").change(function(){
		var pcode = $(this).val();
		if(pcode==""){
			$(this).removeClass("active");
			$(this).addClass("grey_i");
		}else{
			$(this).addClass("active");
			$(this).removeClass("grey_i");
		}
		serviceCounty(pcode);
		$("select[name='serviceCounty']").addClass("grey_i");
	});

	var lurl = ["c016","c020","c021","c022","c023","c004","c026","c012","c017","c019","c018","c025","c024","c007","c008","c009","c010","c028","c033","c034"];
	var name = ["sex","houseType","childrenAgeRange","olderAgeRange","selfCares","serviceItemCode","serviceNature","education","bloodType","fertilitySituation","maritalStatus","manageWay","inOutType","experience","age","zodiac","nativePlace","certType","authenticateGrade","certificationBody"];
	for (i=0;i<lurl.length;i++) {
		pullDown(lurl[i],name[i]);
	}


//	退出登录
	$(".account ul").on("click","li.loginOut",function(){
		$.ajax({
	        url: publicPath+"/api/user/logout",
	        type: "post",
	        data: {},
	        dataType: "json",
	        success: function success(data) {
	            if(data.success){
	                if(data.code == 0){
	                	location.href="login.html"
	                	console.log(data.msg);
	                }else{
	                    console.log(data.msg);
	                }
	            }else{
	                console.log(data.msg);
	            }
	        }
	    });
	});
	//系统管理
	$(".account ul").on("click","li.xitong",function(){
		$.ajax({
			url: publicPath+"/api/user/getUserSysSetting",
			type: "get",
			data: {},
			dataType: "json",
			success: function success(data) {
					if(data.success){
						if(data.code == 0){
						var naviLeft1 = data.jsonData[0].subMenuList;
						if(naviLeft1.length<2){
							window.location.href="resetPassword.html";
						}else{
							window.location.href="accountManagement.html"
						}
					}
				}
			}
		})
	})
	
});
