import { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../state/Cart/Cart_AC';
import { RootState } from '../state/store';

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state: RootState) => state.cart);
  const { shippingAddress: SA } = cart;

  if (!SA.address) {
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState<string>('MercadoPago');

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('../placeorder');
  };

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 step4={false} />
      <h1>Payment Method</h1>
      <Form onSubmit={(e) => submitHandler(e)}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='MercadoPago'
              id='MercadoPago'
              name='paymentmethod'
              value='MercadoPago'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
