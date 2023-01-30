import PropTypes from 'prop-types';

import styles from './contact-list.module.scss';

const ContactList = ({ removeContact, contacts }) => {
  const contact = contacts.map(({ id, name, number }) => (
    <li key={id}>
      {name}: {number}
      <button onClick={() => removeContact(id)} type="button">
        Delete
      </button>
    </li>
  ));

  return (
    <div className={styles.contacts}>
      <ul>{contact}</ul>
    </div>
  );
};

export default ContactList;

ContactList.defaultProps = {
  contacts: [],
};

ContactList.propTypes = {
  removeContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
