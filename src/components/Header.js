import React from 'react'
class Header extends React.Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    this.props.onLanguageChange(event.target.value);
    console.log('JERE')
  }
  render () {
   
    return (
      <div className='header'>
        <h1>GIZMO</h1>
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
    )
  }
}
export default Header
