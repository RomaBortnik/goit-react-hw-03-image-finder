import { Formik } from 'formik';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';

import {
  Header,
  SearchbarForm,
  SearchbarInput,
  SearchbarBtn,
} from './Searchbar.styled';

const initialValues = {
  query: '',
};

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    const { query } = values;
    if (query.trim() !== '') {
      onSubmit(query);
      resetForm();
    }
  };

  return (
    <Header>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <SearchbarForm>
          <SearchbarBtn type="submit">
            <AiOutlineSearch color="black" size="1.5rem" />
          </SearchbarBtn>

          <SearchbarInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
          />
        </SearchbarForm>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
