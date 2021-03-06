/* istanbul ignore file */
export const useDashboardMixin = {
  data () {
    return {
      holdingPieChartData: { sumCash: 0, sumEquity: 0, numEquity: 0, sumOption: 0, numOption: 0 }
    }
  },
  computed: {
    holdingData () {
      return this.holdingPieChartData
    }
  },
  methods: {
    handleHoldingPieChartData (_id) {
      if (this.account && this.stocks && this.stocks.length !== 0) {
        const sumCash = Number(this.account.cash)
        let sumEquity = 0
        let sumOption = 0
        let numEquity = 0
        let numOption = 0
        this.stocks.forEach(stock => {
          if (stock.asset_class.toLowerCase().includes('equity')) {
            numEquity++
            sumEquity += Number(stock.market_value)
          } else if (stock.asset_class.toLowerCase().includes('option')) {
            numOption++
            sumOption += Number(stock.market_value)
          }
        })
        this.holdingPieChartData.sumCash = sumCash
        this.holdingPieChartData.numEquity = numEquity
        this.holdingPieChartData.sumEquity = sumEquity
        this.holdingPieChartData.numOption = numOption
        this.holdingPieChartData.sumOption = sumOption
      }
    }
  }
}
