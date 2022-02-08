import axios from 'axios';

export class Service {
    constructor() {
        this.baseUrl = "https://rickandmortyapi.com/api"
    }
    async getCharacters(page) {
        const res = await axios.get(`${this.baseUrl}/character?page=${page}`)
        return res.data;
    }
}
