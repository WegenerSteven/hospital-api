import {ArgumentsHost, Catch, HttpStatus, HttpException} from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { LogsService } from "src/logs/logs.service";
import { Request, Response } from "express";
//interface for the request and response objects

interface MyResponseObj {
  statuscode: number;
  timestamp: string;
  path: string;
  res: string | object;
}

 @Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
    private readonly logs = new LogsService();

    //get Ip address
    private getClientIp(req: Request): string{
        //get the x-forwarded-for header or the remote address
        const forwardedFor = req.headers['x-forwarded-for'];
        if(forwardedFor){
            return Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor.split(',')[0].trim();
        }
        return req.ip || 'unknown';
    }

    //catch all exception reformat the error and log it
    override catch (exception: unknown, host: ArgumentsHost){
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();
        const clientIp = this.getClientIp(req);

        const myResponseObj: MyResponseObj = {
            statuscode: HttpStatus.INTERNAL_SERVER_ERROR,
            timestamp: new Date().toISOString(),
            path: req.url,
            res: '',
        }

        //if the exception is an instance of Error, set the response message
        if(exception instanceof HttpException){
            myResponseObj.statuscode = exception.getStatus();
            myResponseObj.res = exception.getResponse();
        } else if(exception instanceof Error){
            myResponseObj.res = exception.message;
        } else{
            myResponseObj.res = 'Internal Server Error';
        }

        res.status(myResponseObj.statuscode).json(myResponseObj)

        //log the error to a file
        const logMessage = typeof myResponseObj.res === 'string' ? myResponseObj.res: JSON. stringify(myResponseObj.res);
        void this.logs.logToFile(`Error: ${logMessage}-Path: ${req.url}`, clientIp);
    }
}