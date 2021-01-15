// 1. 开发环境服务器地址
var baseURL = 'http://api-breakingnews-web.itheima.net'
// 2. 测试环境服务器地址
// var baseURL = 'http://api-breakingnews-web.itheima.net'
// 3. 生成环境服务器地址
// var baseURL = 'http://api-breakingnews-web.itheima.net'


// 拦截所有ajax请求 
//   处理参数
$.ajaxPrefilter(function (params) {
    // 拼接对应环境的服务器地址
    // alert('params.url');
    params.url = baseURL + params.url
    // alert('params.url');
})