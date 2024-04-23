export default class Storage<K = string, V = any> extends Map<K, V> {
    get(key: K): V | undefined  {
      return super.get(key);
    }
   
    set(key: K, value: V): this {
      super.set(key, value);
      return this;
    }

    delete(key: K): boolean {
      return super.delete(key);
    }
   
    gets(keys: K[]): (V | undefined)[] {
      return keys.map(key => super.get(key));
    }
   
    sets(entries: [K, V][]): void {
      entries.forEach(([key, value]) => {
        super.set(key, value);
      });
    }

    deletes(keys: K[]): void {
      return keys.forEach(key => super.delete(key));
    }
   
    find(fn: (value: V, key: K) => boolean): [K, V] | undefined {
      return Array.from(this).find(([key, value]) => fn(value, key));
    }
   
    map<T>(fn: (value: V, key: K, index: number, cache: [K, V][]) => T) {
      return Array.from(this).map(([key, value], index, cache) => {
        fn(value, key, index, cache)
      })
    }
   
    filter(fn: (value: V, key: K, index: number, cache: [K, V][]) => boolean) {
      return Array.from(this).filter(([key, value], index, cache) => {
        fn(value, key, index, cache);
      }).map(([_, value]) => value);
    }
   
    firts(): V | undefined {
      return this.values().next().value;
    }
   
    last(): V | undefined {
      const values = Array.from(this.values());
      return values[values.length -1]
    }
   
    all(): V[] | undefined {
      return Array.from(this.values())
    }
   
    clear(): void {
      super.clear();
    }
   
    has(key: K): boolean {
      return super.has(key);
    }
   
}