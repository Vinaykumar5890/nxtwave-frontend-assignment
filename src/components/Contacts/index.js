import {Component} from 'react'
import './index.css'

class Contacts extends Component {
   state = {contactList: []}
  componentDidMount() {
    this.fetchContact()
  }


  fetchContact = async () => {
    const resposne = await fetch(
      'https://nxtwave-assignment-q3vc.onrender.com/contacts',
    )
    const data = await resposne.json()
    this.setState({contactList: data})
  }

  cliked = async id => {
    try {
      const response = await fetch(
        `https://nxtwave-assignment-q3vc.onrender.com/contacts/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.ok) {
        console.log(`Contact with ID ${id} deleted successfully`)
        // Optionally refresh data or show success message
      } else {
        const errorData = await response.json()
        console.error('Delete failed:', errorData.message)
      }
    } catch (error) {
      console.error('Error deleting contact:', error)
    }
  }

  rendercontact() {
    const {contactList} = this.state
    return (
      <div>
        <ul className="ul">
          {contactList.map(i => (
            <li className="li" key={i.id}>
              <h1>{i.name}</h1>
              <h4>{i.email}</h4>
              <h5>{i.contact}</h5>
              <button onClick={this.cliked(i.id)}>Delete</button>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {contactList} = this.state

    return (
      <div className="bg-container">
        <div className="buttoner">
          <button className="postButton">Post</button>
        </div>
        {this.rendercontact()}
      </div>
    )
  }
}

export default Contacts
