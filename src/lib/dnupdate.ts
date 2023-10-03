import axios from 'axios'
import cheerio from 'cheerio'
class DragonNest {
    private async getData() {
        const { data } = await axios.get('https://sea.dragonnest.com/main')
        return cheerio.load(data)
    }
    public async getNotice() {
        const result: { title: string; url: string | undefined }[] = []
        let text = ''
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
}
export default DragonNest