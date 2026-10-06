// ================================
// 校园失物招领 - 首页
// ================================

let currentKeyword = "";
let currentType = "全部";

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const categoryButtons = document.querySelectorAll(".category button");
const cardsContainer = document.querySelector(".cards");

// ---------- 防 XSS ----------
function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

// ---------- 渲染卡片 ----------
function renderCards() {
    const items = filterItems({
        keyword: currentKeyword,
        type: currentType
    });

    if (items.length === 0) {
        cardsContainer.innerHTML = `
            <div class="empty-tip">
                😶 没有找到匹配的信息，换个关键词试试吧
            </div>`;
        return;
    }

    cardsContainer.innerHTML = items.map(item => `
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
            const id = card.dataset.id;
            window.location.href = `detail.html?id=${id}`;
        });
    });
}

// ---------- 搜索 ----------
function doSearch() {
    currentKeyword = searchInput.value.trim();
    renderCards();
}

searchButton.addEventListener("click", doSearch);
searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") doSearch();
});

// ---------- 分类 ----------
categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        categoryButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentType = btn.textContent.trim();
        renderCards();
    });
});

// ---------- 初始渲染 ----------
renderCards();