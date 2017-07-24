app.controller("zhaopin", function ($scope, $http, NgTableParams) {

    $scope.loading = true;

    function loadData() {
        $scope.loading = true;
        $http.post("/api/zhaopin/list").success(function (res) {
            $scope.dashi = res;
            console.log(res);
            var data = res;
            $scope.tableParams = new NgTableParams({}, { dataset: data });
        }).finally(function () {
            $scope.loading = false;
        });
    }

    loadData();

    $scope.concentsplit = function (ct) {
        var start_ptn = /<\/?[^>]*>/g;      //过滤标签开头
        var end_ptn = /[ | ]*\n/g;            //过滤标签结束
        var space_ptn = /&nbsp;/ig;          //过滤标签结尾
        if (ct) {
            ct = ct.replace(start_ptn, "").replace(end_ptn).replace(space_ptn, "");
            if (ct.length > 40) {
                return ct.substr(0, 40) + "...";
            }
            return ct;
        } else {
            return "";
        }
    }
    $scope.convertData = function (dt) {
        var date = new Date(dt);
        return date.getFullYear() + '-' + nubcount((date.getMonth() + 1)) + '-' + nubcount(date.getDate());
    }

    function nubcount(nb) {
        if (nb.toString().length === 1) {
            return "0" + nb;
        }
        return nb;
    }

    $scope.delete = function (e) {
        if (confirm("确定要删除吗？")) {
            $http.post("/api/zhaopin/delete", e).success(function (res) {
                if (res === 1) {
                    mymsg("删除成功");
                    loadData();
                } else {
                    mymsg("删除失败");
                }
            });
        }
    }

    $scope.edit = function (e) {
        $scope.mode = "edit";
        $scope.selected = e;
    }

    $scope.add = function () {
        $scope.selected = {
            Jobname: "",
            remark: "",
            jobcontent: "",
            id: 0
        };
        $scope.mode = "add";
    }

    $scope.save = function () {
        //console.log($scope.selected);
        //return;
        $http.post("/api/zhaopin/save", $scope.selected).success(function (res) {
            if (res === 1) {
                mymsg("成功！");
                $("#modal1").modal("hide");
                loadData();
            } else {
                mymsg("失败！");
            }
        });
    }

});