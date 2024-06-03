import { User } from "../models/user.model.js";

const getLikedMovies = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.json({ success: true, movies: user.likedMovies });
        }
        else {
            return res.status(404).json({ success: false, message: "User not found." });
        }
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching liked movies." });
    }
};

const addToLikedMovies = async (req, res) => {
    const { email, data } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ email, likedMovies: [] });
        }
        const { likedMovies } = user;
        const movieLiked = likedMovies.find(({ id }) => id === data.id);
        if (!movieLiked) {
            user.likedMovies.push(data);
            await user.save();
            return res.json({
                success: true,
                message: "Successfully added the movie to the liked list."
            });
        }
        else {
            return res.json({
                success: false,
                message: "The Movie is already in the liked list."
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while adding the movie to the liked list: " + error.message
        });
    }
};

const removeFromLikedMovies = async (req, res) => {
    const { email, movieId } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User with the given email not found."
            });
        }
        const movies = user.likedMovies.filter(({ id }) => id !== movieId);
        if (movies.length === user.likedMovies.length) {
            return res.status(400).json({
                success: false,
                message: "Movie not found in the liked list."
            });
        }
        user.likedMovies = movies;
        await user.save();
        return res.json({
            success: true,
            message: "Movie removed successfully.",
            movies
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error removing the movie from the liked list: " + error.message
        });
    }
};

export { getLikedMovies, addToLikedMovies, removeFromLikedMovies };