var hsFile = (function ($) {

    var uploadFile = function (fileId,url,dataObj, maxFileSize, msgFunc,successFunc) {

        var maxSize = maxFileSize || 500;
        var msgFunc = msgFunc || mymsg;
        var uploadObj = dataObj || {};

        $("#" + fileId).on("change", function () {
            //console.log($("#picUpload")[0].files[0]);

            var size = $("#" + fileId)[0].files[0].size;
            if (size > (maxSize * 1024)) {
                msgFunc("您上传的图片不能大" + maxSize + "kb！");
                return false;
            }
            var filetype = $("#" + fileId)[0].files[0].type;
            var img = ["image/gif", "image/jpeg", "image/png", "application/x-jpg"];
            if ($.inArray(filetype.toLowerCase(), img) === "-1") {
                msgFunc("您上传的格式不正确！");
            }
            //创建FormData对象
            var data = new FormData();
            //为FormData对象添加数据
            data.append("files", $("#" + fileId)[0].files[0]);
            for (var prop in uploadObj) {
                data.append(prop, uploadObj[prop]);
            }
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                cache: false,
                contentType: false,	//不可缺参数
                processData: false,		//不可缺参数
                success: function (data) {
                    $("#" + fileId).val("");
                    //$("#picUploadimg").attr("src", "/upload/" + data);
                    successFunc(data);
                },
                error: function (err) {
                    msgFunc('上传出错,或文件格式不对！');
                }
            });
        });
    }

    return {
        uploadFile: uploadFile
    }

})(jQuery);