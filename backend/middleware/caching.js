const axios = require('axios');
const _ = require('lodash');

const Caching = async () => {
    try {
        const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
            headers: {
                'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
            },
        });

        const blogData = response.data;
        const numberOfBlogs = _.get(blogData, 'blogs.length', 0);
        const blogWithLongestTitle = _.maxBy(blogData.blogs, (blog) => blog.title.length);
        const blogsWithPrivacyKeyword = _.filter(blogData.blogs, (blog) =>
            _.includes(_.toLower(blog.title), 'privacy')
        );
        const numberOfBlogsWithPrivacy = blogsWithPrivacyKeyword.length;
        const uniqueBlogTitles = _.uniqBy(blogData.blogs, 'title').map((blog) => blog.title);

        return {
            numberOfBlogs,
            blogWithLongestTitle,
            numberOfBlogsWithPrivacy,
            uniqueBlogTitles,
        };
    } catch (error) {
        throw error;
    }
};

module.exports = _.memoize(Caching, undefined, 300000);

