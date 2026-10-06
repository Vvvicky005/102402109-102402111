// =================================
// 我的发布页面
// =================================

const myCards = document.getElementById("myCards");

// 防 XSS
function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function renderMyCards() {
    const items = getAllItems();

    if (items.length === 0) {
        myCards.innerHTML = `
            <div class="empty-tip">
                😶 你还没有发布过信息，去
                <a href="publish.html">发布一条</a>
                吧
            </div>`;
        return;
    }

    myCards.innerHTML = items.map(item => `
        <div class="card" data-id="${item.id}">
            <div class="card-top">
                <span class="tag ${item.type === "寻物" ? "lost" : "found"}">
                    ${item.type}
                </span>
                <span class="status">${formatTime(item.createdAt)}</span>
            </div>
            <h3>${escapeHtml(item.name)}</h3>
            <p>${escapeHtml(item.description)}</p>
            <div class="card-bottom">
                <span class="location">📍 ${escapeHtml(item.location)}</span>
                <span class="detail-btn">查看详情 →</span>
            </div>
            ${item.status !== "进行中"
                ? `<div class="status-badge">${item.status}</div>`
                : ""}
        </div>
    `).join("");

    // 点击卡片跳详情
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", () => {
            window.location.href = `detail.html?id=${card.dataset.id}`;
        });
    });
}

renderMyCards();