package product

import (
	"context"
	"encoding/json"
	"errors"

	"org_service/config/grpc/client"
	"org_service/config/grpc/proto/domain"
	pbEOS "org_service/config/grpc/proto/service/eos"
	pbProduct "org_service/config/grpc/proto/service/main/product"
	"org_service/model"

	"google.golang.org/grpc/status"
)

type eosProductRepository struct {
	grpcClient *client.GrpcClient
}

// NewPGProductRepository .
func NewEOSProductRepository(grpcClient *client.GrpcClient) ProductRepository {
	return eosProductRepository{grpcClient}
}

func (r eosProductRepository) Create(ctx context.Context, product *model.Product) (*model.Product, error) {
	pbProduct := &domain.Product{}
	b, _ := json.Marshal(product)
	json.Unmarshal(b, pbProduct)

	_, err := r.grpcClient.EOS.NewProduct(ctx, &pbEOS.NewProductRequest{
		Product: pbProduct,
		EosAccount: &domain.EosAccount{
			Name:       client.EOSName,
			PrivateKey: client.EOSPrivKey,
		},
	})

	return product, err
}

func (r eosProductRepository) GetByID(ctx context.Context, id string) (*model.Product, error) {
	pbProduct, err := r.grpcClient.EOS.GetProductByID(ctx, &pbEOS.GetByIDRequest{Id: id})
	if err != nil {
		return nil, err
	}

	product := &model.Product{}
	b, _ := json.Marshal(pbProduct)
	json.Unmarshal(b, product)
	return product, err
}

func (r eosProductRepository) GetByFacilityID(ctx context.Context, facilityID string, order *model.QueryOrder, pagination model.Pagination) ([]model.Product, int, error) {
	pgRequest := &pbProduct.GetByFacilityIDRequest{
		FacilityId: facilityID,
		Order: &domain.QueryOrder{
			OrderBy:    order.OrderBy,
			OrderField: order.OrderField,
		},
		Pagination: &domain.Pagination{
			Offset: int32(pagination.Offset),
			Limit:  int32(pagination.Limit),
		},
	}
	resp, err := r.grpcClient.Product.GetByFacilityID(ctx, pgRequest)
	if err != nil {
		msg := "Error get product"
		s, ok := status.FromError(err)
		if ok {
			msg = s.Message()
		}
		return nil, 0, errors.New(msg)
	}

	count := int(resp.Count)
	products := []model.Product{}

	for _, pbProduct := range resp.Products {
		product := model.Product{}
		b, _ := json.Marshal(pbProduct)
		json.Unmarshal(b, &product)
		products = append(products, product)
	}

	return products, count, err
}

func (r eosProductRepository) Delete(ctx context.Context, productID string) error {
	_, err := r.grpcClient.EOS.DeleteProduct(ctx, &pbEOS.DeleteProductRequest{
		ProductId: productID,
		EosAccount: &domain.EosAccount{
			Name:       client.EOSName,
			PrivateKey: client.EOSPrivKey,
		},
	})

	return err
}

func (r eosProductRepository) Update(ctx context.Context, product model.Product) (*model.Product, error) {
	_, err := r.grpcClient.EOS.UpdateProduct(ctx, &pbEOS.UpdateProductRequest{
		ProductId: product.ID,
		Product: &domain.Product{
			Name:        product.Name,
			Avatar:      product.Avatar,
			Description: product.Description,
		},
		EosAccount: &domain.EosAccount{
			Name:       client.EOSName,
			PrivateKey: client.EOSPrivKey,
		},
	})
	return &product, err
}
