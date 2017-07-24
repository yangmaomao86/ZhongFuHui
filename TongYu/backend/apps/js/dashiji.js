app.controller("dashi", function ($scope, $http, NgTableParams) {

    $scope.loading = true;
    $scope.dashijiing = false;
    $scope.citylist = [{ cha: 'HKG', name: '香港' }, { cha: 'HAI', name: '海南' }, { cha: 'YUN', name: '云南' }, { cha: 'BEJ', name: '北京' }, { cha: 'TAJ', name: '天津' }, { cha: 'XIN', name: '新疆' }, { cha: 'TIB', name: '西藏' }, { cha: 'QIH', name: '青海' }, { cha: 'GAN', name: '甘肃' }, { cha: 'NMG', name: '内蒙古' }, { cha: 'NXA', name: '宁夏' }, { cha: 'SHX', name: '山西' }, { cha: 'LIA', name: '辽宁' }, { cha: 'JIL', name: '吉林' }, { cha: 'HLJ', name: '黑龙江' }, { cha: 'HEB', name: '河北' }, { cha: 'SHD', name: '山东' }, { cha: 'HEN', name: '河南' }, { cha: 'SHA', name: '陕西' }, { cha: 'SCH', name: '四川' }, { cha: 'CHQ', name: '重庆' }, { cha: 'HUB', name: '湖北' }, { cha: 'ANH', name: '安徽' }, { cha: 'JSU', name: '江苏' }, { cha: 'SHH', name: '上海' }, { cha: 'ZHJ', name: '浙江' }, { cha: 'FUJ', name: '福建' }, { cha: 'TAI', name: '台湾' }, { cha: 'JXI', name: '江西' }, { cha: 'HUN', name: '湖南' }, { cha: 'GUI', name: '贵州' }, { cha: 'GXI', name: '广西' }, { cha: 'GUD', name: '广东' }];

    var nowYear = new Date().getFullYear();

    $scope.years = [];
    for (var i = -14; i <2; i++) {
        $scope.years.push(nowYear + i);
    }

    function loadData() {
        $scope.newsing = false;
        $scope.loading = true;
        $http.post("/api/Dashi/get_dashi_list").success(function (res) {
            $scope.dashi = res;
            console.log(res);
            var data = res;
            $scope.tableParams = new NgTableParams({}, { dataset: data });
        }).finally(function () {
            $scope.loading = false;
        });
    }

    loadData();

    $scope.concentsplit=function(ct) {
        if (ct.length > 40) {
            return ct.substr(0, 40);
        }
        return ct;
    }
    $scope.deletedashiji = function (e) {
        if (confirm("确定要删除吗？")) {
            $http.post("/api/Dashi/delete", e).success(function(res) {
                if (res === 1) {
                    mymsg("删除成功");
                    loadData();
                } else {
                    mymsg("删除失败");
                }
            });
        }
    }

    $scope.adddashiji = function () {
        $scope.selected = {
            title:"",
            jiancheng: "",
            content: "",
            id:0
        };

        $scope.selected.jiancheng = $scope.citylist[0].cha;
        $scope.compile = "添加";
    }

    $scope.btnsave = function () {
        console.log($scope.selected);
        //return;
        $http.post("/api/Dashi/add_dashi", $scope.selected).success(function (res) {
            if (res === 1) {
                mymsg("成功!");
                $("#modal1").modal("hide");
                loadData();
            } else {
                mymsg("失败!");
            }
        });
    }

    $scope.shengfenzhuanhua = function (txt) {
        return _.findWhere($scope.citylist, { cha: txt }).name;
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

    $scope.updatedashiji = function (e) {
        $scope.selected = e;
        $scope.compile = "编辑";
    }

});