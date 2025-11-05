import { useDeposit } from "./hooks/useDeposit";
import DepositView from "./components/DepositView";

export default function DepositPage() {
  const deposit = useDeposit();
  return <DepositView {...deposit} />;
}
