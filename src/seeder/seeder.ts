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
})

const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!')
})

const seederModules: any = [...UserSeeder, ...FixtureSeeder, ...TeamSeeder]

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
