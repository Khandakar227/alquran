import { model, models, Schema } from 'mongoose';

export interface ISurah {
    number: number,
    name: string,
    englishName: string,
    englishNameTranslation: string,
    numberOfAyahs: number,
    revelationType: string,
}

export const SurahSchema: Schema = new Schema({
    number: {type: Number, required: true, unique: true},
    name: {type: String},
    englishName: {type: String},
    englishNameTranslation: {type: String},
    numberOfAyahs: {type: Number},
    revelationType: {type: String},
});

const Surah = models.Surah ?? model("Surah", SurahSchema);

export default Surah;