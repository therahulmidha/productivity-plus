const moment = require("moment");
const { WeekData } = require("../models/weekData");

exports.getWeekData = async (req, res) => {
  try {
    let weekData = await WeekData.find({ userId: req.user.id });
    const currentDay = moment().format("dddd");

    if (weekData.length === 0) {
      const defaultData = [
        {
          name: "Monday",
          text: "",
          color: "#f9c880",
          userId: req.user.id,
        },
        {
          name: "Tuesday",
          text: "",
          color: "#eb9193",
          userId: req.user.id,
        },
        {
          name: "Wednesday",
          text: "",
          color: "#D4E1D6",
          userId: req.user.id,
        },
        {
          name: "Thursday",
          text: "",
          color: "#B59EDB",
          userId: req.user.id,
        },
        {
          name: "Friday",
          text: "",
          color: "#89CFEF",
          userId: req.user.id,
        },
        {
          name: "Saturday",
          text: "",
          color: "#0096FF",
          userId: req.user.id,
        },
        {
          name: "Sunday",
          text: "",
          color: "#FEAA65",
          userId: req.user.id,
        },
        {
          name: "Notes",
          text: "",
          color: "darkgrey",
          userId: req.user.id,
        },
      ];

      weekData = await WeekData.insertMany(defaultData);
    }

    return res.status(200).json({
      today: currentDay,
      weekData: weekData.map((data) => ({
        id: data._id,
        name: data.name,
        text: data.text,
        color: data.color,
      })),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving data" });
  }
};

exports.updateWeekData = async (req, res) => {
  const userId = req.user.id;

  try {
    const data = req.body;

    if (data.length) {
      data.forEach(async (day) => {
        const storedData = await WeekData.findOne({ userId, name: day.name });
        storedData.text = day.text;
        await storedData.save();
      });
    }

    return res.json({
      message: "Update successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating data" });
  }
};
