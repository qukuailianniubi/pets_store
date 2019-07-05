export default {
  get_user_pet: function () {

    let users = this.$store.state.users, login_name = this.$store.state.login_name
    for (const user of users) {
      if (login_name === user.account)
        return user.data
    }
  }
}