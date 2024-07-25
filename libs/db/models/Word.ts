import { model, models, Schema } from 'mongoose';


export interface IWord {
    word_id: number,
    word_surah: number,
    word_ayah: number,
    word_page: number,
    word_number_in_quran: number,
    word_number_in_surah: number,
    word_number_in_ayah: number,
    word_root: string,
    word_arabic: string,
    word_transliteration: string,
    word_translation: string,
}

export const WordSchema: Schema = new Schema({
    word_id: {type: Number, required: true, unique: true},
    word_surah: {type: Number, },
    word_ayah: {type: Number, },
    word_page: {type: Number, },
    word_number_in_quran: {type: Number, },
    word_number_in_surah: {type: Number, },
    word_number_in_ayah: {type: Number, },
    word_root: {type: String, },
    word_arabic: {type: String, index: 'text' },
    word_transliteration: {type: String, index: 'text'},
    word_translation: {type: String, index: 'text' },

});

// const Word = models.Word ?? model("Word", WordSchema);

// export default Word;