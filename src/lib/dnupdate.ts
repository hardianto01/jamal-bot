import axios from 'axios'
import cheerio from 'cheerio'
class DragonNest {
    constructor() {}
    private pact = {} as any
    private async getData() {
        const { data } = await axios.get('https://sea.dragonnest.com/main')
        return cheerio.load(data)
    }
    public async getNotice() {
        const result: { title: string; url: string | undefined }[] = []
        const $ = await this.getData()
        $('body > div.main_bg > div.bbox_wrap > div.main_bbox.mbb_notice > ul > li').each(function (i, el) {
            let eel = cheerio.load(el)
            result.push({
                title: eel.text(),
                url: 'https://sea.dragonnest.com' + eel('a').attr('href'),
            })
        })
        return result
    }
    public async pactUpdate() {
        const { data } = await axios.get('https://patchnote.dragonnest.com/sea')
        const $ = cheerio.load(data)
        const jsonStr = data.split('SnsManager.init(')[1].split(')')[0].replaceAll("'", '"')
        const url = jsonStr.split('url: "')[1].split('"')[0]
        const dateUpdate = $('h2').find('em').text()
        const obj: any = {}
        $('ul.pn_menu > li').each(function (x, i) {
            const $$ = cheerio.load(i)
            const menu = $$('span').text()
            obj[menu] = {
                url: url + '/c/' + x,
            }
        })
        const result = {
            url: url,
            title: $('h2').text().replace(dateUpdate, ''),
            date: dateUpdate,
            new: obj,
        }
        return result
    }
    public async getDetails(url: string) {
        let text = ''
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)
        text = $('div.cont_box').text()
        return text
    }
}
export default DragonNest

