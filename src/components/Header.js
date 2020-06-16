import React from 'react'
class Header extends React.Component {
  constructor (props) {
    super(props);
    this.state ={searchText: ''}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleInitSearch = this.handleInitSearch.bind(this);
  }
  handleChange(event){
    this.props.onLanguageChange(event.target.value);
  }
  handleSubmit(event) {
    console.log()
    event.preventDefault();
  }
  handleSearchTextChange(event) {
    this.setState({searchText: event.target.value});
  }
  handleInitSearch(event) {
    if(event.key==='Enter'){
      console.log('HERE want to search for ' + this.state.searchText);
      if(this.state.searchText.trim().length !==   0)
      this.props.onSearch(this.state.searchText);
    }
  }
  render () {
   
    return (
      <div className='header'>
        <h1>GIZMO</h1>
        <div className='header-options'>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.searchText} onChange={this.handleSearchTextChange} onKeyPress={this.handleInitSearch}/>
          </form>
          <select value={this.props.value} onChange={this.handleChange}>
            <option value="ar">AR</option>
            <option value="de">DE</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
            <option value="he">HE</option>
            <option value="it">IT</option>
            <option value="nl">NL</option>
            <option value="no">NO</option>
            <option value="pt">PT</option>
            <option value="ru">RU</option>
            <option value="se">SE</option>
            <option value="ud">UD</option>
            <option value="zh">ZH</option>
          </select>
        </div>
      </div>
    )
  }
}
export default Header
