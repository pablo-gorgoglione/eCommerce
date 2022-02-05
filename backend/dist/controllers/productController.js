"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopProducts = exports.createReview = exports.updateProduct = exports.createProduct = exports.deleteProduct = exports.getProductsById = exports.getProducts = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
//@desc Fetch all products
//@route GET /api/products
//@acess Public
exports.getProducts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const count = yield productModel_1.default.countDocuments(Object.assign({}, keyword));
    const products = yield productModel_1.default.find(Object.assign({}, keyword))
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
}));
//@desc Get Product by id
//@route GET /api/products/:id
//@acess Public
exports.getProductsById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product_id = req.params.id;
    const product = yield productModel_1.default.findById(product_id);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }
    res.json(product);
}));
//@desc Delete a product
//@route DELETE /api/products/:id
//@acess Private/Admin
exports.deleteProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product_id = req.params.id;
    const product = yield productModel_1.default.findById(product_id);
    if (product) {
        yield product.remove();
        res.json({ message: 'Product removed' });
        return;
    }
    res.status(404);
    throw new Error('Product not found');
}));
//@desc Create a product
//@route POST /api/products
//@acess Private/Admin
exports.createProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const product = new productModel_1.default({
        name: 'Sample name',
        price: 0,
        user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        image: '/images/sample.jpg',
        brand: 'Saple brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    });
    const createdProduct = yield product.save();
    res.status(201).json(createdProduct);
    return;
}));
//@desc Update a product
//@route PUT /api/products/:id
//@acess Private/Admin
exports.updateProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = yield productModel_1.default.findById(req.params.id);
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        const updatedProduct = yield product.save();
        res.json(updatedProduct);
        return;
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
}));
//@desc Create new review
//@route POST /api/products/:id/reviews
//@acess Private
exports.createReview = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating, comment } = req.body;
    if (!req.user) {
        res.status(401);
        throw new Error('please login');
    }
    const product = yield productModel_1.default.findById(req.params.id);
    if (product) {
        const alreadyReviewed = product.reviews.find((r) => { var _a; return r.user.toString() === ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString()); });
        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }
        const review = {
            user: req.user._id,
            rating: Number(rating),
            comment: comment,
            name: req.user.name,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        yield product.save();
        res.status(201).json({ message: 'Review added' });
        return;
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
}));
//@desc Get top rated products
//@route GET /api/products/top
//@acess Public
exports.getTopProducts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productModel_1.default.find({}).sort({ rating: -1 }).limit(3);
    res.json(products);
    return;
}));
//# sourceMappingURL=productController.js.map