# 校园失物招领

> 2026 秋 软件工程 第二次结对作业

---

## 一、项目简介

一个面向校园的失物招领平台，旨在解决校园里失物信息分散、群聊消息容易被覆盖、查找不便的现实问题。

核心流程：

**发布信息 → 浏览/搜索 → 查看详情 → 联系发布者 → 更新状态**

---

## 二、功能清单

| 功能 | 页面 | 说明 |
|------|------|------|
| 浏览信息 | index.html | 卡片列表展示所有失物/招领信息 |
| 关键词搜索 | index.html | 匹配物品名称、描述、地点、类别 |
| 分类筛选 | index.html | 全部 / 寻物 / 招领 |
| 发布信息 | publish.html | 表单校验，发布新信息 |
| 查看详情 | detail.html | 展示完整信息与联系方式 |
| 一键复制联系方式 | detail.html | 点击按钮复制到剪贴板 |
| 标记状态 | detail.html | 已找到 / 已归还 |
| 删除信息 | detail.html | 二次确认后删除 |
| 我的发布 | my.html | 展示全部历史发布信息 |

---

## 三、目录结构

```
校园失物招领/
├── index.html              首页（浏览、搜索、分类）
├── publish.html            发布信息页
├── detail.html             详情页（查看、复制、标记状态、删除）
├── my.html                 我的发布
├── css/
│   └── style.css           全局样式
├── js/
│   ├── data.js             数据层（localStorage 封装）
│   ├── app.js              首页逻辑
│   ├── publish.js          发布逻辑
│   ├── detail.js           详情逻辑
│   └── my.js               我的发布逻辑
├── images/                 图片素材（预留）
├── tests/
│   └── data.test.js        数据层单元测试
├── package.json            npm 项目配置
└── README.md               本文档
```

---

## 四、使用说明

### 4.1 运行网页

1. 下载/克隆本项目所有文件到本地
2. **使用谷歌浏览器（Chrome）**，推荐配合 VS Code 的 Live Server 插件运行
3. 在 VS Code 里右键 `index.html` → **Open with Live Server**
4. 浏览器会自动打开 `http://127.0.0.1:5500/index.html`

> ⚠️ 不建议直接双击 `index.html`，因为浏览器对 `file://` 协议下的 localStorage 有安全限制，可能导致卡片不显示。

### 4.2 数据存储说明

所有数据保存在浏览器 `localStorage` 的 `lostFoundItems` 字段下。首次打开会自动写入 6 条示例数据。

**清空数据方法：** 按 `F12` → Application → Local Storage → 删除 `lostFoundItems` 字段。

### 4.3 运行单元测试

**环境要求：** Node.js（v18 以上）

```bash
# 1. 安装依赖
npm install

# 2. 运行测试
npm test
```

**预期输出：** `12 passing`

---

## 五、技术栈

- 原生 HTML / CSS / JavaScript
- localStorage 持久化
- Mocha + Chai + JSDOM 单元测试

---

## 六、开发者

- 结对编程，两人协作完成
- 102402109 - 102402111

<!-- 本次修改由队友李青容提交，用于演示 fork + PR 协作流程 -->
