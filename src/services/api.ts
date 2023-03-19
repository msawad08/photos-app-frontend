
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

export type ApiResponse = Record<string,string>


class API {


  private _token?: string;

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
              'Authorization':
                ((this.token) &&
                `Bearer ${ this.token}`) ?? "",
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

  public set token(v: string | undefined) {
    if (v !== undefined) {
      this._token = v;
      localStorage.setItem("backend-auth", v);
    }
  }

  public get token(): string | undefined {
    if (!this._token) {
      this._token = localStorage.getItem("backend-auth") ?? undefined;
    }
    return this._token;
  }


}

class PhotosBackend extends API{
    constructor(){
        super(apiPath??"")
    }
}
export const photosBackend = new PhotosBackend(); 