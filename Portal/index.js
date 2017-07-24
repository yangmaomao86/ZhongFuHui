(function() {
    function mymsg(msg) {
        layer.msg(msg, { time: 3000, icon: 8, shift: 6 });
    }

    return;

    var topapp = new Vue({
        el: "#topapp",
        computed: {
            masagedate: function () {
                var d = new Date();
                var today = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
                var month = (d.getMonth() + 1).toString().length === 1 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
                var time = d.getFullYear() + "年" + month + "月" + d.getDate() + "日" + "  " + today[d.getDay()];
                return time;
            }
        }
    });
    var newstypenamearrlist = [];
    var themeapp = new Vue({
        el: "#themeapp",
        data: {
            new_typesarr: [],
            newsarr: []
        },
        methods: {
            newsclick: function (id) {
                this.newsarr = _.where(newstypenamearrlist, { newstypeid: id });
            },
            goto_news_detail:function(id) {
                location.href = "news_read.html?id=" + id;
            }
        }
    });
    $.ajax({
        url: '/api/Newstype/list',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        data: null,
        timeout: 50000,
        success: function (res) {
            //console.log(JSON.stringify(res));
            themeapp.new_typesarr = res;
        },
        error: function (err) {
            console.log(err);
        }
    });


    $.ajax({
        url: '/api/News/get_list',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        data: null,
        timeout: 50000,
        success: function (res) {
            newstypenamearrlist = res;
            //console.log(res);
            themeapp.newsarr = _.where(res, { newstypeid: 1 });
        },
        error: function (err) {
            console.log(err);
        }
    });

    //公司案例的逻辑，暂时不从数据库获取，直接写死！所以这块逻辑不需要了！
    var companyapp = new Vue({
        el: "#companyapp",
        data: {
            companyapparr: []
        }
    });
    $.ajax({
        url: '/api/Company/get_list',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        data: null,
        timeout: 50000,
        success: function (res) {
            companyapp.companyapparr = res;
            //console.log("company cases:",res);
            setTimeout("$('.case-bxslider').bxSlider({mode: 'fade',controls: false,auto: true});", 1000);
        },
        error: function (err) {
            console.log(err);
        }
    });

    //招聘代码块！
    var joinapp = new Vue({
        el: "#joinapp",
        data: {
            jobsarr: []
        }
    });
    $.ajax({
        url: '/api/zhaopin/list',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        data: null,
        timeout: 50000,
        success: function (res) {
            //console.log("jobs:", res[0].jobcontent.indexOf("\n"));
            for (var i = 0; i < res.length; i++) {
                res[i].jobcontent = res[i].jobcontent.replace(/\n/gi, "<br/>");
            }
            joinapp.jobsarr = res;
        },
        error: function (err) {
            console.log(err);
        }
    });

    var memorabiliaapp = new Vue({
        el: "#memorabiliaapp",
        data: {
            dashiyeararr: [],
            dashiarr: []
        }
    });

    var dashiquanlist = [];
    //大事记代码块！
    $.ajax({
        url: '/api/Dashi/get_list',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        data: null,
        timeout: 50000,
        success: function (res) {
            //console.log("Get dashi");
            console.log(res);

            memorabiliaapp.dashiyeararr = res.getyearlist;// [2009];
            memorabiliaapp.dashiarr = res.getdashilistsecond;
            //return;
            var datacha = [{ cha: 'HKG', name: '香港' }, { cha: 'HAI', name: '海南' }, { cha: 'YUN', name: '云南' }, { cha: 'BEJ', name: '北京' }, { cha: 'TAJ', name: '天津' }, { cha: 'XIN', name: '新疆' }, { cha: 'TIB', name: '西藏' }, { cha: 'QIH', name: '青海' }, { cha: 'GAN', name: '甘肃' }, { cha: 'NMG', name: '内蒙古' }, { cha: 'NXA', name: '宁夏' }, { cha: 'SHX', name: '山西' }, { cha: 'LIA', name: '辽宁' }, { cha: 'JIL', name: '吉林' }, { cha: 'HLJ', name: '黑龙江' }, { cha: 'HEB', name: '河北' }, { cha: 'SHD', name: '山东' }, { cha: 'HEN', name: '河南' }, { cha: 'SHA', name: '陕西' }, { cha: 'SCH', name: '四川' }, { cha: 'CHQ', name: '重庆' }, { cha: 'HUB', name: '湖北' }, { cha: 'ANH', name: '安徽' }, { cha: 'JSU', name: '江苏' }, { cha: 'SHH', name: '上海' }, { cha: 'ZHJ', name: '浙江' }, { cha: 'FUJ', name: '福建' }, { cha: 'TAI', name: '台湾' }, { cha: 'JXI', name: '江西' }, { cha: 'HUN', name: '湖南' }, { cha: 'GUI', name: '贵州' }, { cha: 'GXI', name: '广西' }, { cha: 'GUD', name: '广东' }];
            var dashi = res.getdashiquanlist;
            dashiquanlist = res.getdashiquanlist;

            //console.log("dashiji:",dashi);
            var dataStatus = [];
            $.each(datacha, function (index, item) {
                var gg = _.where(dashi, { jiancheng: item.cha });
                var h = "";
                if (gg.length > 0) {
                    $.each(gg, function (index, items) {
                        h += items.title + "<br/>";
                    });
                    dataStatus.push({ cha: item.cha, name: item.name, des: '<br/>' + h, tel: '' });
                } else {
                    dataStatus.push({ cha: item.cha, name: item.name, des: '<br/>无活动<br/>', tel: '' });
                }
            });
            //console.log(dataStatus);
            $('#map').vectorMap({
                map: 'china_zh',
                color: "#B4B4B4", //地图颜色
                onLabelShow: function (event, label, code) { //动态显示内容
                    $.each(dataStatus, function (i, items) {
                        if (code === items.cha) {
                            label.html(items.name + items.des + items.tel);
                        }
                    });
                }
            });
            //$.each(dataStatus, function (i, items) {
            //    if (items.des.indexOf('无') === -1) { //动态设定颜色，此处用了自定义简单的判断
            //        var josnStr = "{" + items.cha + ":'#0A85ED'}";
            //        $('#map').vectorMap('set', 'colors', eval('(' + josnStr + ')'));
            //    }
            //});

            //第一次加载就加载 时间轴里面的第一个年份的记录！
            var firstYear = res.getyearlist[0];
            var ttt = _.where(dashiquanlist, { "year": parseInt(firstYear) });
            for (var i = 0; i < ttt.length; i++) {
                var item = ttt[i];
                //console.log(item.jiancheng);
                Render_DaShi(item.jiancheng);
            }


            //在年份的轮播里面去给每个年份对应的 大事记 去赋值!
            $('#timeline').on('slide.bs.carousel', function (p1, p2) {
                // do something…
                //console.log(p1);

                var currentYear = $("#timeline").find("ol.carousel-indicators").find("li.active").find("span").text();
                console.log(currentYear);

                var findIndex;
                for (var j = 0; j < res.getyearlist.length; j++) {
                    if (currentYear === res.getyearlist[j].toString()) {
                        findIndex = j;
                        break;
                    }
                }
                if ( (findIndex+1) > res.getyearlist.length - 1) {
                    findIndex = 0;
                } else {
                    findIndex = findIndex + 1;
                }


                var dashiArr = _.where(dashiquanlist, { "year": res.getyearlist[findIndex] });
                //console.log(currentYear, dashiArr);

                for (var i = 0; i < dashiArr.length; i++) {
                    var item = dashiArr[i];
                    //console.log(item.jiancheng);
                    Render_DaShi(item.jiancheng);
                }
            });

        },
        error: function (err) {
            console.log(err);
        }
    });



    function Render_DaShi(jiancheng) {
        var josnStr = "{" + jiancheng + ":'#0A85ED'}";
        $('#map').vectorMap('set', 'colors', eval('(' + josnStr + ')'));
    }

    var footerapp = new Vue({
        el: "#footerapp",
        data: {
            Messagecontent: "",
            messagename: "",
            mobile: "",
            email: "",
            showd: "opend"
        },
        methods: {
            tijiao: function () {
                var that = this;
                this.showd = "closed";
                try {
                    if (this.messagename === null || this.messagename === "" || this.messagename === undefined) {
                        layer.alert("姓名不能为空！");
                        return false;
                    }
                    if (this.mobile === null || this.mobile === "" || this.mobile === undefined) {
                        layer.alert("电话不能为空！");
                        return false;
                    }
                    var datas = { Messagecontent: this.Messagecontent, messagename: this.messagename, mobile: this.mobile, email: this.email };
                    //console.log(datas);
                    $.ajax({
                        url: '/api/Message/employee_mobile',
                        type: 'POST',
                        contentType: 'application/json;charset=utf-8',
                        data: JSON.stringify(datas),
                        timeout: 50000,
                        success: function (res) {
                            //console.log(res);
                            if (res === 1) {
                                mymsg("留言成功！感谢您的参与！");
                            }
                            //Vue.set("Messagecontent", "");
                            //Vue.set("messagename", "");
                            //Vue.set("mobile", "");
                            //Vue.set("email", "");

                            that.Messagecontent = "";
                            that.messagename = "";
                            that.mobile = "";
                            that.email = "";
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                } catch (err) {
                    // document.getElementById("demo").innerHTML = err.message;
                } finally {
                    this.showd = "opend";
                }

            }
        }
    });

})();