package com.codedifferently.lesson17.bank;

import java.util.Set;

/** Represents a savings account (no checks allowed). */
public class SavingsAccount extends Account {

    public SavingsAccount(String accountNumber, Set<Customer> owners, double initialBalance) {
        super(accountNumber, owners, initialBalance);
    }

    public void depositCheck(Check check) {
        throw new UnsupportedOperationException("Savings accounts do not support checks");
    }

    public void withdrawCheck(Check check) {
        throw new UnsupportedOperationException("Savings accounts do not support checks");
    }
}
