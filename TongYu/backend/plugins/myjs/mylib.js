$(function() {

	$(document).ajaxStart(function () {
	    //console.log("ajax start!");
	    $("#loading").show();
	});

	$(document).ajaxStop(function () {
	    //console.log("ajax stop!");
	    $("#loading").hide();
	});


	$.ajaxSetup({
		url: "../../api/login.php", // 默认URL
		aysnc: false, // 默认同步加载
		type: "POST", // 默认使用POST方式
		// contentType : 'application/json;charset=utf-8', //这个设置 后台的$_POST一直为空！
		contentType: "application/x-www-form-urlencoded", // 只有这个才能正常发起ajax请求，别的都不行啊！
		timeout: 500000,
		// headers : { // 默认添加请求头
		// "Author" : "CodePlayer",
		// "Powered-By" : "CodePlayer"
		// },
		dataTpye: "json",
		error: function (jqXHR, textStatus, errorMsg) { // 出错时默认的处理函数
			// jqXHR 是经过jQuery封装的XMLHttpRequest对象
			// textStatus 可能为： null、"timeout"、"error"、"abort"或"parsererror"
			// errorMsg 可能为： "Not Found"、"Internal Server Error"等

			// 提示形如：发送AJAX请求到"/index.html"时出错[404]：Not Found
			//console.log('发送AJAX请求到"' + this.url + '"时出错[' + jqXHR.status + ']：' + errorMsg);

		}
		// beforeSend:function(){
		// console.log("before send!");
		// },
		// complete:function(){
		// console.log("send ajax complete!");
		// }
	});


	//console.log("js work fine!");
});

function ajax(url, postObj, callback) {
	$.ajax({ url: url, data:postObj , dataType:"json",method:"POST" }).done(function (res) {
		callback(res);
	});
}

function MyAjax(url, dataObj, successHandler) {
    $.ajax({
        type: "POST",
        url: url,
        //contentType: "application/json",
        data: dataObj,
        dataType: 'json',
        beforeSend: function (result) {
            $("#loading").show();
        },
        success: function (result) {
            $("#loading").hide();
            successHandler(result);
        },
        error: function (result) {
            $("#loading").hide();
            //alert(result);
        },
        complete: function (result) {
            $("#loading").hide();
        }
    });
}

function post_json(url, dataObj, successHandler) {
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        data: JSON.stringify(dataObj),
        //dataType: 'json',
        beforeSend: function (result) {
            $("#loading").show();
        },
        success: function (result) {
            $("#loading").hide();
            successHandler(result);
        },
        error: function (result) {
            $("#loading").hide();
            //alert(result);
        },
        complete: function (result) {
            $("#loading").hide();
        }
    });
}

//传统方式调用ajax，不用jquery来掉用!
function ajax2(type,url,data,success,error) {
	var xmlhttp;
	if (window.XMLHttpRequest) { // code for Mozilla, etc.
		xmlhttp = new XMLHttpRequest();
	}
	else if (window.ActiveXObject) { // code for IE
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function () {
		//var debug = true;
		switch (xmlhttp.readyState) {
			case 4:
				switch (xmlhttp.status) {
					case 0: // Aborted
						break;
					case 200: // if Ok
					case 304: // if not modified
						var resp = xmlhttp.responseText;
						success(resp);
						break;
				}
			default:
				//console.log(xmlhttp);
				break;
		}
	};
	try {
		xmlhttp.open(type, url, true);
		xmlhttp.send(data);
	}
	catch (e) {
		//alert('Error');
		if (error) {
			error(e);
		}
	}
}


function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}

//validation
// validation area for so many validatoins
function validate_is_empty(str) {
	if ($.trim(str) === "")
		return true;
	else {
		return false;
	}
}

function validate_is_mobile(n) {
	n = $.trim(n);
	return /^1\d{10}$/.test(n);
}

function validate_is_email(mail) {
	mail = $.trim(mail);
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (filter.test(mail))
		return true;
	else {
		// alert('您的电子邮件格式不正确');
		return false;
	}
}

function validate_is_equal(x, y) {
	if (x === y)
		return true;
	else
		return false;
}
//获取当前时间 年月日
function getnewdate() {
    var myDate = new Date();
    //获取当前年
    var year = myDate.getFullYear();
    //获取当前月
    var month = myDate.getMonth() + 1;
    //获取当前日
    var date = myDate.getDate();
    return year + '-' + p(month) + "-" + p(date);
}
function p(s) {
    return s < 10 ? '0' + s : s;
}

//function FormParamEncode(arr) {
//	if (arr.length === 0)
//		return "";
//	for (var i = 0; i < arr.length; i++) {
		
//	}
//}
