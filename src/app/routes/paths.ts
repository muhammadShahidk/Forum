// export const _basePath = 'https://localhost:44376/api';
export const _basePath = 'https://localhost:7001/api';

export const Auth = {
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
    GET_All: () => appendBasePath('User/all'),
    Posts: {
      GET: () => appendBasePath('User/posts'),
      POST: () => appendBasePath('User/posts'),
      PUT: (id: string) => appendBasePath(`User/posts/${id}`),
      DELETE: (id: string) => appendBasePath(`Posts/${id}`),
      Comments: {
        GET: (postId: number) =>
          appendBasePath(`User/posts/${postId}/comments`),
        GETAll: () => appendBasePath('User/comments'),
        POST: (postId: number) =>
          appendBasePath(`User/posts/${postId}/comments`),
        DELETE: (postId: number, commentId: number) =>
          appendBasePath(`Posts/${postId}/comments/${commentId}`),
        PUT: (id: string) => appendBasePath(`User/comments/${id}`),
      },
    },
    Replies: {
      GET: (commentId: number) => appendBasePath(`Replies/comment/${commentId}`),
      GETAll: () => appendBasePath('Replies'),
      POST: (commentId: number) => appendBasePath(`Replies/comment/${commentId}`),
      DELETE: (replyId: number) =>
        appendBasePath(`Replies/${replyId}`),
      PUT: (id: number) => appendBasePath(`Replies/${id}`),
    },
  },
  Posts: {
    GET_All: () => appendBasePath('Posts'), // Route for getting all posts (not user-specific)
    GET: (postId: number) => appendBasePath(`Posts/${postId}`), // Route for getting all posts (not user-specific)
    DELETE: (postId: number) => appendBasePath(`Posts/${postId}`), // Route for getting all posts (not user-specific)
    GET_Comments: (postId: number) =>
      appendBasePath(`Posts/${postId}/comments`), // Route for getting all posts (not user-specific)
  },
  ApprovalRequests: {
    POST: () => appendBasePath('User/approval-request'),
    PUT: () => appendBasePath('User/approval-Request'),
    GET_ALL: () => appendBasePath('User/approval-request'),
  },
  Auth: {
    Login: () => appendBasePath('Auth/login'),
    Register: () => appendBasePath('Auth/register'),
    AllUsersWithRools: () => appendBasePath('Auth/get-user-rols'),
    MakeModerator: () => appendBasePath('Auth/make-moderator'),
    MakeUser: () => appendBasePath('Auth/make-user'),
  },
  SensitiveKeywords: {
    GET_ALL: () => appendBasePath('User/sensitivekeyword'),
    POST: () => appendBasePath('User/sensitivekeyword'),
    DELETE: (id: number) => appendBasePath(`User/sensitivekeyword/${id}`),
    PUT: (id: number) => appendBasePath(`User/sensitivekeyword/${id}`),
  },
  Profile: {
    PUT: () => appendBasePath('Profile/user'),
    password: {
      UpdatePassword: {
        PUT: () => appendBasePath('Profile/password'),
      },
      ForgotPassword: {
        GET: () => appendBasePath('Profile/forgot-password'),
        PUT: () => appendBasePath('Profile/forgot-password'),
      },
    },
  },
  banUser: {
    GET: () => appendBasePath('BanUser'),
    GET_AllUsersBandStatus: () => appendBasePath('BanUser/all/status'),
    GET_history: (userId: string) =>
      appendBasePath(`BanUser/history/${userId}`),
    POST: () => appendBasePath('BanUser'),
    DELETE: (id: string) => appendBasePath(`User/ban-user/${id}`),
    PUT: () => appendBasePath(`BanUser`),
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
