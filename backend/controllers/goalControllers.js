const getGoals = (req, res) => {
    res.status(200).json({ message: "Get Goals" })
}

const setGoals = async (req, res) => {
    console.log(req.body);
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field');
    }
    res.status(200).json({ message: "Post Goals" })
}
const updateGoals = async (req, res) => {
    res.status(200).json({ message: `update goal ${req.params.id}` })
}

const deleteGoals = async (req, res) => {
    res.status(200).json({ message: `Delete goal ${req.params.id}` })
}

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}