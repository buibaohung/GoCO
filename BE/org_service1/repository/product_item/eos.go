package product_item

import (
	"context"
	"encoding/json"
	"log"
	"time"

	"org_service/config/grpc/client"
	"org_service/config/grpc/proto/domain"
	pbEOS "org_service/config/grpc/proto/service/eos"
	pbProductItem "org_service/config/grpc/proto/service/main/productitem"
	"org_service/model"
)

type eosProductItemRepository struct {
	grpcClient *client.GrpcClient
}

// NewEOSProductItemRepository .
func NewEOSProductItemRepository(grpcClient *client.GrpcClient) ProductItemRepository {
	return eosProductItemRepository{grpcClient}
}

func (r eosProductItemRepository) Create(ctx context.Context, productItem *model.ProductItem) (*model.ProductItem, error) {
	pbProductItem := &domain.ProductItem{}
	b, _ := json.Marshal(productItem)
	json.Unmarshal(b, pbProductItem)
	pbProductItem.ExpiryDateTimestamp = productItem.ExpiryDate.Unix()

	_, err := r.grpcClient.EOS.NewProductItem(ctx, &pbEOS.NewProductItemRequest{
		ProductItem: pbProductItem,
		EosAccount: &domain.EosAccount{
			Name:       client.EOSName,
			PrivateKey: client.EOSPrivKey,
		},
	})

	return productItem, err
}

func (r eosProductItemRepository) GetByID(ctx context.Context, id string) (*model.ProductItem, error) {
	productItem := &model.ProductItem{}

	pbProductItem, err := r.grpcClient.EOS.GetProductItemByID(ctx, &pbEOS.GetByIDRequest{Id: id})
	if err != nil {
		return nil, err
	}

	b, _ := json.Marshal(pbProductItem)
	json.Unmarshal(b, productItem)

	productItem.ExpiryDate = time.Unix(pbProductItem.ExpiryDateTimestamp, 0)
	return productItem, err
}

func (r eosProductItemRepository) GetWithFilter(ctx context.Context, filter *model.ProductItemFilter, order *model.QueryOrder, pagination *model.Pagination) ([]model.ProductItem, error) {
	resp, err := r.grpcClient.ProductItem.GetByFacilityID(ctx, &pbProductItem.GetByFacilityIDRequest{
		FacilityId: filter.FacilityID,
		Order: &domain.QueryOrder{
			OrderBy:    order.OrderBy,
			OrderField: order.OrderField,
		},
		Pagination: &domain.Pagination{
			Offset: int32(pagination.Offset),
			Limit:  int32(pagination.Limit),
		},
	})
	log.Println("---HieuBD---", err)
	pagination.Size = int(resp.Count)
	productItems := []model.ProductItem{}
	for _, pbProductitem := range resp.ProductItems {
		productItem := model.ProductItem{}
		b, _ := json.Marshal(pbProductitem)
		json.Unmarshal(b, &productItem)

		productItem.ExpiryDate = time.Unix(pbProductitem.ExpiryDateTimestamp, 0)

		productItems = append(productItems, productItem)
	}

	return productItems, err
}

func (r eosProductItemRepository) Delete(ctx context.Context, productItemID string) error {
	_, err := r.grpcClient.EOS.DeleteProductItem(ctx, &pbEOS.DeleteProductItemRequest{
		ProductItemId: productItemID,
		EosAccount: &domain.EosAccount{
			Name:       client.EOSName,
			PrivateKey: client.EOSPrivKey,
		},
	})

	return err
}
