package product

import (
	"context"
	"encoding/json"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"main_service/config/grpc/proto/domain"
	pbProduct "main_service/config/grpc/proto/service/main/product"
	"main_service/endpoints/auth/product"
	"main_service/util"
)

func (s *Service) GetByFacilityID(ctx context.Context, req *pbProduct.GetByFacilityIDRequest) (*pbProduct.GetByFacilityIDResponse, error) {
	// decode
	eReq := &product.GetProductsRequest{}
	eReq.Pagination.Offset = int(req.Pagination.Offset)
	eReq.Pagination.Limit = int(req.Pagination.Limit)
	eReq.FacilityID = req.FacilityId

	// handle
	r, err := s.Endpoints.GetProducts(ctx, eReq)
	if err != nil {
		e := err.(util.MyError)
		return nil, status.Errorf(codes.Code(e.ErrorCode), e.Error())
	}
	products := r.(product.GetProductsResponse)

	// encode
	resp := &pbProduct.GetByFacilityIDResponse{}
	resp.Count = int32(products.Pagination.Size)
	for _, product := range products.Products {
		pbProduct := &domain.Product{}

		b, _ := json.Marshal(product)
		json.Unmarshal(b, &pbProduct)
		resp.Products = append(resp.Products, pbProduct)
	}

	return resp, nil
}
