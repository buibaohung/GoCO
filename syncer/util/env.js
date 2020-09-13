exports.getEnv = (env, defaultValue) => {
    return process.env[env] || defaultValue
}