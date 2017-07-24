var app = angular.module("app", ["ngRoute", "ngTable", "tm.pagination"], function ($httpProvider) {
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	$httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	var param = function (obj) {
		var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

		for (name in obj) {
			value = obj[name];

			if (value instanceof Array) {
				for (i = 0; i < value.length; i++) {
					subValue = value[i];
					fullSubName = name + '[' + i + ']';
					innerObj = {};
					innerObj[fullSubName] = subValue;
					query += param(innerObj) + '&';
				}
			}
			else if (value instanceof Object) {
				for (subName in value) {
					subValue = value[subName];
					fullSubName = name + '[' + subName + ']';
					innerObj = {};
					innerObj[fullSubName] = subValue;
					query += param(innerObj) + '&';
				}
			}
			else if (value !== undefined && value !== null) {
				query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
			}
		}

		return query.length ? query.substr(0, query.length - 1) : query;
	};
	// Override $http service's default transformRequest
	$httpProvider.defaults.transformRequest = [function (data) {
		return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
	}];
});


app.filter("FormatDate", function () {
	return function (val) {
		if (val != null) {
			var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
			//月份为0-11，所以+1，月份小于10时补个0
			var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
			var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
			return date.getFullYear() + "-" + month + "-" + currentDate;
		}
		return "";
	};
});

app.directive("autoDismiss", function () {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs, ctrl) {
			setTimeout(function () {
				elem.css("display", "none");
			}, 3000);
		}
	}
});

app.directive("datetimepicker", function ($timeout) {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs, ctrl) {
			elem.bind("click", function () {
				//alert("hello");
				elem.datetimepicker({
					format: "yyyy-mm-dd",
					language: 'zh-CN',
					weekStart: 1,
					todayBtn: 1,
					autoclose: 1,
					todayHighlight: 1,
					startView: 2,
					minView: 2,
					forceParse: 0
				});
				elem.datetimepicker("show");
			});
		}

	}
});

//app.directive("barchart", function () {
//	return {
//		restrict: 'A',
//		scope: {
//			data: '=',
//			xkey: '=',
//			ykeys: '=',
//			labels:'='
//		},
//		link: function (scope, elem, attrs, ctrl) {
//			Morris.Line({
//				element: attrs["id"].toString(),
//				data: scope.data,
//				xkey: scope.xkey,
//				ykeys: scope.ykeys,
//				labels: scope.labels
//			});
//		}
//	}
//});

app.directive('dateFormat', function ($filter) {
	var dateFilter = $filter('date');
	return {
		require: 'ngModel',
		link: function (scope, elm, attrs, ctrl) {

			function formatter(val) {
				/*
				/Date(1420041600000)/
				*/
				//var tempval=value.substr(1,value.length-2);
				//alert(tempval);
				//return dateFilter(tempval, 'yyyy-MM-dd'); 

				var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
				//月份为0-11，所以+1，月份小于10时补个0
				var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				return date.getFullYear() + "-" + month + "-" + currentDate;
			}

			function parser() {
				return ctrl.$modelValue;
			}

			ctrl.$formatters.push(formatter);
			ctrl.$parsers.unshift(parser);

		}
	};
});

app.filter("FormatDateDetail", function () {
	return function (val) {
		if (val != null) {
			var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
			//月份为0-11，所以+1，月份小于10时补个0
			var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
			var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
			return date.getFullYear() + "-" + month + "-" + currentDate + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		}
		return "";
	};
});

app.filter("setSex", function () {
	return function (val) {
		if (val == 0) {
			return "未知";
		} else if (val == 1) {
			return "男";
		} else if (val == 2) {
			return "女";
		}
	};
});


