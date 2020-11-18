import {CacheItemType} from '../vos/types/cache.type';
import {CacheVO} from '../vos/cache.vo';

export abstract class CacheService {

    private _cache: CacheVO;

    protected constructor() {
        this.clearCache();
    }

    protected _getCacheOrElse<T>(cacheItemType: CacheItemType, orElse: () => T): T {
        if (!this._cache.has(cacheItemType)) {
            this._cache.set(cacheItemType, orElse());
        }
        return this._cache.get(cacheItemType);
    }

    clearCache(): void {
        this._cache = new CacheVO();
    }

}
