import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import inboxReducer from "./inbox/inbox.slice";
import userReducer from "./user/user.slice";
import booksReducer from "./books/books.slice";
import userBooksReducer from "./user-books/user-book.slice";
import transactionsReducer from "./transactions/transactions.slice";
import analyticsReducer from "./analytics/analytics.slice";

const rootReducer = combineReducers({
    auth: authReducer,
    inbox: inboxReducer,
    profile: userReducer,
    books: booksReducer,
    userBooks: userBooksReducer,
    transactions: transactionsReducer,
    analytics: analyticsReducer
});

const store = configureStore({
    reducer: rootReducer
});

export default store;
