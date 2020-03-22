const User = require("../models/user.model");
const userValidation = require("../middleware/validation/userValidation");
const express = require("express");
const router = express.Router();

router.post("/", userValidation, async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).send({ error: "User not found." });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/:id", userValidation, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "age"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates." });
  }

  try {
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).send({ error: "User not found." });
    }

    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(_id);

    if (!user) {
      return res.status(404).send({ error: "User not found." });
    }

    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
