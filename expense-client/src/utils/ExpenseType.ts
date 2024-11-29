export interface Expense {
  result: Result[];
}

export interface Result {
  uid: string;
  title: string;
  amount: number;
  category_name: string;
}

export interface SingleExpense {
  result: Result;
}

export interface Result {
  uid: string;
  title: string;
  amount: number;
  category_name: string;
}
