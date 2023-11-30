import ITelemetry from "./interfaces/itelemetry";
import { ResumeScripts } from './lib/roteiro'
import { Stops } from './lib/paradas';
import IStop from './interfaces/istop';
import axios, { AxiosPromise, AxiosProxyConfig } from 'axios';
import { uid } from 'uid';
import objectId from './interfaces/objectId';

const findJump = (telemetry: ITelemetry): Promise<any> => {

    return new Promise((resolve, reject) => {

        try {
            const date = new Date(telemetry.data)
            const hours = date.getHours();
            const week = date.getDay() + 1;

            const sripts = ResumeScripts()
                .filter(x => x.prefix === telemetry.veiculo)
                .filter(x => parseInt(x.sigla.substring(3)) % 2 === week % 2)

            let resume: any;

            if (hours < 19) {
                resume = sripts.filter(x => parseInt(x.sigla.substring(3)) <= 8)
            } else {
                resume = sripts.filter(x => parseInt(x.sigla.substring(3)) > 8)
            }

            resume = sripts.filter(x => parseInt(x.sigla.substring(3)) > 8)
            const sigla = resume[0].sigla;
            const stops = Stops.filter((x: IStop) => x.RotaID === sigla);

            const locals: string[] = []

            stops.forEach((s: IStop) => {
                if (locals.indexOf(s.Title.split(',')[0]) === -1) {
                    locals.push(s.Title.split(',')[0])
                }
            })

            let response = false;

            locals.forEach(x => {
                const index = telemetry.localizacao?.indexOf(x)
                if (index !== -1) {
                    response = true;
                }
            })
            if (!response) {
                const data: objectId = {}
                telemetry['roteiro'] = sigla
                data[uid()] = {
                    telemetry
                }

                const config = {
                    url: "https://fcz-uber-lixo-default-rtdb.firebaseio.com/telemetry.json",
                    method: "patch",
                    data
                }

                axios(config)
                    .then(resp => resolve(resp))
                    .catch(error => reject(error))
            } else {
                resolve({ status: true })
            }

        } catch (e) {
            reject(e)
        }
    })
}


export default findJump;

