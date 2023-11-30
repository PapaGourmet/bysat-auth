import axios, { AxiosRequestConfig } from 'axios';
import { Request, Response } from 'express';
import { DateTime } from "luxon";

const URL = 'https://novo.bysat.com.br/api/login';


const Conn = async (req: Request, res: Response) => {
    const user = {
        usuario: 'comlurb.coletacidadao',
        senha: '8yzUHC5t*@az<RM'
    }

    const time = DateTime.local().setZone("America/Sao_Paulo");

    axios.post(URL, user)
        .then(data => {
            const token = data.data.token;
            const config: AxiosRequestConfig = {
                method: 'patch',
                url: 'https://comlurb-406714-default-rtdb.firebaseio.com/bysatcredential.json',
                data: {
                    token,
                    time
                }
            }

            axios(config)
                .then(data => res.status(200).json(token))
                .catch(error => res.status(401).json(error));
        })
        .catch(err => {
            console.log(err);
            res.status(401).json(err);
        });
}

export { Conn }
