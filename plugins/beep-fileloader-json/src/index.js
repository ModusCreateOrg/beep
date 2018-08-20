import Vue from 'vue'

export default class BeepFileLoader {
  constructor() {
    this.baseFile = 'breachpasswords.json'
    this.data = {}
  }

  loadFile(data) {
    try {
      this.data = JSON.parse(data)["breachdata"]
    } catch (e) {
      this.data = "Could not pass input file: "+e
    }
  }

  getFileContents() {
    return this.baseFile
  }


  getBreachData(search, type) {
    const breachdata = this.data
    var count = 0
    var entry = ""
    var results = {"count":0,"matches":[]}

    if (type === "name") {
        search = search.toLowerCase()
    }

    for (var i in breachdata) {
      if (type === "name") {
        entry = breachdata[i][type].toLowerCase()
      } else {
        entry = breachdata[i][type]
      }
      if (entry === search) {
          count++
          results["matches"].push(breachdata[i])
      }
    }
    if (count > 0) {
      results["count"] = count
      return results
    } else {
      return false
    }
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
