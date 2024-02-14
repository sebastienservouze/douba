import axios, {AxiosResponse} from 'axios'

export class MovieService {

    readonly options = {
        headers: {
            'X-RapidAPI-Key': 'd035ac3a2dmsh84b63bd678d66b9p101026jsncf5e23cf100b',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };

    async findMoviesByTitle(title: string, page?: number): Promise<string[]> {
        let url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${title}?exact=false`;
        if (page) {
            url += `&page=${page}`;
        }

        return await axios.get(url, this.options)
            .then((response: AxiosResponse<string>) => {
                return JSON.parse(response.data).map((elem: any) => {
                    return elem.title;
                })
            });
    }

}