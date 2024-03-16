// 一个 cacheManager，单例
// 目前就是存到内存里，后续可以改成存到 redis 里
class CacheManager {
    private cache: Map<string, any>;
    constructor() {
        this.cache = new Map();
    }
    public set(key: string, value: any) {
        this.cache.set(key, value);
    }
    public get(key: string) {
        return this.cache.get(key);
    }
    public delete(key: string) {
        this.cache.delete(key);
    }
}
export const cacheManager = new CacheManager();