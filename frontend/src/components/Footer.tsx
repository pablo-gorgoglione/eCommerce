import { Container, Row, Col } from 'react-bootstrap';

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; eCommerce</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
