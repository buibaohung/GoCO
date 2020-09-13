package facility

import (
	"context"
	"encoding/json"
	"org_service/model"

	"org_service/config/grpc/proto/domain"
	pbEOS "org_service/config/grpc/proto/service/eos"
)

type eosFacilityRepository struct {
	pbClient pbEOS.EOSClient
}

// NewEOSFacilityRepository .
func NewEOSFacilityRepository(pbClient pbEOS.EOSClient) FacilityRepository {
	return eosFacilityRepository{pbClient}
}

func (r eosFacilityRepository) Create(ctx context.Context, facility *model.Facility) (*model.Facility, error) {
	pbFacility := &domain.Facility{}
	b, _ := json.Marshal(facility)
	json.Unmarshal(b, pbFacility)

	_, err := r.pbClient.NewFacility(ctx, pbFacility)

	return facility, err
}

func (r eosFacilityRepository) GetByID(ctx context.Context, id string) (*model.Facility, error) {
	facility := &model.Facility{}

	pbFacility, err := r.pbClient.GetFacilityByID(ctx, &pbEOS.GetByIDRequest{Id: id})
	if err != nil {
		return nil, err
	}

	b, _ := json.Marshal(pbFacility)
	json.Unmarshal(b, facility)
	return facility, err
}

func (r eosFacilityRepository) GetByEOSName(ctx context.Context, name string) (*model.Facility, error) {
	facility := &model.Facility{}

	pbFacility, err := r.pbClient.GetFacilityEOSName(ctx, &domain.EosAccount{Name: name})
	if err != nil {
		return nil, err
	}

	b, _ := json.Marshal(pbFacility)
	json.Unmarshal(b, facility)
	return facility, err
}
