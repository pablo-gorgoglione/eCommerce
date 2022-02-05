import { Col, Container, Row } from 'react-bootstrap';

interface Props {
  children: React.ReactNode;
}

const FormContainer = ({ children }: Props) => {
  return (
    <Container>
      <Row className='justify-content-md-center'></Row>
      <Col xs={12} md={6}>
        {children}
      </Col>
    </Container>
  );
};

export default FormContainer;
