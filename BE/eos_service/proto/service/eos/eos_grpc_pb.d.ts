// package: service.eos
// file: service/eos/eos.proto

import * as grpc from 'grpc';
import * as service_eos_eos_pb from '../../service/eos/eos_pb';
import * as domain_domain_pb from '../../domain/domain_pb';

interface IEOSService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  newEOSAccount: IEOSService_INewEOSAccount;
  newFacility: IEOSService_INewFacility;
  getFacilityEOSName: IEOSService_IGetFacilityEOSName;
  getFacilityByID: IEOSService_IGetFacilityByID;
  newProduct: IEOSService_INewProduct;
  deleteProduct: IEOSService_IDeleteProduct;
  updateProduct: IEOSService_IUpdateProduct;
  getProductByID: IEOSService_IGetProductByID;
  newProductItem: IEOSService_INewProductItem;
  deleteProductItem: IEOSService_IDeleteProductItem;
  getProductItemByID: IEOSService_IGetProductItemByID;
  newProductImage: IEOSService_INewProductImage;
  deleteProductImage: IEOSService_IDeleteProductImage;
  deleteAllProductImages: IEOSService_IDeleteAllProductImages;
  newEvent: IEOSService_INewEvent;
  getPubFromPriv: IEOSService_IGetPubFromPriv;
  getNameFromPub: IEOSService_IGetNameFromPub;
  getPubFromName: IEOSService_IGetPubFromName;
}

interface IEOSService_INewEOSAccount {
  path: string; // "/service.eos.EOS/NewEOSAccount"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<domain_domain_pb.Nil>;
  requestDeserialize: grpc.deserialize<domain_domain_pb.Nil>;
  responseSerialize: grpc.serialize<domain_domain_pb.EosAccount>;
  responseDeserialize: grpc.deserialize<domain_domain_pb.EosAccount>;
}

interface IEOSService_INewFacility {
  path: string; // "/service.eos.EOS/NewFacility"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<domain_domain_pb.Facility>;
  requestDeserialize: grpc.deserialize<domain_domain_pb.Facility>;
  responseSerialize: grpc.serialize<domain_domain_pb.Response>;
  responseDeserialize: grpc.deserialize<domain_domain_pb.Response>;
}

interface IEOSService_IGetFacilityEOSName {
  path: string; // "/service.eos.EOS/GetFacilityEOSName"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<domain_domain_pb.EosAccount>;
  requestDeserialize: grpc.deserialize<domain_domain_pb.EosAccount>;
  responseSerialize: grpc.serialize<domain_domain_pb.Facility>;
  responseDeserialize: grpc.deserialize<domain_domain_pb.Facility>;
}

interface IEOSService_IGetFacilityByID {
  path: string; // "/service.eos.EOS/GetFacilityByID"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<service_eos_eos_pb.GetByIDRequest>;
  requestDeserialize: grpc.deserialize<service_eos_eos_pb.GetByIDRequest>;
  responseSerialize: grpc.serialize<domain_domain_pb.Facility>;
  responseDeserialize: grpc.deserialize<domain_domain_pb.Facility>;
}

interface IEOSService_INewProduct {
  path: string; // "/service.eos.EOS/NewProduct"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<service_eos_eos_pb.NewProductRequest>;
  requestDeserialize: grpc.deserialize<service_eos_eos_pb.NewProductRequest>;
  responseSerialize: grpc.serialize<domain_domain_pb.Response>;
  responseDeserialize: grpc.deserialize<domain_domain_pb.Response>;
}

interface IEOSService_IDeleteProduct {
  path: string; // "/service.eos.EOS/DeleteProduct"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<service_eos_eos_pb.DeleteProductRequest>;
  requestDeserialize: grpc.deserialize<service_eos_eos_pb.DeleteProductRequest>;
  responseSerialize: grpc.serialize<domain_domain_pb.Response>;
  responseDeserialize: grpc.deserialize<domain_domain_pb.Response>;
}

interface IEOSService_IUpdateProduct {
  path: string; // "/service.eos.EOS/UpdateProduct"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<service_eos_eos_pb.UpdateProductRequest>;
  requestDeserialize: grpc.deserialize<service_eos_eos_pb.UpdateProductRequest>;
  responseSerialize: grpc.serialize<domain_domain_pb.Response>;
  responseDeserialize: grpc.deserialize<domain_domain_pb.Response>;
}

