import mongoose, { Schema, Document } from 'mongoose'

export interface IFixture extends Document {
    homeTeam: string
    awayTeam: string
    homeGoals: number
    awayGoals: number
    matchTime: string | Date
    stadium: string
    referee: string
    isPlayed: boolean
    Attendance?: string
}

const fixtureSchema: Schema = new Schema(
    {
        homeTeam: {
            type: Schema.Types.ObjectId,
            ref: 'Team',
        },
        awayTeam: {
            type: Schema.Types.ObjectId,
            ref: 'Team',
        },
        homeGoals: {
            type: Number,
            default: 0,
        },
        awayGoals: {
            type: Number,
            default: 0,
        },
        matchTime: {
            type: Date,
            required: true,
        },
        stadium: {
            type: String,
        },
        referee: {
            type: String,
        },
        isPlayed: {
            type: Boolean,
        },
        Attendance: String,
    },
    { timestamps: true }
)

export default mongoose.model<IFixture>('Fixture', fixtureSchema)
