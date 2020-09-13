package util

import (
	"context"
	"time"

	"github.com/dgrijalva/jwt-go"

	"org_service/model"
)

type TokenClaims struct {
	User     model.User     `json:"user,omitempty"`
	Facility model.Facility `json:"facility,omitempty"`
	jwt.StandardClaims
}

func GenerateToken(id, name, phoneNumber string, permission model.UserPermission) (string, error) {
	// Create the Claims
	claims := TokenClaims{
		User: model.User{
			ID:          id,
			Name:        name,
			PhoneNumber: phoneNumber,
			Permission:  permission,
		},
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 48).Unix(),
			Issuer:    "HieuHandsome",
			NotBefore: time.Now().Add(time.Second * 3).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	key := GetEnv("JWT_SIGN_KEY", "xxx")

	return token.SignedString([]byte(key))
}

func ParseToken(tokenString string) (*TokenClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &TokenClaims{}, func(token *jwt.Token) (interface{}, error) {
		key := GetEnv("JWT_SIGN_KEY", "xxx")
		return []byte(key), nil
	})

	if claims, ok := token.Claims.(*TokenClaims); ok && token.Valid {
		return claims, nil
	}
	return nil, err
}

const KeyContext = "token_payload"

func SetTokenPayload(ctx context.Context, data *TokenClaims) context.Context {
	newCtx := context.WithValue(ctx, KeyContext, data)
	return newCtx
}

func GetTokenPayloadFromContext(c context.Context) *TokenClaims {
	tokenPayloadInterface := c.Value(KeyContext)
	tokenPayload, ok := tokenPayloadInterface.(*TokenClaims)
	if !ok {
		return nil
	}
	return tokenPayload
}
