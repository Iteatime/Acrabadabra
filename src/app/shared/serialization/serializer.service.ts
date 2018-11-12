import { Injectable } from '@angular/core';

import { Base64 } from 'js-base64';

@Injectable({
  providedIn: 'root'
})
export class SerializerService {
  /**
   * @description Return the given content serilized
   *
   * @remark
   * The given content is serialized using JSON and Base64,
   * it can be transfered usng the URL without encodeURI()
   * and can't be human readed.
   *
   * @param {any} serializableContent
   * @returns {string}
   * @memberof SerializerService
   */
  serialize(serializableContent: any): string {

    const serialized = Base64.encode(JSON.stringify(serializableContent));

    return serialized;
  }

  /**
   * @description Deserialize the given content
   *
   * @param {string} serializedObject
   * @returns {object}
   * @memberof SerializerService
   */
  deserialize(serializedContent: string): any {

    const decodedValue: string = Base64.decode(serializedContent);
    const deserializedContent: any = JSON.parse(decodedValue);

    return deserializedContent;
  }

}
