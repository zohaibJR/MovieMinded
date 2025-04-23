const Testimonial = require('../models/Testimonial');

const addTestimonial = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.picture = req.file.path;
    }

    const testimonial = new Testimonial(data);
    await testimonial.save();
    res.status(201).json({ message: 'Testimonial added', testimonial });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ timestamp: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { addTestimonial, getAllTestimonials };