interface IEOSService_IGetProductByID {
  path: string; // "/service.eos.EOS/GetProductByID"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<service_eos_eos_pb.GetByIDRequest>;
  requestDeserialize: grpc.deserialize<service_eos_eos_pb.GetByIDRequest>;
  responseSerialize: grpc.serialize<domain_domain_pb.Product>;
  responseDeserialize: grpc.deserialize<domain_domain_pb.Product>;
}

interface IEOSService_INewProductItem {
  path: string; // "/service.eos.EOS/NewProductItem"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<service_eos_eos_pb.NewProductItemRequest>;
  requestDeserialize: grpc.deserialize<service_eos_eos_pb.NewProductItemRequest>;
  responseSerialize: grpc.serialize<domain_domain_pb.Response>;
  responseDeserialize: grpc.deserialize<domain_domain_pb.Response>;
}

interface IEOSService_IDeleteProductItem {
  path: string; // "/service.eos.EOS/DeleteProductItem"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<service_eos_eos_pb.DeleteProductItemRequest>;
  requestDeserialize: grpc.deserialize<service_eos_eos_pb.DeleteProductItemRequest>;
  responseSerialize: grpc.serialize<domain_domain_pb.Response>;
  responseDeserialize: grpc.deserialize<domain_domain_pb.Response>;
}

interface IEOSService_IGetProductItemByID {
  path: string; // "/service.eos.EOS/GetProductItemByID"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<service_eos_eos_pb.GetByIDRequest>;
  requestDeserialize: grpc.deserialize<service_eos_eos_pb.GetByIDRequest>;
  responseSerialize: grpc.serialize<domain_domain_pb.ProductItem>;
  responseDeserialize: grpc.deserialize<domain_domain_pb.ProductItem>;
}

interface IEOSService_INewProductImage {
  path: string; // "/service.eos.EOS/NewProductImage"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<service_eos_eos_pb.NewProductImageRequest>;
  requestDeserialize: grpc.deserialize<service_eos_eos_pb.NewProductImageRequest>;
  responseSerialize: grpc.serialize<domain_domain_pb.Response>;
  responseDeserialize: grpc.deserialize<domain_domain_pb.Response>;
}

interface IEOSService_IDeleteProductImage {
  path: string; // "/service.eos.EOS/DeleteProductImage"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<service_eos_eos_pb.DeleteProductImageRequest>;
  requestDeserialize: grpc.deserialize<service_eos_eos_pb.DeleteProductImageRequest>;
  responseSerialize: grpc.serialize<domain_domain_pb.Response>;
  responseDeserialize: grpc.deserialize<domain_domain_pb.Response>;
}

interface IEOSService_IDeleteAllProductImages {
  path: string; // "/service.eos.EOS/DeleteAllProductImages"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<service_eos_eos_pb.DeleteAllProductImagesRequest>;
  requestDeserialize: grpc.deserialize<service_eos_eos_pb.DeleteAllProductImagesRequest>;
  responseSerialize: grpc.serialize<domain_domain_pb.Response>;
  responseDeserialize: grpc.deserialize<domain_domain_pb.Response>;
}

interface IEOSService_INewEvent {
  path: string; // "/service.eos.EOS/NewEvent"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<service_eos_eos_pb.NewEventRequest>;
  requestDeserialize: grpc.deserialize<service_eos_eos_pb.NewEventRequest>;
  responseSerialize: grpc.serialize<domain_domain_pb.Response>;
  responseDeserialize: grpc.deserialize<domain_domain_pb.Response>;
}

interface IEOSService_IGetPubFromPriv {
  path: string; // "/service.eos.EOS/GetPubFromPriv"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<service_eos_eos_pb.GetPubFromPrivRequest>;
  requestDeserialize: grpc.deserialize<service_eos_eos_pb.GetPubFromPrivRequest>;
  responseSerialize: grpc.serialize<service_eos_eos_pb.GetPubFromPrivResponse>;
  responseDeserialize: grpc.deserialize<service_eos_eos_pb.GetPubFromPrivResponse>;
}

