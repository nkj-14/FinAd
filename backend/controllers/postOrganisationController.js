import PostOrganisation from "../models/postOrganisationModel.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
  
const uploadToCloudinary = async (image, folder = "my-profile") => {
    try {
        let results = [];
        for (let im in image) {
            const data = await cloudinary.uploader.upload(image[im], { folder: folder });
            results.push({ url: data.secure_url, publicId: data.public_id });
        }
  
        return results;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.createPostOrganisation = async (req, res) => {
    const {  content, status, deadline, organisation, pictures  } = req.body;
    try {
        let imageData = [];
        if (pictures.length > 0) {
            const results = await uploadToCloudinary(pictures, "my-profile");
            imageData = results;
        }
        const newPost = await PostOrganisation.create({ content, status, deadline, organisation, pictures: imageData });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error while creating post', error });
    }
};

exports.getPostsByOrganisation = async (req, res) => {
    try {
        const posts = await PostOrganisation.find({ organisation: req.params.orgId }).populate('organisation');
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching posts', error });
    }
};

exports.updateLikesCount = async (req, res) => {
    try {
        const { postId } = req.params;
        const { incrementBy } = req.body;

        const updatedPost = await PostOrganisation.findByIdAndUpdate(
            postId,
            { $inc: { likesCount: incrementBy } },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error updating likes count', error });
    }
};

exports.updateReachCount = async (req, res) => {
    try {
        const { postId } = req.params;
        const { incrementBy } = req.body;

        const updatedPost = await PostOrganisation.findByIdAndUpdate(
            postId,
            { $inc: { reachCount: incrementBy } },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error updating reach count', error });
    }
};