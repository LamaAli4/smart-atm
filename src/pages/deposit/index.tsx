import { useDeposit } from "./hooks/useDeposit";
import DepositView from "./components/deposit-view";

export default function DepositPage() {
  const deposit = useDeposit();
  return <DepositView {...deposit} />;
}
