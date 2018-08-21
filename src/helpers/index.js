export default {
  env(constant) {
    return process.env[`VUE_APP_${constant}`]
  },
}
