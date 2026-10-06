// ================================
// 校园失物招领 - 数据层
// ================================

const STORAGE_KEY = "lostFoundItems";

// 默认种子数据（首次打开时使用）
const SEED_DATA = [
    {
        id: 1,
        type: "寻物",
        name: "校园卡",
        category: "校园卡",
        location: "图书馆三楼",
        time: "2026-10-06T10:32",
        description: "蓝色校园卡套，内有校园卡一张，可能遗失在图书馆三楼自习区。",
        contact: "QQ 123456789",
        status: "进行中",
        createdAt: 1759721520000
    },
    {
        id: 2,
        type: "招领",
        name: "黑色水杯",
        category: "其他",
        location: "第一食堂",
        time: "2026-10-05T18:20",
        description: "在食堂一楼座位附近发现一个黑色保温杯，杯身没有明显标记。",
        contact: "微信 xiaoming123",
        status: "进行中",
        createdAt: 1759640400000
    },
    {
        id: 3,
        type: "寻物",
        name: "无线耳机",
        category: "电子产品",
        location: "教学楼 A 区",
        time: "2026-10-05T15:40",
        description: "白色无线耳机，黑色保护套，最后一次使用是在教学楼 A 区。",
        contact: "手机 138****8888",
        status: "进行中",
        createdAt: 1759630800000
    },
    {
        id: 4,
        type: "招领",
        name: "一串钥匙",
        category: "钥匙",
        location: "体育馆入口",
        time: "2026-10-05T09:00",
        description: "发现一串钥匙，共有三把钥匙，挂着一个蓝色小挂件。",
        contact: "QQ 987654321",
        status: "进行中",
        createdAt: 1759606800000
    },
    {
        id: 5,
        type: "寻物",
        name: "黑色双肩包",
        category: "其他",
        location: "教学楼 B 区",
        time: "2026-10-05T08:00",
        description: "黑色双肩背包，里面可能有笔记本和几本课程资料。",
        contact: "微信 student_b",
        status: "进行中",
        createdAt: 1759603200000
    },
    {
        id: 6,
        type: "招领",
        name: "银色雨伞",
        category: "其他",
        location: "3号宿舍楼",
        time: "2026-10-04T20:00",
        description: "银色折叠雨伞，在宿舍楼大厅的座椅附近发现。",
        contact: "QQ 555666777",
        status: "进行中",
        createdAt: 1759588800000
    }
];

// ---------- 读取全部 ----------
function getAllItems() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
        return [...SEED_DATA];
    }
    try {
        return JSON.parse(raw);
    } catch (e) {
        return [...SEED_DATA];
    }
}

// ---------- 保存全部 ----------
function saveAllItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// ---------- 按 id 查找 ----------
function getItemById(id) {
    return getAllItems().find(item => String(item.id) === String(id)) || null;
}

// ---------- 新增 ----------
function addItem(item) {
    const items = getAllItems();
    const newItem = {
        id: Date.now(),
        status: "进行中",
        createdAt: Date.now(),
        ...item
    };
    items.unshift(newItem);
    saveAllItems(items);
    return newItem;
}

// ---------- 更新状态 ----------
function updateItemStatus(id, newStatus) {
    const items = getAllItems();
    const target = items.find(item => String(item.id) === String(id));
    if (!target) return false;
    target.status = newStatus;
    saveAllItems(items);
    return true;
}

// ---------- 删除 ----------
function deleteItem(id) {
    const items = getAllItems().filter(item => String(item.id) !== String(id));
    saveAllItems(items);
}

// ---------- 搜索 + 分类筛选 ----------
function filterItems({ keyword = "", category = "全部", type = "全部" } = {}) {
    const kw = keyword.trim().toLowerCase();
    return getAllItems().filter(item => {
        if (type !== "全部" && item.type !== type) return false;
        if (kw) {
            const haystack = [
                item.name, item.description, item.location, item.category
            ].join(" ").toLowerCase();
            if (!haystack.includes(kw)) return false;
        }
        return true;
    });
}

// ---------- 时间格式化 ----------
function formatTime(ts) {
    if (!ts) return "";
    const d = new Date(ts);
    if (isNaN(d.getTime())) return ts;
    const now = Date.now();
    const diff = now - d.getTime();
    const min = 60 * 1000;
    const hour = 60 * min;
    const day = 24 * hour;

    if (diff < min) return "刚刚";
    if (diff < hour) return Math.floor(diff / min) + " 分钟前";
    if (diff < day) return Math.floor(diff / hour) + " 小时前";
    if (diff < 7 * day) return Math.floor(diff / day) + " 天前";

    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${dd}`;
}

// ---------- 导出（Node 环境测试用）----------
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        STORAGE_KEY, SEED_DATA,
        getAllItems, saveAllItems, getItemById,
        addItem, updateItemStatus, deleteItem,
        filterItems, formatTime
    };
}