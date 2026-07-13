interface Props {
  tips: string[];
}

export function TipsPanel({ tips }: Props) {
  if (tips.length === 0) return null;

  return (
    <div className="tips-panel">
      <h3>Additional recommendations</h3>
      <ul>
        {tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
