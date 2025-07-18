import SuperTokens from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

export const initSuperTokens = () => {
  SuperTokens.init({
    appInfo: {
      appName: "Anubhav",
      apiDomain: import.meta.env.VITE_API_DOMAIN || "https://oss-backend-staging.vercel.app",
      websiteDomain: import.meta.env.VITE_WEBSITE_DOMAIN || "http://localhost:5173",
      apiBasePath: "/auth",
      websiteBasePath: "/auth",
    },
    recipeList: [EmailPassword.init(), Session.init()],
  });
};
