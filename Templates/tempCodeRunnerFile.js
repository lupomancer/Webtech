    const getCapital = () => {
        return new Promise((resolve, reject) => {
            req({
                url: `https://restcountries.eu/rest/v2/name/${country}`,
                json: true,
            }, (error, response, body) => {
                if (body.status != 404) {
                    resolve(body[0].capital);
                } else {
                    reject(new Error('error'));
                }
            });
        });
    };