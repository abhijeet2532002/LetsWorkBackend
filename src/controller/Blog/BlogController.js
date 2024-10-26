import BlogSchema from "../../schema/Blog/BlogSchema.js"
import { v2 as cloudinary } from 'cloudinary';


import formidable from 'formidable';

import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

export default class BlogContainer {
    // Add blog
    addBlog = async (req, res) => {
        const form = formidable();
        const parsedFields = {};
        form.on('field', (name, value) => {
            parsedFields[name] = value;
        });

        form.parse(req, async (err, fields, files) => {
            console.log(fields, files);

            if (err) {
                return res.status(400).json({ message: 'Error parsing form data', err });
            }
            try {
                const image = await cloudinary.uploader.upload(files?.image[0]?.filepath);
                parsedFields.imageUrl = image.url;
                parsedFields.imagePublicId = image.public_id;
                parsedFields.imageSecureUrl = image.secure_url;
                const blogData = await BlogSchema.create(parsedFields);
                return res.status(201).json({
                    blogData
                });
            } catch (error) {
                return res.status(400).json({ message: 'Error creating blog', error });
            }
        });
    };

    // Get all blog
    getAllBlog = async (req, res) => {
        try {
            const allBlog = await BlogSchema.find({});
            return res.status(200).json({
                allBlog
            })
        } catch (error) {
            return res.status(500).json({
                message: "Something issue durning find all blog",
                error
            })
        }
    }

    // Get blog by Id
    getBlogById = async (req, res) => {
        try {
            const blogData = await BlogSchema.findById(req.params.id);
            return res.status(200).json({
                blogData
            })
        } catch (error) {
            return res.status(500).json({
                message: `We got error durning find the blog by id ${id}`,
                error
            })
        }
    }

    // Remove blog from DB and cloudinary
    removeBlog = async (req, res) => {
        try {
            // Find the blog entry by ID
            const blog = await BlogSchema.findById(req.params.id);

            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }

            // Remove the image from Cloudinary using the public ID
            const result = await cloudinary.uploader.destroy(blog.imagePublicId);

            if (result.result !== 'ok') {
                return res.status(400).json({ message: 'Failed to delete image from Cloudinary' });
            }

            // Remove the blog entry from the database if the image is successfully deleted
            await BlogSchema.findByIdAndDelete(blog);

            res.status(200).json({ message: 'Blog and image deleted successfully', result });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting image', error });
        }
    }

    // Update blog
    updateBlogId = async (req, res) => {
        try {
            const blogData = await BlogSchema.findById(req.params.id);
            if (!blogData)
                return res.status(404).json({
                    message: "Data is not available"
                })
            else {
                const form = formidable();
                // Object to store parsed fields
                const parsedFields = {};
                form.on('field', (name, value) => {
                    parsedFields[name] = value;
                });

                form.parse(req, async (err, fields, files) => {
                    if (err) {
                        return res.status(400).json({ message: 'Error parsing form data', err });
                    }

                    // Initialize variables for image information
                    let image, imagePublicId, imageSecureUrl;
                    if (files?.image?.[0]?.filepath) {
                        const result = await cloudinary.uploader.destroy(blogData.imagePublicId);
                        // Upload new image to Cloudinary if an image file is provided
                        image = await cloudinary.uploader.upload(files.image[0].filepath);
                        parsedFields.image = image.url;
                        imagePublicId = image.public_id;
                        imageSecureUrl = image.secure_url;
                    }

                    // Create an update object with conditionally set fields
                    const updateData = {
                        user: parsedFields.user,
                        title: parsedFields.title,
                        description: parsedFields.description,
                        content: parsedFields.content,
                        ...(parsedFields.image && { imageUrl: parsedFields.image }),
                        ...(imagePublicId && { imagePublicId }),
                        ...(imageSecureUrl && { imageSecureUrl })
                    };

                    // Update the blog entry in the database
                    const updatedBlog = await BlogSchema.findByIdAndUpdate(req.params.id, updateData,
                        {
                            new: true,
                            runValidators: true
                        });

                    // Respond with the updated blog data
                    return res.status(200).json({
                        message: 'Blog updated successfully',
                        blog: updatedBlog
                    });

                });
            }
        } catch (error) {
            res.status(400).json({ message: 'Error updating blog', error });
        }
    }
};