class Cache {
  constructor() {
    this.cache = {};
  }

  save(key, data) {
    if (!this.cache[key]) this.cache[key] = data;
  }

  get(key) {
    return this.cache[key] || null;
  }
}

export default Cache;
