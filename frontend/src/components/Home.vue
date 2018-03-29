<script>
/* eslint-disable no-unused-vars */
import { mapGetters } from 'vuex';
/* eslint-enable no-unused-vars */

export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      team: 'teamId',
    }),
  },
  mounted() {
    if (this.isLoggedIn) {
      this.$router.push(`/team/${this.team}`);
    }
  },
  watch: {
    isLoggedIn(val) {
      if (val) {
        this.$router.push(`/team/${this.team}`);
      }
    },
  },
  // eslint-disable-next-line
  render(h) {
    return (
      <div class="HomeContainer">
        <div class="Card">
          <div class="CardTitle">Welcome to Assit!</div>
          <div class="CardBody">
            <p> This tool helps <a href="https://www.buzzerbeater.com" target="_blank">BuzzerBeater</a>'s users
            to prepare their games better by giving them statistics on their next opponents.
            </p>
            <p> This site has no official affiliation with <a href="https://www.buzzerbeater.com" target="_blank">BuzzerBeater</a></p>
          </div>
        </div>
        <div class="Card">
          <div class="CardTitle">What's this?</div>
          <div class="CardBody">
            <p> Full statistics on your next opponent (strategies used, game ratings, player's
                statistics, etc...), statistics of your league by team and by player, aids to
                setup your team's lineup, a tool for calculating salary (Thanks to Joey Ka
                for his formulas). In a sentence a tool to prepare your game better!.
            </p>
          </div>
        </div>
        <div class="Card">
          <div class="CardTitle">What's BuzzerBeater</div>
          <div class="CardBody">
            <p> <a href="https://www.buzzerbeater.com" target="_blank">BuzzerBeater</a>, the world's
                largest free online basketball manager game. Can you beat the buzzer? Sign up now to
                play against the greatest basketball managers in the world! </p>
          </div>
        </div>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colors.scss';
@import '../styles/mediaMixin.scss';

.HomeContainer {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  .Card {
    min-width: 95%;
    min-height: 50px;
    border: 1px solid $border-alpha12;
    border-radius: 2px;
    margin: 6px 0;
    box-shadow: $shadow;
    .CardTitle {
      font-size: 25px;
      margin: 16px 8px;
      text-align: center;
      font-weight: bold;
    }
    .CardBody {
      margin: 8px;
      font-size: 14px;
    }
  }
}

@include tablet-desktop {
  .HomeContainer {
    .Card {
      min-width: 0;
      max-width: 350px;
    }
  }
}
</style>
