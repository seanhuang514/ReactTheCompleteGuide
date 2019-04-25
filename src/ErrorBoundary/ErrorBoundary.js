import React, { Component } from 'react'

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: ''
  }

  componentDidCatch = (e, information) => {
    console.log('ERROR!!', e)
    console.log('information!!', information)
    
    this.setState({
      hasError: true,
      errorMessage: e.message
    });
  }

  render(){
    if (this.state.hasError === true){
      return <h1>{this.state.errorMessage}</h1>
    }else{
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
