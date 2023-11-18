const {RoughPad} = require('../models/roughPad');

exports.updateOrCreateText = async (req, res) => {
  try {
    const { text } = req.body;
    
    const roughPad = await RoughPad.findOne({
      user: req.user.id,
    });
    
    if (roughPad) {
      roughPad.text = text;
      await roughPad.save();
    } else {
      await RoughPad.create({ user: req.user.id, text });
    }

    return res.status(200).json({ message: 'Text updated or created successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating or creating text.' });
  }
};


exports.getRoughPadText = async (req, res) => {
  try {
    const roughPad = await RoughPad.findOne({
      user: req.user.id,
    });

    if (roughPad) {
      return res.json({ text: roughPad.text });
    } else {
      return res.json({ text: '' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving text.' });
  }
};
