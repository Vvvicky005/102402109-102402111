// =================================
// 详情页
// =================================

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const container = document.getElementById("detailContent");

const item = getItemById(id);

if (!item) {
    container.innerHTML = `
        <p class="empty-tip">❌ 未找到该信息，可能已被删除</p>
        <p style="text-align:center;margin-top:20px;">
            <a href="index.html" style="color:#3478f6;">返回首页</a>
        </p>
    `;
} else {
    renderDetail(item);
}


// ---------- 防 XSS ----------
function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}


function renderDetail(item) {

    const isDone = item.status !== "进行中";

    container.innerHTML = `
        <div class="detail-header">
            <span class="tag ${item.type === "寻物" ? "lost" : "found"}">${item.type}</span>
            <span class="status ${isDone ? "done" : ""}">${item.status}</span>
        </div>

        <h1>${escapeHtml(item.name)}</h1>

        <div class="detail-meta">
            <div><strong>类别：</strong>${escapeHtml(item.category)}</div>
            <div><strong>地点：</strong>${escapeHtml(item.location)}</div>
            <div><strong>时间：</strong>${escapeHtml(item.time)}</div>
        </div>

        <div class="detail-desc">
            <h3>详细描述</h3>
            <p>${escapeHtml(item.description)}</p>
        </div>

        <div class="detail-contact">
            <h3>联系方式</h3>
            <p id="contactText">${escapeHtml(item.contact)}</p>
            <button class="copy-btn" id="copyBtn">📋 一键复制</button>
        </div>

        <div class="detail-actions">
            ${!isDone ? `
                <button class="submit-btn" id="markDoneBtn">
                    ${item.type === "寻物" ? "标记为已找到" : "标记为已归还"}
                </button>
            ` : `<p class="done-tip">✅ 该信息已结束</p>`}
            <button class="cancel-btn" id="deleteBtn">🗑 删除</button>
        </div>
    `;

    // 复制联系方式
    document.getElementById("copyBtn").addEventListener("click", () => {
        navigator.clipboard.writeText(item.contact).then(() => {
            alert("联系方式已复制！");
        }).catch(() => {
            alert("复制失败，请手动复制：" + item.contact);
        });
    });

    // 标记完成
    const markBtn = document.getElementById("markDoneBtn");
    if (markBtn) {
        markBtn.addEventListener("click", () => {
            const newStatus = item.type === "寻物" ? "已找到" : "已归还";
            if (confirm(`确定标记为「${newStatus}」吗？`)) {
                updateItemStatus(item.id, newStatus);
                alert("状态已更新！");
                location.reload();
            }
        });
    }

    // 删除
    document.getElementById("deleteBtn").addEventListener("click", () => {
        if (confirm("确定要删除这条信息吗？")) {
            deleteItem(item.id);
            alert("已删除");
            window.location.href = "index.html";
        }
    });
}