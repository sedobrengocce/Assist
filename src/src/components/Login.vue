<script>
/* eslint-disable no-unused-vars */
import { mapGetters, mapMutations, mapActions } from 'vuex';
/* eslint-enable no-unused-vars */

export default {
  name: 'Login',
  data() {
    return {
      user: '',
      pass: '',
    };
  },
  computed: {
    ...mapGetters({
      loginModal: 'isOpenLoginModal',
    }),
  },
  methods: {
    ...mapMutations(['openCloseLogin']),
    ...mapActions({
      login: 'login',
    }),
    close() {
      this.user = '';
      this.pass = '';
      this.openCloseLogin(false);
    },
  },
  // eslint-disable-next-line
  render(h) {
    return (
      <div>
        <div class={{ Backdrop: true, in: this.loginModal }} onClick={ () => {
          this.openCloseLogin(false);
        }}>
        </div>
        <div class={{ Modal: true, in: this.loginModal }}>
          <div class="Login">
            <div class="ModalHeader">
              <div onClick={this.close}>
                <i class="fas fa-times"></i>
              </div>
            </div>
            <div class="ModalBody">
              <form>
                <h2>Log in</h2>
                <label for="username">User Name</label>
                <input type="text" name="username" placehoder="Username" autocomplete="username" v-model={this.user} />
                <label for="bbcode">BB Code</label>
                <input type="password" name="bbcode" placehoder="Password" autocomplete="current-password" v-model={this.pass} />
              </form>
            </div>
            <div class="ModalFooter">
              <div class="Button" onClick={ () => {
                this.login({
                  username: this.user,
                  code: this.pass,
                });
                this.close();
              }}>Log In</div>
              <div class="Button" onClick={ () => {
                this.close();
              }}>Cancel</div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
</script>
<style lang="scss" scoped>
@import '../styles/colors.scss';

.Login {
  position: relative;
  border-radius: 1px;
  padding: 6px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid $border-alpha03;
  label {
    font-weight: 400;
    font-size: 13px;
    padding-left: 5px;
    padding-bottom: 5px;
    color: $border-alpha03;
    display: block;
  }
  input {
    width: 98%;
    margin-bottom: 5px;
  }
}
.ModalHeader {
  display: flex;
  flex-flow: row-reverse nowrap;
  align-items: center;
  min-height: 25px;
  margin: 2px 8px;
  font-size: 0.8em;
  color: $border-alpha12;
}
h2 {
  margin-top: 0;
  text-align: center;
  font-size: 20px;
  font-weight: normal;
}
.ModalFooter {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  min-height: 25px;
  margin: 16px 0 8px 0;
  .Button {
    border: 2px solid $border-alpha12;
    border-radius: 2px;
    color: rgba(10,10,10, 0.85);
    font-size: 13px;
    margin: 4px 6px;
    padding: 4px 8px;
    cursor: pointer;
    font-weight: 600;
    &:hover {
      background-color: rgba(10,10,10,0.2);
    }
  }
}
</style>
