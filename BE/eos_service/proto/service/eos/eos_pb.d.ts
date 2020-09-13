// package: service.eos
// file: service/eos/eos.proto

import * as jspb from 'google-protobuf';
import * as domain_domain_pb from '../../domain/domain_pb';

export class GetByIDRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetByIDRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetByIDRequest): GetByIDRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetByIDRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetByIDRequest;
  static deserializeBinaryFromReader(message: GetByIDRequest, reader: jspb.BinaryReader): GetByIDRequest;
}

export namespace GetByIDRequest {
  export type AsObject = {
    id: string,
  }
}

export class NewProductRequest extends jspb.Message {
  hasProduct(): boolean;
  clearProduct(): void;
  getProduct(): domain_domain_pb.Product | undefined;
  setProduct(value?: domain_domain_pb.Product): void;

  hasEosAccount(): boolean;
  clearEosAccount(): void;
  getEosAccount(): domain_domain_pb.EosAccount | undefined;
  setEosAccount(value?: domain_domain_pb.EosAccount): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewProductRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewProductRequest): NewProductRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NewProductRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewProductRequest;
  static deserializeBinaryFromReader(message: NewProductRequest, reader: jspb.BinaryReader): NewProductRequest;
}

export namespace NewProductRequest {
  export type AsObject = {
    product?: domain_domain_pb.Product.AsObject,
    eosAccount?: domain_domain_pb.EosAccount.AsObject,
  }
}

export class DeleteProductRequest extends jspb.Message {
  getProductId(): string;
  setProductId(value: string): void;

  hasEosAccount(): boolean;
  clearEosAccount(): void;
  getEosAccount(): domain_domain_pb.EosAccount | undefined;
  setEosAccount(value?: domain_domain_pb.EosAccount): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteProductRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteProductRequest): DeleteProductRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteProductRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteProductRequest;
  static deserializeBinaryFromReader(message: DeleteProductRequest, reader: jspb.BinaryReader): DeleteProductRequest;
}

export namespace DeleteProductRequest {
  export type AsObject = {
    productId: string,
    eosAccount?: domain_domain_pb.EosAccount.AsObject,
  }
}

export class UpdateProductRequest extends jspb.Message {
  getProductId(): string;
  setProductId(value: string): void;

  hasProduct(): boolean;
  clearProduct(): void;
  getProduct(): domain_domain_pb.Product | undefined;
  setProduct(value?: domain_domain_pb.Product): void;

  hasEosAccount(): boolean;
  clearEosAccount(): void;
  getEosAccount(): domain_domain_pb.EosAccount | undefined;
  setEosAccount(value?: domain_domain_pb.EosAccount): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateProductRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateProductRequest): UpdateProductRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateProductRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateProductRequest;
  static deserializeBinaryFromReader(message: UpdateProductRequest, reader: jspb.BinaryReader): UpdateProductRequest;
}

export namespace UpdateProductRequest {
  export type AsObject = {
    productId: string,
    product?: domain_domain_pb.Product.AsObject,
    eosAccount?: domain_domain_pb.EosAccount.AsObject,
  }
}

export class NewProductItemRequest extends jspb.Message {
  hasProductItem(): boolean;
  clearProductItem(): void;
  getProductItem(): domain_domain_pb.ProductItem | undefined;
  setProductItem(value?: domain_domain_pb.ProductItem): void;

  hasEosAccount(): boolean;
  clearEosAccount(): void;
  getEosAccount(): domain_domain_pb.EosAccount | undefined;
  setEosAccount(value?: domain_domain_pb.EosAccount): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewProductItemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewProductItemRequest): NewProductItemRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NewProductItemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewProductItemRequest;
  static deserializeBinaryFromReader(message: NewProductItemRequest, reader: jspb.BinaryReader): NewProductItemRequest;
}

export namespace NewProductItemRequest {
  export type AsObject = {
    productItem?: domain_domain_pb.ProductItem.AsObject,
    eosAccount?: domain_domain_pb.EosAccount.AsObject,
  }
}

export class DeleteProductItemRequest extends jspb.Message {
  getProductItemId(): string;
  setProductItemId(value: string): void;

  hasEosAccount(): boolean;
  clearEosAccount(): void;
  getEosAccount(): domain_domain_pb.EosAccount | undefined;
  setEosAccount(value?: domain_domain_pb.EosAccount): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteProductItemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteProductItemRequest): DeleteProductItemRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteProductItemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteProductItemRequest;
  static deserializeBinaryFromReader(message: DeleteProductItemRequest, reader: jspb.BinaryReader): DeleteProductItemRequest;
}

export namespace DeleteProductItemRequest {
  export type AsObject = {
    productItemId: string,
    eosAccount?: domain_domain_pb.EosAccount.AsObject,
  }
}

export class NewProductImageRequest extends jspb.Message {
  hasProductImage(): boolean;
  clearProductImage(): void;
  getProductImage(): domain_domain_pb.ProductImage | undefined;
  setProductImage(value?: domain_domain_pb.ProductImage): void;

  hasEosAccount(): boolean;
  clearEosAccount(): void;
  getEosAccount(): domain_domain_pb.EosAccount | undefined;
  setEosAccount(value?: domain_domain_pb.EosAccount): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewProductImageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewProductImageRequest): NewProductImageRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NewProductImageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewProductImageRequest;
  static deserializeBinaryFromReader(message: NewProductImageRequest, reader: jspb.BinaryReader): NewProductImageRequest;
}

