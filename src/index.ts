// inject ExpressLoader to start up the app
import ExpressLoader from "./loaders/express";
import AdminRoute from "./routes/admin";
import BlogRoute from "./routes/blog";
import UserRoute from "./routes/user";
import WelcomeRoute from "./routes/welcome";

const app = new ExpressLoader([
    new UserRoute(),
    new BlogRoute(),
    new AdminRoute(),
    new WelcomeRoute()
]);


app.listen();

