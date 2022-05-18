import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(errors: ValidationError[]) {
    super({}, HttpStatus.UNPROCESSABLE_ENTITY);
    this['response' as any] = this.convertValidationErrors(errors);
  }

  private convertValidationErrors(
    errors: ValidationError[],
    parent: ValidationError = null,
  ) {
    let newErrors = [];
    for (const error of errors) {
      if (!parent || error.property !== parent.property) {
        newErrors = newErrors.concat(Object.values(error.constraints));
      }
    }
    return newErrors;
  }
}
