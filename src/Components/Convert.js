import React, { Component } from 'react';
class Convert extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currencies:['USD', 'BGN', 'CNY', 'CAD', 'AUD', "PHP", 'EUR', 'MXN', 'JPY', 'HUF', 'RON', 'NOK', 'NZD' ],
            base:"USD",
            Amount:"",
            Convertto:["EUR"],
            results:"",
            date:new Date()
         }
    }
    handleSelect = (e) =>{
        this.setState({
            [e.target.name] : e.target.value,
            results:null
        }, this.calculate
        )

    }
    handleInput = (e) =>{
        this.setState({
            Amount:e.target.value
        },
        this.calculate
        )
    }
    calculate = () =>{
        const Amount = this.state.Amount
        if(Amount === isNaN){
            return 
        }else{
         fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`) 
         .then(resp => resp.json())
         .then(data =>{
            console.log(data)
             const results = (data.rates[this.state.Convertto] * this.state.Amount).toFixed(4)
             this.setState({
                 results
             })
         })
        }
    }
    render() { 
        return ( 
            <div className="Convert">
                <article className="header">
                    <span className="Amount">{this.state.Amount}</span>
                    <span className="base">{this.state.base}</span>
                 <span> is equivalent to</span></article>
                 <h4 className="base">{this.state.results === null ? 'Calculating...' : this.state.results}  {this.state.Convertto}</h4>
                  <p className="base">As of {this.state.date.toDateString()}</p>
                <div className="container">
                  <div className="main">
                    <div>
                        <form className="form-1">
                            <input type="number" name=""
                             onChange={this.handleInput} />
                            <select className="select"
                            name="base"
                            value={this.state.base}
                            onChange={this.handleSelect}
                            >
                                {this.state.currencies.map((currency) => 
                                <option key={currency}
                                value={currency}>{currency}</option>)}
                            </select>
                        </form>
                    </div>
                    <div>
                        <form className="form-2">
                            <input type="" name="" 
                            value={this.state.results === null ? 'Calculating ...' : this.state.results} disabled/>
                            <select className="select"
                               name="Convertto"
                               value={this.state.Convertto}
                               onChange={this.handleSelect}
                               >
                            {this.state.currencies.map((currency) => 
                                <option key={currency}
                                value={currency}>{currency}</option>)}
                            </select>
                        </form>
                    </div>  
                  </div>
                </div>
            </div>
         );
    }
}
 
export default Convert;