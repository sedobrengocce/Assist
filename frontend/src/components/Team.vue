<script>
/* eslint-disable no-unused-vars */
import { mapGetters } from 'vuex';
/* eslint-enable no-unused-vars */

export default {
  name: 'Team',
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
    }),
  },
  watch: {
    isLoggedIn(val) {
      if (!val) {
        this.$router.push('/');
      }
    },
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.push('/');
    }
  },
  // eslint-disable-next-line
  render(h) {
    return (
      <div class="PageContainer">
        <h1> Team Name </h1>
        <div class="NextOpponents">
          <div class="Cup"></div>
          <div class="Friendly"></div>
          <div class="Season"></div>
          <div class="PostSeason"></div>
          <div class="LP"></div>
          <div class="BBB"></div>
        </div>
        <div class="Info">
          <div class="Shape"></div>
          <div class="TotalDMI"></div>
        </div>
      </div>
    );
  },
};
</script>
