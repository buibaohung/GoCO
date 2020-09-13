package facility

import (
	pbFacility "main_service/config/grpc/proto/service/main/facility"
	"main_service/endpoints/public/facility"
)

type Service struct {
	pbFacility.UnimplementedFacilityServer
	Endpoints facility.Endpoints
}
