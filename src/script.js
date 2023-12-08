// https://gist.github.com/natebass/b0a548425a73bdf8ea5c618149fe1fce.js
const body = document.getElementsByTagName("body")[0];
const COLORS = ["#99b7f3", "#59e3a4", "#ff90c6", "#504f56", "#e51a1a", "#5ab931"];

body.style.setProperty('--base-color', COLORS[5]);

// Redux:
const NEWQUOTE = "NEWQUOTE";
const getQuote = (quote) => {
  return {
    type: NEWQUOTE,
    quote: quote
  }
};

const quoteReducer = (state = [], action) => {
  switch (action.type) {
    case NEWQUOTE:
      return {quote: action.quote["quote"], author: action.quote["author"]};
    default:
      return state;
  }
};

const store = Redux.createStore(quoteReducer);

// React:
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {"quote": "", "author": ""};
    this.quotes = [];
    this.generateQuote = this.generateQuote.bind(this);
  }
  
  componentDidMount() {
    // Fetch quotes from json file in link
    (async() => {
  const url2 = "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json";
  const response = await fetch(url2);
  const recievedData = await response.text();
  this.quotes = JSON.parse(recievedData);
  this.generateQuote();
})();

  }
  
  generateQuote() {
    this.props.generateNewQuote(this.quotes[Math.floor(Math.random() * this.quotes.length)]);
    let colorIndex = Math.floor(Math.random() * COLORS.length);
    while (COLORS[colorIndex] == body.style.getPropertyValue('--base-color')) {
      colorIndex = Math.floor(Math.random() * COLORS.length);
    }
    body.style.setProperty('--base-color', COLORS[colorIndex]);
  }
  
  render() {
    return(
      <div class="quote-div">
        <h2 id="text" class="smooth-color"><i class="fa fa-quote-left"></i> {this.props.quote.quote} <i class="fa fa-quote-right"></i></h2>
        <p id="author" class="smooth-color">- {this.props.quote.author}</p>
        <hr class="quote-line smooth-color"/>
        <div class="btn-div">
          <button id="new-quote" class="btn smooth-color" onClick={this.generateQuote}>New Quote</button>
          <div class="btn-seperator"></div>
          <a class="btn smooth-color" id="tweet-quote" href="twitter.com/intent/tweet" target="_top"><i class="fa fa-twitter"></i></a>
        </div>
      </div>
           );
  }
}

const mapStateToProps = (state) => {
  return {quote: state}
};

const mapDispatchToProps = (dispatch) => {
  return {
    generateNewQuote: (quote) => {
      dispatch(getQuote(quote))
    }
  }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container/>
      </Provider>
    );
  }
};

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);