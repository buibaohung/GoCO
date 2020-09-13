package system

import (
	"context"
	"main_service/model"
	"main_service/repository"
	"main_service/util"
	"net/http"
)

type NextIDRequest struct {
	Table string `json:"table,omitempty"`
}

type NextIDResponse struct {
	ID string `json:"id,omitempty"`
}

func MakeNextIDEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		req := request.(*NextIDRequest)
		if req == nil || req != nil && (req.Table == "") {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		id, err := repo.System.NextID(getSequenceByTable(req.Table))
		if err != nil {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1020, "Error get next id")
		}

		res := NextIDResponse{ID: id}
		return res, nil
	}
}

func getSequenceByTable(table string) string {
	return table + "_id_seq"
}
