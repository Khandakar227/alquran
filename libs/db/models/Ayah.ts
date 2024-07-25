import { model, models, Schema } from 'mongoose';
import { IWord, WordSchema } from './Word';


export interface IAyah {
    number: number,
    text: string,
    en_text: string,
    bn_text: string,
    numberInSurah: number,
    juz: number,
    manzil: number,
    page: number,
    ruku: number,
    hizbQuarter: number,
    surahNumber: number,
    wbw: IWord[]
}

export const AyahSchema: Schema = new Schema({
    number: { type: Number, required: true, unique: true },
    text: { type: String, index: 'text' },
    bn_text: {type: String, index: 'text' },
    en_text: {type: String, index: 'text' },
    numberInSurah: { type: Number, },
    juz: { type: Number, },
    manzil: { type: Number, },
    page: { type: Number, },
    ruku: { type: Number, },
    hizbQuarter: { type: Number, },
    surahNumber: { type: Number, },
    wbw: [{ type: WordSchema }]
});

const Ayah = models.Ayah ?? model("Ayah", AyahSchema);


export default Ayah;