class User {
  login(ctx) {
    console.log(ctx)
  }

  register(ctx) {
    console.log(ctx)
  }
}
module.exports = new User()
