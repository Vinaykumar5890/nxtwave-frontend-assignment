import {Component} from 'react'
import './index.css'

class Contacts extends Component {
  state = {
    contactList: [],
    name: '',
    email: '',
    contact: '',
    editId: null,
  }

  componentDidMount() {
    this.fetchContact()
  }

  fetchContact = async () => {
    const response = await fetch(
      'https://nxtwave-assignment-q3vc.onrender.com/contacts',
    )
    const data = await response.json()
    this.setState({contactList: data})
  }

  deleteContact = async id => {
    await fetch(`https://nxtwave-assignment-q3vc.onrender.com/contacts/${id}`, {
      method: 'DELETE',
    })
    this.fetchContact()
  }

  addOrUpdateContact = async () => {
    const {name, email, contact, editId} = this.state

    const body = {name, email, contact}
    const url = editId
      ? `https://nxtwave-assignment-q3vc.onrender.com/contacts/${editId}`
      : 'https://nxtwave-assignment-q3vc.onrender.com/contacts'

    const method = editId ? 'PUT' : 'POST'

    await fetch(url, {
      method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    })

    this.setState({name: '', email: '', contact: '', editId: null})
    this.fetchContact()
  }

  editContact = contact => {
    this.setState({
      name: contact.name,
      email: contact.email,
      contact: contact.contact,
      editId: contact.id,
    })
  }

  render() {
    const {contactList, name, email, contact, editId} = this.state
    return (
      <div className="container">
        <h1 className="title">Contact Manager</h1>
        <div className="form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => this.setState({name: e.target.value})}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => this.setState({email: e.target.value})}
          />
          <input
            type="text"
            placeholder="Contact"
            value={contact}
            onChange={e => this.setState({contact: e.target.value})}
          />
          <button onClick={this.addOrUpdateContact} type="button">
            {editId ? 'Update' : 'Add'}
          </button>
        </div>
        <ul className="list">
          {contactList.map(i => (
            <li key={i.id} className="card">
              <h3>{i.name}</h3>
              <p>{i.email}</p>
              <p>{i.contact}</p>
              <div className="actions">
                <button onClick={() => this.editContact(i)} type="button">Edit</button>
                <button onClick={() => this.deleteContact(i.id)} type="button">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Contacts
