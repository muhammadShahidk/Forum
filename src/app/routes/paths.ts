
export const _basePath = 'https://localhost:44344/api';

export const PATH_AUTH = {
  login: 'Auth/login',
  register: 'Auth/register',
  allUsersWithRools: 'Auth/get-user-rols',
};


// routes.ts

// routes.ts

export const RouteCategories = {
  User: {
    Posts: {
      GET: '/api/User/posts',
      POST: '/api/User/posts',
      PUT: (id: string) => `/api/User/posts/${id}`,
      DELETE: (id: string) => `/api/Posts/${id}`,
      Comments: {
        GET: (postId: string) => `/api/User/Posts/${postId}/comments`,
        GETAll: `/api/User/comments`,
        POST: (postId: string) => `/api/User/Posts/${postId}/comments`,
        DELETE: (postId: string, commentId: string) =>
          `/api/Posts/${postId}/comments/${commentId}`,
        PUT: (id: string) => `/api/User/comments/${id}`,
      },
      UpdatePassword: {
        PUT: '/api/User/password',
      },
      ForgotPassword: {
        GET: '/api/User/forgot-password',
        PUT: '/api/User/forgot-password',
      },
    },
  },
  Posts: {
    GET_All: '/api/Posts', // Route for getting all posts (not user-specific)
    GET: (postId: string) => {
      `/api/Posts/${postId}`;
    }, // Route for getting all posts (not user-specific)
    DELETE: (postId: string) => {
      `/api/Posts/${postId}`;
    }, // Route for getting all posts (not user-specific)
    GET_Comments: (postId: string) => {
      `/api/Posts/${postId}/comments`;
    }, // Route for getting all posts (not user-specific)
  },
  ApprovalRequests: {
    POST: '/api/User/approval-request',
    PUT: '/api/User/approval-Request',
    GET_ALL: '/api/User/approval-request',
  },
};



// // Example of usage:
// const postEditRoute = RouteCategories.Posts.PUT('123'); // '/api/User/posts/123'
// const commentsRoute = RouteCategories.Posts.Comments.GET('123'); // '/api/User/Posts/123/comments'
// const updatePasswordRoute = RouteCategories.User.UpdatePassword.PUT; // '/UpdatePassword'
// const forgotPasswordRoute = RouteCategories.User.ForgotPassword.GET; // '/forgotPassword'
