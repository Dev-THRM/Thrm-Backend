import Blog from "../models/Blog.js";


// @desc    Get all blogs
// @route   GET /api/blogs
// ---------------------- get blog function ----------------------
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};


// @desc    Get single blog by ID
// @route   GET /api/blogs/:id

// ---------------------- get perticular blog function ----------------------
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};