interface IEOSService_IGetNameFromPub {
  path: string; // "/service.eos.EOS/GetNameFromPub"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<service_eos_eos_pb.GetNameFromPubRequest>;
  requestDeserialize: grpc.deserialize<service_eos_eos_pb.GetNameFromPubRequest>;
  responseSerialize: grpc.serialize<service_eos_eos_pb.GetNameFromPubResponse>;
  responseDeserialize: grpc.deserialize<service_eos_eos_pb.GetNameFromPubResponse>;
}

interface IEOSService_IGetPubFromName {
  path: string; // "/service.eos.EOS/GetPubFromName"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<service_eos_eos_pb.GetPubFromNameRequest>;
  requestDeserialize: grpc.deserialize<service_eos_eos_pb.GetPubFromNameRequest>;
  responseSerialize: grpc.serialize<service_eos_eos_pb.GetPubFromNameResponse>;
  responseDeserialize: grpc.deserialize<service_eos_eos_pb.GetPubFromNameResponse>;
}

export const EOSService: IEOSService;
export interface IEOSServer {
  newEOSAccount: grpc.handleUnaryCall<domain_domain_pb.Nil, domain_domain_pb.EosAccount>;
  newFacility: grpc.handleUnaryCall<domain_domain_pb.Facility, domain_domain_pb.Response>;
  getFacilityEOSName: grpc.handleUnaryCall<domain_domain_pb.EosAccount, domain_domain_pb.Facility>;
  getFacilityByID: grpc.handleUnaryCall<service_eos_eos_pb.GetByIDRequest, domain_domain_pb.Facility>;
  newProduct: grpc.handleUnaryCall<service_eos_eos_pb.NewProductRequest, domain_domain_pb.Response>;
  deleteProduct: grpc.handleUnaryCall<service_eos_eos_pb.DeleteProductRequest, domain_domain_pb.Response>;
  updateProduct: grpc.handleUnaryCall<service_eos_eos_pb.UpdateProductRequest, domain_domain_pb.Response>;
  getProductByID: grpc.handleUnaryCall<service_eos_eos_pb.GetByIDRequest, domain_domain_pb.Product>;
  newProductItem: grpc.handleUnaryCall<service_eos_eos_pb.NewProductItemRequest, domain_domain_pb.Response>;
  deleteProductItem: grpc.handleUnaryCall<service_eos_eos_pb.DeleteProductItemRequest, domain_domain_pb.Response>;
  getProductItemByID: grpc.handleUnaryCall<service_eos_eos_pb.GetByIDRequest, domain_domain_pb.ProductItem>;
  newProductImage: grpc.handleUnaryCall<service_eos_eos_pb.NewProductImageRequest, domain_domain_pb.Response>;
  deleteProductImage: grpc.handleUnaryCall<service_eos_eos_pb.DeleteProductImageRequest, domain_domain_pb.Response>;
  deleteAllProductImages: grpc.handleUnaryCall<service_eos_eos_pb.DeleteAllProductImagesRequest, domain_domain_pb.Response>;
  newEvent: grpc.handleUnaryCall<service_eos_eos_pb.NewEventRequest, domain_domain_pb.Response>;
  getPubFromPriv: grpc.handleUnaryCall<service_eos_eos_pb.GetPubFromPrivRequest, service_eos_eos_pb.GetPubFromPrivResponse>;
  getNameFromPub: grpc.handleUnaryCall<service_eos_eos_pb.GetNameFromPubRequest, service_eos_eos_pb.GetNameFromPubResponse>;
  getPubFromName: grpc.handleUnaryCall<service_eos_eos_pb.GetPubFromNameRequest, service_eos_eos_pb.GetPubFromNameResponse>;
}

