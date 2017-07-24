app.controller("xinwen", function($scope, $http, NgTableParams) {

    $scope.loading = false;

    function loadData() {
        $scope.loading = true;
        $http.post("/api/News/get_list").success(function (res) {
            $scope.news = res;
            //console.log(res);
            $scope.tableParams = new NgTableParams({}, { dataset: res });
        }).finally(function() {
            $scope.loading = false;
        });
    }

    $http.post("/api/Newstype/list", null).success(function (res) {
        $scope.newstypes = res;
        console.log($scope.newstypes);
        loadData();
    });

    $scope.get_type = function (lid) {
        return _.findWhere($scope.newstypes, { id: lid }).newstypename;
    }

    $scope.addnews=function() {
        $("#divModalWindow").modal({ backdrop: 'static', keyboard: false });
        $("#divModalWindow").modal("show");
    }

    $scope.deletedaxinwen = function (e) {
        if (confirm("确定要删除吗？")) {
            $http.post("/api/News/delete", e).success(function(res) {
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