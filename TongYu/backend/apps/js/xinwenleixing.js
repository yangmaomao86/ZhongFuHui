app.controller("xinwenleixing", function ($scope, $http, NgTableParams) {

    $scope.loading = true;

    function loadData() {
        $scope.loading = true;
        $http.post("/api/newstype/list").success(function (res) {
            //console.log(res);
            $scope.tableParams = new NgTableParams({}, { dataset: res });
        }).finally(function () {
            $scope.loading = false;
        });
    }

    loadData();

    $scope.edit = function (e) {
        $scope.mode = "edit";
        $scope.selected = e;
    }

    $scope.add = function () {
        $scope.mode = "add";
        $scope.selected = {};
    }

    $scope.save=function() {
        //console.log($scope.selected);
        $http.post("/api/newstype/save",  $scope.selected ).success(function (res) {
            if (res === 1) {
                mymsg("成功！");
                loadData();
            } else {
                mymsg("失败！");
            }
        });
    }

    $scope.delete = function (e) {
        if (confirm("确定要删除吗？")) {
            $http.post("/api/newstype/remove", e).success(function (res) {
                if (res === 1) {
                    mymsg("删除成功");
                    loadData();
                } else {
                    mymsg("删除失败");
                }
            });
        }
    }

});