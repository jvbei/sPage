/*  
*   分页插件
*   by 凌晨四点半
*   20190630
*   v1.0.0
*/
;(function ( $, window, document, undefined ) {
    'use strict';
    var pluginName = "sPage",
        pageNum = 1,
        pageList = [],
        defaults = {
            page:1,
            pageSize:10,
            listTotal:0,
            showTotal:false,
            showSkip:false,
            showPN:true,
            prevPage:"上一页",
            nextPage:"下一页",
            callbackFun:function(page){}
        };
    function Plugin ( element,options ) {
        this.element = $(element);
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    $.extend(Plugin.prototype, {
        init: function () {
            this.viewHtml();
            this.clickBtn();
        },
        creatHtml:function(i){
            if(i==this.settings.page){
                pageList.push('<span class="active" data-page='+i+'>'+i+'</span>');
            }else{
                pageList.push('<span data-page='+i+'>'+i+'</span>');
            }
        },
        viewHtml:function(){
            var settings = this.settings;
            var pageTatol = Math.ceil(settings.listTotal/settings.pageSize);
            pageNum = settings.page;
            this.element.empty();
            if(settings.showTotal){
                this.element.append('<div class="spage-total">总计'+settings.listTotal+'条数据</div>');
            }
            this.element.append('<div class="spage-number"></div>');
            pageList = [];
            if(settings.showPN){
                settings.page == 1?pageList.push('<span class="span-disabled" data-page="prev">'+settings.prevPage+'</span>'):pageList.push('<span data-page="prev">'+settings.prevPage+'</span>');
            }
            if(pageTatol<=6){
                for(var i=1;i<pageTatol+1;i++){
                    this.creatHtml(i);
                }
            }else{
                if(settings.page<5){
                    for(var i=1;i<=5;i++){
                        this.creatHtml(i);
                    }
                    pageList.push('<span data-page="none">...</span>');
                    pageList.push('<span data-page='+pageTatol+'>'+pageTatol+'</span>');
                }else if(settings.page>pageTatol-4){
                    pageList.push('<span data-page="1">1</span><span data-page="none">...</span>');
                    for(var i=pageTatol-4;i<=pageTatol;i++){
                        this.creatHtml(i);
                    }
                }else{
                    pageList.push('<span data-page="1">1</span><span data-page="none">...</span>');
                    for(var i=settings.page-2;i<=Number(settings.page)+2;i++){
                        this.creatHtml(i);
                    }
                    pageList.push('<span data-page="none">...</span><span data-page='+pageTatol+'>'+pageTatol+'</span>');
                }
            }
            if(settings.showPN){
                settings.page == pageTatol?pageList.push('<span class="span-disabled" data-page="next">'+settings.nextPage+'</span>'):pageList.push('<span data-page="next">'+settings.nextPage+'</span>');
            }
            this.element.children(".spage-number").append(pageList.join(''));
            if(settings.showSkip){
                this.element.append('<div class="spage-skip">跳转到&nbsp;<input type="text" name="pageNum" />&nbsp;页&nbsp;&nbsp;<span data-page="go">确定</span></div>');
            }
            this.element.children(".spage-skip").children("input").val(settings.page);
        },
        clickBtn:function(){
            var that = this;
            var settings = this.settings;
            var ele = this.element;
            this.element.off('click',"span");
            this.element.on('click',"span",function(){
                var pageText = $(this).data("page");
                var pageTatol = Math.ceil(settings.listTotal/settings.pageSize);
                if(pageText == "prev"){
                    settings.page = settings.page-1 >= 1?settings.page-1:1;
                    pageText = settings.page;
                }else if(pageText == "next"){
                    settings.page = Number(settings.page)+1 <= pageTatol?Number(settings.page)+1:pageTatol;
                    pageText = settings.page;
                }else if(pageText == "none"){
                    return;
                }else if(pageText == "go"){
                    var p = Number(ele.children(".spage-skip").children("input").val());
                    if(/^[1-9]*$/.test(parseInt(p))){
                        settings.page = p;
                        pageText = p;
                    }else{
                        return;
                    }
                }else{
                    settings.page = pageText;
                }
                if(pageText == pageNum){
                    return;
                }
                pageNum = settings.page;
                that.viewHtml();
                ele.children(".spage-skip").children("input").val(settings.page);
                settings.callbackFun(pageText);
            });
            this.element.on('keyup',"input",function(event){
                if(event.keyCode ==13){
                    var p = Number(ele.children(".spage-skip").children("input").val());
                    if(/^[1-9]*$/.test(parseInt(p))){
                        settings.page = p;
                        pageNum = p;
                        that.viewHtml();
                        ele.children(".spage-skip").children("input").val(settings.page);
                        settings.callbackFun(p);
                    }else{
                        return;
                    }
                }
            });
        }
    });

    $.fn[ pluginName ] = function ( options ) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
        return this;
    };

})( jQuery, window, document );
