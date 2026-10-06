// =================================
// 发布信息页面
// =================================

const publishForm = document.getElementById("publishForm");


// 切换"寻物 / 招领"的视觉状态
const typeOptions = document.querySelectorAll(".type-option");

typeOptions.forEach(option => {

    option.addEventListener("click", function () {

        typeOptions.forEach(item => {
            item.classList.remove("selected");
        });

        this.classList.add("selected");

    });

});


// 提交表单
publishForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const type = document.querySelector(
        'input[name="type"]:checked'
    ).value;

    const itemName =
        document.getElementById("itemName").value.trim();

    const category =
        document.getElementById("itemCategory").value;

    const location =
        document.getElementById("itemLocation").value.trim();

    const time =
        document.getElementById("itemTime").value;

    const description =
        document.getElementById("itemDescription").value.trim();

    const contact =
        document.getElementById("contact").value.trim();


    // 表单验证
    if (!itemName) {
        alert("请输入物品名称！");
        return;
    }

    if (!category) {
        alert("请选择物品类别！");
        return;
    }

    if (!location) {
        alert("请输入丢失 / 拾取地点！");
        return;
    }

    if (!time) {
        alert("请选择时间！");
        return;
    }

    if (!description) {
        alert("请输入详细描述！");
        return;
    }

    if (!contact) {
        alert("请输入联系方式！");
        return;
    }


    // 调用数据层新增（data.js 里的 addItem 函数）
    addItem({
        type: type,
        name: itemName,
        category: category,
        location: location,
        time: time,
        description: description,
        contact: contact
    });


    // 发布成功
    alert("发布成功！");


    // 返回首页
    window.location.href = "index.html";

});