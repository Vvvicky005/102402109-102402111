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


// =================================
// 图片上传与预览
// =================================

const imageInput = document.getElementById("itemImage");
const imagePreview = document.getElementById("imagePreview");

let imageBase64 = "";   // 暂存图片的 Base64 字符串

imageInput.addEventListener("change", function (event) {

    const file = event.target.files[0];
    if (!file) return;

    // 大小限制 500KB
    if (file.size > 500 * 1024) {
        alert("图片太大啦，请选择 500KB 以内的图片！");
        imageInput.value = "";
        imagePreview.innerHTML = "";
        imageBase64 = "";
        return;
    }

    // 类型检查
    if (!file.type.startsWith("image/")) {
        alert("请选择图片文件！");
        imageInput.value = "";
        return;
    }

    // 用 FileReader 读成 Base64
    const reader = new FileReader();

    reader.onload = function (e) {
        imageBase64 = e.target.result;

        imagePreview.innerHTML = `
            <img src="${imageBase64}" alt="预览">
            <button type="button" class="remove-img" id="removeImgBtn">×</button>
        `;

        // 点击 × 移除图片
        document.getElementById("removeImgBtn").addEventListener("click", function () {
            imageBase64 = "";
            imageInput.value = "";
            imagePreview.innerHTML = "";
        });
    };

    reader.readAsDataURL(file);

});


// =================================
// 提交表单
// =================================

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
        contact: contact,
        image: imageBase64        // ← 加入图片
    });


    // 发布成功
    alert("发布成功！");


    // 返回首页
    window.location.href = "index.html";

});