app.controller("liuyanban", function ($scope, $http, NgTableParams) {

    $scope.loading = true;

    function loadData() {
        $scope.newsing = false;
        $scope.loading = true;
        $http.post("/api/liuyanban/list").success(function (res) {
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
        if (ct.length > 40) {
            return ct.substr(0, 40)+"...";
        }
        return ct;
    }
    $scope.convertData=function(dt) {
        var date = new Date(dt);
        return date.getFullYear() + '-' + nubcount((date.getMonth() + 1)) + '-' + nubcount(date.getDate());
    }

    function nubcount(nb) {
        if (nb.toString().length === 1) {
            return "0" + nb;
        }
        return nb;
    }
    $scope.deleteliuyanban = function (e) {
        $http.post("/api/liuyanban/delete", e).success(function (res) {
            if (res === 1) {
                mymsg("删除成功");
                loadData();
            } else {
                mymsg("删除失败");
            }
        });

    }
});