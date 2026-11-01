interface Props {
  score: number;
  title: string;
}

export default function ScoreCard({ score, title }: Props) {
  const safeScore = Math.min(100, Math.max(0, score));

  return (
    <div className="score-card">
      <div
        className="score-circle"
        style={{
          background: `conic-gradient(
            #635bdb ${safeScore * 3.6}deg,
            #e8eaf3 0deg
          )`,
        }}
      >
        <div className="score-inner">
          <strong>{safeScore.toFixed(0)}%</strong>
        </div>
      </div>

      <h3>{title}</h3>
      <p>Based on detected skill alignment</p>
    </div>
  );
}