import { useEffect } from 'react';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { ProductCreateActionType } from '../state/Product/ProductActionTypes';
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../state/Product/Product_AC';
import { RootState } from '../state/store';

const ProductListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const keyword = params.keyword as string;
  const pageNumber = (params.pageNumber as string) || '1';

  /* const userList = useSelector((state: RootState) => state.userList);
  const { error, usersList: users, loading } = userList; */

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector((state: RootState) => state.productCreate);
  const {
    product,
    error: errorCreate,
    success: successCreate,
    loading: loadingCreate,
  } = productCreate;

  const productList = useSelector((state: RootState) => state.productList);
  const { products, error, loading, page, pages } = productList;

  const productDelete = useSelector((state: RootState) => state.productDelete);
  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete,
  } = productDelete;

  useEffect(() => {
    dispatch({ type: ProductCreateActionType.RESET });
    if (!userInfo.isAdmin) {
      navigate('../login');
    }
    if (successCreate) {
      navigate(`../admin/product/${product._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [
    navigate,
    userInfo,
    dispatch,
    successDelete,
    product,
    successCreate,
    pageNumber,
  ]);

  const deleteHandler = (id: string) => {
    if (window.confirm('Are you sure?')) {
      //DELETE PRODUCT
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className='align-item-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='d-flex justify-content-end'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorCreate}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table
            variant='dark'
            striped
            bordered
            hover
            responsive
            className='table-sm'
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`../admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fa fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword}
            isAdmin={true}
          />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