export namespace NewProductImageRequest {
  export type AsObject = {
    productImage?: domain_domain_pb.ProductImage.AsObject,
    eosAccount?: domain_domain_pb.EosAccount.AsObject,
  }
}

export class DeleteProductImageRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  hasEosAccount(): boolean;
  clearEosAccount(): void;
  getEosAccount(): domain_domain_pb.EosAccount | undefined;
  setEosAccount(value?: domain_domain_pb.EosAccount): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteProductImageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteProductImageRequest): DeleteProductImageRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteProductImageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteProductImageRequest;
  static deserializeBinaryFromReader(message: DeleteProductImageRequest, reader: jspb.BinaryReader): DeleteProductImageRequest;
}

export namespace DeleteProductImageRequest {
  export type AsObject = {
    id: string,
    eosAccount?: domain_domain_pb.EosAccount.AsObject,
  }
}

export class DeleteAllProductImagesRequest extends jspb.Message {
  getProductId(): string;
  setProductId(value: string): void;

  hasEosAccount(): boolean;
  clearEosAccount(): void;
  getEosAccount(): domain_domain_pb.EosAccount | undefined;
  setEosAccount(value?: domain_domain_pb.EosAccount): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteAllProductImagesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteAllProductImagesRequest): DeleteAllProductImagesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteAllProductImagesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteAllProductImagesRequest;
  static deserializeBinaryFromReader(message: DeleteAllProductImagesRequest, reader: jspb.BinaryReader): DeleteAllProductImagesRequest;
}

export namespace DeleteAllProductImagesRequest {
  export type AsObject = {
    productId: string,
    eosAccount?: domain_domain_pb.EosAccount.AsObject,
  }
}

export class NewEventRequest extends jspb.Message {
  hasEvent(): boolean;
  clearEvent(): void;
  getEvent(): domain_domain_pb.Event | undefined;
  setEvent(value?: domain_domain_pb.Event): void;

  hasEosAccount(): boolean;
  clearEosAccount(): void;
  getEosAccount(): domain_domain_pb.EosAccount | undefined;
  setEosAccount(value?: domain_domain_pb.EosAccount): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewEventRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewEventRequest): NewEventRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NewEventRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewEventRequest;
  static deserializeBinaryFromReader(message: NewEventRequest, reader: jspb.BinaryReader): NewEventRequest;
}

export namespace NewEventRequest {
  export type AsObject = {
    event?: domain_domain_pb.Event.AsObject,
    eosAccount?: domain_domain_pb.EosAccount.AsObject,
  }
}

export class GetPubFromPrivRequest extends jspb.Message {
  getPrivateKey(): string;
  setPrivateKey(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPubFromPrivRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetPubFromPrivRequest): GetPubFromPrivRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetPubFromPrivRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPubFromPrivRequest;
  static deserializeBinaryFromReader(message: GetPubFromPrivRequest, reader: jspb.BinaryReader): GetPubFromPrivRequest;
}

export namespace GetPubFromPrivRequest {
  export type AsObject = {
    privateKey: string,
  }
}

export class GetPubFromPrivResponse extends jspb.Message {
  getPublicKey(): string;
  setPublicKey(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPubFromPrivResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetPubFromPrivResponse): GetPubFromPrivResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetPubFromPrivResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPubFromPrivResponse;
  static deserializeBinaryFromReader(message: GetPubFromPrivResponse, reader: jspb.BinaryReader): GetPubFromPrivResponse;
}

export namespace GetPubFromPrivResponse {
  export type AsObject = {
    publicKey: string,
  }
}

export class GetNameFromPubRequest extends jspb.Message {
  getPublicKey(): string;
  setPublicKey(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetNameFromPubRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetNameFromPubRequest): GetNameFromPubRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetNameFromPubRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetNameFromPubRequest;
  static deserializeBinaryFromReader(message: GetNameFromPubRequest, reader: jspb.BinaryReader): GetNameFromPubRequest;
}

export namespace GetNameFromPubRequest {
  export type AsObject = {
    publicKey: string,
  }
}

export class GetNameFromPubResponse extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetNameFromPubResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetNameFromPubResponse): GetNameFromPubResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetNameFromPubResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetNameFromPubResponse;
  static deserializeBinaryFromReader(message: GetNameFromPubResponse, reader: jspb.BinaryReader): GetNameFromPubResponse;
}

export namespace GetNameFromPubResponse {
  export type AsObject = {
    name: string,
  }
}

export class GetPubFromNameRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPubFromNameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetPubFromNameRequest): GetPubFromNameRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetPubFromNameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPubFromNameRequest;
  static deserializeBinaryFromReader(message: GetPubFromNameRequest, reader: jspb.BinaryReader): GetPubFromNameRequest;
}

export namespace GetPubFromNameRequest {
  export type AsObject = {
    name: string,
  }
}

export class GetPubFromNameResponse extends jspb.Message {
  getPublicKey(): string;
  setPublicKey(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPubFromNameResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetPubFromNameResponse): GetPubFromNameResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetPubFromNameResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPubFromNameResponse;
  static deserializeBinaryFromReader(message: GetPubFromNameResponse, reader: jspb.BinaryReader): GetPubFromNameResponse;
}

export namespace GetPubFromNameResponse {
  export type AsObject = {
    publicKey: string,
  }
}

