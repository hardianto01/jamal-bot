import mongoose, { Schema } from 'mongoose'

export const StgType = new Schema({
    job: String,
    stg: Number,
    critical: Number,
    critical_damage: Number,
    magic_defense: Number,
    defense: Number,
    final_damage: { type: Number, default: null },
    max_hp: { type: Number, default: null },
})
export const stg = mongoose.model('stg', StgType)
