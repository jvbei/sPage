# sPage
jquery分页插件

1，引入样式文件，可以根据实际需要修改插件样式
<link rel="stylesheet" type="text/css" href="./jquery.sPage.css">

2，引入jQuery.js文件

3，引入sPage插件
<script src="./jquery.sPage.min.js"></script>

4，使用示例
<pre><code>
<div id="myPage"></div>
<script type="text/javascript">
    $(function(){
        $("#myPage").sPage({
            page:1,//当前页码
            pageSize:10,//每页显示多少条数据，默认10条
            listTotal:150,//数据总条数
            showTotal:false,//是否显示总条数，默认关闭：false
            showSkip:false,//是否显示跳页，默认关闭：false
            showPN:true,//是否显示上下翻页，默认开启：true
            prevPage:"上一页",//上翻页文字描述，默认“上一页”
            nextPage:"下一页",//下翻页文字描述，默认“下一页”
            callbackFun:function(page){
            	 //点击分页按钮回调函数，返回当前页码
                $("#pageNum").text(page);
            }
        });
    });
</script>
</code></pre>

