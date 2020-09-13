package product

import (
	"context"
	"encoding/json"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"main_service/config/grpc/proto/domain"
	pbProduct "main_service/config/grpc/proto/service/main/product"
	"main_service/endpoints/public"
	"main_service/util"
)

func (s *Service) GetByID(ctx context.Context, req *pbProduct.GetByIDRequest) (*pbProduct.GetByIDResponse, error) {
	// decode
	eReq := &public.GetProductRequest{}
	eReq.ProductID = req.ProductId
	eReq.ProductItemID = req.ProductItemId

	// handle
	r, err := s.PublicEndpoints.GetProduct(ctx, eReq)
	if err != nil {
		e := err.(util.MyError)
		return nil, status.Errorf(codes.Code(e.ErrorCode), e.Error())
	}
	p := r.(public.GetProductResponse)

	// encode
	resp := &pbProduct.GetByIDResponse{}
	resp.Rating = p.Rating
	resp.Images = p.Images

	pbProduct := &domain.Product{}
	b, _ := json.Marshal(p.Product)
	json.Unmarshal(b, pbProduct)
	resp.Product = pbProduct

	pbProductImages := []*domain.ProductImage{}
	b, _ = json.Marshal(p.RawImages)
	json.Unmarshal(b, &pbProductImages)
	resp.RawImages = pbProductImages

	return resp, nil
}
