package product_image

import (
	"context"
	"encoding/json"

	"org_service/config/grpc/client"
	"org_service/config/grpc/proto/domain"
	pbEOS "org_service/config/grpc/proto/service/eos"
	"org_service/model"
)

type eosProductImageRepository struct {
	grpcClient *client.GrpcClient
}

// NewEOSProductImageRepository .
func NewEOSProductImageRepository(grpcClient *client.GrpcClient) ProductImageRepository {
	return eosProductImageRepository{grpcClient}
}

func (r eosProductImageRepository) Create(ctx context.Context, productImage *model.ProductImage) (*model.ProductImage, error) {
	pbProductImage := &domain.ProductImage{}
	b, _ := json.Marshal(productImage)
	json.Unmarshal(b, pbProductImage)

	_, err := r.grpcClient.EOS.NewProductImage(ctx, &pbEOS.NewProductImageRequest{
		ProductImage: pbProductImage,
		EosAccount: &domain.EosAccount{
			Name:       client.EOSName,
			PrivateKey: client.EOSPrivKey,
		},
	})

	return productImage, err
}

func (r eosProductImageRepository) DeleteByProductID(ctx context.Context, productID string) error {
	_, err := r.grpcClient.EOS.DeleteAllProductImages(ctx, &pbEOS.DeleteAllProductImagesRequest{
		ProductId: productID,
		EosAccount: &domain.EosAccount{
			Name:       client.EOSName,
			PrivateKey: client.EOSPrivKey,
		},
	})

	return err
}

func (r eosProductImageRepository) DeleteByID(ctx context.Context, id string) error {
	_, err := r.grpcClient.EOS.DeleteProductImage(ctx, &pbEOS.DeleteProductImageRequest{
		Id: id,
		EosAccount: &domain.EosAccount{
			Name:       client.EOSName,
			PrivateKey: client.EOSPrivKey,
		},
	})

	return err
}
