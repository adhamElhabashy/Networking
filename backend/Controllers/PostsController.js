const asyncHandler = require("express-async-handler");
const Post = require("../Models/PostModel");

const filterRequestObject = require("../Functions/FilterRequestObject");

/*---------------------------------
* @desc create post
* @route /api/v1/posts
* @method POST
* @access private (only logged in user)
-----------------------------------*/
module.exports.createPost = asyncHandler(async (request, response) => {
	const post = await Post.create({ ...request.body, user: request.user.id });
	// TODO: error handling
	// TODO: uploading image
	response.status(201).json({ post });
});

/*---------------------------------
* @desc get all the posts
* @route /api/v1/posts
* @method GET
* @access private (only admin)
-----------------------------------*/
module.exports.getAllThePosts = asyncHandler(async (request, response) => {
	let posts;
	const { pageNumber, category } = request.query;
	const postsPerPage = 3;
	const filterCategory = category ? { category } : {};

	if (pageNumber) {
		posts = await Post.find(filterCategory)
			.skip((+pageNumber - 1) * postsPerPage)
			.limit(postsPerPage);
	} else {
		posts = await Post.find(filterCategory);
	}

	response.status(200).json({ status: "success", data: { posts } });
});

/*---------------------------------
* @desc update post
* @route /api/v1/posts/:id
* @method put
* @access private (only signed in user)
-----------------------------------*/
module.exports.updateMyPost = asyncHandler(async (request, response) => {
	const filteredObject = filterRequestObject(
		request.body,
		"title",
		"description",
		"category"
	);
	const post = await Post.findByIdAndUpdate(request.params.id, filteredObject, {
		runValidators: true,
		new: true,
	});
	response.status(200).json({ status: "success", post });
});
