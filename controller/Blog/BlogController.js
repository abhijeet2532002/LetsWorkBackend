import BlogSchema from "../../schema/Blog/BlogSchema.js";

export default class BlogContainer{
    addBlog = async (req, res) => {
        try {
            const blog = await BlogSchema.create(req.body);
            console.log(blog);
            
            return res.status(200).json(blog);
        } catch (error) {
            console.log(error);
            return res.status(501).json({
                message: error.message || "An error occurred durning create a blog"
            });
        }
    };

    getAllBlog = (req, res) => {
    }

    getBlogById = (req, res) => {
    }

    removeBlog = (req, res) => {
    }

    updateBlogId = (req, res) => {
    }
};