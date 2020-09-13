package facility

import (
	"context"
	"encoding/json"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"main_service/config/grpc/proto/domain"
	pbFacility "main_service/config/grpc/proto/service/main/facility"
	"main_service/endpoints/public/facility"
	"main_service/model"
	"main_service/util"
)

func (s *Service) GetFacilities(ctx context.Context, req *pbFacility.GetFacilitiesRequest) (*pbFacility.GetFacilitiesResponse, error) {
	// decode
	eReq := &facility.GetFacilitiesByTypeResquest{Type: model.FacilityType(req.Type)}

	// handle
	r, err := s.Endpoints.GetFacilitiesByType(ctx, eReq)
	if err != nil {
		e := err.(util.MyError)
		return nil, status.Errorf(codes.Code(e.ErrorCode), e.Error())
	}
	resp := r.(facility.GetFacilitiesByTypeResponse)

	// encode
	pbFacilities := []*domain.Facility{}
	for _, fac := range resp.Facilities {
		facilit := &domain.Facility{}
		b, _ := json.Marshal(fac)
		json.Unmarshal(b, facilit)
		pbFacilities = append(pbFacilities, facilit)
	}
	return &pbFacility.GetFacilitiesResponse{Facilities: pbFacilities}, nil
}
