import { v4 as uuidv4 } from 'uuid';
import {
  objectToCamelCase,
  objectToSnakeCase,
} from 'src/common/utils/object.util';

export class BaseEntity {
  constructor(public child?) {
    this.toCamelCase();
  }
  toSnakeCase() {
    this.child = objectToSnakeCase(this.child);
    return this.child;
  }

  toCamelCase() {
    this.child = this.child && objectToCamelCase(this.child);
    return this.child;
  }

  generateUUID() {
    this.child.uuid = uuidv4();
    return this;
  }
}
