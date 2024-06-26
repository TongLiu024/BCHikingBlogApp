const User = require('../Models/Users')

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send({message : error.message})
        
    }
} 

const getUser = async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({message: "The user cannot be found!"});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
}

const updateUser = async(req, res) => {
    try {
        const {id} = req.params;
        //findByIdAndUpdate method finds the object by its id and update it
        //base on the given request body
        const user = await User.findByIdAndUpdate(id, req.body, {runValidators: true});
        
        if (!user) {
            return res.status(404).json({message: "the user is not found!"});
        }

        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);     

    } catch (error) {
        res.status(500).json({message: error.message})
    }
};




const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);

    } catch (err) {
        res.status(500).send({Message: err.Message})

    }
}



const deleteUser = async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({message: "The user cannot be found"});
        }
        res.status(200).json({message: "user successfully deleted"});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

module.exports = {getAllUsers, getUser, updateUser, deleteUser, createUser}