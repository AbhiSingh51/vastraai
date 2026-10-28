import { PROCESSING_STAGES } from '../../hooks/useTryOn.js';

export default function LoadingAnimation({ stage }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <div className="loom" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <h3>Creating your look...</h3>
      <ul>
        {PROCESSING_STAGES.map((label, i) => (
          <li key={label} className={i < stage ? 'done' : i === stage ? 'active' : ''}>{i < stage ? '✓' : '•'} {label}</li>
        ))}
      </ul>
    </div>
  );
}
