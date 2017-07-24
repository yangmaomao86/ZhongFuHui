var show = console.log;
function myalert(msg, callback) {
    layer.alert(msg, { title: "提示" }, function (alertIndex) {
        //alert("execute callback functions");
        if (callback) {
            callback();
        }
        layer.close(alertIndex);
    });
}
function mymsg(msg) {
    layer.msg(msg, { time: 3000, icon: 8, shift: 6 });
}

function ajax(url, dataObj, successHandler) {
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        data: dataObj,
        dataType: 'json',
        beforeSend: function (result) {
            $("#bg").show();
        },
        success: function (result) {
            $("#bg").hide();
            successHandler(result);
        },
        error: function (result) {
            $("#bg").hide();
            show(result);
        },
        complete: function (result) {
            $("#bg").hide();
        }
    });
}