package currency

type Currency string

const (
	EUR    Currency = "EUR"
	DOLLAR Currency = "USD"
	ZAR    Currency = "ZAR"
)

type Money struct {
	Sum      float64
	Currency Currency
}
