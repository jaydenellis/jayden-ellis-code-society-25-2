package com.codedifferently.lesson17.bank;

import java.util.Set;

/** Represents a checking account. */
public class CheckingAccount extends Account {

    public CheckingAccount(String accountNumber, Set<Customer> owners, double initialBalance) {
        super(accountNumber, owners, initialBalance);
    }

    // Later you’ll add methods here for handling checks (depositing/withdrawing with a Check).
}
