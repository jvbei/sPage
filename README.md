# sPage
jquery分页插件

1，引入样式文件，可以根据实际需要修改插件样式
<link rel="stylesheet" type="text/css" href="./jquery.sPage.css">

2，引入jQuery文件

3，引入sPage插件
<script src="./jquery.sPage.min.js"></script>

4，使用说明
<script type="text/javascript"><br/>
    *$(function(){<br/>
        *$("#myPage").sPage({<br/>
            *page:1,//当前页码<br/>
            *pageSize:10,//每页显示多少条数据，默认10条<br/>
            *listTotal:150,//数据总条数<br/>
            *showTotal:false,//是否显示总条数，默认关闭：false<br/>
            *showSkip:false,//是否显示跳页，默认关闭：false<br/>
            *showPN:true,//是否显示上下翻页，默认开启：true<br/>
            *prevPage:"上一页",//上翻页文字描述，默认“上一页”<br/>
            *nextPage:"下一页",//下翻页文字描述，默认“下一页”<br/>
            *callbackFun:function(page){<br/>
            	*//点击分页按钮回调函数，返回当前页码<br/>
                *$("#pageNum").text(page);<br/>
            *}<br/>
        *});<br/>
    *});<br/>
</script>

