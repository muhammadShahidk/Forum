
export const _basePath = 'https://localhost:44344/api';

export const PATH_AUTH = {
  login: 'Auth/login',
  register: 'Auth/register',
  allUsersWithRools: 'Auth/get-user-rols',
};



const appendBasePath = (route: string) => {
  return `${_basePath}/${route}`;
};

export const RouteCategories = {
  User: {
    GET: () => appendBasePath('User'),
    Posts: {
      GET: () => appendBasePath('User/posts'),
      POST: () => appendBasePath('User/posts'),
      PUT: (id: string) => appendBasePath(`User/posts/${id}`),
      DELETE: (id: string) => appendBasePath(`Posts/${id}`),
      Comments: {
        GET: (postId: string) => appendBasePath(`User/Posts/${postId}/comments`),
        GETAll: () => appendBasePath('User/comments'),
        POST: (postId: string) => appendBasePath(`User/Posts/${postId}/comments`),
        DELETE: (postId: string, commentId: string) =>
          appendBasePath(`Posts/${postId}/comments/${commentId}`),
        PUT: (id: string) => appendBasePath(`User/comments/${id}`),
      },
      UpdatePassword: {
        PUT: () => appendBasePath('User/password'),
      },
      ForgotPassword: {
        GET: () => appendBasePath('User/forgot-password'),
        PUT: () => appendBasePath('User/forgot-password'),
      },
    },
  },
  Posts: {
    GET_All: () => appendBasePath('Posts'), // Route for getting all posts (not user-specific)
    GET: (postId: string) => appendBasePath(`Posts/${postId}`), // Route for getting all posts (not user-specific)
    DELETE: (postId: string) => appendBasePath(`Posts/${postId}`), // Route for getting all posts (not user-specific)
    GET_Comments: (postId: string) => appendBasePath(`Posts/${postId}/comments`), // Route for getting all posts (not user-specific)
  },
  ApprovalRequests: {
    POST: () => appendBasePath('User/approval-request'),
    PUT: () => appendBasePath('User/approval-Request'),
    GET_ALL: () => appendBasePath('User/approval-request'),
  },
};



// export const RouteCategories = {
//   User: {
//     Posts: {
//       GET: 'User/posts',
//       POST: 'User/posts',
//       PUT: (id: string) => `User/posts/${id}`,
//       DELETE: (id: string) => `Posts/${id}`,
//       Comments: {
//         GET: (postId: string) => `User/Posts/${postId}/comments`,
//         GETAll: `User/comments`,
//         POST: (postId: string) => `User/Posts/${postId}/comments`,
//         DELETE: (postId: string, commentId: string) =>
//           `Posts/${postId}/comments/${commentId}`,
//         PUT: (id: string) => `User/comments/${id}`,
//       },
//       UpdatePassword: {
//         PUT: 'User/password',
//       },
//       ForgotPassword: {
//         GET: 'User/forgot-password',
//         PUT: 'User/forgot-password',
//       },
//     },
//   },
//   Posts: {
//     GET_All: 'Posts', // Route for getting all posts (not user-specific)
//     GET: (postId: string) => 
//       `Posts/${postId}`
//     , // Route for getting all posts (not user-specific)
//     DELETE: (postId: string) => 
//       `Posts/${postId}`
//     , // Route for getting all posts (not user-specific)
//     GET_Comments: (postId: string) => 
//       `Posts/${postId}/comments`
//     , // Route for getting all posts (not user-specific)
//   },
//   ApprovalRequests: {
//     POST: 'User/approval-request',
//     PUT: 'User/approval-Request',
//     GET_ALL: 'User/approval-request',
//   },
// };



// // Example of usage:
// const postEditRoute = RouteCategories.Posts.PUT('123'); // '/api/User/posts/123'
// const commentsRoute = RouteCategories.Posts.Comments.GET('123'); // '/api/User/Posts/123/comments'
// const updatePasswordRoute = RouteCategories.User.UpdatePassword.PUT; // '/UpdatePassword'
// const forgotPasswordRoute = RouteCategories.User.ForgotPassword.GET; // '/forgotPassword'
