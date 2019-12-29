# sPage
jquery分页插件

1，引入样式文件，可以根据实际需要修改插件样式  
`<link rel="stylesheet" type="text/css" href="./jquery.sPage.css">`

2，引入jQuery.js文件  
`<script src="./jquery.min.js"></script>`

3，引入sPage插件  
`<script src="./jquery.sPage.min.js"></script>`

4，参数说明和使用示例

 参数  | 默认值  | 备注
 ----- | ----- | -----
 page  | 必填 | 当前页码 
 total  | 必填 | 数据总条数
 pageSize  | 10 | 每页显示多少条数据
 totalTxt  | 共{total}条 | 数据总条数文字描述，{total}为占位符，默认"共{total}条"
 noData  | false | 没有数据时是否显示分页，默认false不显示，true显示第一页
 showTotal  | false | 显示总条数
 showSkip  | false | 显示跳页
 showPN  | true | 显示上下翻页按钮
 prevPage  | 上一页 | 上翻页文字描述
 nextPage  | 下一页 | 下翻页文字描述
 fastForward  | 0 | 快进快退页数，0表示不开启快进快退
 backFun  | 无 | 点击分页按钮回调函数，返回当前页码
```
// ajax调用实例
function ajaxPage(page){
    var p = page || 1;
    $.ajax({
        type: "POST",
        url: "https://www.test.com/test",
        data: {
            page:p,
            pageSize:10
        },
        dataType: "json",  
        success: function(data){
            //数据处理
            // ...

            // 调用分页插件
            $("#myPage").sPage({
                page:p,//当前页码
                pageSize:10,//每页显示多少条数据，默认10条
                total:data.total,//数据总条数,后台返回
                backFun:function(page){
                    //点击分页按钮回调函数，返回当前页码
                    ajaxPage(page);
                }
            });
        },
        error:function(e){
            console.log(e);
        }
    });
}
```

