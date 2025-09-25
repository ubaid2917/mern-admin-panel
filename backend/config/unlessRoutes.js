module.exports = {
  authenticateRoutes: {
    path: [
      { url: "/sign-up", method: "POST" },
      { url: "/api/v1/auth/login", method: "POST" },
      { url: "/otp", method: "POST" },
      
      // { url: "/^\/api\/v1\/test\/*/", method: "PATCH" },
    ],
  },
};
