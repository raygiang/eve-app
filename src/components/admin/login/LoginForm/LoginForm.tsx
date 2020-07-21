import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../store/reducers/rootReducer';
import { logIn } from '../../../../store/actions/authActions';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const authError = useSelector((state: RootState) => state.auth.authError, shallowEqual);

  const onSubmit = (data: any) => {
    dispatch(logIn(data));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="text"
          ref={register({ required: 'Please enter an email address.' })}
        />
        { errors.email && <p>{ errors.email.message }</p> }
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          ref={register({ required: 'Please enter your password.' })}
        />
        { errors.password && <p>{ errors.password.message }</p> }
      </div>
      { authError && <p>{ authError }</p> }
      <input type="submit" />
    </form>
  )
}

export default LoginForm;
