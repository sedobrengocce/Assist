
<script>
/* eslint-disable no-unused-vars */
import TitleBar from '@/components/TitleBar';
import Login from '@/components/Login';
/* eslint-enable no-unused-vars */

export default {
  name: 'MainApp',
  render() {
    return (
      <div class="MainContainer">
        <Login />
        <TitleBar/>
        <div class="BodyWrapper">
          <router-view/>
        </div>
      </div>
    );
  },
};
</script>

<style lang="scss">

@import './styles/mediaMixin.scss';
@import './styles/colors.scss';

@font-face {
  font-family: BillyOhio;
  src: url(./fonts/BillyOhio.ttf);
}
body {
  background-color: #efefef;
  font-family: sans-serif;
  margin: 0;
  min-height: 100vh;
}
#assist {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #9ec9f5;
  margin-top: 60px;
}
.MainContainer {
  background-color: #ffffff;
  min-width: 100%;
  min-height: 100vh;
  box-shadow: $shadow;
}
.BodyWrapper {
  margin: 16px 8px 0 8px;
  height: fit-content;
  padding-bottom: 16px;
}
.FreeSpace {
  flex-grow: 1;
}
.Backdrop {
  background-color: rgba(0,0,0,0);
  position: fixed;
  visibility: hidden;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in;
  z-index: 0;
  &.in {
    z-index: 10;
    visibility: visible;
    background-color: rgba(0,0,0,0.6);
  }
}
.Modal {
  background-color: #fefefe;
  padding: 2px;
  position: fixed;
  top: -100vh;
  margin: 5% auto;
  max-width: 300px;
  left: 0;
  right: 0;
  transition: all 0.6s ease-in-out;
  z-index: 0;
  border-radius: 2px;
  box-shadow: $shadow;
  &.in {
    z-index: 15;
    top: 80px;
  }
}

@include tablet-desktop {
  body{
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: flex-start;
  }
  .MainContainer {
    border-left: 1px solid $border-alpha03;
    border-right: 1px solid $border-alpha03;
  }
}

@include tablet {
  .MainContainer {
    min-width: 650px;
    max-width: 650px;
  }
}

@include desktop {
  .MainContainer {
    min-width: 900px;
    max-width: 900px;
  }
}

</style>

