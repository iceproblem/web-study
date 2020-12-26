export default {
    // 存储到本地
    save:function (obj) {
        // 把todo对象转换为字符串
        let str = JSON.stringify(obj);
        // 保存到localStorage
        localStorage.setItem("todoList", str);
    },
    // 从本地获取数据
    get:function () {
        let str = localStorage.getItem("todoList");
        let rs = JSON.parse(str);
        if (rs == null) {
            return {
                visibility: "all",
                todos: []
            }
        } else {
            return rs;
        }
    }
}
