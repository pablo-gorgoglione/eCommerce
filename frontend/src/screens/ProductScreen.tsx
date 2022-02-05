import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  FormGroup,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProductReview,
  listProductDetail,
} from '../state/Product/Product_AC';
import { RootState } from '../state/store';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { ProductCreateReviewActionType } from '../state/Product/ProductActionTypes';
import Meta from '../components/Meta';

interface Props {}

const ProductScreen: React.FC<Props> = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id: string = params.id || '';

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const productCreateReview = useSelector(
    (state: RootState) => state.productCreateReview
  );
  const { success: successReview, error: errorReview } = productCreateReview;

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state: RootState) => state.productDetail);
  const { product, error, loading } = productDetails;

  const {
    image,
    name,
    rating: ratingDetail,
    numReviews,
    description,
    price,
    countInStock,
  } = product;

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        _id: '',
        name: '',
        createdAt: '',
        rating,
        comment,
      })
    );
  };

  useEffect(() => {
    if (successReview) {
      alert('Review submitted');
      setRating(0);
      setComment('');
      dispatch({ type: ProductCreateReviewActionType.RESET });
    }
    dispatch(listProductDetail(id));
  }, [dispatch, params.id, successReview, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${quantity}`);
  };

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={image} alt={name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={ratingDetail}
                    text={`${numReviews} reviews`}
                    color='yellow'
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${price}</ListGroup.Item>
                <ListGroup.Item>Description: ${description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={quantity}
                            onChange={(e) => setQuantity(+e.target.value)}
                            style={{ cursor: 'pointer' }}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => {
                                return (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}{' '}
                                  </option>
                                );
                              }
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      type='button'
                      disabled={countInStock === 0}
                      style={{ width: '100%' }}
                    >
                      Add to cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating color={'yellow'} value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)} </p>
                    <p>{review.comment} </p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorReview && (
                    <Message variant='danger'>{errorReview}</Message>
                  )}
                  {userInfo._id ? (
                    <Form onSubmit={(e) => submitHandler(e)}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <FormGroup controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        >
                          {' '}
                        </Form.Control>
                      </FormGroup>
                      <Button
                        onClick={(e) => e.preventDefault()}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='../login'>sign in</Link> to write a
                      review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
