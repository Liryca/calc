class DataModel {
  constructor() {
    this.data = null;
    this.config = null;
  }

  setData(data) {
    this.data = data;
  }

  setConfig(config) {
    this.config = config;
  }

  getData() {
    return this.data;
  }

  getConfig() {
    return this.config;
  }
}

export default DataModel;
