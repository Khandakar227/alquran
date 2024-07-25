import Ayah from '@/libs/db/models/Ayah';
import ar from './ar.uthmani.json';
import bn from './bn.bengali.json';
import en from './en.sahih.json';
import wbwArray from './quran_wbw.json'

import Surah from '@/libs/db/models/Surah';

export async function add() {
    console.log((ar as any).data.surahs.length)
    // for (let i = 0; i < (ar as any).data.surahs.length; i++) {
    //     console.log((ar as any).data.surahs[i])
    //     let number = (ar as any).data.surahs[i].number;
    //     let name = (ar as any).data.surahs[i].name;
    //     let englishName = (ar as any).data.surahs[i].englishName;
    //     let englishNameTranslation = (ar as any).data.surahs[i].englishNameTranslation;
    //     let numberOfAyahs = (ar as any).data.surahs[i].ayahs.length;
    //     let revelationType = (ar as any).data.surahs[i].revelationType;
    //     await Surah.create({
    //         number,
    //         name,
    //         englishName,
    //         englishNameTranslation,
    //         numberOfAyahs,
    //         revelationType,
    //     });
    // }
    
    for (let i = 0; i < (ar as any).data.surahs.length; i++) {
        let ayahs = (ar as any).data.surahs[i].ayahs;
        let surahNumber = (ar as any).data.surahs[i].number;

        for (let j = 0; j < ayahs.length; j++) {
            let number = ayahs[j].number;
            let wbw = JSON.parse((wbwArray as any)[surahNumber - 1][j])
            // let text = ayahs[j].text;
            // let bn_text = (bn as any).data.surahs[i].ayahs[j].text;
            // let en_text = (en as any).data.surahs[i].ayahs[j].text;
            // let numberInSurah = ayahs[j].numberInSurah;
            // let juz = ayahs[j].juz;
            // let manzil = ayahs[j].manzil;
            // let page = ayahs[j].page;
            // let ruku = ayahs[j].ruku;
            // let hizbQuarter = ayahs[j].hizbQuarter;
            await Ayah.updateOne({number: number}, {
                $set: {
                    wbw
                }
            })
        }
    }
}