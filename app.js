new Vue ({
    el: '#app',
    data: {
        currencies: {},
        amount: 0,
        from: 'BRL',
        to: 'USD',
        result: 0,
        loaded: false
    },
    mounted() {
        this.getCurrencies()
    },
    computed: {
        formattedCurrencies() {
            return Object.values(this.currencies);
        },
        calculateResult() {
            return (Number(this.amount) * this.result).toFixed(2)
        },
        disabled() {
            return this.amount === 0 || this.amount === "" || this.loaded // !this.amount  
        }
    }
    ,
    methods: {
        getCurrencies() {
            const currencies = localStorage.getItem('currencies');
            if (currencies) {
                this.currencies = JSON.parse(currencies)
                return;
            }
            axios.get('https://free.currencyconverterapi.com/api/v6/currencies')
            .then(response => {
                this.currencies = response.data.results
                localStorage.setItem('currencies', JSON.stringify(response.data.results))
            })
        },
        convertCurrency() {
            this.loaded = true
            const key = `${this.from}_${this.to}`
            axios.get(`https://free.currencyconverterapi.com/api/v6/convert?q=${key}`)
            .then((response) => {
                console.log(response)
                this.result = response.data.results[key].val
                this.loaded = false
                
            })
        }
    },
    watch: {
        from() {
            this.result = 0
        },
        to() {
            this.result = 0
        }
    }
})