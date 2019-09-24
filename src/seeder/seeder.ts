import UserSeeder from './user-seeders'
import FixtureSeeder from './fixture-seeder'
import TeamSeeder from './team-seeder'
import mongoose from 'mongoose'
import env from './../config'

//Connection to mongoDB
const uri = `${env.databaseURL}`
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!')
})
connection.on('error', () => {
    console.log('Error Connecting To Database')
})

const seederModules: any = [...UserSeeder, ...TeamSeeder, ...FixtureSeeder]

let counter = 0
for (let index = 0; index < seederModules.length; index++) {
    //Saving each Section to database
    seederModules[index].save((error: any, _result: any) => {
        if (error) {
            console.log(error)
        }

        counter++
        if (counter === seederModules.length) {
            //Disconnect if this is the last seed
            mongoose.disconnect()
        }
    })
}
