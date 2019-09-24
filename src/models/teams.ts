import mongoose, { Schema, Document } from 'mongoose'

export interface ITeam extends Document {
    clubName: string
    about?: string
    arena: string
    owner: string
    headCoach: string
    founded: string
    nickName?: string
    players?: IPlayer[]
}

export interface IPlayer extends Document {
    playerName: string
    position: string
    shirtNo: number
}

const teamSchema: Schema = new Schema(
    {
        clubName: {
            type: String,
            required: true,
            unique: [true, 'club name should be unique'],
        },
        about: {
            type: String,
        },
        arena: {
            type: String,
            required: true,
        },
        owner: {
            type: String,
            required: true,
        },
        headCoach: {
            type: String,
            required: true,
        },
        founded: {
            type: String,
            required: true,
        },
        nickName: {
            type: String,
        },
        players: [
            {
                playerName: String,
                position: String,
                shirtNo: Number,
            },
        ],
    },
    { timestamps: true }
)

export default mongoose.model<ITeam>('Team', teamSchema)
