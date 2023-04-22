import PropTypes from 'prop-types';

import SubmitButton from './Button.styled';

const Button = ({ onClick }) => {
  return (
    <SubmitButton type="button" onClick={onClick}>
      Load more
    </SubmitButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