export interface IEOSClient {
  newEOSAccount(request: domain_domain_pb.Nil, callback: (error: Error | null, response: domain_domain_pb.EosAccount) => void): grpc.ClientUnaryCall;
  newEOSAccount(request: domain_domain_pb.Nil, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.EosAccount) => void): grpc.ClientUnaryCall;
  newFacility(request: domain_domain_pb.Facility, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  newFacility(request: domain_domain_pb.Facility, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  getFacilityEOSName(request: domain_domain_pb.EosAccount, callback: (error: Error | null, response: domain_domain_pb.Facility) => void): grpc.ClientUnaryCall;
  getFacilityEOSName(request: domain_domain_pb.EosAccount, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Facility) => void): grpc.ClientUnaryCall;
  getFacilityByID(request: service_eos_eos_pb.GetByIDRequest, callback: (error: Error | null, response: domain_domain_pb.Facility) => void): grpc.ClientUnaryCall;
  getFacilityByID(request: service_eos_eos_pb.GetByIDRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Facility) => void): grpc.ClientUnaryCall;
  newProduct(request: service_eos_eos_pb.NewProductRequest, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  newProduct(request: service_eos_eos_pb.NewProductRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  deleteProduct(request: service_eos_eos_pb.DeleteProductRequest, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  deleteProduct(request: service_eos_eos_pb.DeleteProductRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  updateProduct(request: service_eos_eos_pb.UpdateProductRequest, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  updateProduct(request: service_eos_eos_pb.UpdateProductRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  getProductByID(request: service_eos_eos_pb.GetByIDRequest, callback: (error: Error | null, response: domain_domain_pb.Product) => void): grpc.ClientUnaryCall;
  getProductByID(request: service_eos_eos_pb.GetByIDRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Product) => void): grpc.ClientUnaryCall;
  newProductItem(request: service_eos_eos_pb.NewProductItemRequest, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  newProductItem(request: service_eos_eos_pb.NewProductItemRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  deleteProductItem(request: service_eos_eos_pb.DeleteProductItemRequest, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  deleteProductItem(request: service_eos_eos_pb.DeleteProductItemRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  getProductItemByID(request: service_eos_eos_pb.GetByIDRequest, callback: (error: Error | null, response: domain_domain_pb.ProductItem) => void): grpc.ClientUnaryCall;
  getProductItemByID(request: service_eos_eos_pb.GetByIDRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.ProductItem) => void): grpc.ClientUnaryCall;
  newProductImage(request: service_eos_eos_pb.NewProductImageRequest, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  newProductImage(request: service_eos_eos_pb.NewProductImageRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  deleteProductImage(request: service_eos_eos_pb.DeleteProductImageRequest, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  deleteProductImage(request: service_eos_eos_pb.DeleteProductImageRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  deleteAllProductImages(request: service_eos_eos_pb.DeleteAllProductImagesRequest, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  deleteAllProductImages(request: service_eos_eos_pb.DeleteAllProductImagesRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  newEvent(request: service_eos_eos_pb.NewEventRequest, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  newEvent(request: service_eos_eos_pb.NewEventRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  getPubFromPriv(request: service_eos_eos_pb.GetPubFromPrivRequest, callback: (error: Error | null, response: service_eos_eos_pb.GetPubFromPrivResponse) => void): grpc.ClientUnaryCall;
  getPubFromPriv(request: service_eos_eos_pb.GetPubFromPrivRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: service_eos_eos_pb.GetPubFromPrivResponse) => void): grpc.ClientUnaryCall;
  getNameFromPub(request: service_eos_eos_pb.GetNameFromPubRequest, callback: (error: Error | null, response: service_eos_eos_pb.GetNameFromPubResponse) => void): grpc.ClientUnaryCall;
  getNameFromPub(request: service_eos_eos_pb.GetNameFromPubRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: service_eos_eos_pb.GetNameFromPubResponse) => void): grpc.ClientUnaryCall;
  getPubFromName(request: service_eos_eos_pb.GetPubFromNameRequest, callback: (error: Error | null, response: service_eos_eos_pb.GetPubFromNameResponse) => void): grpc.ClientUnaryCall;
  getPubFromName(request: service_eos_eos_pb.GetPubFromNameRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: service_eos_eos_pb.GetPubFromNameResponse) => void): grpc.ClientUnaryCall;
}

export class EOSClient extends grpc.Client implements IEOSClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  public newEOSAccount(request: domain_domain_pb.Nil, callback: (error: Error | null, response: domain_domain_pb.EosAccount) => void): grpc.ClientUnaryCall;
  public newEOSAccount(request: domain_domain_pb.Nil, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.EosAccount) => void): grpc.ClientUnaryCall;
  public newFacility(request: domain_domain_pb.Facility, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  public newFacility(request: domain_domain_pb.Facility, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  public getFacilityEOSName(request: domain_domain_pb.EosAccount, callback: (error: Error | null, response: domain_domain_pb.Facility) => void): grpc.ClientUnaryCall;
  public getFacilityEOSName(request: domain_domain_pb.EosAccount, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Facility) => void): grpc.ClientUnaryCall;
  public getFacilityByID(request: service_eos_eos_pb.GetByIDRequest, callback: (error: Error | null, response: domain_domain_pb.Facility) => void): grpc.ClientUnaryCall;
  public getFacilityByID(request: service_eos_eos_pb.GetByIDRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Facility) => void): grpc.ClientUnaryCall;
  public newProduct(request: service_eos_eos_pb.NewProductRequest, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  public newProduct(request: service_eos_eos_pb.NewProductRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  public deleteProduct(request: service_eos_eos_pb.DeleteProductRequest, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  public deleteProduct(request: service_eos_eos_pb.DeleteProductRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  public updateProduct(request: service_eos_eos_pb.UpdateProductRequest, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  public updateProduct(request: service_eos_eos_pb.UpdateProductRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  public getProductByID(request: service_eos_eos_pb.GetByIDRequest, callback: (error: Error | null, response: domain_domain_pb.Product) => void): grpc.ClientUnaryCall;
  public getProductByID(request: service_eos_eos_pb.GetByIDRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Product) => void): grpc.ClientUnaryCall;
  public newProductItem(request: service_eos_eos_pb.NewProductItemRequest, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  public newProductItem(request: service_eos_eos_pb.NewProductItemRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  public deleteProductItem(request: service_eos_eos_pb.DeleteProductItemRequest, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  public deleteProductItem(request: service_eos_eos_pb.DeleteProductItemRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  public getProductItemByID(request: service_eos_eos_pb.GetByIDRequest, callback: (error: Error | null, response: domain_domain_pb.ProductItem) => void): grpc.ClientUnaryCall;
  public getProductItemByID(request: service_eos_eos_pb.GetByIDRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.ProductItem) => void): grpc.ClientUnaryCall;
  public newProductImage(request: service_eos_eos_pb.NewProductImageRequest, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  public newProductImage(request: service_eos_eos_pb.NewProductImageRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  public deleteProductImage(request: service_eos_eos_pb.DeleteProductImageRequest, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  public deleteProductImage(request: service_eos_eos_pb.DeleteProductImageRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  public deleteAllProductImages(request: service_eos_eos_pb.DeleteAllProductImagesRequest, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  public deleteAllProductImages(request: service_eos_eos_pb.DeleteAllProductImagesRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  public newEvent(request: service_eos_eos_pb.NewEventRequest, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  public newEvent(request: service_eos_eos_pb.NewEventRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: domain_domain_pb.Response) => void): grpc.ClientUnaryCall;
  public getPubFromPriv(request: service_eos_eos_pb.GetPubFromPrivRequest, callback: (error: Error | null, response: service_eos_eos_pb.GetPubFromPrivResponse) => void): grpc.ClientUnaryCall;
  public getPubFromPriv(request: service_eos_eos_pb.GetPubFromPrivRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: service_eos_eos_pb.GetPubFromPrivResponse) => void): grpc.ClientUnaryCall;
  public getNameFromPub(request: service_eos_eos_pb.GetNameFromPubRequest, callback: (error: Error | null, response: service_eos_eos_pb.GetNameFromPubResponse) => void): grpc.ClientUnaryCall;
  public getNameFromPub(request: service_eos_eos_pb.GetNameFromPubRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: service_eos_eos_pb.GetNameFromPubResponse) => void): grpc.ClientUnaryCall;
  public getPubFromName(request: service_eos_eos_pb.GetPubFromNameRequest, callback: (error: Error | null, response: service_eos_eos_pb.GetPubFromNameResponse) => void): grpc.ClientUnaryCall;
  public getPubFromName(request: service_eos_eos_pb.GetPubFromNameRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: service_eos_eos_pb.GetPubFromNameResponse) => void): grpc.ClientUnaryCall;
}

