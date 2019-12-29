/*  
*  jQuery分页插件sPage
*  by 凌晨四点半
*  20191229
*  version:1.2.2
*  https://github.com/jvbei/sPage
*/
; (function ($, window, document, undefined) {
    'use strict';
    var defaults = {
        page: 1,//当前页
        pageSize: 10,//每页显示多少条
        total: 0,//数据总条数
        showTotal: false,//是否显示总条数
        totalTxt: "共{total}条",//数据总条数文字描述
        noData: false,//没有数据时是否显示分页，默认false不显示，true显示第一页
        showSkip: false,//是否显示跳页
        showPN: true,//是否显示上下翻页
        prevPage: "上一页",//上翻页按钮文字
        nextPage: "下一页",//下翻页按钮文字
        fastForward: 0,//快进快退，默认0页
        backFun: function (page) {}//点击分页按钮回调函数，返回当前页码
    };
    function Plugin(element, options) {
        this.element = $(element);
        this.settings = $.extend({}, defaults, options);
        this.pageNum = 1, //记录当前页码
        this.pageList = [], //页码集合
        this.pageTatol = 0; //记录总页数
        this.init();
    }
    $.extend(Plugin.prototype, {
        init: function () {
            this.element.empty();
            this.viewHtml();
        },
        creatHtml: function (i) {
            i == this.settings.page ? this.pageList.push('<button class="active" data-page=' + i + '>' + i + '</button>')
            : this.pageList.push('<button data-page=' + i + '>' + i + '</button>');
        },
        viewHtml: function () {
            var settings = this.settings;
            var pageTatol = 0;
            var pageArr = [];//分页元素集合，减少dom重绘次数
            if (settings.total > 0) {
                pageTatol = Math.ceil(settings.total / settings.pageSize);
            } else {
                if (settings.noData) {
                    pageTatol = 1;
                    settings.page = 1;
                    settings.total = 0;
                } else {
                    return;
                }
            }
            this.pageTatol = pageTatol;
            this.pageNum = settings.page;
            if (settings.showTotal) {
                pageArr.push('<div class="spage-total">' + settings.totalTxt.replace(/\{(\w+)\}/gi, settings.total) + '</div>');
            }
            pageArr.push('<div class="spage-number">');
            this.pageList = [];//页码元素集合，包括上下页
            if (settings.showPN) {
                settings.page == 1 ? this.pageList.push('<button class="button-disabled" data-page="prev">' + settings.prevPage + '</button>') 
                : this.pageList.push('<button data-page="prev">' + settings.prevPage + '</button>');
            }
            if (pageTatol <= 6) {
                for (var i = 1; i < pageTatol + 1; i++) {
                    this.creatHtml(i);
                }
            } else {
                if (settings.page < 5) {
                    for (var i = 1; i <= 5; i++) {
                        this.creatHtml(i);
                    }
                    this.pageList.push('<button data-page="after" class="spage-after">...</button><button data-page=' + pageTatol + '>' + pageTatol + '</button>');
                } else if (settings.page > pageTatol - 4) {
                    this.pageList.push('<button data-page="1">1</button><button data-page="before" class="spage-before">...</button>');
                    for (var i = pageTatol - 4; i <= pageTatol; i++) {
                        this.creatHtml(i);
                    }
                } else {
                    this.pageList.push('<button data-page="1">1</button><button data-page="before" class="spage-before">...</button>');
                    for (var i = settings.page - 2; i <= Number(settings.page) + 2; i++) {
                        this.creatHtml(i);
                    }
                    this.pageList.push('<button data-page="after" class="spage-after">...</button><button data-page=' + pageTatol + '>' + pageTatol + '</button>');
                }
            }
            if (settings.showPN) {
                settings.page == pageTatol ? this.pageList.push('<button class="button-disabled" data-page="next">' + settings.nextPage + '</button>') 
                : this.pageList.push('<button data-page="next">' + settings.nextPage + '</button>');
            }
            pageArr.push(this.pageList.join(''));
            pageArr.push('</div>');
            if (settings.showSkip) {
                pageArr.push('<div class="spage-skip">跳至&nbsp;<input type="text" value="' + settings.page + '"/>&nbsp;页&nbsp;&nbsp;<button data-page="go">确定</button></div>');
            }
            this.element.html(pageArr.join(''));
            this.clickBtn();
        },
        clickBtn: function () {
            var that = this;
            var settings = this.settings;
            var ele = this.element;
            var pageTatol = this.pageTatol;
            this.element.off("click", "button");
            this.element.on("click", "button", function () {
                var pageText = $(this).data("page");
                switch (pageText) {
                    case "prev":
                        settings.page = settings.page - 1 >= 1 ? settings.page - 1 : 1;
                        pageText = settings.page;
                        break;
                    case "next":
                        settings.page = Number(settings.page) + 1 <= pageTatol ? Number(settings.page) + 1 : pageTatol;
                        pageText = settings.page;
                        break;
                    case "before":
                        settings.page = settings.page - settings.fastForward >= 1 ? settings.page - settings.fastForward : 1;
                        pageText = settings.page;
                        break;
                    case "after":
                        settings.page = Number(settings.page) + Number(settings.fastForward) <= pageTatol ? Number(settings.page) + Number(settings.fastForward) : pageTatol;
                        pageText = settings.page;
                        break;
                    case "go":
                        var p = parseInt(ele.find("input").val());
                        if (/^[0-9]*$/.test(p) && p >= 1 && p <= pageTatol) {
                            settings.page = p;
                            pageText = p;
                        } else {
                            return;
                        }
                        break;
                    default:
                        settings.page = pageText;
                }
                // 点击或跳转当前页码不执行任何操作
                if (pageText == that.pageNum) {
                    return;
                }
                that.pageNum = settings.page;
                that.viewHtml();
                settings.backFun(pageText);
            });
            this.element.off("keyup", "input");
            this.element.on("keyup", "input", function (event) {
                if (event.keyCode == 13) {
                    var p = parseInt(ele.find("input").val());
                    if (/^[0-9]*$/.test(p) && p >= 1 && p <= pageTatol && p != that.pageNum) {
                        settings.page = p;
                        that.pageNum = p;
                        that.viewHtml();
                        settings.backFun(p);
                    } else {
                        return;
                    }
                }
            });
            if(settings.fastForward > 0){
                ele.find(".spage-after").hover(function(){
                    $(this).html("&raquo;");
                },function(){
                    $(this).html("...");
                });
                ele.find(".spage-before").hover(function(){
                    $(this).html("&laquo;");
                },function(){
                    $(this).html("...");
                });
            }
        }
    });
    $.fn.sPage = function (options) {
        return this.each(function(){
            new Plugin(this, options);
        });
    }
})(jQuery, window, document);
