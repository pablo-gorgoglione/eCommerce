import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { RootState } from '../state/store';
import { UserUpdateActionType } from '../state/User/UserActionTypes';
import { getUserDetail, updateUser } from '../state/User/User_AC';

// interface Props {}

const UserEditScreen = () => {
  // const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();

  const userId: string = params.id || '';

  const userDetail = useSelector((state: RootState) => state.userDetails);
  const { error, loading, userInfo } = userDetail;

  const userUpdate = useSelector((state: RootState) => state.userUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UserUpdateActionType.RESET });
      navigate('../admin/userlist');
    } else {
      if (!userInfo.name || userInfo._id !== userId) {
        dispatch(getUserDetail(userId));
      } else {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setIsAdmin(userInfo.isAdmin);
      }
    }
  }, [dispatch, userInfo, userId, navigate, successUpdate]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: userId,
        email: email,
        isAdmin: isAdmin,
        name: name,
        token: '',
      })
    );
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={(e) => submitHandler(e)}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='string'
                placeholder='Enter a name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
