import { ArgumentsHost, Catch, HttpException, type HttpServer, HttpStatus } from '@nestjs/common';
import { APP_FILTER, BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '@repo/db/client';

export type ErrorCodesStatusMapping = {
  [key: string]:
    | number
    | {
        statusCode?: number;
        errorMessage?: string;
      };
};

@Catch(Prisma?.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  private readonly defaultMapping = {
    P2000: HttpStatus.BAD_REQUEST,
    P2002: HttpStatus.CONFLICT,
    P2025: HttpStatus.NOT_FOUND,
  };

  private readonly userDefinedMapping?: ErrorCodesStatusMapping;

  constructor(applicationRef?: HttpServer, errorCodesStatusMapping?: ErrorCodesStatusMapping) {
    super(applicationRef);

    this.userDefinedMapping = errorCodesStatusMapping;
  }

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    return this.catchClientKnownRequestError(exception, host);
  }

  private catchClientKnownRequestError(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const statusCode = this.userDefinedStatusCode(exception) || this.defaultStatusCode(exception);

    const message = this.userDefinedExceptionMessage(exception) || this.defaultExceptionMessage(exception);

    if (statusCode === undefined) {
      return super.catch(exception, host);
    }

    return super.catch(new HttpException({ statusCode, message }, statusCode), host);
  }

  private userDefinedStatusCode(exception: Prisma.PrismaClientKnownRequestError): number | undefined {
    const userDefinedValue = this.userDefinedMapping?.[exception.code];

    return typeof userDefinedValue === 'number' ? userDefinedValue : userDefinedValue?.statusCode;
  }

  private defaultStatusCode(exception: Prisma.PrismaClientKnownRequestError): number | undefined {
    return this.defaultMapping[exception.code as keyof typeof this.defaultMapping];
  }

  private userDefinedExceptionMessage(exception: Prisma.PrismaClientKnownRequestError): string | undefined {
    const userDefinedValue = this.userDefinedMapping?.[exception.code];

    return typeof userDefinedValue === 'number' ? undefined : userDefinedValue?.errorMessage;
  }

  private defaultExceptionMessage(exception: Prisma.PrismaClientKnownRequestError): string {
    const shortMessage = exception.message.substring(exception.message.indexOf('→'));

    return `[${exception.code}]: ` + shortMessage.substring(shortMessage.indexOf('\n')).replace(/\n/g, '').trim();
  }
}

export function providePrismaClientExceptionFilter(errorCodesStatusMapping?: ErrorCodesStatusMapping) {
  return {
    provide: APP_FILTER,
    useFactory: ({ httpAdapter }: HttpAdapterHost) => {
      return new PrismaClientExceptionFilter(httpAdapter, errorCodesStatusMapping);
    },
    inject: [HttpAdapterHost],
  };
}
