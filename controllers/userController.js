const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find({}).exec();  // Force execution with exec()
      console.log('Retrieved users:', users); // Debug log
      
      if (!users || users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }

      res.json(users);
    } catch (err) {
      console.log('Error in getUsers:', err); // Debug log
      res.status(500).json({ 
        message: 'Error retrieving users',
        error: err.message 
      });
    }
  },

  // Get single user
  async getSingleUser(req, res) {
    try {
      console.log('User ID:', req.params.userId); // Debug log
      
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends');

      console.log('Found user:', user); // Debug log

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      console.log('Error:', err); // Debug log
      res.status(500).json({ 
        message: 'Error retrieving user',
        error: err.message 
      });
    }
  },

  // Create a user
  async createUser(req, res) {
    try {
      console.log('Creating user with data:', req.body);
      
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        thoughts: [],
        friends: []
      });

      const savedUser = await newUser.save();
      console.log('Saved user to database:', savedUser);

      // Verify it was saved
      const verifyUser = await User.findById(savedUser._id);
      console.log('Verified user in database:', verifyUser);

      res.json(savedUser);
    } catch (err) {
      console.log('Error creating user:', err);
      res.status(500).json({ 
        message: 'Error creating user',
        error: err.message 
      });
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      console.log('Attempting to delete user ID:', req.params.userId);
      
      // Use findOneAndDelete instead of findById
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      // Delete associated thoughts
      await Thought.deleteMany({ username: user.username });

      // Remove from friends lists
      await User.updateMany(
        { friends: req.params.userId },
        { $pull: { friends: req.params.userId } }
      );

      res.json({ message: 'User and associated data deleted!' });
    } catch (err) {
      console.log('Error:', err);
      res.status(500).json({ 
        message: 'Error deleting user',
        error: err.message 
      });
    }
  },

  // Add a friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a friend
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
