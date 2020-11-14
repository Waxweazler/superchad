import {Injectable} from '@angular/core';
import {CacheType} from '../vos/types/cache.type';

@Injectable({
    providedIn: 'root'
})
export class CacheService {

    private _cache = {};

    getOrElse(key: CacheType, orElse: () => any): any {
        if (!this._contains(key)) {
            this._put(key, orElse());
        }
        return this._get(key);
    }

    private _contains(key: CacheType): boolean {
        return !!this._get(key);
    }

    private _get(key: CacheType): any {
        return this._cache[key];
    }

    private _put(key: CacheType, value: any): void {
        this._cache[key] = value;
    }

}
