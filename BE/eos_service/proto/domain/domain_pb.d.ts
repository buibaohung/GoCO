// package: domain
// file: domain/domain.proto

import * as jspb from 'google-protobuf';

export class EosAccount extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getPrivateKey(): string;
  setPrivateKey(value: string): void;

  getPublicKey(): string;
  setPublicKey(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EosAccount.AsObject;
  static toObject(includeInstance: boolean, msg: EosAccount): EosAccount.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EosAccount, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EosAccount;
  static deserializeBinaryFromReader(message: EosAccount, reader: jspb.BinaryReader): EosAccount;
}

export namespace EosAccount {
  export type AsObject = {
    name: string,
    privateKey: string,
    publicKey: string,
  }
}

export class QueryOrder extends jspb.Message {
  getOrderField(): string;
  setOrderField(value: string): void;

  getOrderBy(): string;
  setOrderBy(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryOrder.AsObject;
  static toObject(includeInstance: boolean, msg: QueryOrder): QueryOrder.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryOrder, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryOrder;
  static deserializeBinaryFromReader(message: QueryOrder, reader: jspb.BinaryReader): QueryOrder;
}

export namespace QueryOrder {
  export type AsObject = {
    orderField: string,
    orderBy: string,
  }
}

export class Pagination extends jspb.Message {
  getOffset(): number;
  setOffset(value: number): void;

  getLimit(): number;
  setLimit(value: number): void;

  getSize(): number;
  setSize(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Pagination.AsObject;
  static toObject(includeInstance: boolean, msg: Pagination): Pagination.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Pagination, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Pagination;
  static deserializeBinaryFromReader(message: Pagination, reader: jspb.BinaryReader): Pagination;
}

export namespace Pagination {
  export type AsObject = {
    offset: number,
    limit: number,
    size: number,
  }
}

export class Facility extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getEosUsername(): string;
  setEosUsername(value: string): void;

  getType(): string;
  setType(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getPhoneNumber(): string;
  setPhoneNumber(value: string): void;

  getLocation(): string;
  setLocation(value: string): void;

  getWebsite(): string;
  setWebsite(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Facility.AsObject;
  static toObject(includeInstance: boolean, msg: Facility): Facility.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Facility, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Facility;
  static deserializeBinaryFromReader(message: Facility, reader: jspb.BinaryReader): Facility;
}

export namespace Facility {
  export type AsObject = {
    id: string,
    name: string,
    eosUsername: string,
    type: string,
    email: string,
    phoneNumber: string,
    location: string,
    website: string,
  }
}

export class Product extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getAvatar(): string;
  setAvatar(value: string): void;

  getFacilityId(): string;
  setFacilityId(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getCreatedAt(): number;
  setCreatedAt(value: number): void;

  getUpdatedAt(): number;
  setUpdatedAt(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Product.AsObject;
  static toObject(includeInstance: boolean, msg: Product): Product.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Product, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Product;
  static deserializeBinaryFromReader(message: Product, reader: jspb.BinaryReader): Product;
}

export namespace Product {
  export type AsObject = {
    id: string,
    name: string,
    avatar: string,
    facilityId: string,
    description: string,
    createdAt: number,
    updatedAt: number,
  }
}

export class ProductItem extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getProductId(): string;
  setProductId(value: string): void;

  getPrice(): number;
  setPrice(value: number): void;

  getOwner(): string;
  setOwner(value: string): void;

  getFromProductItemId(): string;
  setFromProductItemId(value: string): void;

  getExpiryDateTimestamp(): number;
  setExpiryDateTimestamp(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProductItem.AsObject;
  static toObject(includeInstance: boolean, msg: ProductItem): ProductItem.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProductItem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProductItem;
  static deserializeBinaryFromReader(message: ProductItem, reader: jspb.BinaryReader): ProductItem;
}

export namespace ProductItem {
  export type AsObject = {
    id: string,
    productId: string,
    price: number,
    owner: string,
    fromProductItemId: string,
    expiryDateTimestamp: number,
  }
}

export class ProductImage extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getProductId(): string;
  setProductId(value: string): void;

  getImageId(): string;
  setImageId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProductImage.AsObject;
  static toObject(includeInstance: boolean, msg: ProductImage): ProductImage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProductImage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProductImage;
  static deserializeBinaryFromReader(message: ProductImage, reader: jspb.BinaryReader): ProductImage;
}

export namespace ProductImage {
  export type AsObject = {
    id: string,
    productId: string,
    imageId: string,
  }
}

export class Event extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getProductItemId(): string;
  setProductItemId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getCreatedAt(): number;
  setCreatedAt(value: number): void;

  getFromFacilityId(): string;
  setFromFacilityId(value: string): void;

  getToFacilityId(): string;
  setToFacilityId(value: string): void;

  getDeliveredByFacilityId(): string;
  setDeliveredByFacilityId(value: string): void;

  getSoldAt(): number;
  setSoldAt(value: number): void;

  getFromProductItemId(): string;
  setFromProductItemId(value: string): void;

  getToProductItemId(): string;
  setToProductItemId(value: string): void;

  getQuality(): number;
  setQuality(value: number): void;

  clearProductItemIdsList(): void;
  getProductItemIdsList(): Array<string>;
  setProductItemIdsList(value: Array<string>): void;
  addProductItemIds(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Event.AsObject;
  static toObject(includeInstance: boolean, msg: Event): Event.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Event, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Event;
  static deserializeBinaryFromReader(message: Event, reader: jspb.BinaryReader): Event;
}

export namespace Event {
  export type AsObject = {
    id: string,
    productItemId: string,
    name: string,
    createdAt: number,
    fromFacilityId: string,
    toFacilityId: string,
    deliveredByFacilityId: string,
    soldAt: number,
    fromProductItemId: string,
    toProductItemId: string,
    quality: number,
    productItemIdsList: Array<string>,
  }
}

export class Nil extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Nil.AsObject;
  static toObject(includeInstance: boolean, msg: Nil): Nil.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Nil, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Nil;
  static deserializeBinaryFromReader(message: Nil, reader: jspb.BinaryReader): Nil;
}

export namespace Nil {
  export type AsObject = {
  }
}

export class Response extends jspb.Message {
  getStatus(): number;
  setStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Response.AsObject;
  static toObject(includeInstance: boolean, msg: Response): Response.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Response, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Response;
  static deserializeBinaryFromReader(message: Response, reader: jspb.BinaryReader): Response;
}

export namespace Response {
  export type AsObject = {
    status: number,
  }
}

export enum FacilityType {
  FARMER = 0,
  SUPPLIER = 1,
  FACTORY = 2,
  DISTRIBUTION = 3,
  RETAIL = 4,
  CUSTOMER = 5,
}

