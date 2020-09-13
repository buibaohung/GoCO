package productitem

import (
	"context"
	"encoding/json"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"main_service/config/grpc/proto/domain"
	pbProductItem "main_service/config/grpc/proto/service/main/productitem"
	"main_service/endpoints/auth/product_item"
	"main_service/util"
)

func (s *Service) GetByFacilityID(ctx context.Context, req *pbProductItem.GetByFacilityIDRequest) (*pbProductItem.GetByFacilityIDResponse, error) {
	// decode
	eReq := &product_item.GetProductItemsRequest{}
	eReq.Filter.FacilityID = req.FacilityId
	eReq.Pagination.Offset = int(req.Pagination.Offset)
	eReq.Pagination.Limit = int(req.Pagination.Limit)

	// handle
	r, err := s.Endpoints.GetProductItems(ctx, eReq)
	if err != nil {
		e := err.(util.MyError)
		return nil, status.Errorf(codes.Code(e.ErrorCode), e.Error())
	}
	productItems := r.(product_item.GetProductItemsResponse)

	// encode
	resp := &pbProductItem.GetByFacilityIDResponse{}
	resp.Count = int32(productItems.Pagination.Size)
	for _, productItem := range productItems.ProductItems {
		pbProductItem := &domain.ProductItem{}

		b, _ := json.Marshal(productItem)
		json.Unmarshal(b, &pbProductItem)

		pbProductItem.ExpiryDateTimestamp = productItem.ExpiryDate.Unix()

		resp.ProductItems = append(resp.ProductItems, pbProductItem)
	}

	return resp, nil
}
