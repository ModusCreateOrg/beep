<script>
export default {

  baseFile: 'breachpasswords.json',

  getFileContents() {
    return this.baseFile
  },

  getNames() {
    return {"names":["test"]}
  },

  getClearTextPasswords() {
    return {"cleartextpasswords":["test1234"]}
  },

  getHashedPasswords() {
    return {"hashedpasswords":["45F534A53E45ACE3D"]}
  },

}
</script>
