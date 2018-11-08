import { Injectable } from '@angular/core';

import { Base64 } from 'js-base64';

@Injectable({
  providedIn: 'root'
})
export class SerializerService {

  constructor() {}

  /**
   * @description Return the given object serilized
   *
   * @remark
   * The given content is serialized using JSON and Base64,
   * it can be transfered usng the URL without encodeURI()
   * and can't be human readed.
   *
   * @param {any} serilizableContent
   * @returns {string}
   * @memberof SerializerService
   */
  serialize(serilizableContent: any): string {

    const serialized = Base64.encode(JSON.stringify(serilizableContent));

    return serialized;
  }

  /**
   * @description Return an instance of the given serialized object
   *
   * @param {string} serializedObject
   * @returns {object}
   * @memberof SerializerService
   */
  deserialize(serializedObject: string): any {

    const decodedValue: string = Base64.decode(serializedObject);
    const deserializedObject: object = JSON.parse(decodedValue);

    return deserializedObject;
  }

}
