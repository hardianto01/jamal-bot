import { Mongoose, connect } from 'mongoose'
import { format } from 'util'
import 'dotenv/config'
import chalk from 'chalk'
const main = async () => {
    connect(process.env.DATABASE_URL || '')
        .catch((error) => {
            console.log('failed: connect to database with error: ', format(error))
        })
        .then((resp) => {
            if (resp) console.log(chalk.green('berhasil terhubung ke database'))
        })
}
export default main
