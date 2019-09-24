import dotenv from 'dotenv'

// Set the NODE_ENV to 'development' by default
let env = `${process.env.NODE_ENV}`
env = process.env.NODE_ENV || 'DEVELOPMENT'

let envString = env.toUpperCase()

const envFound = dotenv.config()
if (!envFound) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

export default {
    /**
     * Your favorite port
     */
    port: parseInt(process.env.PORT!, 10),

    /**
     * That long string from atlas
     */
    databaseURL: process.env[`ATLAS_URI_${envString}`],

    /**
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SECRET,

    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },
}
