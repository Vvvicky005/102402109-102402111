// =================================
// 校园失物招领 - 数据层单元测试
// =================================

const { expect } = require("chai");
const { JSDOM } = require("jsdom");

const dom = new JSDOM("", { url: "http://localhost" });
global.window = dom.window;
global.localStorage = dom.window.localStorage;

const data = require("../js/data.js");


describe("校园失物招领 - 数据层单元测试", () => {

    beforeEach(() => {
        localStorage.clear();
    });

    it("首次调用 getAllItems 应返回 6 条种子数据", () => {
        const items = data.getAllItems();
        expect(items).to.be.an("array");
        expect(items.length).to.equal(6);
    });

    it("addItem 应新增一条并返回带 id 的对象", () => {
        data.getAllItems();
        const newItem = data.addItem({
            type: "寻物", name: "测试物品", category: "其他",
            location: "测试地点", time: "2026-10-06T10:00",
            description: "测试描述", contact: "test-contact"
        });
        expect(newItem).to.have.property("id");
        expect(newItem.status).to.equal("进行中");
        expect(data.getAllItems().length).to.equal(7);
    });

    it("getItemById 应能按 id 找到对应信息", () => {
        const item = data.getItemById(1);
        expect(item).to.not.be.null;
        expect(item.name).to.equal("校园卡");
    });

    it("getItemById 对不存在的 id 应返回 null", () => {
        expect(data.getItemById(99999)).to.be.null;
    });

    it("updateItemStatus 应将信息状态改为已找到", () => {
        const ok = data.updateItemStatus(1, "已找到");
        expect(ok).to.be.true;
        expect(data.getItemById(1).status).to.equal("已找到");
    });

    it("updateItemStatus 对不存在的 id 应返回 false", () => {
        expect(data.updateItemStatus(88888, "已找到")).to.be.false;
    });

    it("filterItems 按关键词'校园卡'应至少返回 1 条", () => {
        const res = data.filterItems({ keyword: "校园卡" });
        expect(res.length).to.be.greaterThan(0);
    });

    it("filterItems 按类型'寻物'应只返回 type=寻物 的数据", () => {
        const res = data.filterItems({ type: "寻物" });
        expect(res.length).to.be.greaterThan(0);
        res.forEach(item => expect(item.type).to.equal("寻物"));
    });

    it("filterItems 关键词不存在时应返回空数组", () => {
        expect(data.filterItems({ keyword: "不存在xyz" })).to.be.an("array").that.is.empty;
    });

    it("deleteItem 应删除指定 id 的信息", () => {
        const before = data.getAllItems().length;
        data.deleteItem(1);
        expect(data.getAllItems().length).to.equal(before - 1);
        expect(data.getItemById(1)).to.be.null;
    });

    it("formatTime 对刚刚的时间应返回'刚刚'", () => {
        expect(data.formatTime(Date.now() - 30 * 1000)).to.equal("刚刚");
    });

    it("formatTime 对空值应返回空字符串", () => {
        expect(data.formatTime(null)).to.equal("");
        expect(data.formatTime(undefined)).to.equal("");
    });

});