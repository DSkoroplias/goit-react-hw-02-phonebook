import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import ContactFilter from './ContactFilter/ContactFilter';

import styles from './app.module.scss';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {
    if (this.isDuplicate(name)) {
      alert(`${name} is already in contacts`);
      return false;
    }

    this.setState(prevState => {
      const { contacts } = prevState;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { contacts: [newContact, ...contacts] };
    });
    return true;
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContact = contacts.filter(contact => contact.id !== id);
      return { contacts: newContact };
    });
  };

  isDuplicate(name) {
    const normalizedName = name.toUpperCase();
    const { contacts } = this.state;
    const result = contacts.find(({ name }) => {
      return name.toUpperCase() === normalizedName;
    });
    return Boolean(result);
  }

  getFilteredContact() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });

    return result;
  }

  render() {
    const { addContact, handleFilter, removeContact } = this;
    const contacts = this.getFilteredContact();

    return (
      <div className={styles.wrapper}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h1>Contacts</h1>
        <ContactFilter handleChange={handleFilter} />
        <ContactList removeContact={removeContact} contacts={contacts} />
      </div>
    );
  }
}

export default App;
