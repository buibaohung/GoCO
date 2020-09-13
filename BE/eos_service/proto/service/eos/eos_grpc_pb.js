// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var service_eos_eos_pb = require('../../service/eos/eos_pb.js');
var domain_domain_pb = require('../../domain/domain_pb.js');

function serialize_domain_EosAccount(arg) {
  if (!(arg instanceof domain_domain_pb.EosAccount)) {
    throw new Error('Expected argument of type domain.EosAccount');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_domain_EosAccount(buffer_arg) {
  return domain_domain_pb.EosAccount.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_domain_Facility(arg) {
  if (!(arg instanceof domain_domain_pb.Facility)) {
    throw new Error('Expected argument of type domain.Facility');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_domain_Facility(buffer_arg) {
  return domain_domain_pb.Facility.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_domain_Nil(arg) {
  if (!(arg instanceof domain_domain_pb.Nil)) {
    throw new Error('Expected argument of type domain.Nil');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_domain_Nil(buffer_arg) {
  return domain_domain_pb.Nil.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_domain_Product(arg) {
  if (!(arg instanceof domain_domain_pb.Product)) {
    throw new Error('Expected argument of type domain.Product');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_domain_Product(buffer_arg) {
  return domain_domain_pb.Product.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_domain_ProductItem(arg) {
  if (!(arg instanceof domain_domain_pb.ProductItem)) {
    throw new Error('Expected argument of type domain.ProductItem');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_domain_ProductItem(buffer_arg) {
  return domain_domain_pb.ProductItem.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_domain_Response(arg) {
  if (!(arg instanceof domain_domain_pb.Response)) {
    throw new Error('Expected argument of type domain.Response');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_domain_Response(buffer_arg) {
  return domain_domain_pb.Response.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_eos_DeleteAllProductImagesRequest(arg) {
  if (!(arg instanceof service_eos_eos_pb.DeleteAllProductImagesRequest)) {
    throw new Error('Expected argument of type service.eos.DeleteAllProductImagesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_eos_DeleteAllProductImagesRequest(buffer_arg) {
  return service_eos_eos_pb.DeleteAllProductImagesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_eos_DeleteProductImageRequest(arg) {
  if (!(arg instanceof service_eos_eos_pb.DeleteProductImageRequest)) {
    throw new Error('Expected argument of type service.eos.DeleteProductImageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_eos_DeleteProductImageRequest(buffer_arg) {
  return service_eos_eos_pb.DeleteProductImageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_eos_DeleteProductItemRequest(arg) {
  if (!(arg instanceof service_eos_eos_pb.DeleteProductItemRequest)) {
    throw new Error('Expected argument of type service.eos.DeleteProductItemRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_eos_DeleteProductItemRequest(buffer_arg) {
  return service_eos_eos_pb.DeleteProductItemRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_eos_DeleteProductRequest(arg) {
  if (!(arg instanceof service_eos_eos_pb.DeleteProductRequest)) {
    throw new Error('Expected argument of type service.eos.DeleteProductRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_eos_DeleteProductRequest(buffer_arg) {
  return service_eos_eos_pb.DeleteProductRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_eos_GetByIDRequest(arg) {
  if (!(arg instanceof service_eos_eos_pb.GetByIDRequest)) {
    throw new Error('Expected argument of type service.eos.GetByIDRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_eos_GetByIDRequest(buffer_arg) {
  return service_eos_eos_pb.GetByIDRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_eos_GetNameFromPubRequest(arg) {
  if (!(arg instanceof service_eos_eos_pb.GetNameFromPubRequest)) {
    throw new Error('Expected argument of type service.eos.GetNameFromPubRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_eos_GetNameFromPubRequest(buffer_arg) {
  return service_eos_eos_pb.GetNameFromPubRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_eos_GetNameFromPubResponse(arg) {
  if (!(arg instanceof service_eos_eos_pb.GetNameFromPubResponse)) {
    throw new Error('Expected argument of type service.eos.GetNameFromPubResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_eos_GetNameFromPubResponse(buffer_arg) {
  return service_eos_eos_pb.GetNameFromPubResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_eos_GetPubFromNameRequest(arg) {
  if (!(arg instanceof service_eos_eos_pb.GetPubFromNameRequest)) {
    throw new Error('Expected argument of type service.eos.GetPubFromNameRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_eos_GetPubFromNameRequest(buffer_arg) {
  return service_eos_eos_pb.GetPubFromNameRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_eos_GetPubFromNameResponse(arg) {
  if (!(arg instanceof service_eos_eos_pb.GetPubFromNameResponse)) {
    throw new Error('Expected argument of type service.eos.GetPubFromNameResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_eos_GetPubFromNameResponse(buffer_arg) {
  return service_eos_eos_pb.GetPubFromNameResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_eos_GetPubFromPrivRequest(arg) {
  if (!(arg instanceof service_eos_eos_pb.GetPubFromPrivRequest)) {
    throw new Error('Expected argument of type service.eos.GetPubFromPrivRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_eos_GetPubFromPrivRequest(buffer_arg) {
  return service_eos_eos_pb.GetPubFromPrivRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_eos_GetPubFromPrivResponse(arg) {
  if (!(arg instanceof service_eos_eos_pb.GetPubFromPrivResponse)) {
    throw new Error('Expected argument of type service.eos.GetPubFromPrivResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_eos_GetPubFromPrivResponse(buffer_arg) {
  return service_eos_eos_pb.GetPubFromPrivResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_eos_NewEventRequest(arg) {
  if (!(arg instanceof service_eos_eos_pb.NewEventRequest)) {
    throw new Error('Expected argument of type service.eos.NewEventRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_eos_NewEventRequest(buffer_arg) {
  return service_eos_eos_pb.NewEventRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_eos_NewProductImageRequest(arg) {
  if (!(arg instanceof service_eos_eos_pb.NewProductImageRequest)) {
    throw new Error('Expected argument of type service.eos.NewProductImageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_eos_NewProductImageRequest(buffer_arg) {
  return service_eos_eos_pb.NewProductImageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_eos_NewProductItemRequest(arg) {
  if (!(arg instanceof service_eos_eos_pb.NewProductItemRequest)) {
    throw new Error('Expected argument of type service.eos.NewProductItemRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_eos_NewProductItemRequest(buffer_arg) {
  return service_eos_eos_pb.NewProductItemRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_eos_NewProductRequest(arg) {
  if (!(arg instanceof service_eos_eos_pb.NewProductRequest)) {
    throw new Error('Expected argument of type service.eos.NewProductRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_eos_NewProductRequest(buffer_arg) {
  return service_eos_eos_pb.NewProductRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_eos_UpdateProductRequest(arg) {
  if (!(arg instanceof service_eos_eos_pb.UpdateProductRequest)) {
    throw new Error('Expected argument of type service.eos.UpdateProductRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_eos_UpdateProductRequest(buffer_arg) {
  return service_eos_eos_pb.UpdateProductRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var EOSService = exports.EOSService = {
  newEOSAccount: {
    path: '/service.eos.EOS/NewEOSAccount',
    requestStream: false,
    responseStream: false,
    requestType: domain_domain_pb.Nil,
    responseType: domain_domain_pb.EosAccount,
    requestSerialize: serialize_domain_Nil,
    requestDeserialize: deserialize_domain_Nil,
    responseSerialize: serialize_domain_EosAccount,
    responseDeserialize: deserialize_domain_EosAccount,
  },
  newFacility: {
    path: '/service.eos.EOS/NewFacility',
    requestStream: false,
    responseStream: false,
    requestType: domain_domain_pb.Facility,
    responseType: domain_domain_pb.Response,
    requestSerialize: serialize_domain_Facility,
    requestDeserialize: deserialize_domain_Facility,
    responseSerialize: serialize_domain_Response,
    responseDeserialize: deserialize_domain_Response,
  },
  getFacilityEOSName: {
    path: '/service.eos.EOS/GetFacilityEOSName',
    requestStream: false,
    responseStream: false,
    requestType: domain_domain_pb.EosAccount,
    responseType: domain_domain_pb.Facility,
    requestSerialize: serialize_domain_EosAccount,
    requestDeserialize: deserialize_domain_EosAccount,
    responseSerialize: serialize_domain_Facility,
    responseDeserialize: deserialize_domain_Facility,
  },
  getFacilityByID: {
    path: '/service.eos.EOS/GetFacilityByID',
    requestStream: false,
    responseStream: false,
    requestType: service_eos_eos_pb.GetByIDRequest,
    responseType: domain_domain_pb.Facility,
    requestSerialize: serialize_service_eos_GetByIDRequest,
    requestDeserialize: deserialize_service_eos_GetByIDRequest,
    responseSerialize: serialize_domain_Facility,
    responseDeserialize: deserialize_domain_Facility,
  },
  newProduct: {
    path: '/service.eos.EOS/NewProduct',
    requestStream: false,
    responseStream: false,
    requestType: service_eos_eos_pb.NewProductRequest,
    responseType: domain_domain_pb.Response,
    requestSerialize: serialize_service_eos_NewProductRequest,
    requestDeserialize: deserialize_service_eos_NewProductRequest,
    responseSerialize: serialize_domain_Response,
    responseDeserialize: deserialize_domain_Response,
  },
  deleteProduct: {
    path: '/service.eos.EOS/DeleteProduct',
    requestStream: false,
    responseStream: false,
    requestType: service_eos_eos_pb.DeleteProductRequest,
    responseType: domain_domain_pb.Response,
    requestSerialize: serialize_service_eos_DeleteProductRequest,
    requestDeserialize: deserialize_service_eos_DeleteProductRequest,
    responseSerialize: serialize_domain_Response,
    responseDeserialize: deserialize_domain_Response,
  },
  updateProduct: {
    path: '/service.eos.EOS/UpdateProduct',
    requestStream: false,
    responseStream: false,
    requestType: service_eos_eos_pb.UpdateProductRequest,
    responseType: domain_domain_pb.Response,
    requestSerialize: serialize_service_eos_UpdateProductRequest,
    requestDeserialize: deserialize_service_eos_UpdateProductRequest,
    responseSerialize: serialize_domain_Response,
    responseDeserialize: deserialize_domain_Response,
  },
  getProductByID: {
    path: '/service.eos.EOS/GetProductByID',
    requestStream: false,
    responseStream: false,
    requestType: service_eos_eos_pb.GetByIDRequest,
    responseType: domain_domain_pb.Product,
    requestSerialize: serialize_service_eos_GetByIDRequest,
    requestDeserialize: deserialize_service_eos_GetByIDRequest,
    responseSerialize: serialize_domain_Product,
    responseDeserialize: deserialize_domain_Product,
  },
  newProductItem: {
    path: '/service.eos.EOS/NewProductItem',
    requestStream: false,
    responseStream: false,
    requestType: service_eos_eos_pb.NewProductItemRequest,
    responseType: domain_domain_pb.Response,
    requestSerialize: serialize_service_eos_NewProductItemRequest,
    requestDeserialize: deserialize_service_eos_NewProductItemRequest,
    responseSerialize: serialize_domain_Response,
    responseDeserialize: deserialize_domain_Response,
  },
  deleteProductItem: {
    path: '/service.eos.EOS/DeleteProductItem',
    requestStream: false,
    responseStream: false,
    requestType: service_eos_eos_pb.DeleteProductItemRequest,
    responseType: domain_domain_pb.Response,
    requestSerialize: serialize_service_eos_DeleteProductItemRequest,
    requestDeserialize: deserialize_service_eos_DeleteProductItemRequest,
    responseSerialize: serialize_domain_Response,
    responseDeserialize: deserialize_domain_Response,
  },
  getProductItemByID: {
    path: '/service.eos.EOS/GetProductItemByID',
    requestStream: false,
    responseStream: false,
    requestType: service_eos_eos_pb.GetByIDRequest,
    responseType: domain_domain_pb.ProductItem,
    requestSerialize: serialize_service_eos_GetByIDRequest,
    requestDeserialize: deserialize_service_eos_GetByIDRequest,
    responseSerialize: serialize_domain_ProductItem,
    responseDeserialize: deserialize_domain_ProductItem,
  },
  newProductImage: {
    path: '/service.eos.EOS/NewProductImage',
    requestStream: false,
    responseStream: false,
    requestType: service_eos_eos_pb.NewProductImageRequest,
    responseType: domain_domain_pb.Response,
    requestSerialize: serialize_service_eos_NewProductImageRequest,
    requestDeserialize: deserialize_service_eos_NewProductImageRequest,
    responseSerialize: serialize_domain_Response,
    responseDeserialize: deserialize_domain_Response,
  },
  deleteProductImage: {
    path: '/service.eos.EOS/DeleteProductImage',
    requestStream: false,
    responseStream: false,
    requestType: service_eos_eos_pb.DeleteProductImageRequest,
    responseType: domain_domain_pb.Response,
    requestSerialize: serialize_service_eos_DeleteProductImageRequest,
    requestDeserialize: deserialize_service_eos_DeleteProductImageRequest,
    responseSerialize: serialize_domain_Response,
    responseDeserialize: deserialize_domain_Response,
  },
  deleteAllProductImages: {
    path: '/service.eos.EOS/DeleteAllProductImages',
    requestStream: false,
    responseStream: false,
    requestType: service_eos_eos_pb.DeleteAllProductImagesRequest,
    responseType: domain_domain_pb.Response,
    requestSerialize: serialize_service_eos_DeleteAllProductImagesRequest,
    requestDeserialize: deserialize_service_eos_DeleteAllProductImagesRequest,
    responseSerialize: serialize_domain_Response,
    responseDeserialize: deserialize_domain_Response,
  },
  newEvent: {
    path: '/service.eos.EOS/NewEvent',
    requestStream: false,
    responseStream: false,
    requestType: service_eos_eos_pb.NewEventRequest,
    responseType: domain_domain_pb.Response,
    requestSerialize: serialize_service_eos_NewEventRequest,
    requestDeserialize: deserialize_service_eos_NewEventRequest,
    responseSerialize: serialize_domain_Response,
    responseDeserialize: deserialize_domain_Response,
  },
  getPubFromPriv: {
    path: '/service.eos.EOS/GetPubFromPriv',
    requestStream: false,
    responseStream: false,
    requestType: service_eos_eos_pb.GetPubFromPrivRequest,
    responseType: service_eos_eos_pb.GetPubFromPrivResponse,
    requestSerialize: serialize_service_eos_GetPubFromPrivRequest,
    requestDeserialize: deserialize_service_eos_GetPubFromPrivRequest,
    responseSerialize: serialize_service_eos_GetPubFromPrivResponse,
    responseDeserialize: deserialize_service_eos_GetPubFromPrivResponse,
  },
  getNameFromPub: {
    path: '/service.eos.EOS/GetNameFromPub',
    requestStream: false,
    responseStream: false,
    requestType: service_eos_eos_pb.GetNameFromPubRequest,
    responseType: service_eos_eos_pb.GetNameFromPubResponse,
    requestSerialize: serialize_service_eos_GetNameFromPubRequest,
    requestDeserialize: deserialize_service_eos_GetNameFromPubRequest,
    responseSerialize: serialize_service_eos_GetNameFromPubResponse,
    responseDeserialize: deserialize_service_eos_GetNameFromPubResponse,
  },
  getPubFromName: {
    path: '/service.eos.EOS/GetPubFromName',
    requestStream: false,
    responseStream: false,
    requestType: service_eos_eos_pb.GetPubFromNameRequest,
    responseType: service_eos_eos_pb.GetPubFromNameResponse,
    requestSerialize: serialize_service_eos_GetPubFromNameRequest,
    requestDeserialize: deserialize_service_eos_GetPubFromNameRequest,
    responseSerialize: serialize_service_eos_GetPubFromNameResponse,
    responseDeserialize: deserialize_service_eos_GetPubFromNameResponse,
  },
};

exports.EOSClient = grpc.makeGenericClientConstructor(EOSService);
