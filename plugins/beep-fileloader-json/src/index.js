import Vue from 'vue'

export default class BeepFileLoader {
  constructor() {
    this.baseFile = 'breachpasswords.json'
    this.data = {}
  }

  loadFile(data) {
    this.data = JSON.parse(data)
  }

  getKey(key) {
    return this.data[key]
  }

  getFileContents() {
    return this.baseFile
  }

  getNames() {
    return ["test"]
  }

  getClearTextPasswords() {
    return ["test1234"]
  }

  getHashedPasswords() {
    return ["45F534A53E45ACE3D"]
  }
}

BeepFileLoader.install = function(Vue, opts) {
  // If already installed - skip
  if (BeepFileLoader.install.installed) {
    return
  }

  BeepFileLoader.install.installed = true
  const loader = new BeepFileLoader()

  // Give access to the API methods
  Object.defineProperty(Vue.prototype, '$fileLoaderJson', {
    get() {
      return loader
    },
  })
}

