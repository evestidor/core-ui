new Vue({
   el: '#app',
   delimiters: ['${','}'],
   data: {
      stocks: [],
      availableStocks: [],
      loading: {},
      newStock: { symbol: null },
   },
   mounted: function() {
      this.getStocks();
      this.getAvailableStocks();
      setInterval(this.updatePrices, 3000);
   },
   methods: {
      getAvailableStocks: function() {
         this.loading.dropdown = true;
         StockAPIService().getAvailableStocks().then(payload => {
            this.availableStocks = payload;
            this.loading.dropdown = false;
         })
      },

      getStocks: function() {
         this.loading.table = true;
         StockAPIService().getStocks().then(payload => {
            this.stocks = payload;
            this.loading.table = false;
         });
      },

      updatePrices: function() {
         const vm = this;

         StockAPIService().getStocks().then(function(payload) {
            const prices = getPrices(payload);
            const changedPrices = getChangedPrices(prices);

            updateStockPrices(changedPrices);
            highlightChangedPrices(changedPrices);
         });

         function getPrices(payload) {
            return payload.reduce((obj, item) => {
               obj[item.symbol] = item.price;
               return obj;
            }, {});
         }

         function getChangedPrices(prices) {
            return vm.stocks.reduce((obj, item) => {
               if (item.price !== prices[item.symbol])
                  obj[item.symbol] = prices[item.symbol];
               return obj;
            }, {});
         }

         function updateStockPrices(changedPrices) {
            vm.stocks = vm.stocks.map(item => {
               if (changedPrices[item.symbol])
                  item.price = changedPrices[item.symbol];
               return item;
            });
         }

         function highlightChangedPrices(changedPrices) {
            vm
               .$refs
               .stocksTable
               .$refs
               .rows
               .filter(row => Boolean(changedPrices[row.rowId]))
               .map(row => row.$refs.price)
               .forEach(el => {
                  $(el).transition('glow');
               });
         }
      },

      addStock: function() {
         StockAPIService().addStock(this.newStock.symbol).then(() => {
            this.getStocks();
         })
      }
   }
});

function StockAPIService(state) {
   return {
      getStocks: function() {
         return get('/stock-manager/stocks/');
      },

      addStock: function(symbol) {
         return post('/stock-manager/stocks/', { symbol });
      },

      getAvailableStocks: function() {
         return get('/stock-manager/stocks/available/');
      },
   }
}

function get(url) {
   return new Promise((resolve, reject) => {
      NetworkHandler()
         .get(url)
         .then((response) => resolve(response.data))
         .catch(reject)
   });
}


function post(url, payload) {
   return NetworkHandler().post(url, payload);
}


function NetworkHandler() {
   return axios.create({
      baseURL: 'http://0.0.0.0:8001',
      withCredentials: true,
      headers: {'Content-Type': 'application/json'},
   });
}


function showDefaultErrorMessage() {
   console.error('error');
}
