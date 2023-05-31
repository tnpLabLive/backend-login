const user = async (req, res) => {
  try {
    const data = [1, 2, 3];
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(200).json({ error });
  }
};

module.exports = { user };
