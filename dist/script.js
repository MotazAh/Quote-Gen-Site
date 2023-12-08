// https://gist.github.com/natebass/b0a548425a73bdf8ea5c618149fe1fce.js
const body = document.getElementsByTagName("body")[0];
const COLORS = ["#99b7f3", "#59e3a4", "#ff90c6", "#504f56", "#e51a1a", "#5ab931"];

body.style.setProperty('--base-color', COLORS[5]);

// Redux:
const NEWQUOTE = "NEWQUOTE";
const getQuote = quote => {
  return {
    type: NEWQUOTE,
    quote: quote };

};

const quoteReducer = (state = [], action) => {
  switch (action.type) {
    case NEWQUOTE:
      return { quote: action.quote["quote"], author: action.quote["author"] };
    default:
      return state;}

};

const store = Redux.createStore(quoteReducer);

// React:
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = { "quote": "", "author": "" };
    this.quotes = [];
    this.generateQuote = this.generateQuote.bind(this);
  }

  componentDidMount() {
    // Fetch quotes from json file in link
    (async () => {
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
    return /*#__PURE__*/(
      React.createElement("div", { class: "quote-div" }, /*#__PURE__*/
      React.createElement("h2", { id: "text", class: "smooth-color" }, /*#__PURE__*/React.createElement("i", { class: "fa fa-quote-left" }), " ", this.props.quote.quote, " ", /*#__PURE__*/React.createElement("i", { class: "fa fa-quote-right" })), /*#__PURE__*/
      React.createElement("p", { id: "author", class: "smooth-color" }, "- ", this.props.quote.author), /*#__PURE__*/
      React.createElement("hr", { class: "quote-line smooth-color" }), /*#__PURE__*/
      React.createElement("div", { class: "btn-div" }, /*#__PURE__*/
      React.createElement("button", { id: "new-quote", class: "btn smooth-color", onClick: this.generateQuote }, "New Quote"), /*#__PURE__*/
      React.createElement("div", { class: "btn-seperator" }), /*#__PURE__*/
      React.createElement("a", { class: "btn smooth-color", id: "tweet-quote", href: "twitter.com/intent/tweet", target: "_top" }, /*#__PURE__*/React.createElement("i", { class: "fa fa-twitter" })))));



  }}


const mapStateToProps = state => {
  return { quote: state };
};

const mapDispatchToProps = dispatch => {
  return {
    generateNewQuote: quote => {
      dispatch(getQuote(quote));
    } };

};

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement(Provider, { store: store }, /*#__PURE__*/
      React.createElement(Container, null)));


  }}
;

ReactDOM.render( /*#__PURE__*/
React.createElement(React.StrictMode, null, /*#__PURE__*/
React.createElement(AppWrapper, null)),

document.getElementById('root'));