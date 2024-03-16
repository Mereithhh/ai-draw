// 每天限制一定的次数，比如 100 次。 超过100次返回错误
// 时间用自然日窗口，每天生成一个 key，存储当天的请求次数

import { cacheManager } from "./cache";

const globalLimit = Number(process.env.API_LIMIT_PREDAY || 500);
// 数据用 cachemanager
export class LimitManager {
    private static instance: LimitManager;
    public static getInstance() {
        if (!LimitManager.instance) {
            LimitManager.instance = new LimitManager();
        }
        return LimitManager.instance;
    }
    private isExceed(key: string, limit: number, incrNum: number = 1) {
        const value = cacheManager.get(key) || 0;
        console.log("checkLimit", key,value,limit)
        if (value >= limit) {
            return true;
        }
        cacheManager.set(key, value + incrNum);
        return false;
    }
    public check(incrNum = 1) {
        // 检查是否超过限制
        const key = new Date().toISOString().slice(0, 10);
        if (this.isExceed(key, globalLimit,incrNum)) {
            return true;
        }
        return false;
    }
    public getRestTime() {
        // 获取剩余次数
        const key = new Date().toISOString().slice(0, 10);
        const value = cacheManager.get(key) || 0;
        return globalLimit - value;
    }
}
