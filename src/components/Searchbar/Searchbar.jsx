import { Formik, Form, Field } from 'formik';
import { AiOutlineSearch } from 'react-icons/ai';

const initialValues = {
  query: '',
};

const Searchbar = ({ searchQuery, onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    const { query } = values;
    if (searchQuery === query || query === '') {
      return;
    }
    onSubmit(query);
    resetForm();
  };

  return (
    <header className="Searchbar">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <AiOutlineSearch color="black" size="1.5rem" />
          </button>

          <Field
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
          />
        </Form>
      </Formik>
    </header>
  );
};

export default Searchbar;
