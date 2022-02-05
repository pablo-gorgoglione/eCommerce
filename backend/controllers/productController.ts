import Product, { IProduct, IReview } from '../models/productModel';
import asyncHandler from 'express-async-handler';
import { Response, Request } from 'express';

//@desc Fetch all products
//@route GET /api/products
//@acess Public
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@desc Get Product by id
//@route GET /api/products/:id
//@acess Public
export const getProductsById = asyncHandler(
  async (req: Request, res: Response) => {
    const product_id: string = req.params.id;
    const product = await Product.findById(product_id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json(product);
  }
);

//@desc Delete a product
//@route DELETE /api/products/:id
//@acess Private/Admin
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product_id: string = req.params.id;
    const product = await Product.findById(product_id);
    if (product) {
      await product.remove();
      res.json({ message: 'Product removed' });
      return;
    }
    res.status(404);
    throw new Error('Product not found');
  }
);

//@desc Create a product
//@route POST /api/products
//@acess Private/Admin
export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user?._id,
      image: '/images/sample.jpg',
      brand: 'Saple brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
    return;
  }
);

//@desc Update a product
//@route PUT /api/products/:id
//@acess Private/Admin
export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, price, description, image, brand, category, countInStock } =
      req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
      return;
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  }
);

//@desc Create new review
//@route POST /api/products/:id/reviews
//@acess Private
export const createReview = asyncHandler(
  async (req: Request, res: Response) => {
    const { rating, comment } = req.body;

    if (!req.user) {
      res.status(401);
      throw new Error('please login');
    }

    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r: IReview) => r.user.toString() === req.user?._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Product already reviewed');
      }

      const review: IReview = {
        user: req.user._id,
        rating: Number(rating),
        comment: comment,
        name: req.user.name,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce(
          (acc: number, item: IReview) => item.rating + acc,
          0
        ) / product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added' });
      return;
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  }
);

//@desc Get top rated products
//@route GET /api/products/top
//@acess Public
export const getTopProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.json(products);
    return;
  }
);
