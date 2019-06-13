new Vue({
   el: '#app',
   delimiters: ['${','}'],
   data: {
      stocks: [],
      loading: false,
      newStock: { symbol: null },
   },
   mounted: function() {
      this.getStocks();
   },
   methods: {
      getStocks: function() {
         this.loading = true;
         StockAPIService().getStocks().then(payload => {
            this.stocks = payload;
            this.loading = false;
         });
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
