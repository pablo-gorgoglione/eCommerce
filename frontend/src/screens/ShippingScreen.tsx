import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../state/Cart/Cart_AC';
import { RootState } from '../state/store';

const ShippingScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state: RootState) => state.cart);
  const { shippingAddress: SA } = cart;

  const dispatch = useDispatch();

  const [address, setAddress] = useState(SA.address);
  const [city, setCity] = useState(SA.city);
  const [postalCode, setPostalCode] = useState(SA.postalCode);
  const [country, setCountry] = useState(SA.country);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3={false} step4={false} />
      <h1>Shipping</h1>
      <Form onSubmit={(e) => submitHandler(e)}>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='string'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='string'
            placeholder='Enter city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='string'
            placeholder='Enter postal code'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type='string'
              placeholder='Enter Country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
