import React from 'react'
import shortid from 'shortid'
class NavBar extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (e) {
    this.props.onSourceChange(e.target.dataset.id)
  }
  render () {
    var sources = this.props.sources
    if (!sources) return <p>Loading</p>
    return (
      <div className='nav-bar'>
        
        {sources.map((source, index) => {
          return (
            <div key={shortid.generate()}>
              <button data-id={index} onClick={this.handleChange}>
                {source.name}
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}
export default NavBar
