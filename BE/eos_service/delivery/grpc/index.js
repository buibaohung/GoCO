var grpc = require('grpc');
var eos_service = require('../../proto/service/eos/eos_grpc_pb');
var { newEOSAccount, getPubFromPriv, getNameFromPub, getPubFromName } = require("./account");
var { newFacility, getFacilityEOSName, getFacilityByID } = require("./facility");
var { newProduct, deleteProduct, updateProduct, getProductByID } = require("./product");
var { newProductItem, deleteProductItem, getProductItemByID } = require("./product_item");
var { newProductImage, deleteAllProductImages, deleteProductImage } = require("./product_image");
var { newEvent } = require("./event");
const { getEnv } = require('../../util/env');

exports.initServer = () => {
    console.log("gRPC started!");
    
    var server = new grpc.Server();
    server.addService(eos_service.EOSService, {
        newFacility,
        getFacilityEOSName,
        getFacilityByID,
        newProduct,
        deleteProduct,
        updateProduct,
        getProductByID,
        newProductItem,
        deleteProductItem,
        getProductItemByID,
        newProductImage,
        deleteAllProductImages,
        deleteProductImage,
        newEvent,
        newEOSAccount,
        getPubFromPriv,
        getNameFromPub,
        getPubFromName,
    });

    let port = getEnv("GRPC_PORT", "50051")

    server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
    server.start();
}