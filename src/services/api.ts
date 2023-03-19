
const apiPath = process.env.REACT_APP_API_PATH;

console.log(process.env)

 
export type ApiRequest = {
  params?: Record<string,any>|string;
  data?: object;
  timeOut?: number;
};

export const isApiError = (error: ApiError|ApiResponse) : error is ApiError=>(
    (error as ApiError).statusCode!== undefined
)


export type ApiError = {
  message: string;
  statusCode: number;
};

export type ApiResponse = {
  status: number;
  data: any;
};


class API {



  private _basepath: string;

  constructor(basePath: string) {
    this._basepath = basePath;

  }

  post = (path: string, request?: ApiRequest) =>  this.request("POST", path, request);
  put = (path: string, request?: ApiRequest) =>  this.request("PUT", path, request);
  patch = (path: string, request?: ApiRequest) =>  this.request("PATCH", path, request);
  get = (path: string, request?: ApiRequest) =>  this.request("GET", path, request);
  del = (path: string, request?: ApiRequest) =>  this.request("DELETE", path, request);

   private async request(type: string, path: string, request?: ApiRequest): Promise<ApiResponse|ApiError> {
    try{
        const resp = await fetch(this.formatPath(path, request?.params), {
            method: type,
            mode: "cors",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            },
            body: request?.data && JSON.stringify(request.data),
          });
          if (!resp.ok) {
            return {
              statusCode: resp.status,
              message: JSON.stringify(resp.json()),
            }
          }
          return resp.json()
    }catch(error: any){
        return {
            statusCode: 500,
            message: error.toString(),
        }
    }



  }



  formatPath(path: string, params?:string|Record<string,any>) {
    let urlParams = "";

    if(typeof params === "string"){
      urlParams = `?${params}`
    }else if(typeof params !== "undefined"){
      urlParams = "?" + (new URLSearchParams(params).toString());
    }

    return `${this._basepath}${path[0] === "/" ? "" : "/"}${path}${urlParams}`;
  }


}

class PhotosBackend extends API{
    constructor(){
        super(apiPath??"")
    }
}
export const photosBackend = new PhotosBackend(); 