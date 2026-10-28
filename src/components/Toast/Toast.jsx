import { useStore } from '../../context/StoreContext.jsx';

export default function Toast() {
  const { toasts } = useStore();
  return (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.map((t) => <div key={t.id} className="toast">{t.message}</div>)}
    </div>
  );
}
