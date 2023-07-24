// import axios from 'axios'
// import Axios from 'axios'
// import cheerio from 'cheerio'
// import { data } from 'cheerio/lib/api/attributes'

// export class DragonNest {
//     public async event() {
//         const result: { event: string; url: string }[] = []

//         const { data } = await Axios.get(
//             'https://patchnote.dragonnest.com/sea/'
//         )
//         const $ = cheerio.load(data)
//         $('ul > li').each(function (i, el) {
//             const $$ = cheerio.load(el)
//             const event = $$('span').text()
//             console.log(event)
//             if (event)
//                 result.push({
//                     event: $$('span').text(),
//                     url: $$('a').attr('href') || '',
//                 })
//         })

//         for (let i = 1; i < result.length; i++) {
//             const datas = await axios.post(
//                 'https://patchnote.dragonnest.com/sea/Home/List',
//                 JSON.stringify({
//                     page: i,
//                 })
//             )
//             console.log(datas.data)
//         }
//         return {
//             date: $('h2').text(),
//             result: result,
//         }
//     }
// }
// new DragonNest().event().then(console.log)
