import * as _ from 'lodash';
import {
  CamelToSnakeCaseNested,
  SnakeToCamelCaseNested,
} from 'src/core/types/transform.types';

export const objectToSnakeCase = <T>(input: T): CamelToSnakeCaseNested<T> =>
  Object.keys(input).reduce((result: any, key: any) => {
    result[_.snakeCase(key)] = input[key];
    return result;
  }, {});

export const objectToCamelCase = <T>(input: T): SnakeToCamelCaseNested<T> =>
  Object.keys(input).reduce((result: any, key: any) => {
    result[_.camelCase(key)] = input[key];
    return result;
  }, {});
