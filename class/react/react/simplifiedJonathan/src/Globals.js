
class globalSettings {
    constructor() {
        this.authUser   = 'randuser';
        this.apiUri     = 'https://cp.vnphonebox.com/perl/Server_API.cgi';
        this.enableLog  = '1';
        this.k          = 'dsfj1adsjfk4dsfa9krwiqie8wrieru9';

        this.config     = {
            headers: {
                //'X-My-Custom-Header': 'Header-Value',
                'Access-Control-Allow-Credentials': true,
                'Authorization': '',
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json',
            },
            withCredentials: true,
            timeout: 10000,
            responseType: 'json',
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            //baseURL: 'https://some-domain.com/api/',
            //transformRequest: [function (data) {
            //    // Do whatever you want to transform the data
            //    return data;
            //}],
            //transformResponse: [function (data) {
            //    // Do whatever you want to transform the data
            //    return data;
            //}],
            //paramsSerializer: function(params) {
            //    return Qs.stringify(params, {arrayFormat: 'brackets'})
            //},
        };

    }


}


export default (new globalSettings());

