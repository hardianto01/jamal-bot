import { stg, StgType } from './database'

export class Stg {

    async createStg (stgx: number, job: string, mdef: number, crit: number, cdm: number, fd: number,) {
        const make = await stg.findOne({ stg: stgx, job})
        if(make) return null
        const ins = await stg.create({
            stg: stgx,
            job: job,
            magic_defense: mdef,
            defense: mdef,
            critical: crit,
            critical_damage: cdm,
            final_damage: fd
        })
        ins.save()
    }

    async getStg(stgX: number) {
        return stg.findOne({ stg: stgX }) || null
    }

    async getStgByJob(job: string) {
        return stg.findOne({ job: job })
    }

}