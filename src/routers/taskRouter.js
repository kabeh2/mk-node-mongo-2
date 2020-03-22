const Task = require("../models/task.model");
const taskValidation = require("../middleware/validation/taskValidation");
const express = require("express");
const router = express.Router();

router.post("/", taskValidation, async (req, res) => {
  try {
    const user = new Task(req.body);
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send();
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({});

    if (!tasks) {
      return res.status(404).send({ error: "There are no tasks." });
    }

    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).send({ error: "Task not found." });
    }

    res.status(200).send(task);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/:id", taskValidation, async (req, res) => {
  const taskId = req.params.id,
    updates = Object.keys(req.body),
    allowedUpdates = ["title", "description"],
    validOperation = updates.every(update => allowedUpdates.includes(update));

  if (!validOperation) {
    return res
      .status(400)
      .send({ error: "Please only fill in correct fields." });
  }

  try {
    const update = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
      runValidators: true
    });

    if (!update) {
      return res.status(400).send({
        error: "No task to update."
      });
    }

    res.status(200).send(update);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findByIdAndDelete(_id);

    if (!task) {
      return res.status(400).send({ error: "User not found." });
    }

    res.status(200).send(task);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
