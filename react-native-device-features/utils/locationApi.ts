import axios from "axios";

import { IMapState } from "../types/types";

const API_KEY = "9103e3d6c0e3a31f518a2e82899944c6";
console.log({ API_KEY });
const BASE_URL = "http://api.positionstack.com/v1";

const instance = axios.create({ baseURL: BASE_URL });

export async function getAddress({ latitude, longitude }: IMapState) {
  try {
    const response = await instance.get(
      `/reverse?access_key=${API_KEY}&query=${latitude},${longitude}&limit=1`
    );

    if (response.status !== 200) {
      throw new Error("Failed get address");
    }

    return response;
  } catch (error) {
    console.error(error);
  }
}
