<template>
  <div class="brokerage_page">
    <img src="../../assets/TradeShare.png" alt="TradeShare Logo" />
    <p id="brokerage_desc_text">
      The best way to use TradeShare is to link your brokerage account so that
      we take care of keeping your dashboard up to date automatically.
    </p>
    <div class="form_container">Form</div>
    <p id="brokerage_not_required">
      Don’t have a brokerage service? No problem! You can still use TradeShare,
      you’ll just need to manually add your activity
    </p>
  </div>
</template>

<script>
export default {
  name: "BrokerageSignUp",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.brokerage_page {
  margin: 34px 20% 34px 20%;
  margin-top: 60px;
}
.form_container {
  border: 1px black solid;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
p {
  font-size: 22;
  letter-spacing: 0.15px;
  font-family: Roboto;
}
#brokerage_not_required {
  color: rgba(0, 0, 0, 0.56);
}
</style>
