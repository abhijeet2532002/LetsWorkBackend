import express from 'express';
import BlogRouter from './Blog/BlogRouter.js';
import ArticleRouter from './Article/ArticleRouter.js';
import TestomonialRouter from './Testomonial/TestomonialRouter.js';

const router = express.Router();

router.use('/blog', BlogRouter);
router.use('/article', ArticleRouter);
router.use('/testomonial', TestomonialRouter);

export default router;