var config = {};

var lambdaFunction = process.env.lambdaEndpoint;

switch (process.env.NODE_ENV) {
    case "production":
        config.mode = 'production';
        config.lambda = lambdaFunction;
    ;
        break;
    case "development":
        config.mode = 'development';
        config.lambda = lambdaFunction;
        break;
    default:
        config.mode = 'default - dev';
        config.lambda = lambdaFunction;
}

module.exports = config;