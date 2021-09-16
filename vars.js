const VARS = {
    'ROOT_DIR': process.cwd(),
    'PORT': process.env.PORT ?? 8080,
    'LOG_DIR': `${process.cwd()}/logs`
}


module.exports = VARS;
