import { Formik } from 'formik';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    if (query.trim() === '') {
      return toast.warning('Value cannot be an ampty string');
    } else {
      onSubmit(query);
      resetForm();
    }
  };

  return (
    <>
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
      <ToastContainer autoClose={2000} theme="dark" />
    </>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
