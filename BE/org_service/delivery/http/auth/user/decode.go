package user

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"org_service/endpoints/auth/user"
	"org_service/model"
	"org_service/util"
)

// DecodeCreateUser .
func DecodeCreateUser(c *gin.Context) (interface{}, error) {
	req := &user.CreateUserRequest{}
	err := c.ShouldBind(req)
	if err != nil {
		return nil, util.NewError(err, http.StatusNotAcceptable, 1000, "Invalid input")
	}

	return req, nil
}

// DecodeGetUsers .
func DecodeGetUsers(c *gin.Context) (interface{}, error) {
	req := &user.GetUsersRequest{}
	c.BindQuery(&req.Pagination)

	return req, nil
}

// DecodeUpdateUser .
func DecodeUpdateUser(c *gin.Context) (interface{}, error) {
	userID := c.Param("id")

	u := model.User{}
	err := c.ShouldBind(&u)
	if err != nil {
		return nil, util.NewError(err, http.StatusNotAcceptable, 1000, "Invalid input")
	}

	u.ID = userID

	req := &user.UpdateUserRequest{
		User: u,
	}

	return req, nil
}

// DecodeDeleteUser .
func DecodeDeleteUser(c *gin.Context) (interface{}, error) {
	userID := c.Param("id")

	req := &user.DeleteUserRequest{
		UserID: userID,
	}

	return req, nil
}

// DecodeGetUserByID .
func DecodeGetUserByID(c *gin.Context) (interface{}, error) {
	id := c.Param("id")

	req := &user.GetUserByIDRequest{
		UserID: id,
	}

	return req, nil
}
