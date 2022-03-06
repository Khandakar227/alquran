# A web platform for reading the glorious quran
This is a sadaqa jariyah project. If you wish to contribute fork this repo,
Commit and pull a request.
## Features
1. Available in English and Bangla (Have an intention of adding more language support.
2. Persistent last read. You can start reading from where you read previously.
3. Search by word, ayah, letters.
4. Themes. Light & Dark.
## Routes.
| route | details |
|-------|---------|
| /surah_number | Any number you pass after the url separated by / is a the surah number.Example: `https://www.alquran.vercel.app/2`.|
| /surah_number?ayah=from:to | If not specified you will get maximum 10 ayah. You can limit ayah numbers with `from` `to`. Example: `https://www.alquran.vercel.app/2?ayah=1:20` |
| / surah_number/ayah_number | get an ayah from a surah. |
| /search?keyword=word | search for an ayah contianing specific word from both translations and arabic texts Example: `https://www.alquran.vercel.app/search?keyword=golaith` |

## Contact
For any suggestion, issue contact where
[xenonknight54@gmail.com](mailto:xenonknight54@gmail.com)
[Facebook](https://www.facebook.com/profile.php?id=100015443855406)