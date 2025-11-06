import { useDeposit } from "./hooks/use-deposit";
import DepositView from "./components/deposit-view";

export default function DepositPage() {
  const deposit = useDeposit();
  return <DepositView {...deposit} />;
}
