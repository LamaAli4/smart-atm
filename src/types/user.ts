export interface Transaction {
  id: number;
  type: "Deposit" | "Withdraw" | "Transfer";
  amount: number;
  currency: string;
  target_user?: string;
  date: string;
}

export interface User {
  id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  profile_img: string;
  pin: string;
  balance: number;
  birthday: string;
  transactions: Transaction[];
}
