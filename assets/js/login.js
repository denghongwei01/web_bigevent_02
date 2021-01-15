$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 2.自定义效验规则
    // 只要引入了layui.all.js就会对出一个对象
    var form = layui.form;
    form.verify({
        // 属性就是定义的规则名称
        // 密码规则
        pwd: [
            // 数组中第一个元素，正则
            /^[\S]{6,12}$/
            // 数组中第二个元素，报错信息
            , '密码必须6到12位，且不能出现空格'
        ],
        // 效验量词密码输入是否一致规则
        repwd: function (value) {
            // 获取注册表单中的密码值
            var pwd = $('.reg-box input[name=password]').val()
            // 只判断有问题的情况，没问题，直接通过
            if (value !== pwd) {
                return "二次密码输入不一致"
            }
        }
    });
    // 4.注册功能
    var layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        // 阻止表单默认提交
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val(),
            },
            success: function (res) {
                // 返回状态判断
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 提交成功后处理代码
                layer.msg(res.message);
                // 手动切换到登录表单
                $('#link_login').click();
                // 重置form 这里不能写this 因为在ajax当中
                $('#form_reg')[0].reset();
            }
        })
    })

    // 登录（给form标签绑定事件，button按钮触发提交 事件）
    $('#form_login').on('submit', function (e) {
        // 阻止默认提交
        e.preventDefault()
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                // 校验返回状态
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 提示信息，保存token，跳转页面
                layer.msg('恭喜您，登录成功');
                // 保存token,未来的接口要使用token
                localStorage.setItem('token', res.token);
                // 跳转
                location.href = '/index.html';
            }
        })
    })

})