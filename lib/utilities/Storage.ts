export class Storage<K = string, V = any> extends Map<K, V> {
  gets(keys: K[]): (V | undefined)[] {
      return keys.map(key => super.get(key));
  }

  sets(entries: [K, V][]): this {
      entries.forEach(([key, value]) => {
          super.set(key, value);
      });
      return this;
  }

  deletes(keys: K[]): void {
      keys.forEach(key => super.delete(key));
  }

  find(fn: (value: V, key: K) => boolean): [K, V] | undefined {
      return Array.from(this).find(([key, value]) => fn(value, key));
  }

  map<T>(fn: (value: V, key: K, index: number, cache: [K, V][]) => T) {
      return Array.from(this).map(([key, value], index, cache) => {
          return fn(value, key, index, cache);
      });
  }

  filter(fn: (value: V, key: K, index: number, cache: [K, V][]) => boolean) {
      return Array.from(this).filter(([key, value], index, cache) => {
          return fn(value, key, index, cache);
      }).map(([_, value]) => value);
  }

  first(): V | undefined {
      return this.values().next().value;
  }

  last(): V | undefined {
      const values = Array.from(this.values());
      return values[values.length - 1];
  }

  all(): V[] {
      return Array.from(this.values());
  }
}
