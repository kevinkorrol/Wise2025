package app

import (
	"encoding/json"
	"errors"
	"github.com/kevinkorrol/Wise2025/internal/database"
	transaction2 "github.com/kevinkorrol/Wise2025/pkg/component/transaction"
	"io"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"time"
)

type App struct {
	listenAddress string
	db            database.Database
}

func New(listenAddress string) *App {
	a := &App{
		listenAddress: listenAddress,
		db:            database.NewInMemoryDB(),
	}

	return a
}

func (a *App) Start() {
	http.HandleFunc("/transaction", a.transactionEndpoint())
	http.HandleFunc("/batch", a.batchEndpoint())
	err := http.ListenAndServe(a.listenAddress, nil)
	if err != nil {
		log.Fatalf("Could not start App: %v\n", err)
	}
}

// POST /transaction
func (a *App) makeTransaction(writer http.ResponseWriter, request *http.Request) {
	body, err := io.ReadAll(request.Body)
	if err != nil {
		http.Error(writer, "Failed reading body", http.StatusInternalServerError)
		return
	}
	defer request.Body.Close()

	transactionRequest := &MakeTransactionRequest{}
	if err := json.Unmarshal(body, &transactionRequest); err != nil {
		http.Error(writer, "Failed parsing JSON", http.StatusBadRequest)
		return
	}

	user, err := a.db.GetUserByID(transactionRequest.UserID)
	if err != nil {
		http.Error(writer, "Did not find user", http.StatusBadRequest)
		return
	}

	completed := transactionRequest.TransactionType == transaction2.TypeRegular

	transaction := &transaction2.Transaction{
		ID:             rand.Uint64(), // This is a hackathon, it's fine
		Owner:          user,
		Name:           transactionRequest.Name,
		Amount:         transactionRequest.Amount,
		TargetCurrency: transactionRequest.TargetCurrency,
		Type:           transactionRequest.TransactionType,
		Timestamp:      time.Now(),
		Completed:      completed,
	}

	if err := a.db.AddTransaction(transaction); err != nil {
		http.Error(writer, "Could not register transaction", http.StatusInternalServerError)
		return
	}

	if transaction.Type == transaction2.TypeBatch {
		if err := a.addTransactionToBatch(transaction); err != nil {
			_ = a.db.RemoveTransactionByID(transaction.ID) // Remove transaction
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	writer.WriteHeader(http.StatusOK)
	_, _ = writer.Write([]byte("Transaction successfully registered!"))
}

func (a *App) addTransactionToBatch(transaction *transaction2.Transaction) error {
	batch, err := a.db.GetExistingBatchTransactionForCurrency(transaction.Amount.Currency, transaction.TargetCurrency)
	if err != nil {
		return errors.New("error getting batches")
	}
	if batch != nil {
		err = a.db.AddTransactionToBatchByID(batch.ID, transaction.ID)
		if err != nil {
			return errors.New("could not add transaction to batch")
		}

		batch, err = a.db.GetBatchTransactionByID(batch.ID) // Get refreshed batch
		if err != nil {
			return errors.New("could not get updated batch")
		}

		// If batch is full, send it out
		if batch.IsFull() {
			err = a.db.CompleteBatch(batch.ID, time.Now())
			if err != nil {
				return errors.New("could not complete batch")
			}
		}
		return nil
	}

	minAmount, err := transaction2.MinimumAmountToTransferForCheaperRate(transaction.Amount.Currency, transaction.TargetCurrency)
	if err != nil {
		return errors.New("error calculating minimum transfer amount for batch")
	}
	transactions := make([]*transaction2.Transaction, 1)
	transactions[0] = transaction
	batch = &transaction2.Batch{
		ID:             rand.Uint64(),
		Transactions:   transactions,
		MinimumAmount:  minAmount,
		TargetCurrency: transaction.TargetCurrency,
		StartTime:      time.Now(),
		CompleteTime:   time.Unix(0, 0),
	}

	if err = a.db.AddBatchTransaction(batch); err != nil {
		return errors.New("could not create transaction batch")
	}

	return nil
}

// GET /transaction
func (a *App) getTransactions(writer http.ResponseWriter, request *http.Request) {
	q := request.URL.Query()
	userIDString := q.Get("user_id")
	if userIDString == "" {
		http.Error(writer, "No user ID specified", http.StatusBadRequest)
		return
	}

	userID, err := strconv.Atoi(userIDString)
	if err != nil {
		http.Error(writer, "Invalid user ID string", http.StatusBadRequest)
		return
	}

	transactions, err := a.db.GetUserTransactionsByID(uint64(userID))
	if err != nil {
		http.Error(writer, "Error getting transactions", http.StatusInternalServerError)
		return
	}
	sendResponseJson(writer, &transactions)
}

// DELETE /transaction
func (a *App) deleteTransaction(writer http.ResponseWriter, request *http.Request) {
	body, err := io.ReadAll(request.Body)
	if err != nil {
		http.Error(writer, "Failed reading body", http.StatusInternalServerError)
		return
	}
	defer request.Body.Close()

	transactionRequest := &DeleteTransactionRequest{}
	if err := json.Unmarshal(body, &transactionRequest); err != nil {
		http.Error(writer, "Failed parsing JSON", http.StatusBadRequest)
		return
	}

	transaction, err := a.db.GetTransactionByID(transactionRequest.TransactionID)
	if err != nil {
		http.Error(writer, "Error getting transaction", http.StatusBadRequest)
		return
	}

	if transaction == nil {
		http.Error(writer, "Transaction does not exist", http.StatusBadRequest)
		return
	}

	if transaction.Completed {
		http.Error(writer, "Transaction already completed", http.StatusBadRequest)
		return
	}

	if err := a.db.RemoveTransactionByID(transactionRequest.TransactionID); err != nil {
		http.Error(writer, "Could not remove transaction", http.StatusInternalServerError)
		return
	}

	writer.WriteHeader(http.StatusOK)
	_, _ = writer.Write([]byte("Deleted transaction"))
}

func (a *App) updateTransaction(writer http.ResponseWriter, request *http.Request) {
	body, err := io.ReadAll(request.Body)
	if err != nil {
		http.Error(writer, "Failed reading body", http.StatusInternalServerError)
		return
	}
	defer request.Body.Close()

	transactionRequest := &UpdateTransactionRequest{}
	if err := json.Unmarshal(body, &transactionRequest); err != nil {
		http.Error(writer, "Failed parsing JSON", http.StatusBadRequest)
		return
	}

	transaction, err := a.db.GetTransactionByID(transactionRequest.TransactionID)
	if err != nil {
		http.Error(writer, "Error getting transaction", http.StatusBadRequest)
		return
	}

	if transaction.Type == transaction2.TypeBatch && transactionRequest.TransactionType == transaction2.TypeRegular {
		err = a.db.CompleteTransactionByID(transaction.ID)
		if err != nil {
			http.Error(writer, "Error completing transaction", http.StatusInternalServerError)
			return
		}
	}
}

func (a *App) transactionEndpoint() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		switch request.Method {
		case http.MethodPost:
			a.makeTransaction(writer, request)
			return
		case http.MethodGet:
			a.getTransactions(writer, request)
			return
		case http.MethodDelete:
			a.deleteTransaction(writer, request)
			return
		case http.MethodPut:
			a.updateTransaction(writer, request)
			return
		default:
			http.Error(writer, "", http.StatusMethodNotAllowed)
			return
		}
	}
}

func (a *App) batchEndpoint() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		if request.Method != http.MethodGet {
			http.Error(writer, "", http.StatusMethodNotAllowed)
			return
		}

	}
}

func sendResponseJson[T any](w http.ResponseWriter, data *T) {
	w.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(data)
	if err != nil {
		http.Error(w, "Failure serializing JSON response data", http.StatusInternalServerError)
	}
}
