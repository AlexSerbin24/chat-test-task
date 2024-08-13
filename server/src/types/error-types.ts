class ApiError extends Error{
    public statusCode:number;

    constructor(message:string, statusCode:number) {
        super(message);
        this.statusCode = statusCode;
    }

    static BadRequest(message:string){
        return new ApiError(message,400)
    }

    static NotFound(message:string){
        return new ApiError(message,404);

    }

}

export default ApiError;