app.factory('select2Query', function ($timeout) {
	return {
		testAJAX: function () {
			var config = {
				minimumInputLength: 1,
				ajax: {
					url: "http://api.rottentomatoes.com/api/public/v1.0/movies.json",
					dataType: 'jsonp',
					data: function (term) {
						return {
							q: term,
							page_limit: 10,
							apikey: "ju6z9mjyajq2djue3gbvv26t"
						};
					},
					results: function (data, page) {
						return { results: data.movies };
					}
				},
				formatResult: function (data) {
					return data.title;
				},
				formatSelection: function (data) {
					return data.title;
				}
			};

			return config;
		}
	}
});
app.directive('select2', function (select2Query) {
	return {
		restrict: 'A',
		scope: {
			config: '=',
			ngModel: '=',
			select2Model: '='
		},
		link: function (scope, element, attrs) {
			// 初始化
			var tagName = element[0].tagName,
                config = {
                	allowClear: true,
                	multiple: !!attrs.multiple,
                	placeholder: attrs.placeholder || ' '   // 修复不出现删除按钮的情况
                };

			// 生成select
			if (tagName === 'SELECT') {
				// 初始化
				var $element = $(element);
				delete config.multiple;

				$element
                    .prepend('<option value=""></option>')
                    .val('')
                    .select2(config);

				// model - view
				scope.$watch('ngModel', function (newVal) {
					setTimeout(function () {
						$element.find('[value^="?"]').remove();    // 清除错误的数据
						$element.select2('val', newVal);
					}, 0);
				}, true);
				return false;
			}

			// 处理input
			if (tagName === 'INPUT') {
				// 初始化
				var $element = $(element);

				// 获取内置配置
				if (attrs.query) {
					scope.config = select2Query[attrs.query]();
				}

				// 动态生成select2
				scope.$watch('config', function () {
					angular.extend(config, scope.config);
					$element.select2('destroy').select2(config);
				}, true);

				// view - model
				$element.on('change', function () {
					scope.$apply(function () {
						scope.select2Model = $element.select2('data');
					});
				});

				// model - view
				scope.$watch('select2Model', function (newVal) {
					$element.select2('data', newVal);
				}, true);

				// model - view
				scope.$watch('ngModel', function (newVal) {
					// 跳过ajax方式以及多选情况
					if (config.ajax || config.multiple) { return false }

					$element.select2('val', newVal);
				}, true);
			}
		}
	}
});

function getparamOfHref(name, url) {
	var urlinfo = url;
	var len = urlinfo.length;//获取url的长度
	var offset = urlinfo.indexOf("?");//设置参数字符串开始的位置
	var newsidinfo = urlinfo.substr(offset + 1, len);//取出参数字符串 这里会获得类似“id=1”这样的字符串
	var arr = newsidinfo.split("&");//对获得的参数字符串按照“=”进行分割
	for (var i = 0; i < arr.length; i++) {
		var childArr = arr[i].split("=");
		if (childArr[0] == name) {
			return childArr[1];
		}
	}
	return "";
}
;
function ValidateNullOrEmpty(val) {
	var tempval = $.trim(val);
	if (tempval == "" || tempval == undefined)
		return true;
	else
		return false;
};
function ValidateMobile(n) {
	return /^1\d{10}$/.test($.trim(n));
}
function compareTime(startDate, endDate) {
	if (startDate.length > 0 && endDate.length > 0) {
		var startDateTemp = startDate.split(" ");
		var endDateTemp = endDate.split(" ");

		var arrStartDate = startDateTemp[0].split("-");
		var arrEndDate = endDateTemp[0].split("-");


		var sDate = Date.parse(arrStartDate[0] + "-" + arrStartDate[1] + "-" + arrStartDate[2]);
		var eDate = Date.parse(arrEndDate[0] + "-" + arrEndDate[1] + "-" + arrEndDate[2]);

		var allStartDate = new Date(arrStartDate[0], arrStartDate[1], arrStartDate[2]);
		var allEndDate = new Date(arrEndDate[0], arrEndDate[1], arrEndDate[2]);

		var val = (sDate - eDate) / 3600 / 1000;
		if (val > 0)
			return false;
		return true;

	}
	else {
		return false;
	}
};

function FormateDate(val) {
	if (val) {
		var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
		//月份为0-11，所以+1，月份小于10时补个0
		var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
		var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
		return date.getFullYear() + "-" + month + "-" + currentDate;
	}
	else {
		return "";
	}
}




